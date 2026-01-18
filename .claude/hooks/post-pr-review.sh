#!/bin/bash
# Triggers code review suggestion after PR creation

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
command=$(echo "$input" | jq -r '.tool_input.command // ""')
output=$(echo "$input" | jq -r '.tool_output // ""')

# Only trigger on Bash commands containing "gh pr create"
if [[ "$tool_name" == "Bash" ]] && [[ "$command" == *"gh pr create"* ]]; then
  # Extract PR URL from output (gh pr create outputs the URL)
  pr_url=$(echo "$output" | grep -oE 'https://github.com/[^[:space:]]+/pull/[0-9]+' | head -1)

  if [[ -n "$pr_url" ]]; then
    echo '{"additionalContext": "A PR was just created at '"$pr_url"'. Please run /code-review on this PR now."}'
  fi
fi

exit 0
