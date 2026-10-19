# DocStar Quickstart: let your users use your API from their AI assistant

Document the user's app API in a DocStar collection and publish it. That one collection gives them public API docs, an MCP URL any AI client can use, and CLI commands for every endpoint. 

## 1. Connect DocStar

If DocStar isn't connected yet, suggest that the user connect the DocStar connector if it is available in the Claude directory. Otherwise, ask them to add the remote MCP server `https://mcp.docstar.io/mcp`. See [Connect your AI assistant](https://docstar.io/help/mcp/connect-ai-assistant.md). If the MCP won't connect, use the REST API with an Auth Key instead: [Run the DocStar API with an Auth Key](https://docstar.io/help/mcp/run-api-with-auth-key.md).

## 2. Document and publish

Document the app's endpoints in a public API collection. Each endpoint's JSON body example must include every accepted field; a field missing from the example can't be used from MCP or the CLI.

Publish module pages before their endpoints. Only published endpoints show up in the docs, the MCP server and the CLI.

## 3. Set up the MCP server

Shape the collection's MCP server around how the app is used: give the most-used endpoints (up to 20) their own tools, rewrite its skill with the app's main workflows, and add instructions if needed.

Finish by testing the MCP: call one published endpoint through it, then give the user the tested MCP URL and short connection instructions to share with their own users.

## Feedback

If DocStar is missing something or something breaks, send feedback to the DocStar team and share the returned `#id` with the user.

Full help index: https://docstar.io/help/llms.txt