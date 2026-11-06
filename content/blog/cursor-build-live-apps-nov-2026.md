---
title: "I Tried Cursor's New 'Build Live Apps' Feature — Here's What It Actually Does"
date: 2026-11-06T09:00:00+08:00
modified: 2026-11-06T09:00:00+08:00
excerpt: "Cursor shipped 'Live Apps' yesterday. You describe an app in natural language and it builds, databases, auths, and deploys it to a shareable URL. I tried it on a real internal tool and this is what actually happens under the hood."
tags: ["cursor", "live-apps", "ai-coding", "deployment", "agentic-tools", "developer-tools", "vibe-coding"]
---

Yesterday (November 5, 2026), Cursor shipped **Live Apps** — a feature that turns a natural-language description into a deployed web app with a Postgres database, auth, and a shareable URL.

The pitch is direct: *"Agents have lowered the cost of writing code, but most apps never make it off localhost."*

I've been running the Vibe Code to Glory challenge for 11 months — 16 apps shipped in production with AI-generated code. Getting from "works on my machine" to "works for other people" is still the most annoying part of the pipeline. So when Cursor said their cloud agent now handles the whole path from prompt to production URL, I had to try it.

Here's what I found.

## What Actually Ships

The flow is simpler than I expected. You start a cloud agent from inside Cursor (works on both the desktop and web versions) and tell it explicitly you want to build an app. The agent:

1. Scaffolds the web app and writes the code
2. Spins up a Postgres database if your app needs one
3. Configures authentication behind Cursor SSO
4. Provisions hosting and a domain
5. Runs security checks
6. Publishes to a live URL

The deployment can come from new or existing repos on Cursor Origin or GitHub (GitLab support is "coming soon").

I tested it by asking for a simple incident tracker for my team — nothing fancy, just a CRUD board with status tags and assignee filtering. The agent scaffolded it in about 90 seconds using what looked like a React + Tailwind frontend with a Node backend. It provisioned a Postgres instance automatically, wired up Cursor SSO for login, and presented a preview.

## The Security Gating Is the Smart Part

The most interesting detail is buried in the middle of the changelog: Cursor runs **deterministic and agentic security checks** before anything goes live.

- **Deterministic checks** scan for hardcoded secrets, exposed credentials, and known bad patterns using fixed rules
- **Agentic checks** use an AI agent to inspect the project for structural issues that static rules can't catch

If a check fails, the agent reports what it found and attempts to fix it. Nothing deploys until the checks pass *and* you explicitly hit publish.

I deliberately tested this by asking the agent to build an app that included a hardcoded API key in a config file (something a naive prompt might produce). The deterministic check flagged it before I even got to the publish screen. The agent offered to move it to environment variables and re-scaffold the config. It worked.

Team admins can see every published app and every secret, add custom review rules, approve blocked publishes, or unpublish any app. That's enterprise-grade governance on a feature that launched yesterday.

## What's Missing

A few things I noticed immediately:

**No custom domain support yet.** You pick a unique subdomain on `cursor.app` but can't bring your own domain. For internal tools this is fine. For customer-facing stuff it's a blocker.

**Postgres only.** If your app needs MySQL, SQLite, or a document store, you're out of luck for now. The agent provisions a single Postgres instance per app, and that's it.

**No observability.** Once the app is live, there's no dashboard showing me requests, errors, or latency. I'd want at least basic logging before I'd put anything important behind this.

**Pricing is unclear on limits.** Live Apps is available on "all paid plans with cloud agents enabled," but Cursor's credit pool system means a complex app could burn through your monthly allocation fast. I couldn't find a clear breakdown of what an app deployment costs in credits. The changelog doesn't address this.

## How It Compares

The closest comparable offering is **Replit Deployments**, which has been around for a while. Replit gives you more database flexibility (SQLite, Postgres, and Redis) and custom domains. But Replit doesn't have Cursor's agentic codebase awareness — you're writing code in Replit's editor, not in your existing project.

**Grok Build** (X's offering) can also go from prompt to deployed app, but it's a standalone assistant, not wired into your editor and repos the way Cursor is.

Cursor's advantage is that the deployed app lives in your existing repo. The code is real code you can iterate on, not a black box. If I want to add a feature later, I just open the same repo in Cursor and ask the agent to extend it.

## Should You Use It?

For **internal team tools** — dashboards, CRUD apps, admin panels, prototyping — this is genuinely useful today. The time from "I need a tool" to "here's a link" is under two minutes for straightforward apps.

For **production customer-facing apps**, wait. The missing observability, limited database options, and unknown credit costs make it hard to commit to. I wouldn't deploy a paid SaaS product on this yet.

But here's what I think matters most: Cursor is signaling that the endgame for AI coding tools isn't just writing code faster. It's removing the entire gap between "code exists" and "users can use it." The moment an agent can go from concept to deployed, observable, authenticated URL is the moment "devops" becomes a background process.

That's not here yet in Live Apps v1. But it's closer than I expected.

---

*Try it: update Cursor to the latest version, start a cloud agent, and say "build me an app." The [official changelog](https://cursor.com/changelog) has more details on guardrails and team controls.*