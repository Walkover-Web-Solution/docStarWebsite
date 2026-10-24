---
covers: [src/server/experiments.ts, src/lib/experiments.ts, src/middleware.ts, src/app/(site)/xv/**, src/app/api/admin/experiments/**, src/server/autopilot/**]
status: implemented policy; no experiment has run on real traffic yet (as of this revision)
owner: unknown (release authority: OPEN_QUESTIONS Q1)
source: code and local verification 2026-10-24 (synthetic fixtures only)
verified_at: fb315a0
verified_on: 2026-10-24
---
# Experiments

The **live registry** is the database, shown in admin > Website & experiments. Do not keep variant lists in Markdown. This file is the policy. Metrics: [MEASUREMENT.md](MEASUREMENT.md).

## What can be tested
Copy, a section's built-in layout, section order or CTA wording on one page ("surface"). One baseline (A, always the live published version) and at most two challengers (B, C). Each challenger is a saved draft version of the same page. Routine bug fixes and obvious accessibility corrections ship without a test. Shared business logic, links and contracts are not varied. Pricing is protected from the autopilot.

## Launch requirements (enforced by the server at start)
Hypothesis (at least 10 characters), a review date in the future (default 42 days), a rollback plan (default: stop the test; roll the page back). Fixed by design: audience = all human visitors to the page (editable text), assignment unit = anonymous visitor (`ds_aid`) hashed with the test key, exposure = a human `page.viewed` on the tested path while assigned, primary outcome = `prompt.copied`, guardrails = agent arrival and sign-up clicks. Excluded: agents, crawlers, HTTP clients, `props.synthetic`.

## Slots and coordination
One running test per page and **at most 2 running site-wide**; the check takes a global lock (`pg_advisory_xact_lock`) inside the starting transaction, so concurrent starts (operators, the autopilot) cannot exceed the cap (verified with two concurrent starts and one free slot: one succeeded, one was refused). The autopilot additionally allows one test at a time.

## Assignment and exposure
The middleware assigns on first request to any page while a test runs, stores the arm in the `ds_x` cookie, and serves the variant at the real URL by internal rewrite with `private, no-store`. Same visitor gives the same arm every time. Assignment follows the weights (300-visitor local check: 109/96/95 for 40/30/30). Assignment is **not** exposure: results count a visitor only after a `page.viewed` carrying that test's arm on the tested path, once per visitor.

## Decision method (`DECISION` in `src/server/experiments.ts`)
A challenger "wins" only with at least 14 days, at least 300 exposed visitors in both arms, at least a 95% posterior probability of beating A on prompt-copy rate (normal approximation of Beta posteriors), and no guardrail with at least 90% probability of harm. A sample-ratio check flags allocation bugs. Below the thresholds the state is "collecting data". With low traffic nothing is declared. Known limit: this is a fixed-threshold rule reviewed daily, not a sequential test; the multiple-challenger and repeated-look corrections are **not** implemented (OPEN_QUESTIONS Q12). The admin therefore calls verdicts guidance, and a person promotes winners unless the autopilot's rules allow it.

## Versioning
A running treatment is never edited. A material change is a new test (a new phase) with fresh results. Drafts can edit hypothesis, review date and rollback plan only. Stop = pause and return everyone to A; "Make B/C live" = promote (publishes that version); "Keep A" = retire. Rolling a promoted change back uses page history (Website > Pages > restore).

## Previews
Signed-in operators can open any version of a page at `/xv/<version id>/<path>` (drafts included). Anonymous visitors only see versions of running tests; draft ids fall back to the live page (verified). Admin links are on each experiment.

## Challenger generation
A change brief is generated per experiment (admin). No coding-agent integration is connected: a person or agent writes the draft in Website > Pages. The UI says so.

## Search considerations
Tests change content at the same URL (no extra crawlable URLs, no crawler-only content: crawlers always see the live page). Variant URLs under `/xv/` are disallowed and noindex. Re-check current Google website-testing guidance before introducing separate test URLs.

## Evidence and findings
Durable findings go in [DECISIONS.md](DECISIONS.md) with the experiment key and the numbers. Fixture traffic is labelled synthetic and never reported.
