---
name: document-api-with-docstar
description: Connect to DocStar, document a user's API from code as drafts, shape the MCP server, and file feedback when something is missing.
---

# Document an API with DocStar

Use this skill when a user wants their app's API documented and callable from AI assistants through DocStar.

## Connect

- Prefer the DocStar connector if the user's client supports it; otherwise add the remote MCP server `https://mcp.docstar.io/mcp`.
- If MCP won't connect, use the REST API with an Auth Key instead.
- Full walkthrough: https://docstar.io/mcp/quickstart.md

## Document as drafts

- Use an existing public API collection or create one.
- Document endpoints with method, URL, headers, params, a complete JSON body example (every accepted field), and sample success and error responses.
- Leave work as **drafts** unless the user explicitly asks you to publish; they review in DocStar first.
- When publishing on request, publish module pages before their endpoints.

## MCP server

- Give heavily used endpoints (up to about 20) dedicated tools.
- Rewrite the collection skill around the app's main workflows; add instructions when needed.
- Test one published endpoint through MCP, then share the MCP URL and short setup steps.

## Keep docs in sync

Offer to add a rule to the project's `AGENTS.md`, `CLAUDE.md`, or Cursor rules so API changes update DocStar drafts in the same task.

## Feedback

- MCP: `send_feedback_to_docstar` with the user's words, a `type`, and useful `context`.
- Without MCP: `POST https://docstar.io/api/ideas` (optionally `contactEmail` for a reply).
- File each issue once per session; never include secrets, tokens, or customer data.