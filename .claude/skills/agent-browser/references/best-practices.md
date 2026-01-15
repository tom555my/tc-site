# Best Practices for AI Agents

## Core Workflow Pattern

The fundamental workflow is snapshot-first:

1. **Navigate** to the page
2. **Snapshot** to get element references
3. **Interact** using refs or semantic locators
4. **Verify** actions completed successfully

```bash
# Step 1: Navigate
agent-browser open https://example.com

# Step 2: Get snapshot with refs
agent-browser snapshot -i

# Output shows: button "Submit" [ref=e2], textbox "Email" [ref=e3]

# Step 3: Interact using refs
agent-browser fill @e3 "user@example.com"
agent-browser click @e2

# Step 4: Verify
agent-browser wait --text "Success"
```

## Element Selection Strategy

Use this priority order:

1. **Refs from snapshot** (most reliable for known elements)
   ```bash
   agent-browser snapshot -i
   agent-browser click @e2
   ```

2. **Semantic locators** (resilient, readable)
   ```bash
   agent-browser find role button click --name "Submit"
   ```

3. **CSS selectors** (fallback for non-semantic elements)
   ```bash
   agent-browser click "#legacy-element"
   ```

## Session Management

Use named sessions for:
- **Multiple simultaneous automations**
- **Different user contexts** (authenticated vs guest)
- **Parallel testing scenarios**

```bash
# Admin workflow
agent-browser --session admin open https://app.example.com/admin
agent-browser --session admin find label "Username" fill "admin"

# User workflow (parallel)
agent-browser --session user1 open https://app.example.com
agent-browser --session user1 find label "Username" fill "user"
```

Sessions are isolated: separate cookies, storage, and browser state.

## Wait Strategies

Always wait for dynamic content before interacting:

```bash
# Wait for element
agent-browser wait role button --name "Load More"

# Wait for text
agent-browser wait --text "Data loaded"

# Wait for URL change
agent-browser wait --url "**/dashboard"

# Wait for network idle
agent-browser wait --load networkidle

# Wait fixed duration (last resort)
agent-browser wait 2000
```

**Prefer specific waits** over fixed delays for reliability and speed.

## Error Handling

Check state before critical actions:

```bash
# Verify element is ready
agent-browser is visible @e2
agent-browser is enabled @e2

# Then interact
agent-browser click @e2
```

Capture diagnostics when errors occur:

```bash
agent-browser screenshot error.png
agent-browser console
agent-browser errors
agent-browser get url  # Current location
```

## Snapshot Optimization

Use snapshot flags to reduce output size:

```bash
# Interactive elements only (forms, buttons, links)
agent-browser snapshot -i

# Compact (remove empty containers)
agent-browser snapshot -c

# Limit depth (avoid deep nesting)
agent-browser snapshot -d 3

# Scope to region
agent-browser snapshot -s "#main-content"

# Combine flags
agent-browser snapshot -i -c -d 3
```

**Context efficiency**: Using `-i` reduces output by ~70%, using `-i -c` by ~85%.

## Authentication Patterns

### Token-Based (API/SPA)
```bash
agent-browser open https://api.example.com \
  --headers '{"Authorization": "Bearer eyJhbG..."}'
```

### Session State
```bash
# Login once, save state
agent-browser open https://app.example.com/login
agent-browser find label "Email" fill "user@example.com"
agent-browser find label "Password" fill "password"
agent-browser find role button click --name "Sign In"
agent-browser state save auth.json

# Restore in future sessions
agent-browser state load auth.json
agent-browser open https://app.example.com/dashboard
```

### HTTP Basic Auth
```bash
agent-browser set credentials username password
agent-browser open https://protected.example.com
```

## Network Control

### Mock API Responses
```bash
# Intercept and mock
agent-browser network route "**/api/users" --body '{"users":[]}'

# Block tracking/analytics
agent-browser network route "**/analytics.js" --abort
agent-browser network route "**/tracking/**" --abort
```

### Monitor Requests
```bash
# View all requests
agent-browser network requests

# Filter by keyword
agent-browser network requests --filter api
agent-browser network requests --filter .jpg
```

## Multi-Tab Workflows

```bash
# Open multiple tabs
agent-browser open https://example.com
agent-browser tab new https://other.com

# List tabs
agent-browser tab
# Output: [0] example.com (current), [1] other.com

# Switch between tabs
agent-browser tab 1
agent-browser snapshot -i

agent-browser tab 0
agent-browser click @e2
```

## Form Filling Best Practices

```bash
# Use semantic locators for reliability
agent-browser find label "Email" fill "user@example.com"
agent-browser find label "Password" type "secret"

# Wait for form validation
agent-browser wait --text "Valid"

# Check checkbox by label
agent-browser find role checkbox check --name "Terms"

# Select dropdown option
agent-browser find label "Country" select "United States"

# Submit
agent-browser find role button click --name "Submit"

# Verify submission
agent-browser wait --url "**/success"
```

## Debugging Strategies

### Visual Debugging
```bash
# Show browser window
agent-browser --headed open https://example.com

# Highlight elements
agent-browser highlight @e2

# Take screenshots at key points
agent-browser screenshot step1.png
agent-browser click @e2
agent-browser screenshot step2.png
```

### Console & Errors
```bash
# Check console for errors
agent-browser console

# Get JavaScript errors
agent-browser errors

# View network issues
agent-browser network requests --filter 404
```

### Trace Recording
```bash
# Start trace
agent-browser trace start

# Perform actions
agent-browser open https://example.com
agent-browser click @e2

# Stop and save
agent-browser trace stop debug-trace.zip
```

Open trace in Playwright Trace Viewer: `npx playwright show-trace debug-trace.zip`

## Performance Optimization

### Reduce Network Load
```bash
# Block unnecessary resources
agent-browser network route "**/*.png" --abort
agent-browser network route "**/*.jpg" --abort
agent-browser network route "**/analytics/**" --abort
```

### Efficient Snapshots
```bash
# Only get what you need
agent-browser snapshot -i -c -s "#app"
```

### Reuse Sessions
```bash
# Keep browser alive between commands
# Don't close until done
agent-browser open https://example.com
agent-browser click @e2
agent-browser fill @e3 "text"
# ... more commands ...
agent-browser close  # Only at the end
```

## Common Pitfalls

### Don't: Use CSS selectors for everything
```bash
# Fragile
agent-browser click "div.card:nth-child(3) > button.btn-primary"
```

### Do: Use semantic locators
```bash
# Resilient
agent-browser find role button click --name "Add to Cart"
```

### Don't: Use fixed waits everywhere
```bash
agent-browser wait 5000
agent-browser click @e2
```

### Do: Wait for specific conditions
```bash
agent-browser wait @e2
agent-browser click @e2
```

### Don't: Skip snapshot when refs are needed
```bash
# Missing context about available elements
agent-browser click @e2  # Which element is e2?
```

### Do: Get snapshot first
```bash
agent-browser snapshot -i
# Now you know: button "Submit" [ref=e2]
agent-browser click @e2
```

## Output Formats

### Human-Readable (Default)
```bash
agent-browser snapshot
# Output: Formatted accessibility tree
```

### Machine-Readable (--json)
```bash
agent-browser snapshot --json
# Output: {"type":"snapshot","nodes":[...]}
```

Use `--json` when parsing output programmatically.

## Testing Workflows

### Smoke Testing
```bash
agent-browser open https://app.example.com
agent-browser wait --text "Welcome"
agent-browser screenshot homepage.png
agent-browser find role link click --name "Features"
agent-browser wait --text "Features"
agent-browser screenshot features.png
```

### Form Validation Testing
```bash
# Test empty submission
agent-browser find role button click --name "Submit"
agent-browser wait --text "Required"

# Test valid submission
agent-browser find label "Email" fill "test@example.com"
agent-browser find role button click --name "Submit"
agent-browser wait --text "Success"
```

### Responsive Testing
```bash
# Mobile
agent-browser set device "iPhone 14"
agent-browser open https://example.com
agent-browser screenshot mobile.png

# Tablet
agent-browser set device "iPad Pro"
agent-browser reload
agent-browser screenshot tablet.png

# Desktop
agent-browser set viewport 1920 1080
agent-browser reload
agent-browser screenshot desktop.png
```

## Integration Patterns

### CI/CD Pipeline
```bash
#!/bin/bash
set -e

# Setup
agent-browser install

# Run tests
agent-browser open https://staging.example.com
agent-browser snapshot -i > snapshot.txt
agent-browser find role button click --name "Test"
agent-browser wait --text "Pass"

# Capture results
agent-browser screenshot results.png
agent-browser close
```

### Data Extraction
```bash
# Navigate to page
agent-browser open https://example.com/data

# Get snapshot to find elements
agent-browser snapshot -i

# Extract data using refs
agent-browser get text @e1 > data1.txt
agent-browser get text @e2 > data2.txt
agent-browser get html @e3 > data3.html
```

### Multi-Step Workflows
```bash
# Login
agent-browser open https://app.example.com/login
agent-browser find label "Email" fill "user@example.com"
agent-browser find label "Password" type "password"
agent-browser find role button click --name "Sign In"
agent-browser wait --url "**/dashboard"

# Navigate to feature
agent-browser find role link click --name "Reports"
agent-browser wait --text "Report List"

# Generate report
agent-browser find role button click --name "Generate"
agent-browser wait --text "Complete"

# Download
agent-browser find role link click --name "Download"
agent-browser wait 3000  # Download time
```

## Memory Efficiency

The refs system achieves **93% context reduction** compared to full accessibility trees:

- **Full tree**: ~50,000 tokens for complex pages
- **Snapshot with refs**: ~3,500 tokens

This makes agent-browser ideal for LLM workflows with limited context windows.
