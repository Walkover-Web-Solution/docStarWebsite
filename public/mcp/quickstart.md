# DocStar Quickstart: turn your app's API into an MCP server

This guide is for an AI client (Claude, ChatGPT, Cursor, VS Code, Codex, ...) acting for a **developer or product owner**. The goal: read the latest code of their application, document its API in DocStar, publish it, and give them an **MCP URL** that any AI client can use to run their app.

DocStar is where the API docs live. Every published endpoint becomes usable through MCP automatically. Do not document DocStar itself.

## Step 0. Make sure DocStar is connected

Check whether you already have DocStar tools (for example `list_organizations`, `call_any_api_of_docstar`). If you do, go to Step 1. If not, ask the user to connect, in this order:

1. **From your client's connector / MCP directory (easiest).** Ask the user to search for **DocStar** in the client's connectors or MCP directory and connect it there. Sign-in happens in the browser. There is nothing to copy.
2. **By URL.** If DocStar is not in the directory, ask the user to add this remote (HTTP) MCP server: `https://mcp.docstar.io/mcp`. In Claude Code: `claude mcp add --transport http docstar https://mcp.docstar.io/mcp`. See [Connect your AI assistant](https://docstar.io/help/mcp/connect-ai-assistant.md).
3. **No MCP at all (or it won't connect).** Use the DocStar REST API directly:
   - Module index: https://developers.docstar.io/module.json (all API modules)
   - One module's endpoints: `https://developers.docstar.io/<module path>/module.json`, with method, URL, params, body and sample responses
   - Plain index: https://developers.docstar.io/llms.txt
   - Auth: the user creates an **Auth Key** and you send `Authorization: Bearer hm_...`. Follow [Run the DocStar API with an Auth Key](https://docstar.io/help/mcp/run-api-with-auth-key.md).

Never ask the user to paste a token into the chat if the client has a secret or environment setting for it. Never invent one.

## Step 1. Choose the workspace and collection

Ask which organisation to use, then whether to use an existing collection or create a new one for this app. A new collection needs a name and a slug that can never change, so confirm both. See [Collections](https://docstar.io/help/collections-and-pages/collections.md).

## Step 2. Read the latest code, not a spec

Crawl the **current codebase**: route definitions, controllers, validation schemas, middleware, and auth. An OpenAPI or Postman file is often out of date, so do not import one and do not treat it as the source of truth. You may use it only as a hint, and the code wins on any difference.

For every public endpoint capture: method, full path, auth scheme, headers, path and query parameters, JSON body with every accepted field, success responses and error responses. Skip internal or admin-only routes unless the user asks for them.

## Step 3. Plan the modules and get approval

Show the user the endpoints grouped into modules (for example Auth, Users, Orders). Group by task or resource, put core modules first, keep about 15-20 endpoints per module and use short verb-first names such as `Create Order`. Wait for the user's OK.

## Step 4. Write the API docs properly

One top-level page per module, then each endpoint under it. See [Document an API](https://docstar.io/help/api-documentation/document-an-api.md). Every endpoint needs:

- **A clear description** of what it does, when to use it and what it changes. This is what an AI reads to decide to call it. Mention required order (for example "call Create Cart first") and side effects.
- **Method and full URL** with `:pathVariables`.
- **Headers**, including the auth header with a placeholder value.
- **A JSON body example containing every accepted field** with realistic values. Tool inputs are built from the example's keys, so a missing field cannot be used. Body must be JSON or empty.
- **Query params** with a short description each.
- **Sample responses** for success and the common errors.

Never put real secrets in docs. Use `<API_KEY>` or `{{token}}`.

## Step 5. Publish

Publish module pages first, then endpoints. A parent must be published before its children. See [Publish pages](https://docstar.io/help/publish-and-seo/publish-pages.md).

## Step 6. Give the user the MCP URL

Every API collection has its own MCP server. Read its URL with **Get Collection MCP Server** (`GET /orgs/:orgId/collections/:collectionId/mcp`, module "MCP Server"). If the collection has no MCP server yet, this call creates it. If it still fails, use **Create Collection MCP Server** (`POST` on the same path), then read it again. Show the user the URL and tell them to add it to their AI client the same way as in Step 0.

## Step 7. Tune the MCP server for how the user works

Ask the user which flows matter most, then configure the server. Confirm each change first.

- **Separate tools for the most-used APIs.** Give the user's most important or most frequent endpoints their own named tool (up to 20) with **Upsert Endpoint Tool**. Use **List Endpoint Tools** to see which endpoints can be tools and why some cannot. Every other published endpoint stays reachable through the built-in **call any API** tool, so nothing is lost. Choose names and descriptions the way a user would ask for the task.
- **The server's quickstart (skill).** The MCP server ships a generated quickstart that tells AI clients how to use these docs. You decide its content: rewrite it with **Update MCP Skill** to match the user's flow, for example the order to call endpoints, how to authenticate, and common tasks. **Reset MCP Skill** returns to the generated one.
- **Instructions.** Add rules every connecting AI should follow, such as "ask for the account id first" or "always use v2 endpoints", with **Update Collection MCP Server** (`instructions`). They are added to the default instructions.
- **Sign-in for API calls and a custom domain** are optional. See the collection MCP server page above.

Use `get_docstar_api_docs` (or the module.json URLs in Step 0) to get the exact fields of each of these endpoints.

## 3. Tell DocStar what's missing

Use this when DocStar is missing something you or the user needed, something in DocStar is broken, or the user has an idea for DocStar.

- Use the `send_feedback_to_docstar` tool. Put the feedback in `message` in the user's words, set `type` (`bug`, `feature_request`, `docs`, `praise` or `other`), and add details in `context`: the tool or endpoint you used, what you sent, the error, and your client and model.
- Without the MCP, send the same fields to `POST https://api.docstar.io/ideas` with the user's DocStar sign-in.
- Tell the user what you are filing, then share the returned `#id`. They can follow its status in DocStar under Share an idea or feedback → My submissions.
- File each problem once per session, and never include secrets, tokens or customer data.

## Rules

- **Confirm before any change.** Say exactly what will be created, updated, published or deleted. For bulk work, confirm once with a clear list.
- **Never invent IDs.** Get `orgId`, `collectionId`, `pageId` and `endpointId` from list calls.
- **Prefer restore over recreate.** Deleted collections and pages can be restored for 90 days. See [Trash and restore](https://docstar.io/help/collections-and-pages/trash-and-restore.md).
- **Work in small steps** and report after each one: what you created, with its name and id.
- **Something broken or missing?** Offer to send it to the DocStar team with `send_feedback_to_docstar`, and show the message first.

## When something fails

| Response | What to do |
|---|---|
| `401` | The user must sign in. Ask them to finish sign-in, then retry. |
| `403 Invalid API token` | The Auth Key or access was revoked. Ask the user to reconnect or create a new key. |
| `403 Unauthorized` / `Invalid organization` | No access. Ask the user to pick another organisation or collection. |
| `400 Parent page is not published` | Publish the parent first, then retry. |

Full help index: https://docstar.io/help/llms.txt
