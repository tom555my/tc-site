# agent-browser Command Reference

## Navigation

```bash
agent-browser open <url>                    # Navigate to URL (aliases: goto, navigate)
agent-browser back                          # Go back in history
agent-browser forward                       # Go forward in history
agent-browser reload                        # Refresh page
```

## Snapshot & Element Discovery

```bash
agent-browser snapshot                      # Get accessibility tree with refs
agent-browser snapshot -i                   # Interactive elements only
agent-browser snapshot -c                   # Compact (remove empty elements)
agent-browser snapshot -d <n>               # Limit tree depth
agent-browser snapshot -s <selector>        # Scope to CSS selector
agent-browser snapshot --json               # Machine-readable output
```

**Output format:** Elements shown with refs like `button "Submit" [ref=e2]`

## Element Interaction

```bash
agent-browser click <selector>              # Click element
agent-browser click @e2                     # Click using ref from snapshot
agent-browser dblclick <selector>           # Double-click
agent-browser hover <selector>              # Hover over element
agent-browser focus <selector>              # Focus element
```

## Form Input

```bash
agent-browser fill <selector> <text>        # Clear and populate field
agent-browser type <selector> <text>        # Type without clearing
agent-browser press <key>                   # Send keyboard input (alias: key)
agent-browser keydown <key>                 # Press key down
agent-browser keyup <key>                   # Release key
agent-browser select <selector> <value>     # Dropdown selection
agent-browser check <selector>              # Check checkbox
agent-browser uncheck <selector>            # Uncheck checkbox
agent-browser upload <selector> <files>     # Upload file(s)
```

**Key examples:** `Enter`, `Tab`, `Escape`, `Control+A`, `Meta+V`

## Data Extraction

```bash
agent-browser get text <selector>           # Extract text content
agent-browser get text @e1                  # Extract using ref
agent-browser get html <selector>           # Get innerHTML
agent-browser get value <selector>          # Get input value
agent-browser get attr <selector> <name>    # Get attribute value
agent-browser get title                     # Page title
agent-browser get url                       # Current URL
```

## State Checking

```bash
agent-browser is visible <selector>         # Check visibility
agent-browser is enabled <selector>         # Check if interactive
agent-browser is checked <selector>         # Check checkbox state
```

## Scrolling

```bash
agent-browser scroll up [px]                # Scroll up (default: viewport height)
agent-browser scroll down [px]              # Scroll down
agent-browser scroll left [px]              # Scroll left
agent-browser scroll right [px]             # Scroll right
agent-browser scrollintoview <selector>     # Scroll element into view (alias: scrollinto)
```

## Drag & Drop

```bash
agent-browser drag <source> <target>        # Drag source to target
agent-browser drag @e1 @e2                  # Using refs
```

## Screenshots & Visual Capture

```bash
agent-browser screenshot [path]             # Capture viewport
agent-browser screenshot --full             # Full-page screenshot
agent-browser screenshot -f [path]          # Full-page (short flag)
```

## Wait & Synchronization

```bash
agent-browser wait <selector>               # Wait for element visibility
agent-browser wait <ms>                     # Delay in milliseconds
agent-browser wait --text "Welcome"         # Wait for text appearance
agent-browser wait --url "**/dashboard"     # Wait for URL pattern
agent-browser wait --load networkidle       # Wait for load completion
```

**Load states:** `load`, `domcontentloaded`, `networkidle`

## Browser Settings

```bash
agent-browser set viewport <w> <h>          # Resize window
agent-browser set device "iPhone 14"        # Device emulation
agent-browser set geo <lat> <lng>           # Geolocation
agent-browser set offline [on|off]          # Toggle offline mode
agent-browser set media [dark|light]        # Color scheme preference
agent-browser set headers '<json>'          # Global HTTP headers
agent-browser set credentials <user> <pass> # HTTP basic auth
```

## Cookies

```bash
agent-browser cookies                       # Get all cookies
agent-browser cookies set <name> <value>    # Set cookie
agent-browser cookies clear                 # Clear all cookies
```

## Storage (localStorage & sessionStorage)

```bash
agent-browser storage local                 # Read localStorage
agent-browser storage local <key>           # Get specific key
agent-browser storage local set <k> <v>     # Set localStorage item
agent-browser storage local clear           # Clear localStorage

agent-browser storage session               # Read sessionStorage
agent-browser storage session <key>         # Get specific key
agent-browser storage session set <k> <v>   # Set sessionStorage item
agent-browser storage session clear         # Clear sessionStorage
```

## Network Control

```bash
agent-browser network route <url>           # Intercept requests
agent-browser network route <url> --abort   # Block requests
agent-browser network route <url> --body '{"key":"val"}'  # Mock response
agent-browser network unroute [url]         # Remove route
agent-browser network requests              # View tracked requests
agent-browser network requests --filter api # Filter by keyword
```

## Tab Management

```bash
agent-browser tab                           # List all tabs
agent-browser tab new [url]                 # Create new tab
agent-browser tab <n>                       # Switch to tab n
agent-browser tab close [n]                 # Close tab n (or current)
agent-browser window new                    # New window
```

## Session Management

```bash
agent-browser --session <name> <command>    # Run in named session
agent-browser session list                  # List active sessions
agent-browser session                       # Show current session

# Alternative: Use environment variable
AGENT_BROWSER_SESSION=mytest agent-browser open example.com
```

## Debug & Diagnostics

```bash
agent-browser console                       # View console messages
agent-browser errors                        # Show page errors
agent-browser trace start [path]            # Start recording trace
agent-browser trace stop [path]             # Stop and save trace
agent-browser highlight <selector>          # Visual highlight element
agent-browser state save <path>             # Save browser state (auth, cookies)
agent-browser state load <path>             # Restore browser state
```

## Semantic Locators (Findable)

See [semantic-locators.md](semantic-locators.md) for detailed patterns.

```bash
agent-browser find role button click --name "Submit"
agent-browser find label "Email" fill "test@example.com"
agent-browser find text "Sign In" click
```

## Global Flags

```bash
--session <name>                            # Session identifier
--executable-path <path>                    # Custom browser binary
--headers '<json>'                          # Origin-scoped HTTP headers
--json                                      # Machine-readable output
--headed                                    # Show browser window
--cdp <port>                                # Connect via Chrome DevTools Protocol
--debug                                     # Verbose logging
```

## Authentication Patterns

```bash
# Origin-scoped headers (secure)
agent-browser open api.example.com --headers '{"Authorization": "Bearer token"}'

# Global headers for all requests
agent-browser set headers '{"X-Custom-Header": "value"}'

# HTTP basic auth
agent-browser set credentials username password

# Save/restore auth state
agent-browser state save auth.json
agent-browser state load auth.json
```

## Browser Lifecycle

```bash
agent-browser close                         # Close browser session
agent-browser install                       # Download Chromium
agent-browser install --with-deps           # Linux: Install system deps
```

## Environment Variables

```bash
AGENT_BROWSER_SESSION                       # Session name
AGENT_BROWSER_EXECUTABLE_PATH               # Custom browser path
AGENT_BROWSER_STREAM_PORT                   # WebSocket streaming port
```
