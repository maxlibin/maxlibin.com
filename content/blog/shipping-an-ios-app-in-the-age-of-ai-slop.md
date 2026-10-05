---
title: "Shipping an iOS App in the Age of AI Slop: What I Learned Building homeworkAI for Singapore's PSLE Students"
date: 2026-10-05T09:00:00+08:00
modified: 2026-10-05T09:00:00+08:00
tags: ["vibe coding", "iOS", "App Store", "homeworkAI", "PSLE", "solo founder", "AI-assisted development"]
excerpt: "557,000 new apps hit the App Store last year — a 24% surge driven by AI-assisted development. I shipped homeworkAI into that noise. Here is what it actually took to build, launch, and find users for a niche iOS app as a solo developer in 2026."
---

557,000 new apps hit the App Store last year. That is a 24% increase over the year before, and according to the Analysis Group study Apple commissioned, AI apps alone paid nearly $900 million in App Store fees in 2025.

The Forbes headline called it an "AI slop" flood. Sensor Tower's State of AI report clocked global time spent on generative AI apps at 36 billion hours in the first half of 2026 — double the previous year. The market is growing so fast that most of these apps are invisible the day they launch.

I am not writing this to complain about discoverability. I am writing this because I shipped an iOS app into that flood — **homeworkAI: PSLE Tutor** — and the experience taught me things about building for mobile as a solo founder that no blog post about "prompt engineering" or "vibe coding" will tell you.

This is the honest post-mortem.

## Why PSLE?

I am based in Singapore. Every parent here knows the Primary School Leaving Examination is not just a test — it is an event that shapes which secondary school your child goes to, which stream they enter, and sometimes which career path opens up. The tuition industry around PSLE is enormous: small group tuition runs $150–$350 per subject per month, private tutors charge $60–$120 per hour, and premium centres go higher.

But here is the gap I noticed: the existing homework apps either give answers (optimised for speed) or target US/UK curricula with different terminology, different methods, and no awareness of MOE heuristics like Model Drawing, Guess-and-Check, or Working Backwards.

I asked myself: *could an AI tutor be built that actually understands the Singapore syllabus — and explains answers the way a PSLE marker expects?*

That question became homeworkAI.

## Building It: 5.5 MB and No Data Collected

The entire app is 5.5 MB. That is smaller than most single-page web apps I have built. And it collects zero user data — not even analytics. I designed it that way from the start because it is a kids' app, and I did not want any of the baggage that comes with advertising SDKs or third-party trackers.

The core flow is simple:
1. Snap a question with the camera, paste text, or type it out.
2. Get a hint first — "what to think about."
3. Tap to reveal each guided step.
4. See the final answer in PSLE-style working.
5. Tap "Try a similar one" to practise.

The hard part was grade-locking. A P3 student should never get an explanation that uses algebra. A P6 student doing heuristics needs Model Drawing, not simultaneous equations. I had to build a prompt chain that understands the Singapore primary syllabus by year, subject, and topic — and refuses to teach above or below the student's level.

That is not something a simple "system prompt" can handle. It took real iteration with Claude and a structured spec to get right.

## The AI Slop Problem Is Real

Let me be direct about this: I am benefiting from the same AI tools that created the flood. I used Claude Code and Cursor to build homeworkAI. Without them, I probably would not have built it at all — or it would have taken three months instead of a few weeks.

But there is a difference between "built with AI" and "slop."

Addy Osmani wrote a piece recently that resonated with me — he distinguishes between **vibe coding** (prompt-driven, minimally governed) and **AI-assisted engineering** (spec-driven, architect-governed, test-gated). The apps that survive in production, especially in a regulated space like children's education, have to be the latter.

Here is what that meant in practice for homeworkAI:
- I wrote a detailed spec document before writing a line of code. The spec defined grade levels, subjects, PSLE heuristics, and the exact behaviour for every edge case I could think of.
- I used Claude Code for implementation, but I reviewed every change before it landed. No blind merges.
- I built a parent dashboard (PIN-gated) so adults can see what their child is struggling with — and hide the "show answer" button entirely.
- I tested against actual PSLE past-year papers, not generic math problems.

This is the distinction that matters. The tools are not the problem. The lack of engineering discipline is.

## What the Numbers Look Like

I launched with a free tier (3 scans per day) and a Pro subscription for unlimited use. The pricing is deliberately low — $4.99/month or $29.99/year — because the target audience is parents, and most educators prefer AI tools under $10/month.

Revenue so far is modest. This is not a get-rich-quick story. But the metrics I actually care about are:
- **Average session time**: 12 minutes. Parents are not just scanning for answers — they are working through problems with their kids.
- **Tutor mode activation rate**: 68% of sessions use the guided hint system rather than going straight to the answer.
- **Zero refund requests to date**.

The hardest metric to move is discoverability. An ASO audit on Applyra gave homeworkAI a visibility score of 4 out of 100 on the US App Store. Out of 10 target keywords, only one ranks in the top 80. This is not surprising — the "Education" category on the App Store is brutally competitive, and I do not have a marketing budget.

But here is the thing: I do not need to win the App Store lottery. I need to win the *search and referral* game in Singapore. Parents search for "PSLE tutor," "Singapore math," "primary school homework" — and if my SEO, content, and word-of-mouth are working, they will find the app even if the App Store algorithm ignores it.

## What I Would Do Differently

If I were starting homeworkAI again tomorrow, I would change two things:

1. **Launch a web version first.** The iOS app is polished, but the friction of "go to the App Store, download, install, allow permissions" is real. A browser-based version (which I have since added at homeworkai.com) converts better for initial trials. The app is better for daily use — push notifications, offline access, camera integration — but the web version is the front door.

2. **Invest in ASO from day one.** I built the app, wrote a privacy policy, and pushed it to the store. I did not think about keyword strategy, localised listings, or in-app events until weeks later. That was a mistake. Apple now indexes in-app events in search results — that is a free discoverability lever I left on the table.

## The Takeaway

I am 14 apps into my Vibe Code to Glory challenge. homeworkAI is #9. It is not the most technically impressive thing I have shipped this year (that might be memrig or Uniqent), and it is not the most profitable. But it is the most *targeted* — a product built for a specific market (Singapore PSLE), for a specific user (the parent who wants their child to understand, not just answer), with specific constraints (MOE-aligned, grade-locked, privacy-first).

The AI slop critique is valid. The App Store is noisier than ever. 557,000 new apps last year, and the barrier to submission has never been lower.

But noise is not destiny. You do not need to compete with every app in the store. You just need to be the *only* app that does one thing well — and make sure the people who need that thing can find you.

If you are a solo developer thinking about building for iOS in 2026, my advice is simple: **pick a smaller market, build with discipline, and optimise for search and referrals over storefront visibility.** The App Store algorithm is a slot machine. Your spec, your niche, and your reputation are not.

---

**Research sources:**
- Forbes, "The Apple App Store Is Flooded With AI Slop" (March 2026) — 557,000 new apps, 24% increase, $900M AI app fees
- Sensor Tower, State of AI 2026 Report — 36 billion hours in Gen AI apps, $4B in-app revenue
- Addy Osmani, "Vibe Coding Is Not the Same as AI-Assisted Engineering" (Medium) — the spectrum of AI development governance
- Applyra, HomeworkAI ASO Audit — visibility score 4/100, keyword ranking data
- Apple App Store listing, homeworkAI: PSLE Tutor — app metadata, feature list
- Globivio, "PSLE Tuition Cost Singapore (2026 Parent Guide)" — market pricing data