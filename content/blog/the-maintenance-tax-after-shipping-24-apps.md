---
title: "The Maintenance Tax: Shipping 24 Apps in 12 Months Was the Easy Part"
date: 2026-10-23T09:00:00+08:00
modified: 2026-10-23T09:00:00+08:00
excerpt: "Everyone celebrates the launch. Nobody talks about the month after. After 16 apps and 47,000 lines of AI-generated code, here's what the Vibe Code to Glory challenge taught me about the maintenance tax — and the kill criteria that kept my portfolio from collapsing under its own weight."
cover: ""
tags: ["vibe-coding", "solo-founder", "maintenance", "indie-hacker", "ai-assisted-development", "portfolio", "shipping"]
---

Last week I pushed app #16 — Tulsk for Mac — and someone on X asked a question that stopped me cold.

Not "how did you build it so fast?"

They asked: *"Which of those apps are you actually keeping alive?"*

I opened a spreadsheet I keep meaning to organize, and I couldn't answer. That's when I realized the entire vibe coding discourse has a blind spot. We celebrate launches like confetti. Nobody talks about the month after.

Shipping 16 apps in 10 months was the easy part. The maintenance tax is the part that nearly broke me.

## The tax has three components

When you ship one app, maintenance is a rounding error. When you ship sixteen, it's a second full-time job you never applied for.

**The money tax.** Every app has a baseline burn that produces nothing by itself: a domain, hosting, a database, an API key, transactional email, maybe a one-off service that charges you to exist. Individually it's pocket change — a few dollars here, ten dollars there. Collectively it's a silent monthly burn that never shows up as a single line item, which is exactly why you never notice it until you add up a year of it.

My own stack is a patchwork: static sites on Netlify and Cloudflare, heavier agent workloads on a Hetzner box (moving there from Cloudflare saved me $30 a month on one project alone), a couple of managed databases. Sixteen apps don't cost sixteen times one app — but they cost way more than I budgeted.

**The time tax.** Every app has a heartbeat. A dependency bump. A security patch. A provider announcing a breaking API change. A cert expiring at an inconvenient hour. A cron job that quietly stopped firing and you only find out when a user emails you.

Realistically, each app demands one to two hours of attention a month. That sounds fine until you multiply it: sixteen apps is a full weekend of maintenance every single month. And it's the worst kind of work — fragmented, interrupt-driven, and zero dopamine.

**The cognitive tax.** This is the one nobody charges for, and it's the most expensive.

Every app you keep alive is a state machine you have to be able to reload in your head given five minutes' warning. "Why is the upload broken?" means re-entering the architecture of a project you haven't touched since February. Sixteen apps means sixteen mental stacks, and context-switching between them is where solo founders actually lose their time — not in the code.

Here's the part that made me seriously rethink my challenge. Across those 16 apps there are roughly 47,000 lines of AI-generated code, and most of it I have never read. You cannot maintain what you haven't read. So either the maintenance stays external — agents, monitoring, checklists — or it doesn't happen at all.

## The math nobody does

Here's the uncomfortable arithmetic I finally forced myself to do:

An app that earns $0 a month but costs $5 a month and two hours of maintenance is not a project. It's a liability. It isn't "passive income waiting to happen" — it's a rent payment.

I kept two apps alive for over a year that way. Every month I told myself "next month it'll find users." Every month it didn't. The dream of a passive portfolio quietly became a guilt project you can't bring yourself to kill.

That's the failure mode of the whole "ship 24 apps" genre. Launching is celebrated; killing is treated like failure. But a portfolio of twenty-four zombies is worth less than five products you'd actually bet on.

## What I changed: a maintenance framework

### 1. Kill criteria written at launch

Now every project starts with its own `CLAUDE.md`, and the first rule isn't about code conventions — it's the death contract, written on day one while I still remember why the app exists:

> *Kill criteria: three consecutive months with zero new users and zero revenue → sunset, sell, or open-source. No exceptions.*

I write it before I write the app. It sounds grim. It's the most freeing rule I've ever added, because it turns sunsetting from a failure into a scheduled decision rather than an emotional one.

### 2. The three-tier portfolio

Every app now sits in one of three buckets:

- **Keep** — real revenue or real usage. These get the maintenance weekend.
- **Hold** — experiments with near-zero cost that I still enjoy, or that might compound. These get monitored, not maintained. If they break, they sit broken until a Hold becomes a Keep.
- **Sunset** — no revenue, no users, no learning left. These get a graceful exit: a "this is shutting down" note, data export, and a homepage redirect to the lessons. I've started treating the sunset post itself as marketing — it's honest, it's human, and people actually read them.

I sold my AI itinerary app earlier this year rather than sunset it. Selling, deleting, or open-sourcing are all legitimate exits. The only illegitimate option is letting it rot while you feel bad about it monthly.

### 3. One "keeping the lights on" morning a month

Instead of maintenance trickling across my calendar, I batch it: one Saturday morning, every month, and an AI agent does the triage.

The agent reads the changelogs, opens update PRs for me to skim, checks uptime and error rates across the fleet, and flags anything that crossed a threshold. My job is review, not discovery. The agent is the janitor; I'm the building manager who signs off.

This is the same lesson I learned the hard way with harness engineering: never trust the agent to remember. Engineer the process so the work finds you, instead of you having to remember to go looking.

## The takeaway

People ask me what the Vibe Code to Glory challenge taught me about speed. It taught me nothing about speed — it taught me that *shipping is the easy half*.

The second half, the part that comes after the 12 months, is curation. Having fewer, healthier things is worth more than having more, sicker things. Every app you launch is a promise you're making to your future self's calendar and bank account.

So before you vibe-code your next brilliant idea, write the kill criteria first. Decide what dead looks like while the project still excites you.

And if you're sitting on a portfolio of zombies right now — I see you. Pick one. Give it a graceful funeral. You'll feel lighter than you have in months.

Next up, I'm writing up the actual runbook: exactly what my agent does during the monthly sweep, thresholds included. If you're a solo founder drowning in your own apps, that one's for you.
