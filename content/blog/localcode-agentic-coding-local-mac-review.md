---
title: "Localcode: The Open-Source Coding Agent That Runs 100% Locally on Your Mac"
date: "2026-11-23"
modified: 2026-11-23
excerpt: "Localcode brings agentic coding to Apple Silicon Macs with no API keys, no subscriptions, and no cloud. I dug into how it works, what models it supports, and whether it's ready to replace Claude Code and Cursor."
tags: ["local-ai", "agentic-coding", "open-source", "mac", "ai-tools", "developer-tools"]
---

Local AI coding hit a tipping point this week. A new open-source tool called [Localcode](https://github.com/mjwsolo/localcode) landed on the front page of Hacker News, offering something no cloud-dependent agent can match: **a fully local coding agent that runs on your Mac with no API key, no account, and no ongoing costs.**

I've been testing it since the v0.4.2 release. Here's the practical breakdown.

## What Is Localcode?

Localcode is an agentic coding tool for Apple Silicon Macs. Install it with `pip`, point it at a project directory, pick a model, and it reads and edits files, runs tests, executes shell commands, searches code by name or structure, and even scaffolds and launches apps.

Unlike Claude Code ($20/mo + API usage) or Cursor ($20/mo), Localcode is free, open-source (Apache 2.0), and entirely offline.

```bash
pip install -U localcode
cd your-project
localcode
```

That's it. No `export ANTHROPIC_API_KEY=`. No config files. No Docker.

## The Model Selection Is Surprisingly Good

Localcode bundles support for **12 models and 169 quantization options**. The picker checks your Mac's unified memory, shows everything that fits, and stars the most capable option.

| Mac RAM | Best Model | Active Parameters | Download Size |
|---------|-----------|-------------------|---------------|
| 16 GB | Gemma 4 12B | 12B (dense) | 7.4 GB |
| 24 GB | Qwen 3.6 35B-A3B | 3.0B (MoE) | 10.7 GB |
| 36 GB | North Mini Code 30B-A3B | 3.0B (MoE) | 17.9 GB |
| 48 GB | Inkling 2 Mini 26B-A5B | 5.0B (MoE) | 22.9 GB |
| 64 GB | Kolibri 1 78B-A3B | 3.0B (MoE) | 28.6 GB |
| 128 GB+ | DeepSeek V4 Flash 284B-A13B | 13.0B (MoE) | 82.4 GB |

Switch models on the fly with `/models`. Downloads run in parallel and resume if interrupted.

## The Performance Tricks Matter

What makes Localcode interesting isn't just that it runs local models—it's the engineering around making them fast enough to be useful:

- **Speculative drafting**: Uses the model vendor's own drafter to guess tokens ahead. ~2x faster replies on Gemma 4, Qwen 3.6/3.8, and Muse Glimmer.
- **Copy drafting**: When rewriting a file the model already read, it copies instead of regenerating. 3.5–4x faster on file rewrites.
- **Prompt cache reuse**: The system prompt stays constant across turns, so the model only processes new input.
- **8-bit KV cache**: Halves memory usage for long context. Inkling 2 uses a 16-bit cache that reads prompts 20–30% faster.
- **Precompiled GPU kernels**: No 30-second shader compile on first launch.
- **Flash attention on by default**, threads matched to your Mac's performance cores.

These aren't gimmicks. They're the difference between a model that takes 30 seconds per edit and one that feels interactive.

## How It Compares to the Cloud Alternatives

**vs. Claude Code**: Claude Code (Anthropic's official CLI agent) is more polished and runs on stronger cloud models. But it's $20/mo and burns through API credits. Localcode is free and private—your code never leaves your machine. For sensitive projects, that alone decides it.

**vs. Cursor**: Cursor's agent mode is faster and more context-aware thanks to its indexing. But it only works inside Cursor's editor. Localcode works in any terminal, on any project. You can `cd` into a repo, run `localcode`, and it starts editing. No IDE lock-in.

**vs. Aider**: Aider is the closest open-source competitor. It also runs in the terminal and supports local models. But Localcode bundles its own model server (no external ollama/llama.cpp setup), auto-tunes context/KV cache sizes for your hardware, and has better optimization for MoE architectures.

## What Sucks About It

Let's be honest about the rough edges:

- **Mac-only.** Apple Silicon required. No Linux, no Windows. If you're on an Intel Mac or PC, you're out of luck.
- **Entry cost.** You need 16 GB of RAM minimum. The 16 GB models (Gemma 4 12B) work but are noticeably dumber than cloud models. You'll want 32 GB+ for a capable experience.
- **Download sizes.** Even a small model is 7+ GB. DeepSeek V4 Flash needs 82 GB of downloads. Budget your bandwidth.
- **First-generation polish.** The CLI is functional but not pretty. Error messages can be cryptic. The docs are still being written.
- **Speed gap.** Even with all the optimizations, local models are slower than Claude Sonnet or GPT-4o for complex multi-file edits. Simple tasks are fine. Heavy refactors test your patience.

## Who Should Use It

Localcode is ready now for:

- **Privacy-conscious devs** who can't send code to third-party APIs
- **Offline travelers** who code on planes or in areas with spotty internet
- **Hobbyists** who want to experiment with local models without managing ollama, llama.cpp, and a dozen config files
- **Anyone curious** about whether local models can replace cloud agents

It's not ready to replace Claude Code for production work on a 16 GB Mac. But on a 48 GB+ Mac with Qwen 3.6 or DeepSeek V4 Flash? It's surprisingly close.

## Verdict

Localcode is the most polished "install and go" local coding agent I've tried. The engineering optimizations show real thought—this isn't a thin wrapper around llama.cpp, it's a purpose-built tool for making small models punch above their weight.

The HN front page placement wasn't hype. Local AI coding is no longer a future prospect—it ships today with `pip install -U localcode`.

---

*Localcode v0.4.2, Apache 2.0. [GitHub](https://github.com/mjwsolo/localcode) | [Docs](https://mjwsolo.github.io/localcode/)*