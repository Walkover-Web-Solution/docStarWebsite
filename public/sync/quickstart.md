# DocStar GitHub Sync quickstart

Use this when the user wants product or API documentation in GitHub (`docs/` and `api-docs/`) to stay in sync with a DocStar collection on every push. Set up the workflow and secrets below, add `docstar.md` and an AGENTS.md rule so you keep the synced folders up to date as the code changes.

Canonical help page: https://docstar.io/help/integrations/github-sync.md

GitHub Sync keeps a DocStar collection up to date with files in a GitHub repository. Write Markdown pages in a `docs/` folder and API docs as OpenAPI files in an `api-docs/` folder, push to your branch, and a GitHub Action sends the changes to DocStar.

The two folders are separate, and each has its own workflow. Use one or both.

## How it works

1. You add a DocStar workflow file and the `docstar.md` format guide to your repository.

2. On every push to your branch that changes files in `docs/` or `api-docs/`, the workflow finds the files that were added, changed or deleted.

3. It sends them to DocStar using your API token.

4. DocStar creates, updates or archives the matching pages and endpoints in your collection.

New items are created as drafts unless you mark them as published. For API docs, always set `x-docstar-published: true` on every operation so your endpoints are published (see **Publish** below). A published page or endpoint stays published and is updated from the file as it is.

## Set it up

### Step 1: Add the workflow file

Run these commands in the root of your repository. Replace `<collectionId>` with your collection's ID (you can find it in the collection's URL in DocStar, after `/collection/`). Change `branch=main` if you publish from another branch.

For Markdown pages in `docs/`:

```bash
mkdir -p .github/workflows
curl --fail "https://api.docstar.io/p/generate-docstar-workflow/<collectionId>?branch=main" \
  -o .github/workflows/docstar-docs.yml
```

For OpenAPI files in `api-docs/`:

```bash
mkdir -p .github/workflows
curl --fail "https://api.docstar.io/p/generate-docstar-openapi-workflow/<collectionId>?branch=main" \
  -o .github/workflows/docstar-api-docs.yml
```

### Step 2: Add the `docstar.md` format guide (required)

Download `docstar.md` into the root of your repository and commit it. It holds the rules for the `docs/` and `api-docs/` folders, and your AI coding assistant reads it to keep your docs in sync whenever your code changes. Without it, the assistant has no rules to follow.

```bash
curl --fail "https://api.docstar.io/docstar.md" -o docstar.md
```

Then add this to your repository's `AGENTS.md`:

```markdown
- Whenever any endpoint is added, changed, renamed or removed, read `docstar.md` in this repo and follow it to update `api-docs/` in the same change.
```

Download `docstar.md` again from time to time to pick up changes.

### Step 3: Add your API token as a secret

1. Create an API token in DocStar. See [API Tokens](https://docstar.io/help/workspaces-and-team/api-tokens.md).

2. In your GitHub repository, go to **Settings → Secrets and variables → Actions**.

3. Click **New repository secret**.

4. Name it `DOCSTAR_API_KEY` and paste the token as the value.

5. Save.

### Step 4: Commit and push

```bash
git add .github/workflows docstar.md AGENTS.md
git commit -m "Add DocStar sync workflow"
git push origin main
```

From now on, every push that changes files in `docs/` or `api-docs/` syncs to your collection. You can follow each run in the repository's **Actions** tab.

## Markdown pages (`docs/`)

The folder structure inside `docs/` becomes the page structure in DocStar.

* **Folders** become parent pages or sections.

* **Files** become pages.

A `page.md` file inside a folder holds the content for that folder's own page. Without it, the folder is just a container for its children.

```text
docs/
├── getting-started.md        page
├── api/                      section
│   ├── page.md               content of the "api" page
│   ├── authentication.md     page under "api"
│   └── users/                nested section
│       └── create.md         page under "api/users"
```

Use only lowercase letters, numbers, `-` and `_` in file and folder names so page URLs stay clean.

Every file needs the `.md` extension and a YAML front matter block at the top:

| Field         | Type    | Description                          |
| ------------- | ------- | ------------------------------------ |
| `type`        | string  | `page` (default) or `endpoint`       |
| `title`       | string  | Page title                           |
| `description` | string  | Short summary                        |
| `published`   | boolean | `true` publishes the page right away |

```markdown
---
type: page
title: Getting Started
description: Welcome to our documentation.
published: true
---
# Welcome
This is the content of the page.
```

## API docs (`api-docs/`)

Put OpenAPI files in `api-docs/`. Each folder is one module (a top-level section) and every operation in its files becomes an endpoint.

```text
api-docs/
├── docstar.json              optional: the order of the modules
├── payments/                 a module
│   ├── layout.json           optional: this module's settings
│   ├── create-charge.yaml    one OpenAPI file per endpoint (or one file for all)
│   └── list-charges.yaml
└── users.yaml                a file on its own is a one-file module
```

You can keep one OpenAPI file per endpoint or put all of a module's endpoints in one file. Each file must be complete on its own. Use only lowercase letters, numbers, `-` and `_` in file and folder names.

### Keep endpoints matched

Each operation needs a unique, stable `operationId`. DocStar matches an operation to its endpoint by `operationId` (or by method and path if there is none), so edits update the same endpoint instead of creating a new one. Do not change an `operationId` once the endpoint exists.

Put the documentation in the operation's `description`: what it does, body fields, permissions and errors. Fill in `parameters`, `requestBody` and `responses` with examples. The top-level `info.description` is not synced.

### Publish

Always set `x-docstar-published: true` on every operation so your API docs are published. Without it, new endpoints are created as drafts and do not appear in your published docs.

```yaml
paths:
  /charges:
    post:
      operationId: createCharge
      summary: Create a charge
      x-docstar-published: true
```

A published endpoint stays published and is updated from the file as it is. Set `x-docstar-published: false` only when you want to unpublish an endpoint.

### Module settings (`layout.json`)

Put a `layout.json` in a module's folder to set its details. Every key is optional:

```json
{ "name": "Payments API", "description": "Charge and refund", "published": true, "defaultPublished": false, "adopt": "Payments" }
```

| Key                | What it does                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `name`             | The module's name. Defaults to the first file's `info.title`, then the folder name.           |
| `description`      | A short description stored on the module.                                                     |
| `published`        | `true` or `false` publishes or unpublishes the module on sync.                                |
| `defaultPublished` | Whether endpoints created by this sync are published when they have no `x-docstar-published`. |
| `adopt`            | The name (or page ID) of a module that already exists in your collection. See below.          |

### Sort the modules

`api-docs/docstar.json` lists the order of the modules:

```json
{ "order": ["billing", "payments", "users.yaml"] }
```

Use the module folder names, or the file name for a one-file module. Modules you do not list keep their place.

### Use a collection you already have

If the collection already has modules and endpoints you made by hand, set `adopt` in the module's `layout.json` to that module's name. The first sync links the folder to the existing module instead of creating a second one, and links its endpoints by `operationId`, then by method and path. Nothing in the existing module is overwritten on that first link, and endpoints that match nothing are left alone. If no module (or more than one) has that name, the folder is skipped and no duplicate is made.

## Tips

* Always add `x-docstar-published: true` to each operation in `api-docs/`, or the endpoint stays a draft.

* Only the files you change in a push are synced. For `api-docs/`, every file of a module folder you touch is sent together, so removed operations are recognised.

* Deleting a file in `docs/`, or an operation in `api-docs/`, archives the matching page or endpoint in DocStar on the next sync. Archived items can be restored for about 30 days.

* Edits made in DocStar can be overwritten the next time the file changes in GitHub. Treat the repository as the source of truth.

* If a file cannot be read, it is skipped and the rest of the sync continues.

* For a one-time import instead of ongoing sync, see [Import Content](https://docstar.io/help/getting-started/import-content.md).

---

## `docstar.md` at the repo root

Commit the following at the repository root (same file as https://api.docstar.io/docstar.md). Whenever any endpoint or synced doc changes, read it and update `api-docs/` or `docs/` in the same change.

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
