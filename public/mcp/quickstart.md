# DocStar MCP Quickstart

Connect an AI client (Claude, Codex, ChatGPT, Cursor, ...) to DocStar and let it build API documentation and an MCP server for your service.

**MCP URL:** `https://mcp.docstar.io`

## 1. Connect

Add the MCP URL above as a remote MCP server in your client. On first use you are asked to sign in to DocStar. There is no token or key to copy.

The server describes its own tools and workflow (organisation, then collection, then discover, then call). Follow what it tells you, and use `search_docstar_docs` for anything this page does not cover. Load the `quickstart-docstar` skill before your first task.

## 2. Document a service and create its MCP

Use this when the user wants the API of **their own service** documented in DocStar.

### Step 1: Sign in
Tell the user they need to be signed in to DocStar. Make the first authenticated call, such as listing their organisations. If the MCP asks for sign-in, ask the user to complete it and retry. Never ask for, paste or invent a token. For an auth header, pass the header the docs name with an empty value `""` and the MCP fills in the signed-in user's token.

### Step 2: Ask which organisation
List every organisation the user belongs to with names and IDs. Ask which one to use and wait. Do not pick one yourself, even if there is only one (confirm it). Use that `orgId` for every later call.

### Step 3: Ask which collection
List the collections in that organisation. Ask whether to use an existing one or create a new one for this service, and wait. A new collection needs a name and a slug that can never be changed, so confirm both first.

### Step 4: Understand the service
Before writing anything to DocStar, read the repo for every public API: method, path, auth scheme, headers, path and query params, request body, responses and error codes. Prefer an OpenAPI spec or route definitions over guessing. Do not document an endpoint just because prose mentions it.

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
- Tell the user what you are filing, then share the returned `#id`. Signed in, you can check its status and the team's replies with `GET https://api.docstar.io/ideas/mine`. Without sign-in, the response has a private `followUpUrl` that shows the status and the team's replies; give it to the user.
- File each problem once per session, and never include secrets, tokens or customer data.

## Rules

- **Confirm before any change.** For any call that creates, updates, publishes or deletes data, say exactly what will change. For bulk work, confirm once with a clear list.
- **Never invent IDs.** Get `orgId`, `collectionId`, `pageId` and `endpointId` from list or get calls.
- **No secrets in docs.** Use placeholders such as `<API_KEY>`, never real tokens or credentials from the repo.
- **Prefer restore over recreate.** Deleted collections and pages can be restored for 30 days.
- **On errors:** for 401, ask the user to sign in and retry. For 403 `Invalid API token`, ask them to reconnect DocStar in their client. For 403 `Unauthorized` or `Invalid organization`, ask them to choose another organisation or collection.
- **Work in small steps** and report after each: what you created, with its name and ID.
