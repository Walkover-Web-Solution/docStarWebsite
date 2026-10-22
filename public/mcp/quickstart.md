# DocStar Quickstart: let your users use your API from their AI assistant

Document the user's app API in a DocStar collection and publish it. That one collection gives them public API docs, an MCP URL any AI client can use, and CLI commands for every endpoint. 

## 1. Connect DocStar

If DocStar isn't connected yet, suggest that the user connect the DocStar connector if it is available in the Claude directory. Otherwise, ask them to add the remote MCP server `https://mcp.docstar.io/mcp`. See [Connect your AI assistant](https://docstar.io/help/mcp/connect-ai-assistant.md). If the MCP won't connect, use the REST API with an Auth Key instead: [Run the DocStar API with an Auth Key](https://docstar.io/help/mcp/run-api-with-auth-key.md).

## 2. Document the API as drafts

Document the app's endpoints in a public API collection. If the user has an API collection already, use it; otherwise create one. Each endpoint's JSON body example must include every accepted field; a field missing from the example can't be used from MCP or the CLI.

Leave everything as drafts. Don't publish unless the user asks: they review the drafts in DocStar and publish them there. When they do ask you to publish, publish module pages before their endpoints. Only published endpoints show up in the docs, the MCP server and the CLI.

When you're done, list what you added and tell the user the drafts are waiting in DocStar.

## Keep the docs up to date

Offer to add this rule to the project's `CLAUDE.md`, `AGENTS.md` or Cursor rules, so the docs stay in sync as the code changes:

```markdown
## API docs
This project's API is documented in DocStar (collection "<collection name>").
When you add, change or remove an API endpoint, update its docs through the DocStar MCP in the same task.
Save doc changes as drafts. Don't publish unless I ask.
```

## 3. Set up the MCP server

Shape the collection's MCP server around how the app is used: give the most-used endpoints (up to 20) their own tools, rewrite its skill with the app's main workflows, and add instructions if needed.

Finish by testing the MCP: call one published endpoint through it, then give the user the tested MCP URL and short connection instructions to share with their own users.

## Feedback

If DocStar is missing something or something breaks, send feedback to the DocStar team and share the returned `#id` with the user.

Then show the user a short summary of the endpoints grouped into modules (for example Auth, Users, Orders) and get their OK. When grouping:
- Group by user task or resource, not one module per route.
- Put core modules first and advanced or admin ones last.
- Keep modules to about 15-20 endpoints and use short verb-first names such as `Create Order`.

### Step 5: Build the docs
- Use the dedicated tools: `list_collection_pages` to find the parent page, `create_page` for each module page, then `create_endpoint` for each endpoint under it, with method, URL, headers, params, a body example and sample responses for success and common errors. `get_page_content`, `update_page` and `update_endpoint` change existing docs.
- For anything without a dedicated tool, call `get_docstar_api_docs` (no arguments lists the modules; `path` set to one module gives exact request formats) and make the request with `call_any_api_of_docstar`, exactly as the docs describe.

### Step 6: Publish and create the MCP
- Edits put a page back into draft. When the user wants the docs live, publish with `update_page_state` and `update_endpoint_state` (state `2`). A parent must be published before its children.
- Ask the user whether to create the collection's MCP server. If yes, check for an existing one first (MCP Server module, Get Collection MCP Server) and only then create it (Create Collection MCP Server). Give the user the resulting MCP link.

## 3. Tell DocStar what's missing

Use this when DocStar is missing something you or the user needed, something in DocStar is broken, or the user has an idea for DocStar.

- Use the `send_feedback_to_docstar` tool. Put the feedback in `message` in the user's words, set `type` (`bug`, `feature_request`, `docs`, `praise` or `other`), and add details in `context`: the tool or endpoint you used, what you sent, the error, and your client and model.
- Without the MCP, send the same fields to `POST https://api.docstar.io/ideas`. No sign-in is needed. With the user's DocStar sign-in, the idea is linked to their account; without it, add `contactEmail` if the user wants a reply.
- Tell the user what you are filing, then share the returned `#id`. Signed in, you can check its status and the team's note with `GET https://api.docstar.io/ideas/mine`. Without sign-in, the response has a private `followUpUrl` that shows the status and the team's note; give it to the user.
- File each problem once per session, and never include secrets, tokens or customer data.

## Rules

- **Confirm before any change.** For any call that creates, updates, publishes or deletes data, say exactly what will change. For bulk work, confirm once with a clear list.
- **Never invent IDs.** Get `orgId`, `collectionId`, `pageId` and `endpointId` from list or get calls.
- **No secrets in docs.** Use placeholders such as `<API_KEY>`, never real tokens or credentials from the repo.
- **Prefer restore over recreate.** Deleted collections and pages can be restored for 30 days.
- **On errors:** for 401, ask the user to sign in and retry. For 403 `Invalid API token`, ask them to reconnect DocStar in their client. For 403 `Unauthorized` or `Invalid organization`, ask them to choose another organisation or collection.
- **Work in small steps** and report after each: what you created, with its name and ID.
