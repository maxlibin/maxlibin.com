---
title: "Copilot Fusion: GitHub Stopped Letting You Pick a Model"
date: "2026-11-04"
modified: 2026-11-04
excerpt: "GitHub Copilot Fusion is GA as of Universe 2026. Instead of picking a model, you pick an effort level and a router decides whether one model answers or three argue about it. Here's what actually happens under the hood, what it costs, and where it quietly bites you."
tags: ["github-copilot", "ai-coding", "copilot-fusion", "model-routing", "developer-tools", "llm", "ai-agents"]
---

For two years the model picker has been the most fiddly part of AI coding. You pick Opus for the hard refactor, forget to switch back, then burn frontier tokens renaming a variable all afternoon. At Universe on 28 October, GitHub shipped the thing that kills that job. [Copilot Fusion](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion) is now generally available on all Copilot plans, in VS Code, the Copilot app, Copilot CLI, and JetBrains. You select "Copilot Fusion" in the model picker and you have selected *nothing* — no model, no provider. You've selected a router.

It's the graduation of Project HydraFusion, the research preview that landed in Copilot CLI in early September. Here's what it actually does.

## Three execution patterns, picked per prompt

Fusion isn't just "cheap model for easy stuff." For each prompt it scores the task on capability signals — reasoning, code generation, debugging, tool use — and picks one of three shapes:

- **Single** — one model does the work. This is the cheap path.
- **Cascade** — a fast model writes a draft, a judge inspects it, and either accepts it or escalates to something stronger.
- **Critique** — one model drafts, several models critique in parallel, an aggregator merges the feedback, and the original model revises.

Fusion chooses per prompt, so your first message can run Single and your follow-up Critique. That's the new part: not a session-level setting, a per-turn decision. You can watch it — the CLI shows each step and its model, and hovering the effort level under a response lists the models actually used. Routing itself is cheap, and a trivial rename mostly doesn't pay for a reviewer.

## Effort levels are your only real knob

Instead of choosing a model, you choose how much orchestration you'll pay for:

| Effort | What it optimises for | Where I use it |
| --- | --- | --- |
| **Standard** | Versatile models, everyday work, low latency | Renames, tests, small fixes, boilerplate |
| **High** | Capable models, deeper reasoning, moderate token savings | Well-scoped feature work, multi-file refactors |
| **Max** | The most capable models, heaviest orchestration | Gnarly debugging, unfamiliar codebases, security-sensitive diffs |

My week ran ~80% Standard, 18% High, 2% Max — how I'd have used a manual picker if I'd been disciplined, and nothing like how I actually used it before.

## The benchmark claim is the interesting bit

On the Artificial Analysis Coding Agent Index, Fusion Max scored **60 — within two points of Claude Code on Opus 5.5 at Max effort** — at roughly **half the API cost per task**, **half the tokens**, and **40% less wall-clock time**.

Read that carefully. "Within two points at half the cost" is a trade most people take — but it's a vendor-published comparison on one index against one baseline, and the model pool is explicitly not fixed. The number you benchmarked isn't the number you'll get in six weeks.

## What it costs

Fusion bills per model invocation at each model's standard rate. An orchestrated turn that drafts, critiques, and revises can bill three or four calls for one prompt of yours. That's the whole risk of the design: you've handed your token budget to a router.

GitHub is softening that with a **30% discount on model costs for paid plans using Fusion**, limited time. It's promotional — the steady state is un-discounted multi-model billing — and the metric that matters isn't cost per token, it's cost per *merged PR*.

Admins: enterprise owners can allowlist the routable models (`AI controls → Copilot → Models → Configure Copilot Fusion models`), disable one model for Fusion without disabling it org-wide, and pin Fusion as the default with a managed effort level. If your org has provider restrictions, visit that page first.

## Local model routing — real, but narrower than the demo

An experimental preview lets Fusion route to on-device models — the bit everyone clipped out of the announcement:

```bash
# Copilot CLI: let Fusion consider on-device models
$ copilot --experimental
# inside the session
> /model
```

```jsonc
// VS Code settings.json
{ "chat.copilot.localModel.enabled": true }
```

Two caveats. The eligible pool is tiny: **MAI Code 1.1 Flash** and **Qwen3.8 Flash Next**, only from Fusion Standard — adding a model via BYOK doesn't make it routable. More importantly, **routing still happens in the cloud**. Local inference doesn't make your session offline. If you hoped this was your air-gapped story, it isn't yet.

## Where it actually bites

Three documented limitations I hit or worried about:

1. **Discarded drafts leave file edits behind.** If Fusion drafts, rejects, and escalates, the draft's edits already in your workspace are *not* undone. In practice that means reviewing diffs more carefully, not less — a sharp edge on an autonomy feature.
2. **No context window of its own.** Each step runs inside the limits of its model, and the number shown for Fusion is a conservative floor based on the smallest model in the pool. Large-repo work behaves like the smallest model in the mix.
3. **It doesn't start subagents.** Fusion's orchestration is separate from Copilot's subagent system — not a replacement if your workflow depends on spawnable subagents.

And plainly: **routing removes a variable, which is great for throughput and terrible for reproducibility.** Debugging an eval regression, a flaky test, or a customer bug? Fix the model. Half its value is that you can rule it out.

## Verdict

Yes, as the default — with two exceptions: anything needing a fixed model for auditability or reproduction, and anything I'd be annoyed to re-review (run High or Max there, because draft-and-discard silently editing your workspace mid-task is a bad surprise).

The bigger read: GitHub is betting model choice is no longer a developer decision but an infrastructure concern, like picking a load balancer. Probably right for 80% of work. The 20% where it's wrong is the work you get paid for — which is why the effort knob and admin allowlist matter more than the benchmark slide.

It's already in your model picker on any paid plan. Start on Standard, and watch cost per merged PR — not token count.
