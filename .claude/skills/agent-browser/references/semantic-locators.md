# Semantic Locators Guide

Semantic locators find elements using meaningful attributes rather than brittle CSS selectors. This is the **recommended approach for AI agents** because it's more resilient to DOM changes.

## Basic Syntax

```bash
agent-browser find <locator-type> <value> <action> [options]
```

## Available Locator Types

### role

Find by ARIA role (button, link, textbox, checkbox, etc.)

```bash
agent-browser find role button click
agent-browser find role button click --name "Submit"
agent-browser find role link click --name "Learn More"
agent-browser find role textbox fill "search query"
agent-browser find role checkbox check --name "Remember me"
```

### label

Find input by associated label text

```bash
agent-browser find label "Email Address" fill "user@example.com"
agent-browser find label "Password" type "secret123"
agent-browser find label "Country" select "United States"
```

### text

Find by visible text content

```bash
agent-browser find text "Sign In" click
agent-browser find text "Welcome" hover
agent-browser find text "Learn More" --exact click
```

### placeholder

Find input by placeholder attribute

```bash
agent-browser find placeholder "Search..." type "query"
agent-browser find placeholder "Enter email" fill "test@example.com"
```

### alt

Find image by alt text

```bash
agent-browser find alt "Company Logo" click
agent-browser find alt "Profile Picture" hover
```

### title

Find by title attribute

```bash
agent-browser find title "Close" click
agent-browser find title "Settings" hover
```

### testid

Find by data-testid attribute

```bash
agent-browser find testid "submit-button" click
agent-browser find testid "email-input" fill "test@example.com"
agent-browser find testid "modal-close" click
```

### first / last / nth

Find first, last, or nth matching element

```bash
agent-browser find first role button click
agent-browser find last role link click
agent-browser find nth 2 role textbox fill "value"
```

## Combining with Actions

All semantic locators can be combined with any action:

```bash
# Click actions
agent-browser find role button click --name "Submit"
agent-browser find text "Sign In" dblclick

# Input actions
agent-browser find label "Email" fill "user@example.com"
agent-browser find placeholder "Search" type "query"

# State actions
agent-browser find role checkbox check --name "Agree"
agent-browser find role checkbox uncheck

# Inspection
agent-browser find role heading get text
agent-browser find label "Status" get value
```

## Options & Filters

### --name

Filter by accessible name (combines text, aria-label, title, etc.)

```bash
agent-browser find role button click --name "Save"
agent-browser find role link click --name "Documentation"
```

### --exact

Require exact text match (no partial matches)

```bash
agent-browser find text "Sign In" click --exact
agent-browser find label "Email" fill "test@example.com" --exact
```

## Common Patterns

### Form Filling

```bash
agent-browser find label "First Name" fill "John"
agent-browser find label "Last Name" fill "Doe"
agent-browser find label "Email" fill "john@example.com"
agent-browser find role button click --name "Submit"
```

### Navigation

```bash
agent-browser find role link click --name "About"
agent-browser find role button click --name "Contact Us"
agent-browser wait --text "Contact Form"
```

### Search

```bash
agent-browser find placeholder "Search..." type "product name"
agent-browser find role button click --name "Search"
agent-browser wait --text "Results"
```

### Modals & Dialogs

```bash
agent-browser find role button click --name "Open Dialog"
agent-browser wait role dialog
agent-browser find role button click --name "Confirm"
```

### Lists & Tables

```bash
agent-browser find role row click --name "First Row"
agent-browser find role cell get text --name "Price"
agent-browser find first role listitem click
```

## Why Use Semantic Locators?

1. **Resilient**: Less likely to break when CSS classes or structure changes
2. **Readable**: Clear intent from the locator itself
3. **Accessible**: Works with screen readers and accessibility tools
4. **Maintainable**: Easier to understand and update

## When to Use CSS Selectors Instead

Use traditional CSS selectors when:

- Element has no semantic attributes
- You need very specific DOM traversal
- Working with legacy code without accessibility features

```bash
# Fallback to CSS when needed
agent-browser click "#legacy-button"
agent-browser fill "input[name='hidden-field']" "value"
```

## Best Practices

1. **Prefer role + name** for interactive elements
2. **Use label** for form inputs when labels exist
3. **Use text** for navigation and simple clicks
4. **Use testid** in test environments with dedicated test attributes
5. **Add --exact** when partial matches might be ambiguous
6. **Combine with wait** for elements that load dynamically

```bash
# Good: Clear intent, resilient
agent-browser find role button click --name "Add to Cart"

# Less ideal: Brittle, unclear intent
agent-browser click "button.btn-primary.add-cart-btn"
```
