#!/bin/bash

# Example agent-browser workflow: Login and navigate to dashboard
# This demonstrates the recommended pattern for browser automation

set -e  # Exit on error

echo "Starting browser automation workflow..."

# Step 1: Navigate to login page
echo "Step 1: Opening login page..."
agent-browser open https://example.com/login

# Step 2: Get snapshot to see available elements
echo "Step 2: Getting page snapshot..."
agent-browser snapshot -i

# Step 3: Fill in credentials using semantic locators
echo "Step 3: Filling in credentials..."
agent-browser find label "Email" fill "user@example.com"
agent-browser find label "Password" type "secure_password"

# Step 4: Submit form
echo "Step 4: Submitting form..."
agent-browser find role button click --name "Sign In"

# Step 5: Wait for navigation to complete
echo "Step 5: Waiting for dashboard..."
agent-browser wait --url "**/dashboard"
agent-browser wait --text "Welcome"

# Step 6: Capture success screenshot
echo "Step 6: Capturing screenshot..."
agent-browser screenshot dashboard.png

# Step 7: Navigate to a feature
echo "Step 7: Navigating to Reports..."
agent-browser find role link click --name "Reports"
agent-browser wait --text "Report List"

# Step 8: Get snapshot of reports page
echo "Step 8: Getting reports page snapshot..."
agent-browser snapshot -i

echo "Workflow completed successfully!"

# Cleanup
agent-browser close
