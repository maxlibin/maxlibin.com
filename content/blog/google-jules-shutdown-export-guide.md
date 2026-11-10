---
title: "Google Is Killing Jules — Export Before Wednesday"
date: "2026-11-09"
modified: 2026-11-09
excerpt: "Google's async coding agent Jules shuts down Dec 31, and the last day to finish active sessions is this Wednesday, Nov 11. Here's what the export actually covers, where the async-agent gap is, and what to migrate to."
tags: ["ai-coding-agents", "google-jules", "antigravity", "developer-tools", "migration", "ai-assisted-development", "terminal-ai"]
---

Google's async coding agent Jules is being shut down. The official "Jules Turndown" notice landed in Google's changelog on October 29, and the dates are brutal:

| Date | What happens |
|---|---|
| **Nov 11, 2026 (this Wednesday)** | Last day to finish active sessions |
| Nov 12 – Dec 31 | Jules is read-only — nothing new runs |
| Dec 31, 2026 | Service winds down completely |

If any part of your backlog runs through Jules, this is not a "someday" migration. It's a this-week migration.

## Why Google is doing this

The stated reason is consolidation, not failure. Google is folding its agentic coding work into **Antigravity**, its agent-first development platform: remote agents, scheduled automations, Voice Mode (Gemini Live), Jupyter support, a CLI and desktop app, and model choice that includes Claude and GPT alongside Gemini.

Fine. But here's the gap nobody at Google has closed: Antigravity has not confirmed background/scheduled execution that matches what Jules did. Jules' whole point was *asynchronous* work — fire a task at a connected repo, get a PR back later, no terminal left open. Until Antigravity ships that, Google has **no first-party async coding agent at all** between Nov 12 and whenever the feature lands.

## What you actually lose (and what you don't)

Your code is safe. Branches and pull requests live in GitHub, not in Jules — the docs are explicit that those stay.

The asset you lose is **context**: account settings, environment variables, scheduled tasks, connected repositories, memories, setup scripts, and every session (prompt, plan, activity log, code patches). Google's export process dumps all of it into `~/jules-export` on your machine.

Before Wednesday:

1. **Merge, close, or hand off every PR Jules opened** — no orphaned branches after the flip.
2. **Run the export** (the tools/setup docs include the export prompt), then verify with `ls ~/jules-export`.
3. **Move the export somewhere private.** It contains env var values and setup scripts. Do not commit it to a repo.
4. **Rotate secrets** that lived in Jules env vars. Treat them as dangling, not just "stored."
5. **Re-create scheduled tasks in the replacement tool before Nov 12** — read-only means no new runs.
6. **Test the replacement on one small task** with clear acceptance criteria, not on the first real ticket.

## Where to go instead

- **Antigravity** — the intended successor, but "intended" is doing heavy lifting. Three pricing layers (Google AI subscription with compute quota, Gemini API pay-per-token, Managed Agents for serverless deployments). Fine for interactive work; the scheduling story is the open question.
- **Claude Code** — has real automation angles (`claude agent` in the SDK, scheduled/recurring workflows, Code Review mode). Different model, different cost envelope.
- **Codex CLI / Aider** — if Jules was mostly "issue in, PR out," you can replicate that narrow loop with a terminal agent and the GitHub CLI inside a cron job or CI step:

```bash
# sketch: scheduled agent run per repo
crontab -e
0 9 * * 1-5 cd ~/work/tickets && codex exec --full-auto "resolve next open issue"
```

- **Keep it boring.** The job you're replacing is scheduled, asynchronous, repo-connected agent runs. Whatever you pick, verify the scheduling piece actually exists — "coming soon" is not a migration plan.

## Verdict

Jules was never the strongest agent in the ring — users had been complaining about stale models for months. But it was Google's async play, and its shutdown lands the same week Meta bought Conductor and shut down its cloud. The pattern is unambiguous: standalone agent tools are consolidating into platforms, and your agent *setup* is the casualty.

The practical rule this teaches: **code survives tool shutdowns; context doesn't.** Repos and PRs are portable. Your agent's memory, env config, and schedules are not — they die with the tool. Treat agent setup like infrastructure: exportable, documented, and re-creatable from a checklist.

*Source: Google's official "Jules Turndown" changelog (Oct 29, 2026), as covered by [Times of AI](https://www.timesofai.com/news/google-jules-antigravity).*
