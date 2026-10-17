---
title: "Harness Engineering — The Missing Discipline Every Solo AI-Founder Needs"
date: 2026-10-16T09:00:00+08:00
modified: 2026-10-16T09:00:00+08:00
excerpt: "Mitchell Hashimoto coined 'harness engineering' in February 2026 — and it changed how I build. After shipping 24 apps solo in 12 months, here's why this discipline matters more for solo founders than for anyone else."
cover: ""
---

It was a Thursday night, 2 AM, and I was staring at a Claude Code session that had just tried to deploy a broken migration to production.

Not *my* broken migration. The AI's.

It had confidently generated a SQL script that would have dropped a table I actually needed. If I hadn't been watching the terminal like a hawk, that would have been the end of a weekend's worth of user data.

The worst part? This was the *third* time this exact kind of mistake had happened. Different project, same pattern. The AI would make a confident but wrong assumption about my database schema, generate destructive SQL, and I'd catch it at the last second.

For months, I treated each incident as a one-off. "Be more careful," I'd tell myself. Add a note in the prompt. Move on.

Then in February 2026, Mitchell Hashimoto — the co-founder of HashiCorp, the guy who literally wrote Terraform — published a blog post that named the thing I'd been failing to do. He called it **harness engineering**.

The core idea is brutally simple: **whenever an agent makes a mistake, engineer the environment so it cannot make that mistake again.**

Not "remind it in the prompt." Not "hope it does better next time." Engineer the mistake out of existence.

## Agent = Model + Harness

The formula that emerged from the community in the weeks after Hashimoto's post:

> **Agent = Model + Harness**

The model provides the raw intelligence. The harness provides everything else: the tools it can call, the files it can touch, the tests it must pass, the guardrails that stop it before it does something stupid.

OpenAI's Ryan Lopopolo put it even sharper in a follow-up post on February 11: *"Humans steer. Agents execute."*

This hit me hard because I realized I'd been doing it backwards. I was letting the agent steer *itself* while I sat there rubber-stamping its decisions. No wonder I kept catching the same categories of mistakes.

## Why Solo Founders Need This Most

Here's the thing about harness engineering: it was developed inside large organizations. Hashimoto was at HashiCorp. Lopopolo was at OpenAI. The early literature talks about team workflows, code review gates, and multi-developer contexts.

But I'd argue harness engineering is *more* important for solo founders than for anyone else.

When you're a team of one with AI as your "co-founder," you don't have a human reviewer catching mistakes. You are the review gate. And you're tired, context-switching between 14 different concerns, and shipping features at a pace that would make a 10-person startup blush.

I've shipped 24 apps in 12 months — from Tulsk to AI Banana Flow to homeworkAI to half a dozen other experiments. Some of them made money. Some of them flopped. But every single one of them taught me the same lesson: the projects where I built a good harness were the ones that didn't wake me up at 2 AM with production fires.

## The Five Layers of a Solo Founder's Harness

Based on what I've learned the hard way, here's what a practical harness looks like for a solo builder:

### 1. Context Engineering (The CLAUDE.md Layer)

This is table stakes in 2026. Every project I start gets a `CLAUDE.md` (or `AGENTS.md` — they're both supported by Claude Code, Cursor, Codex, and basically everything else now).

But here's what most people get wrong: they write a static document once and never touch it. I update mine weekly. Every time an agent makes a mistake that I have to correct, I add a rule. Every time I learn a new architectural constraint, I document it.

My current `CLAUDE.md` for Tulsk has 47 rules. It covers everything from "never touch the payments table without explicit approval" to "always write tests before modifying API routes."

### 2. Tool Scope Control

The default Claude Code setup gives the agent read/write access to your entire project and the ability to run arbitrary terminal commands. That's terrifying for production.

I now use a permission model that starts maximally restricted and loosens per-session:
- Read-only access by default
- Write access only to specific directories
- Destructive commands (rm -rf, database migrations, deploys) require explicit approval

This isn't paranoia. It's harness engineering. I've had Claude Code try to `rm -rf node_modules` in a script and then try to reinstall dependencies — without me asking it to. The harness caught it.

### 3. The Verification Loop

The single most impactful thing I've done: **make the agent run its own tests after every change.**

This is Claude Code's built-in feedback loop. After the agent writes code, it runs the test suite. If tests fail, it tries to fix them before declaring success. If it can't fix them, it surfaces the failure.

Before I enforced this, I'd occasionally merge AI-written code that didn't even compile. After? Zero compilation errors in production. (Business logic bugs? Still working on those. But at least the damn thing runs.)

### 4. Session Observability

When you're working with AI agents for hours-long coding sessions, context decay is real. The agent starts strong and gets dumber as tokens accumulate.

I now force checkpoint commits every 30 minutes. Claude Code has a `/summary` command that compresses the session context. I use it aggressively. There's no point having a brilliant AI if it can't remember what it was building three hours ago.

### 5. The Post-Mortem Rule

This is the one Hashimoto preached: every mistake gets a permanent fix in the harness, not a one-off reminder.

When the database migration incident happened, I didn't just sigh and move on. I added a rule to my `CLAUDE.md`:

> *Before generating any SQL migration, first read the current schema from the database. Never assume column names or table structures. Confirm destructive operations with the user before executing.*

Haven't had that problem since.

## What This Looks Like in Practice

Here's a concrete example from my recent work on AI Banana Flow:

The agent kept choosing inconsistent CSS class naming conventions — sometimes BEM, sometimes utility-first, sometimes random. It wasn't breaking anything, but the codebase was becoming a mess.

A prompt-level fix would have been: "Please use consistent CSS naming." That works for about one session.

A harness-level fix: I added to `CLAUDE.md`:

```
CSS Convention: Use Tailwind utility classes everywhere. 
No custom CSS files. No CSS modules. No styled-components.
If you're tempted to write custom CSS, stop and ask.
```

Plus I added a lint rule that failed CI if any CSS file (other than `globals.css`) was created.

The agent physically could not break the convention. That's harness engineering.

## The Bottom Line

Here's what I've learned after building 24 apps solo with AI: **the quality of your output is directly proportional to the quality of your harness.**

A mediocre model inside a great harness outperforms a great model inside a broken harness. Every single time.

The founders who will win in 2026 aren't the ones who can prompt the best. They're the ones who engineer environments where their AI agents can't help but do good work.

Start small. Pick one recurring mistake that your AI keeps making. Engineer it out of existence. Then do it again next week.

Your 2 AM self will thank you.

---

*Max Li Bin is a solo founder and AI engineer based in Singapore. He's been building software for 16 years, shipped 24 apps in the last 12 months, and currently spends most of his time building Tulsk, an AI-powered project management platform, and working on the Vibe Code to Glory challenge.*