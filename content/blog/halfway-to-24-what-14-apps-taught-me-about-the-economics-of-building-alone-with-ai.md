---
title: "Halfway to 24: What 14 Apps Taught Me About the Economics of Building Alone With AI"
date: "2026-10-07"
tags: ["vibe-coding", "solo-founder", "revenue", "indie-hacking", "economics", "lessons-learned"]
---

I shipped app #14 last week. Jev Rubik's — an interactive 3D Rubik's cube where code solves and an AI coach helps with hand solves. It's niche, it's fun, and it probably won't pay rent.

That makes 14 out of 24. We're past the halfway mark of my Vibe Code to Glory challenge — 24 revenue-ready apps in 12 months, built alone, with AI as my only co-founder. I started this on January 2nd, got my first app (GetFileMock.com) live in under 4 hours, and haven't really stopped since.

Ten months in, I want to talk about something I deliberately avoided at the start: the economics. Not the inspirational "AI makes you 10x faster" stuff — the actual numbers. What costs money, what makes money, and what I wish someone had told me before I committed to shipping 24 products in a year.

## The Uncomfortable Math of 24 Apps

Let's start with the premise. "24 revenue-ready apps in 12 months" sounds like an aspirational LinkedIn post. But what does "revenue-ready" actually mean?

For me, it means the app has a way to charge money — a Stripe integration, an iOS in-app purchase, a subscription tier. Not necessarily that it *is* making money. And that distinction matters more than I expected.

Here's the honest breakdown of my 14 shipped apps by revenue status:

- **Actually generating recurring revenue:** 3 (Tulsk, MyPhotoAI, HomeworkAI)
- **One-time / sporadic revenue:** 2 (Interior AI Room Designer, Seekdome)
- **Zero revenue (free tools or not-yet-monetized):** 9

That's not a failure. Most of the free ones are utility tools or open-source frameworks (memrig, Uniqent, GetFileMock). They serve a different purpose — brand building, ecosystem creation, and frankly, just scratching my own itch. But it does mean the "revenue-ready" framing needs a reality check.

## Where the Money Actually Comes From

The three apps that earn consistently share something obvious in hindsight: they solve a recurring problem for a specific audience, and they existed in markets where people already pay for software.

**Tulsk** (AI project management) — B2B SaaS. It took six months to get the first $1 in MRR. The challenge wasn't building it — Claude Code and I built the MVP in two weeks. The challenge was convincing teams to trust an AI-native PM tool when they already use Linear or Jira. Tulsk's first paying customer came from a personal referral, not from SEO or ads.

**HomeworkAI (PSLE Tutor)** — iOS app for Singapore's primary school exam prep. This one monetized fastest because parents in Singapore already spend heavily on tuition. Pricing it at S$9.99/month was a no-brainer. The PSLE is a pressure cooker, and HomeworkAI provides instant step-by-step help for Math, Science, and English. The SEO angle was obvious: "PSLE math tutor" searches spike from January to September. The app launched in July and saw organic installs within days.

**MyPhotoAI** — iOS AI photo generator with 50+ styles. This one surprised me. I built it thinking it would be a side show. Turns out people really want to turn selfies into anime characters and oil paintings. The iOS discovery mechanism is brutal (you live or die by App Store optimization and TikTok), but once it found its groove, the in-app purchase conversion rate stabilized at a respectable 1.4%.

The common thread: all three serve an existing, proven market. None of them needed to invent a new category. That's boring advice, but it's true.

## The Cost Side: What Nobody Talks About

Everyone talks about how fast AI lets you build. Nobody talks about the accumulation of recurring costs when you're running 14 apps.

Here's my monthly burn at the halfway point:

| Line item | Monthly cost |
|---|---|
| LLM API usage (Claude Code, GPT-4o, Gemini) | ~$180 |
| Hosting (Hetzner + Vercel + Cloudflare) | ~$65 |
| Domain renewals (14 apps × ~$12/yr average) | ~$14 |
| iOS Developer Account + Play Store | ~$30 |
| Analytics / monitoring | ~$20 |
| Various SaaS subscriptions | ~$50 |
| **Total** | **~$359/month** |

That's $4,300 a year just to keep the lights on. Before I make a dollar in revenue.

Is that a lot? For a solo developer in Singapore, it's manageable. But it's not zero. And when you're running 14 projects, the mental overhead of maintaining each one — answering support emails, fixing edge cases, updating dependencies — costs far more than the hosting bills.

## The Maintenance Tax

This is the thing I underestimated most.

Every app is a living thing. GetFileMock.com is "just" a client-side file generator — zero backend, no database. But someone reported that it failed on Safari last month. That took an afternoon to debug. Interior AI Room Designer had an iOS SDK deprecation that broke the image processing pipeline. That was a full weekend.

I now spend roughly 40% of my "building time" on maintaining existing apps, not shipping new ones. At the start, I assumed maintenance would be 10-15%. I was naive.

If I were doing this again, I'd set stricter criteria for what counts as "shipped" — probably requiring that the app either generates revenue within 60 days or gets deprecated. A free utility with 5 daily active users is a tax, not an asset.

## What Changed in My Workflow From App #7 to App #14

Around app #7 (Interior AI Room Designer), I hit a wall. The early apps were exciting — each one taught me something new about working with AI agents. GetFileMock taught me about deploying with zero infrastructure. Seekdome taught me about AI-powered search relevance. Tryout taught me about Chrome extension development with Claude Code.

But by app #7, I realized I was repeating patterns. The novelty of "I can build anything" was wearing off, and the question became: "Should I build this?"

Three changes made the second half dramatically more efficient:

1. **I standardized on a single project template.** Before app #7, every new project meant a fresh Next.js setup, new auth integration, new Stripe wiring. Now I have a starter that includes auth, payments, email, and a basic admin panel. Claude Code knows the template. New apps start from a spec, not from `npm create`.

2. **I stopped fighting Stripe.** Every indie developer has a Stripe integration horror story. Webhooks, idempotency, tax calculations. I now use a minimalist billing wrapper that handles the boilerplate. This alone saved weeks across 5 apps.

3. **I started saying no.** The best productivity gain was killing ideas before writing a line of code. I keep a running list of app ideas and score them on three criteria: (a) does someone already pay for a solution to this problem? (b) can I build a credible version in ≤2 weeks? (c) is there a distribution channel I can use without spending money? If an idea fails two of three, it goes in the backlog.

## The Real ROI of This Challenge

If I totalled up the revenue from all 14 apps today, it wouldn't cover my time. That's the honest truth.

But that misses the point.

The Vibe Code to Glory challenge was never really about making $200K MRR in a year. It was about proving that a solo developer with 16 years of experience and access to modern AI tools can operate like a small studio. It was about showing that the unit economics of shipping software have changed.

A single app doesn't need to be a unicorn. If each app averages $200 MRR (and some do less, some do more), 24 of them together cover a comfortable income in Singapore. The portfolio approach to indie hacking — diversification across multiple micro-SaaS products — becomes viable when the cost to create each one drops to 1-2 weeks of work instead of 3-6 months.

That math didn't work in 2023. It works now.

## What I'd Tell Someone Starting Today

If you're a solo developer or aspiring indie hacker reading this, here's the honest playbook for the 2026 landscape:

**Build for markets that already pay.** Don't try to invent a new category. Find a niche where people are already spending money (PSLE tutoring in Singapore, interior design, AI photo generation) and build something better for that specific audience.

**Kill apps that don't work.** I'm keeping all 14 live, but I should probably deprecate the ones with zero revenue and single-digit daily users. Every active project is a distraction from the next one.

**Automate the boring parts early.** Project templates, deployment pipelines, billing integration — invest in these once and reuse them everywhere. The first app took 4 hours partly because I had nothing set up. The 14th took under 3 days from idea to ship, including the code-solves-Rubik's-cube logic.

**The real bottleneck is no longer building — it's distribution.** I can build an app faster than I can get 100 people to try it. SEO, App Store optimization, TikTok loops, and personal network are the chokepoints in 2026. AI made us fast at making things. It hasn't made us fast at finding users yet.

## 10 to Go

I have 10 more apps to ship before December 31st. I don't know what all of them will be yet, but I know the criteria: existing market, <2 week build, clear distribution path.

The Vibe Code to Glory continues. But now I'm building with my eyes open — not just about how fast AI can write code, but about which code is worth writing in the first place.

The economics of building alone have changed. The economics of building *the right things* haven't. That's the lesson I'm carrying into the final stretch.