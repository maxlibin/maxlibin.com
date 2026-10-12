---
title: "16 Apps, Zero QA Team: How I Test AI-Generated Code in Production"
date: "2026-10-12"
tags: ["vibe-coding", "testing", "solo-founder", "production", "quality", "ai-assisted-development", "devops"]
---

I shipped app #16 this week — Tulsk for Mac. A macOS desktop app that puts Tulsk in your menu bar.

That makes 16 out of 24 in my Vibe Code to Glory challenge. And here's a number I don't normally share: across those 16 apps, there are roughly 47,000 lines of AI-generated code. Some of it I've read. Most of it I haven't.

I have zero QA team. No SDETs. No staging environment that mirrors production. No manual testers clicking through flows.

Just me, a terminal, and a growing collection of automated checks that I've built, broken, and rebuilt over the past ten months.

This is the testing strategy nobody posts on Twitter when they show off their latest vibe-coded SaaS.

## The Naive Approach (Apps #1–#3: What Broke)

When I shipped GetFileMock.com in January, my "testing strategy" was: open the page, generate a file, see if it works, deploy. It's a client-side utility with no backend — what could possibly go wrong?

Turns out, plenty. A user on Safari reported that large file generation froze the tab. I'd tested on Chrome. Safari's Web Worker implementation handles memory pressure differently. The fix was a 5-line conditional, but I only found out about it because a stranger emailed me.

App #2, Seekdome, was worse. I deployed it thinking the domain availability API was reliable. It wasn't. The third-party API returned false positives 12% of the time — domains marked "available" that were actually taken. Users who tried to register those domains got rejected by the registrar. That's not a "bug." That's a broken product promise.

I was testing in isolation. I wasn't testing against reality.

By app #3, Tryout (the Chrome extension), I'd learned enough to be paranoid. I built a local test harness that mocked the extension API. But I still shipped a version where the image cropping tool didn't initialise on Firefox-based browsers. I hadn't tested outside Chrome.

**Lesson from apps 1–3:** Testing only your favourite browser is not testing. Testing only the happy path is not testing. If you vibe-code without a structured testing approach, your users become your QA team — and they *will* find everything you missed.

## The Shift (Apps #4–#7: Building Guardrails)

After three apps burned me in different ways, I made a rule: **every app gets three layers of protection before I call it shipped.**

### Layer 1: Automated Smoke Tests

Nothing fancy. For web apps, this is a Playwright script that hits the critical paths:

- User signs up
- User completes the core action (generates a file, searches a domain, creates a project)
- User hits an error state
- User logs out and back in

For iOS apps (MyPhotoAI, Interior AI, HomeworkAI), it's a Swift UI test that simulates the same flow. I don't test everything — just the 3-5 actions that represent 90% of real usage.

The key insight: these tests don't need to be comprehensive. They need to be *fast*. If they take more than 2 minutes to run, I won't run them before every deploy. I optimised for velocity over coverage.

### Layer 2: Monitoring as Testing

For apps #1 and #2, I only found out about problems when users told me. That's unacceptable at scale.

Now every app has:
- **Error tracking** (Sentry or similar): I get a notification the moment a user hits a 500 or a client-side crash. No waiting for emails.
- **Uptime monitoring**: A simple ping every 5 minutes. If Tulsk's workspace API goes down at 3 AM, I know before users do.
- **Custom health endpoints**: Each SaaS app has a `/health` endpoint that checks the database connection, the LLM API keys, and the billing integration. If Stripe's webhooks are delayed, I see it in the health check before invoices fail.

### Layer 3: Canary Users

Before any major release, I push to a "canary" subset of users — usually friends and early beta testers who understand they're getting the unpolished version. I watch the error logs for 24-48 hours. If nothing spikes, I roll to everyone.

This is stolen directly from how tech companies do staged rollouts, except my "staging environment" is production with a small audience.

## The Real Game-Changer (App #8: AI-Assisted Regression)

Around app #8 (Riggd.ai), I started using AI to help with testing — not just building.

Here's the workflow I landed on:

1. I make a change in Claude Code or Cursor
2. Before committing, I ask the AI: *"What could this change break?"*
3. The AI generates a list of possible regressions — often things I wouldn't have thought of
4. I manually check those specific paths
5. I add a test for anything that seems fragile

This is not AI writing tests for me (though Claude Code can do that too). This is AI acting as a *code review partner* that surfaces edge cases.

The results surprised me. In one Tulsk update, Claude flagged that a seemingly innocuous change to the agent scheduling logic could break task prioritisation when multiple agents ran simultaneously. I hadn't considered that. I tested it, and Claude was right. The bug existed.

Is this "real" testing? Debatable. But for a solo founder, an AI that says "hey, check this" is worth three junior QA engineers.

## The Maintenance Reality (Apps #9–#13: Tests That Died)

Here's the part that doesn't fit the narrative.

I wrote Playwright tests for Tulsk in February. By June, half of them were failing because the UI had changed. The tests were too specific — they asserted exact button text, exact CSS classes, exact DOM structures. Each redesign broke them.

I spent a weekend rewriting them to be more resilient: test by accessible role and data attributes, not by CSS selectors. Assert behaviour, not appearance.

Then I hit the real problem: **test maintenance itself becomes a tax.**

For a project with one active developer, writing tests is a time investment. Maintaining them is a *compound* time investment. Every UI change, every feature addition, every dependency update can break tests.

I now have a three-tier classification:

- **Critical path tests** (must pass before deploy): 5-10 tests per app. These test the core transaction — can a user complete the primary action? These are worth maintaining because a failure here means the app is broken.
- **Regression tests** (run weekly): Broader coverage, lower urgency. If one breaks, I fix it within the week, not before deployment.
- **Everything else** (ad-hoc): Exploratory testing, manual checks, user reports. I don't automate these anymore. The ROI isn't there for a team of one.

## What I Wish I'd Known (With 8 Apps to Go)

If I could go back to January and give past-me advice about testing, it would be this:

**Start with monitoring, not tests.** A crash reporter tells you what's broken in production. An integration test tells you what's broken in staging. The first is more valuable than the second when you have one developer and real users.

**Test the integrations, not the logic.** The code I write (or AI writes) is usually correct for the happy path. The problems come from API changes, network failures, rate limits, and third-party behaviour. Test those. Mock your own code, but hit the real APIs in smoke tests.

**Accept that vibe-coded apps need more guardrails, not fewer.** The research backs this up: a large-scale study of 8.1 million pull requests showed technical debt increases 30-41% after AI coding tool adoption. Missing error handling and duplicated logic are the most common failure modes. Your testing strategy needs to compensate for the way AI tools generate locally-correct but globally-inconsistent code.

**Automate deploy checks ruthlessly.** Every deploy to Tulsk runs a 90-second sequence: build, lint, type-check, smoke test, health check, deploy. If any step fails, the deploy stops. This took an afternoon to set up and has saved me *weeks* of debugging time.

## The Honest Bottom Line

16 apps in production. Zero QA team. 47,000 lines of AI-generated code. No catastrophic failures yet — but plenty of embarrassing ones.

The truth is, I don't test everything. I can't. A solo developer with 16 live products has to accept a certain amount of risk. The goal is not zero bugs. The goal is *survivable* bugs — issues that don't corrupt data, don't expose user information, and don't make the app unusable for more than a few hours.

Everything else is a patch note.

If you're building solo with AI, you don't need a QA department. You need three things: fast smoke tests, real production monitoring, and the humility to know that AI-generated code needs more review, not less, the moment it touches real users.

The vibe coding dream is speed. The reality is that speed without guardrails is just accelerated chaos.

I'd rather ship 16 apps that mostly work than 24 apps that I'm too afraid to check.

---

*Follow my Vibe Code to Glory journey at [maxlibin.com/vibe-code-to-glory](https://maxlibin.com/vibe-code-to-glory/). Current progress: 16/24 apps shipped.*

**Research sources:**
- Keyhole Software, "Vibe Coding Trends 2026" — 30-41% tech debt increase, 8.1M pull requests study
- Retool, "The Risks of Vibe Coding" — security and reliability in production
- Autonoma AI, "Vibe Coding Technical Debt: The 90-Day Reckoning" — maintenance burden patterns
- arXiv, "Debt Behind the AI Boom: Large-Scale Empirical Study of AI-Generated Code" — 302.6K AI-authored commits analysis
- Red Hat Developer, "The Uncomfortable Truth About Vibe Coding" (Feb 2026)