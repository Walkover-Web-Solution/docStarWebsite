import type { SitePage } from "../types";
import { finalCta, related } from "./shared";

// Product changelog, newest first. Hidden until launch (DRAFT_PAGES in src/content/pages.ts).
// Entries come from DocStar's published monthly release notes; each links to its full post.
// Add an entry for every release note (TODO-COPY: older months). Dates are the notes' publish date.
const OCTOBER_2026 = "https://docstar.io/blog/whats-new-in-docstar-october-2026";

export const CHANGELOG: SitePage = {
  slug: "changelog",
  path: "/changelog",
  label: "Changelog",
  updated: "2026-10-30",
  meta: {"title": "DocStar changelog: new features and release notes | DocStar", "description": "What's new in DocStar: MCP servers for every collection, docstar-cli releases, a redesigned API reference, markdown and llms.txt, and editor updates, by date."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Changelog",
      title: "What's new ==in DocStar==.",
      sub: "Every DocStar release, newest first: MCP servers, docstar-cli, the API reference, llms.txt and markdown, and the editor. The full monthly notes are on the DocStar blog.",
      primary: { kind: "link", label: "Read the October 2026 notes", href: OCTOBER_2026 },
      secondary: { kind: "link", label: "All release notes on the blog", href: "https://docstar.io/blog" },
    },
    {
      type: "changelog",
      key: "entries",
      kicker: "Releases",
      title: "October ==2026==.",
      entries: [
        {
          date: "2026-10-27",
          title: "MCP servers for every collection",
          body: "Every documentation collection can serve its own MCP server, so AI assistants can search your docs, browse your API reference and call your API.",
          items: [
            "Endpoint tools: give key endpoints their own named tools",
            "Editable skill and tool descriptions",
            "A read-only tool for GET requests, with read-only hints",
            "Readable connect URLs from the collection slug, and custom domains for white-labeled servers",
            "A key tool for APIs that use API keys",
            "A consent screen, and a Require sign-in switch for connecting assistants",
          ],
          link: { kind: "link", label: "MCP details in the October notes", href: OCTOBER_2026 },
        },
        {
          date: "2026-10-27",
          title: "docstar-cli 1.4 to 1.8",
          body: "The CLI turns published API docs into runnable commands and MCP tools, organized as collection, module and endpoint.",
          items: ["init by collection slug, with custom domains and sub-paths", "Root endpoints for collections without modules", "Sign-in and API key management, plus writing a key into your project's env file", "Better error handling for bad credentials"],
          link: { kind: "link", label: "See the CLI", href: "/cli" },
        },
        {
          date: "2026-10-27",
          title: "A redesigned API reference",
          body: "A new layout, an endpoint selected by default, richer descriptions and a Copy Prompt button that equips any AI assistant to use your docs.",
          link: { kind: "link", label: "See the API docs platform", href: "/api-docs" },
        },
        {
          date: "2026-10-27",
          title: "Markdown and llms.txt for every page",
          body: "Every published page is available as clean markdown, and llms.txt gives AI crawlers a better map of your collection. HTML content is converted to markdown on publish.",
        },
        {
          date: "2026-10-27",
          title: "Collection slugs and a better editor",
          body: "Every collection has an immutable, unique slug that CLI and MCP URLs build on. The editor gained HTML embed blocks, a new link-to-page picker, lossless markdown round-trips and paste fixes.",
        },
      ],
    },
    related("Explore ==what shipped==.", ["mcp", "cli", "api-docs"]),
    finalCta("Try the latest ==on your own API==."),
  ],
};
