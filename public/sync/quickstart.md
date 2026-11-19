# DocStar docs sync

Files in `api-docs/` (OpenAPI) and `docs/` (Markdown) sync to DocStar on every push. This needs a DocStar workflow in `.github/workflows/` and a `DOCSTAR_API_KEY` secret. If either is missing, tell the user to set it up first: https://docstar.io/help/integrations/github-sync

## When you change an endpoint

Update its spec in `api-docs/` in the same change.

- **Add:** a new operation with a unique `operationId` and `x-docstar-published: true`.
- **Change:** edit it in place. Never change its `operationId`.
- **Remove:** delete the operation.
- Document it in the operation's `description`, and keep `parameters`, `requestBody` and `responses` (with examples) accurate.

```yaml
paths:
  /charges:
    post:
      operationId: createCharge
      summary: Create a charge
      x-docstar-published: true
```

## `api-docs/`

- Each folder is a module, and each file in it is a complete OpenAPI file (`.yaml`, `.yml` or `.json`). A file on its own is a one-file module. A folder inside a module is a sub-module (a subpage), at any depth.
- Always set `x-docstar-published: true` on every operation, or the endpoint stays a draft.
- To fill a module that already exists in DocStar instead of creating a new one, add a `layout.json` to the folder: `{ "adopt": "<module name>" }`.

## `docs/`

Folders are sections, `.md` files are pages, and a folder's `page.md` is that section's own page. Every file starts with front matter:

```markdown
---
title: Getting Started
description: Short summary.
published: true
---
```

## Rules

- Use only `a-z`, `0-9`, `-` and `_` in file and folder names.
- Do not edit the DocStar workflow by hand.
