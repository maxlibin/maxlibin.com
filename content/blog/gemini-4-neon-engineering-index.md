---
title: "Gemini 4 Neon: Hands-On with the New #1 on the Engineering Index"
date: "2026-11-20"
modified: 2026-11-20
excerpt: "Google dropped Gemini 4 Neon yesterday. It's already #1 on the Models Engineering Index by a comfortable margin, costs $3/M input tokens, and comes with a 1M context window. I dug into the benchmarks, the pricing story, and what this actually means for developers building with AI today."
tags: ["gemini", "ai-models", "coding-tools", "llm-benchmarks", "developer-tools", "google-deepmind"]
---

Google dropped Gemini 4 Neon yesterday. By the evening, it was already #1 on the [Models Engineering Index (MEI)](https://git-aarvin.github.io/mei/) — the benchmark suite that measures actual engineering task completion, not just multiple-choice trivia. Score: **69.5**, ahead of Anthropic's Fable 5.2 (65.8) and Opus 5.5 (63.1).

That's a meaningful lead. But benchmarks are one thing. What does Neon actually look like for someone writing code?

Here's my take after reading the [official launch](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/), the independent benchmarks, and the competitive comparisons — and why this might be the model that changes my default API call.

## What Makes Neon Different

### Speed, Not Just Score

The headline benchmark number grabs attention, but the real story is the speed-to-quality ratio. Independent testing via OpenRouter clocked Neon at **127 tokens per second** — nearly 3x faster than Gemini 4 Carbon (46 tps). In the [Agent Duel leaderboard analysis](https://micjm.com/blog/gemini-4-neon-looks-like-a-top-model/), speed was weighted as being roughly as important as model identity itself. The projection: Neon's Elo on agentic tasks lands at ~1,066, just below Opus 5.5's 1,078 — but with a 90% confidence interval that overlaps completely.

That means for the *majority of developer workflows*, Neon is effectively tied with the previous king of coding models at a fraction of the latency.

### Pricing That Actually Scales

Here's where it gets interesting for builders:

| Metric | Price |
|--------|-------|
| Input tokens | $3 per million |
| Cached input | $0.15 per million (95% discount) |
| Output tokens | $15 per million |
| Context window | 1 million tokens |

Compare this to Opus 5.5 which costs roughly $15/M input and $60/M output (about 5x the input cost and 4x the output cost). On the MEI cost-adjusted chart, Neon sits at an efficient **1.9x relative cost** while delivering the highest performance — whereas Fable 5.2 (2nd place) costs **6.5x** relative.

If you're running agent loops that consume thousands of tokens per step, this difference compounds fast. A long-running refactoring session that costs $2 on Neon could cost $10–15 on comparable models.

### Coding Benchmarks: The Details

Neon's MEI breakdown tells a granular story:

- **CursorBench:** 77.8 (the highest of any model)
- **Code Migration:** 79.6 (highest)
- **Terminal-Bench:** 74.2 (top tier)
- **Vibe Code:** 80.8 (highest — yes, that's a real benchmark name)
- **FrontierCode:** 65.2% (at default setting) and 46.2% on FrontierCode 2.0
- **SWE-sweep mini:** 12.8% standalone, **39.0%** inside Google Antigravity (the agent harness)

The Antigravity number is especially notable. It shows that when Neon is paired with a proper orchestration layer, it nearly triples its SWE-bench performance. That confirms what many of us have suspected: the model + harness combination matters far more than the model in isolation.

## What Changes for Developers

### Better for Multi-File Refactoring

Neon is engineered for sustained agent workflows — it handles context compaction, avoids redundant file reads, and maintains performance through long tool-heavy sessions. The MEI Code Migration score (79.6) backs this up: it's the best model at moving code between frameworks or restructuring projects.

If you've been frustrated by models losing context halfway through a 20-step refactoring pipeline, Neon is designed specifically to not do that.

### Orchestration Gets Cheaper

Google is pushing a "Neon + Hydrogen" pattern — Neon as the high-judgment orchestrator directing smaller, faster Hydrogen sub-agents. For developers building multi-agent systems, this suddenly becomes economically viable at Neon's price point. Running an orchestrator that dispatches 50 sub-tasks doesn't cost $10 anymore. It costs $0.50.

### The Cached Input Discount Is Massive

The 95% discount on cached tokens ($0.15/M vs $3/M) matters more than most people realize. If you're building tools that repeatedly read the same codebase (think: linters, code reviewers, autofix agents), your effective cost per token drops to near-zero for the repetitive parts of the context.

## Where It Falls Short

### It's Still Google

The Gemini API has historically lagged behind Anthropic and OpenAI in reliability, rate limits, and documentation quality. Neon is rolling out on Google AI Studio and the Gemini API today, but Google's developer experience is not yet at parity. Expect sharper rate limits and less mature SDK tooling.

### Antigravity Is Not Public (Yet)

The Google Antigravity agent harness — where Neon achieves its 39.0% SWE-sweep score — is not generally available. You can't just spin up an Antigravity agent today. The standalone Neon is still very good (12.8% on mini-SWE), but the headline-grabbing numbers require a Google-hosted toolchain.

### Agent Arena Is Still Evolving

Neon ranks #2 on the Agent Arena Index (steerability), but these benchmarks are new and the sample sizes (4,200 sessions) are still small relative to real usage. The "steerability" metric — how cleanly a model adapts to mid-task user corrections — is genuinely useful, but we need more data to know if it holds at production scale.

## The Verdict

Gemini 4 Neon is the first model in a while that genuinely changes the cost-performance equation for developers. At $3/M input with 1M context and top-tier engineering benchmark scores, it's the obvious default for:

- **Agent loops** (where token volume is high and latency matters)
- **Code review / autofix tools** (where cached contexts dominate)
- **Multi-file refactoring** (where the model needs to sustain context over 20+ steps)
- **Orchestration layers** (where you need a fast, cheap decision-maker)

Is it better than Opus 5.5 for every task? No. For a single-shot coding question where latency doesn't matter, Opus might still edge it out. But for *real developer workflows* — long-running agents, iterative refactoring, cost-sensitive loops — Neon is now the benchmark to beat.

I'll be switching my default API calls to test it this week. The performance-per-dollar math is too good to ignore.