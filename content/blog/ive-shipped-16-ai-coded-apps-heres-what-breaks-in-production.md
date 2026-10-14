---
title: "I've Shipped 16 AI-Coded Apps This Year. Here's What Breaks in Production"
date: "2026-10-14T09:00:00+08:00"
modified: "2026-10-14T09:00:00+08:00"
excerpt: "I'm 16 apps into my Vibe Code to Glory challenge — shipping 24 revenue-ready apps solo in 12 months. Three consistent failure modes have emerged in every AI-generated codebase. Here's what breaks, and why 16 years of experience matters more than ever."
---

It was 3 AM and I was staring at a Supabase dashboard showing 4,000 unhandled errors in the last hour.

The app was Tulsk. I'd built it in a weekend with Claude Code and Cursor — and it worked beautifully in development. The AI understood my intent. It wrote clean React components. It wired up authentication. I was riding that high where you're convinced the "vibe coding" critics are just people who haven't tried it yet.

Then real users showed up.

And my beautifully vibe-coded baby started haemorrhaging errors.

## The Gap Nobody Talks About

Here's the thing: I spent 12 years at Ahrefs building frontend infrastructure used by millions of people. I know what production looks like. I've debugged rendering pipelines that process trillions of data points. I've learned the hard way that "it works on my machine" isn't even the beginning of the conversation.

But when I started my [Vibe Code to Glory](/vibe-code-to-glory) challenge — shipping 24 revenue-ready apps in 12 months — I deliberately chose to ride the AI wave as fast as it would take me. Sixteen apps shipped so far. And every single one of them taught me something about where vibe coding breaks in the real world.

The pattern is so consistent I can now predict it.

## The Three Failure Modes

### 1. Authentication Is Never Right on the First Try

Every single AI-generated auth flow I've seen — including my own — has the same blind spot. The AI implements the happy path flawlessly:

- User signs up → success
- User logs in → success  
- User resets password → success

It never thinks about:

- What happens when a user's session expires mid-action
- Rate limiting on login endpoints
- What error message to show when the OAuth provider is down
- Token refresh race conditions when two API calls fire simultaneously

The AI doesn't *know* about these because it hasn't been woken up at 2 AM by a user who can't log in to a service they're paying for.

**Lesson:** After the AI generates your auth, spend 30 minutes thinking about what could go wrong. Then test those things. Then test them again.

### 2. Error Handling Is a Mirage

AI models are trained on code that *works*. They're spectacular at generating the golden path. They're terrible at generating the error path.

One of my apps — [MyPhotoAI](/projects) — had a Claude Code-generated image processing pipeline. It handled JPEGs beautifully. It handled PNGs beautifully. It crashed silently on a user's HEIC file from their iPhone, swallowed the error in a generic try/catch, and left the user staring at a blank screen.

The user didn't tell me. They just left.

I found it three days later when I happened to check the server logs. The AI had written `catch (e) { console.error(e) }` — good enough for development, but in production, a silent error is a user lost forever.

**Lesson:** Every single `catch` block needs to be reviewed with the question: "What does the user see when this fails?" If the answer isn't a helpful message and a clear next step, rewrite it.

### 3. The N+1 Problem Gets Exponentially Worse

This one hurts because I should have caught it earlier.

AI coding agents are remarkably good at writing database queries that work correctly for one user. They're terrible at writing queries that work for a thousand concurrent users.

Tulsk's agent memory system — which stores conversation context, tool results, and user preferences — was a textbook case. The AI wrote it with nested serializers that fired a separate database query for every single memory entry. Beautiful, readable code. Dog slow at 50 concurrent users. Catastrophic at 200.

I'd seen this exact pattern a hundred times at Ahrefs. But when you're moving fast — when you're in that vibe-coding flow where the AI is generating code faster than you can review it — it's easy to skip the performance mental model.

**Lesson:** After any AI-generated database interaction, run `EXPLAIN ANALYZE` on the queries. If you don't know what `EXPLAIN ANALYZE` does, learn it before you ship anything to production.

## What Being a 16-Year Veteran Actually Buys You

Here's the honest truth: I've been able to ship 16 apps because I spent 12 years at Ahrefs learning what production looks like. When the AI generates code, I can smell the fragile parts. I know which abstractions will hold and which will collapse under load.

The research backs this up. In 2026, industry reports show that vibe-coded applications are increasingly requiring "rescue engineering" — the process of auditing, hardening, and refactoring AI-generated codebases before they can handle real users. A recent analysis documented multiple high-profile production failures, including the Moltbook social network exposing 1.5 million authentication tokens within three days of launch, and the Lovable platform crisis with 16 vulnerabilities including 6 critical ones. These aren't edge cases — they're the predictable consequences of treating a prototype as a product.

The real superpower isn't writing code faster. It's knowing *which* generated code to trust, which to question, and which to rewrite entirely.

A junior developer using the same AI tools would produce the same code I do — but they wouldn't know that the auth flow has race conditions, or that the database schema doesn't handle soft deletes, or that the error handling silently discards critical information.

That gap isn't about intelligence. It's about experience.

## The Workflow That Actually Works

I've settled into a rhythm that's getting me through 16 apps and counting:

1. **Let the AI write first.** Don't interrupt. Let it generate the whole feature. Don't correct it mid-stream.

2. **Read the output like you'd review a PR from a talented but inexperienced junior developer.** Assume good intentions, verify everything that touches auth, payments, or user data.

3. **Write targeted tests for the edge cases the AI missed.** The AI is great at writing unit tests for existing code. Ask it to write tests for what happens when the database is down, when the file is corrupted, when the third-party API returns a 500.

4. **Run it under load before real users see it.** Even a basic load test with 50 concurrent users will surface 80% of the problems. [k6](https://k6.io) is free and takes 15 minutes to set up.

5. **Ship fast, but monitor like your business depends on it.** Sentry, Grafana, or even a simple webhook to your phone. If you're not watching the error rates in real-time during the first week after launch, you're flying blind.

## The Bottom Line

Vibe coding is not a shortcut around engineering discipline. It's a force multiplier *for* engineering discipline.

The AI makes you 10x faster at implementation. Your 16 years of experience — or your willingness to learn from people who have it — makes you capable of shipping something that doesn't fall apart at 100 users.

I'm at 16 apps. Eight to go. And every one is more production-ready than the last, because I'm learning what the AI *can't* teach me.

The code is cheap. The judgment is expensive. Never confuse the two.

---

*I'm documenting the entire [Vibe Code to Glory](/vibe-code-to-glory) journey. Follow along on [X/Twitter](https://x.com/maxlibin).*