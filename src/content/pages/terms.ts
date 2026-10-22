import type { SitePage } from "../types";

export const TERMS: SitePage = {
  slug: "terms",
  path: "/terms",
  meta: {
    title: "Terms of Service | DocStar",
    description: "The terms that govern your use of DocStar, including accounts, content, acceptable use and billing.",
    keywords: ["DocStar terms of service", "DocStar terms"],
  },
  sections: [
    {
      type: "prose",
      key: "terms",
      body: `# Terms of Service

These Terms of Service ("Terms") govern your access to and use of DocStar, including the website at docstar.io, the web app, the API, the CLI and the MCP servers we provide (together, the "Service"). By creating an account or using the Service, you agree to these Terms.

## 1. Your account

You must provide accurate information when you sign up and keep your credentials, API tokens and MCP connections secure. You are responsible for all activity under your account and for the people you invite to your organization. If you use DocStar on behalf of an organization, you confirm you have authority to accept these Terms for it.

## 2. Your content

You own the documents, API definitions and other content you create or upload ("Your Content"). You give DocStar a limited licence to host, store, process and display Your Content only as needed to run the Service for you. This includes publishing it where you choose to publish it, and serving it to people and agents who read your published docs.

You are responsible for Your Content and for having the rights to share it. Content you publish publicly can be read, copied and indexed by anyone, including search engines and AI agents.

## 3. Acceptable use

You agree not to:

- Break the law or infringe anyone's rights using the Service
- Upload malware or try to disrupt, probe or gain unauthorized access to the Service or other users' data
- Abuse the API, CLI or MCP servers beyond reasonable use, or bypass rate limits and access controls
- Use the Service to publish content that is unlawful, deceptive, harassing or hateful
- Resell or white-label the Service except under a plan that allows it

We may suspend content or accounts that break these rules.

## 4. AI features and agents

DocStar lets AI agents read and, where you allow it, change your documentation through MCP, the CLI and the API. You are responsible for the access you grant to agents and tokens, and for reviewing changes they make. AI output can be wrong, so check it before you rely on it or publish it.

## 5. Plans and billing

Some features are free and some need a paid plan. Paid plans are billed in advance for the period shown at checkout, and fees are non-refundable unless the law requires otherwise. You can cancel at any time and the cancellation takes effect at the end of the current billing period. See [pricing](/pricing) for current plans.

## 6. Privacy and data retention

How we handle personal data is described in our [Privacy Policy](/privacy-policy). How long we keep data and how to request deletion is described in our [Data Retention and Deletion Policy](/data-retention-policy).

## 7. Our service

DocStar and its software, design and branding belong to us and our licensors. These Terms do not give you any right to them except to use the Service as described here. We may change or discontinue features, and we will try to give notice of changes that significantly affect you.

## 8. Availability and warranty

We work to keep the Service available and secure, but it is provided "as is" and "as available". To the extent the law allows, we do not make warranties of any kind, including fitness for a particular purpose and uninterrupted or error-free operation.

## 9. Limit of liability

To the extent the law allows, DocStar is not liable for indirect, incidental or consequential damages, or for lost profits, data or goodwill. Our total liability for any claim relating to the Service is limited to the amount you paid us in the 12 months before the claim arose.

## 10. Termination

You can stop using the Service and close your account at any time. We may suspend or end your access if you break these Terms or if we need to in order to protect the Service or other users. When your account ends, we handle your data as described in the [Data Retention and Deletion Policy](/data-retention-policy).

## 11. Changes to these Terms

We may update these Terms from time to time. If a change is significant, we will tell you by email or in the product. Continuing to use the Service after a change takes effect means you accept the updated Terms.

Last Updated: October 22, 2026

## Contact us

Questions about these Terms? Email [support@docstar.io](mailto:support@docstar.io).`,
    },
  ],
};
