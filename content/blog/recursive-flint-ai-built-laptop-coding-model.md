---
title: "Recursive Flint: A Laptop-Sized Coding Model, Built (Mostly) by AI"
date: "2026-10-28"
modified: 2026-10-28
excerpt: "Recursive dropped Flint this week: a free, Apache 2.0, 40B MoE coding model that runs on a laptop and was largely built by its own AI research system. I dug into the specs, benchmarks, and what the 'Eureka Machine' claim actually means for how we build software."
tags: ["local-models", "ai-coding", "open-source", "llm", "agentic-coding", "model-news"]
---

Recursive released **Flint** on October 21: a free, open-weight coding model that runs on a laptop. The headline isn't the size, the license, or even the benchmarks — it's the origin story. Recursive says Flint was *largely built by AI*, using its automated research system, the Eureka Machine, across nearly every stage of the pipeline. A small human team took it from scratch to release in under four months.

This is the first commercial release built through recursive self-improvement, and it's the kind of thing that changes what "open model" means. Here's the engineering read.

## What Flint actually is

Flint is a decoder-only mixture-of-experts model:

- **39.8B total parameters, ~2.5B active per token** (about 2.2B active body plus output head)
- **49 layers**: 2 dense, then 47 MoE layers with 256 routed experts each, 6 selected per token plus one always-on shared expert
- **262,144-token context window** (Recursive recommends budgeting at least 32K output tokens for hard problems)
- **Apache 2.0**, weights on Hugging Face as `RecursiveSI/flint`; BF16 checkpoint is ~80 GB, with quantized builds available
- Runs offline, keeps your code private, and costs nothing per token

The MoE shape is the whole trick: because only ~2.5B params are active per token, each token reads only ~1.4 GB of weights at 4.5 bits. On an M4 Pro's 273 GB/s memory bandwidth, that puts the theoretical decode ceiling around 194 tokens/s — and Recursive reports ~131 tokens/s in practice, roughly double what Gemma 4 and Nemotron 3.5 Lightning managed on the same machine.

## Running it

You don't need Recursive's custom `rec` engine to use it — standard tooling works:

```bash
# Ollama (upgrade to 0.40.9+ first)
ollama pull flint
ollama run flint

# Or point Claude Code at it via Ollama
ollama launch claude --model flint
```

llama.cpp, LM Studio, vLLM, and SGLang are all supported. Recursive ships a single B300/H200 serving kit for self-hosting, but the whole point is that a 16GB+ Mac or a 24GB GPU is enough. That's a sharp contrast with Meta's Muse Spark Open, released the same week at 816B parameters and a terabyte of memory.

## The benchmarks, with a grain of salt

Recursive's published numbers (vendor-reported, so treat them as directional):

- **89.7%** on SWE-bench Pro v2
- **74.2%** on SWE-bench Verified — best among sub-50B models, per TechCrunch
- **54.9%** on Terminal-Bench 2.1, where Recursive counts any solution reached via web retrieval as a failure — a stricter standard than most

On Recursive's own six-test average, only Alibaba's Qwen3.8 27B scored higher. Wired's Will Knight ran it on a 48GB Mac and found it nailed small programs (a to-do app, a research scraper) where similar local models stalled or errored.

## What's actually new here

Two things worth paying attention to:

1. **The size/quality tradeoff is collapsing.** A 40B MoE that beats other sub-50B models and runs at interactive speed on a laptop is now table stakes for local agentic coding. Qwen3-Coder 30B is the incumbent to beat; Flint is a credible new contender, and it's Apache 2.0 with unrestricted commercial use.

2. **The "built by AI" claim is the real story.** The Eureka Machine contributed to data selection, optimizers, training recipes, infrastructure, and inference optimization — including a sparser model shape and low-bit training that shrank Flint by 71%. That's AI-assisted model development escaping the "write a paper about it" phase into shipping. Company-reported, unverified, and still remarkable for a 2026 release.

## What sucks

- **It needs more hand-holding.** Recursive is upfront that Flint requires more explicit guidance than big paid assistants. Break large tasks into small subtasks, or it drifts. The reviewers' wins were small, well-scoped programs — don't expect repo-scale refactors on day one.
- **The speed headline is engine-dependent.** 131 tok/s comes from Recursive's custom engine on specific hardware; your llama.cpp quant may be slower. Measure on your own machine.
- **Benchmarks are publisher-reported.** Compare Flint and Qwen3.8 on *your* repository before switching.
- **Commercial licensing is a question mark.** Free for individuals today; enterprise licensing arrives in early 2027, pricing TBD.

## Verdict

I'd use it — for the right jobs. Flint is a genuinely useful local fallback: offline, private, free, and fast enough for agentic workflows. It's not replacing Claude Code for multi-file refactors, but as a privacy-preserving layer for day-to-day agentic coding, it's the strongest new option on a laptop in months.

The deeper take: when a model's *trainer* is itself a model, the "open weights" conversation stops being about licensing and starts being about provenance. That's worth watching closely — and it shipped on a Tuesday.

*Source: [TechCrunch — "Recursive launches Flint, a laptop coding model it says was largely built by AI"](https://techcrunch.com/2026/10/21/recursive-launches-flint-a-laptop-coding-model-it-says-was-largely-built-by-ai) (Oct 21, 2026).*