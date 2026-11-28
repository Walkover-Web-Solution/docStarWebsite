import type { SitePage } from "../types";

export const PRIVACY: SitePage = {
  slug: "privacy-policy",
  path: "/privacy-policy",
  label: "Privacy policy",
  updated: "2026-11-28",
  meta: {
    title: "Privacy policy: how we collect and protect data | DocStar",
    description:
      "How DocStar collects, uses, shares and protects personal data, cookies and retention timelines, DocStar MCP and API use, your GDPR and CCPA rights, and support.",
    keywords: ["DocStar privacy policy"],
  },
  sections: [
    {
      type: "prose",
      key: "policy",
      body: `# Privacy Policy

At DocStar, your privacy is important to us. This Privacy Policy describes how we collect, use, share and protect personal information when you use DocStar, including our marketing website at docstar.io, the DocStar application at app.docstar.io, the DocStar API at api.docstar.io, the DocStar MCP server, the docstar-cli, and related services (together, the "platform"). We are committed to handling your data securely and responsibly.

Last updated: November 28, 2026

## Information We Collect

We collect personal information in these categories, depending on how you use the platform.

**Account and identity.** When you sign up or log in, we may collect your name, email address, workspace or organisation name, and authentication data when you sign in through a third-party provider (for example Google or Apple).

**Documentation and API content.** When you use DocStar to publish or manage API documentation, we collect the content you provide (for example your API documentation, OpenAPI files and docs site settings).

**DocStar MCP server.** When an assistant connects to your hosted MCP server, we may collect tool names, search queries, parameters you or your agent send to a tool, OAuth tokens or API keys used to authenticate to DocStar or to your API (we store secrets to operate the integration; we do not use them for unrelated purposes), connection metadata, and error information.

**DocStar API (api.docstar.io).** When you or your agent calls the API, we may collect API keys or OAuth tokens used to authenticate, request paths and methods, request metadata, and rate-limit and audit information.

**docstar-cli.** When you use the CLI, we may collect module and endpoint selections, authentication configuration you store with DocStar, and diagnostic logs if you report a problem.

**Marketing site (docstar.io).** We collect pages visited, actions taken (for example button clicks or copied prompts), device and browser information, and first-party cookies such as an anonymous id and A/B test assignment.

**Support and feedback.** If you contact us or submit ideas or feedback (including through our public submission form), we collect what you send, such as message text and an optional contact email.

## How We Use Your Information

We use personal information to:

- Provide, host, secure and improve the platform (including documentation publishing, search, MCP tools, CLI commands, and sync integrations you enable)

- Authenticate you and manage accounts, workspaces and organisations

- Process payments and subscriptions where applicable

- Communicate with you about the service, security and policy updates

- Respond to support requests and review feedback

- Measure how docstar.io is used and run A/B tests on marketing pages

- Detect, prevent and investigate abuse, fraud and security incidents

- Comply with law and enforce our agreements

## Sharing of Personal Information

### Do we sell personal information?

No. DocStar does not sell your personal information.

### Do we share personal information?

Yes. We share personal information only in the situations below. Service providers may process data only on our instructions and for the purposes we describe.

**Infrastructure and security providers.** We use vendors to host and deliver the platform. For example, docstar.io runs on Cloudflare, which processes connection data such as IP addresses and request metadata to serve pages, provide security and performance, and generate logs.

**Database hosting.** Account, content, support and operational data is stored in PostgreSQL databases operated for DocStar by our database hosting provider.

**Sign-in providers.** If you choose to sign in with Google or Apple, that provider processes authentication data to verify you. Their use of your information is governed by their own privacy policies.

**Tag management on docstar.io.** Our marketing site loads Google Tag Manager, which may load additional tags (for example analytics or advertising tags). Those tags may collect information according to their providers' policies.

**Integrations you enable.** DocStar lets you connect third-party services (for example GitHub for repository sync, or your own API through a hosted MCP server). When you turn on an integration, we share or receive data only as needed to run it on your instructions—for example syncing files with a repository you select, or calling your API with an end user's OAuth token. Those third parties process data under their own terms and privacy policies.

**Email and SMS delivery providers.** We use providers to deliver account emails, login codes and service notifications; they receive the contact details and message content needed to send those messages on our behalf.

**Payment processors.** When you subscribe to a paid plan, payment processors receive billing and payment information needed to charge you and manage your subscription.

**Companies in the Walkover group.** DocStar is built by Walkover. Other companies in the Walkover group may process personal information to help operate DocStar—for example shared infrastructure, finance, or customer support.

**Legal and business events.** We may disclose personal information if required by law, to protect rights and safety, or in connection with a merger, acquisition, financing or sale of assets (with notice where the law requires it).

### Third-party links

DocStar may link to websites or services that are not operated by us. We are not responsible for their privacy practices. They may collect and use information independently, under their own policies.

## Cookies and Tracking Technologies

We use cookies and similar technologies on docstar.io to remember preferences, assign anonymous ids, run A/B tests and measure usage. Analytics on the marketing site are primarily first-party: events are sent to our own endpoints and stored in our database. You can manage or disable cookies in your browser settings. Tags loaded through Google Tag Manager may set their own cookies according to their providers' policies.

## Data Retention

We retain personal information only as long as needed for the purposes in this policy. The following timelines apply (see our [Data Retention and Deletion Policy](/data-retention-policy) for more detail):

- **Product activity logs** (for example document names, modification times, and user actions in the app): **30 days**, then archived.

- **API, MCP, and CLI request logs** (metadata such as tool names, endpoints, timestamps, and errors): **15 days** for security and troubleshooting, unless a longer period is required by law or an active investigation.

- **Verified deletion requests:** we delete specified data within **30 days** after verification; backup systems are purged within **90 days** of the request.

- **Account data:** kept while your account is active and for **12 months** after closure, unless you request earlier deletion.

- **Deleted documentation:** kept for **30 days** after deletion, then archived for **30** more days (archived data is not actively accessible through the platform).

When data is no longer needed, we delete or anonymize it where feasible.

## How to Exercise Your Rights

Depending on where you live, you may have rights to access, correct, export, delete or restrict use of your personal information, and to object or withdraw consent where processing is based on consent.

To exercise these rights:

1. Email [support@docstar.io](mailto:support@docstar.io) with the subject line **Data Deletion Request** (or describe the right you are exercising in the subject).

2. Include your registered email address, workspace or organisation name, and a brief description of what you want (access, export, correction or deletion).

3. We may ask you to verify your identity before we act on the request.

We aim to respond within **30 days** of a verified request. We will not discriminate against you for exercising privacy rights.

**MCP and OAuth access.** You can revoke a client's access to your DocStar account or hosted MCP server through your account settings or OAuth provider, and rotate or remove API keys stored in DocStar or the CLI.

**Marketing email.** You can unsubscribe using the link in any marketing message, or email [support@docstar.io](mailto:support@docstar.io).

**Cookies.** You can disable or clear cookies in your browser; some features of docstar.io may not work without first-party cookies.

## Data Security

We use industry-standard security measures to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.

## Legal Compliance

We comply with applicable data protection laws, including the GDPR (European Union), the CCPA (California), and applicable Indian data protection rules. The sections above describe how to exercise rights that apply to you.

## Use of AI and Your Content

We process API documentation and related content you publish to operate DocStar—for example to host your docs site, run MCP tools, and execute CLI commands. That processing is to provide the services you configure, not to sell your documentation.

We do not use your content to train AI models.

## International Data Transfers

We and our service providers (for example hosting, database, sign-in and tag-management providers) may process personal information in countries other than where you live, including the United States, India, and other countries where those providers operate. Where required by applicable law, we use appropriate safeguards for cross-border transfers.

## Children's Privacy

The platform is intended for businesses and developers. It is not directed to children under 16, and we do not knowingly collect personal information from children under 16. If you believe we have collected information from a child, contact [support@docstar.io](mailto:support@docstar.io).

## Changes to this Privacy Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this page periodically.

## Contact Us

If you have questions about this Privacy Policy, contact us at [support@docstar.io](mailto:support@docstar.io).`,
    },
  ],
};