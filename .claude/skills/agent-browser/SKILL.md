---
name: agent-browser
description: Headless browser automation CLI for AI agents. Use for web automation tasks including form filling, navigation, data extraction, testing, web scraping, screenshot capture, and interactive web workflows. Trigger when the user asks to automate web browsing, test websites, fill forms, scrape data, take screenshots, or interact with web pages. Also use when tasks involve verifying web functionality, monitoring web content, or automating repetitive web interactions.
---

# agent-browser Skill

Browser automation using agent-browser CLI - a fast, AI-optimized tool with Rust-powered performance and accessibility tree snapshots.

## Installation

```bash
npm install -g agent-browser
agent-browser install
```

Linux users: Add `--with-deps` flag to install system dependencies.

## Core Workflow

The fundamental pattern is **snapshot-first**:

1. Navigate to page
2. Get snapshot with element refs
3. Interact using refs or semantic locators
4. Verify results

```bash
# Navigate
agent-browser open https://example.com

# Get snapshot (shows: button "Submit" [ref=e2])
agent-browser snapshot -i

# Interact using ref
agent-browser click @e2

# Verify
agent-browser wait --text "Success"
```

## Quick Reference

### Navigation
```bash
agent-browser open <url>           # Navigate
agent-browser back|forward|reload  # History
```

### Snapshots
```bash
agent-browser snapshot             # Full accessibility tree with refs
agent-browser snapshot -i          # Interactive elements only (recommended)
agent-browser snapshot -c          # Compact (remove empty)
agent-browser snapshot -d 3        # Limit depth
```

**Snapshot output**: Elements shown as `button "Submit" [ref=e2]`

### Element Interaction

**Preferred: Semantic locators (resilient)**
```bash
agent-browser find role button click --name "Submit"
agent-browser find label "Email" fill "user@example.com"
agent-browser find text "Sign In" click
```

**Alternative: Refs from snapshot**
```bash
agent-browser click @e2
agent-browser fill @e3 "text"
```

**Fallback: CSS selectors**
```bash
agent-browser click "#element-id"
agent-browser fill ".input-class" "text"
```

### Form Input
```bash
agent-browser fill <sel> <text>     # Clear and fill
agent-browser type <sel> <text>     # Type without clearing
agent-browser press Enter           # Keyboard
agent-browser select <sel> <value>  # Dropdown
agent-browser check <sel>           # Checkbox
agent-browser upload <sel> <file>   # File upload
```

### Data Extraction
```bash
agent-browser get text <sel>        # Extract text
agent-browser get value <sel>       # Input value
agent-browser get html <sel>        # HTML content
agent-browser get title|url         # Page info
```

### Wait & Sync
```bash
agent-browser wait <selector>       # Wait for element
agent-browser wait --text "Ready"   # Wait for text
agent-browser wait --url "**/page"  # Wait for URL
agent-browser wait --load networkidle
```

### Screenshots
```bash
agent-browser screenshot [path]     # Viewport
agent-browser screenshot --full     # Full page
```

### Sessions
```bash
agent-browser --session <name> open <url>
agent-browser --session <name> snapshot -i
agent-browser session list
```

Sessions are isolated: separate cookies, auth, and storage.

## When to Use Each Approach

### Use Semantic Locators (Primary)
- Forms with labels
- Buttons with clear names
- Interactive UI elements
- Accessible components

**Benefits**: Resilient, readable, maintainable

### Use Refs (Secondary)
- Multiple interactions on same page
- Known element structure from snapshot
- Performance optimization

**Benefits**: Exact targeting, fast

### Use CSS Selectors (Fallback)
- Legacy pages without accessibility features
- Specific DOM traversal needed
- No semantic attributes available

## Reference Documentation

**For complete command listing**: See [references/commands.md](references/commands.md)
- All commands with parameters and examples
- Flags and options
- Environment variables

**For semantic locator patterns**: See [references/semantic-locators.md](references/semantic-locators.md)
- All locator types (role, label, text, placeholder, etc.)
- Combination patterns
- Common use cases

**For AI-specific guidance**: See [references/best-practices.md](references/best-practices.md)
- Element selection strategies
- Session management
- Error handling patterns
- Performance optimization
- Common pitfalls and solutions

## Common Patterns

### Login Workflow
```bash
agent-browser open https://app.example.com/login
agent-browser find label "Email" fill "user@example.com"
agent-browser find label "Password" type "password"
agent-browser find role button click --name "Sign In"
agent-browser wait --url "**/dashboard"
```

### Form Filling
```bash
agent-browser snapshot -i
agent-browser find label "First Name" fill "John"
agent-browser find label "Email" fill "john@example.com"
agent-browser find role checkbox check --name "Terms"
agent-browser find role button click --name "Submit"
agent-browser wait --text "Success"
```

### Data Extraction
```bash
agent-browser open https://example.com/data
agent-browser snapshot -i
agent-browser get text @e1
agent-browser get html @e2
```

### Testing Workflow
```bash
agent-browser open https://app.example.com
agent-browser wait --text "Welcome"
agent-browser screenshot homepage.png
agent-browser find role link click --name "Features"
agent-browser wait --text "Features"
```

### Multi-Tab Work
```bash
agent-browser open https://site1.com
agent-browser tab new https://site2.com
agent-browser tab 0  # Switch to first tab
agent-browser snapshot -i
agent-browser tab 1  # Switch to second tab
```

## Authentication

### Token-based (API/SPA)
```bash
agent-browser open https://api.example.com \
  --headers '{"Authorization": "Bearer token"}'
```

### Session State
```bash
# Login and save state
agent-browser state save auth.json

# Restore in future
agent-browser state load auth.json
agent-browser open https://app.example.com
```

### HTTP Basic
```bash
agent-browser set credentials username password
agent-browser open https://protected.example.com
```

## Network Control

```bash
# Mock API responses
agent-browser network route "**/api/users" --body '{"users":[]}'

# Block requests
agent-browser network route "**/analytics/**" --abort

# Monitor requests
agent-browser network requests
agent-browser network requests --filter api
```

## Debugging

```bash
# Visual debugging
agent-browser --headed open https://example.com

# Capture diagnostics
agent-browser screenshot error.png
agent-browser console
agent-browser errors

# Trace recording
agent-browser trace start
# ... perform actions ...
agent-browser trace stop trace.zip
```

View trace: `npx playwright show-trace trace.zip`

## Key Features

- **93% context reduction**: Refs system vs full accessibility trees
- **Semantic locators**: Resilient element selection
- **Multi-session**: Isolated parallel automations
- **Fast**: Rust CLI with Node.js Playwright backend
- **Cross-platform**: macOS, Linux, Windows binaries

## Important Notes

- Always get snapshot before using refs
- Prefer semantic locators for resilience
- Use sessions for parallel work
- Wait for dynamic content before interacting
- Close browser when done: `agent-browser close`

## Example Script

See [scripts/example-workflow.sh](scripts/example-workflow.sh) for a complete workflow example demonstrating login, navigation, and data extraction.

## Help

```bash
agent-browser --help              # All commands
agent-browser <command> --help    # Command-specific help
```
