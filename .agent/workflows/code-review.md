---
description: how to perform a Senior Lead code review on a feature branch
---

Use this workflow when a user asks for a code review of a specific branch or a set of changes.

1. **Identify the base branch**
   - Typically `main`. If uncertain, check `git remote show origin`.

2. **Retrieve the list of changed files in the current branch**
   - Run: `git diff --name-only main...HEAD`

3. **Analyze the diffs**
   - For each file, run: `git diff main...HEAD -- [file-path]`
   - Read the file content to understand the full context.

4. **Execute the Review**
   - Follow the instructions in `.agents/skills/code-review/AGENTS.md`.
   - Apply rules from `.agents/skills/code-review/rules/`.
   - Check against `vercel-react-best-practices`.

5. **Generate the Report**
   - Use the "Actionable Mentorship" format.
   - Include line numbers and code snippets.

6. **Present to User**
   - Create a `code_review.md` artifact in the current brain directory (using the `write_to_file` tool).
   - Use `notify_user` to prompt the user to review the file.
   - Do not dump the entire review in the chat unless specifically requested.
