---
title: "VS Code 1.137 Turns Your Editor Into an OS for AI Agents (Agent Host + Dev Containers)"
date: "2026-11-11"
modified: 2026-11-11
excerpt: "Microsoft quietly turned VS Code into something closer to an operating system for AI agents. The Agent Host system lets multiple AI coding agents run as managed processes, each in its own isolated Dev Container. I dug into how it works, what it changes about your workflow, and where it still falls short."
tags: ["vs-code", "ai-agents", "dev-containers", "agent-host", "github-copilot", "tooling"]
---

# VS Code 1.137 Turns Your Editor Into an OS for AI Agents

Microsoft has quietly turned its most popular code editor into something closer to an operating system for AI agents.

**VS Code 1.137**, released September 9, 2026, and iterated through October, ships the **Agent Host system** — an architecture that lets multiple AI coding agents run as managed processes inside the editor, each with its own isolated Dev Container, its own tools, and its own dependencies.

This isn't another autocomplete upgrade. It's infrastructure for running autonomous coding agents safely alongside your everyday editing.

## What the Agent Host Actually Does

Before 1.137, every AI coding assistant in VS Code lived in a sidebar chat panel bolted onto the editor process. Close the window? The session died. Run a heavy refactor? It blocked your editor.

Agent Host changes that. Each agent session gets its own managed runtime that can be spun up, paused, monitored, and torn down independently of the editor's main process. Think container orchestrator for text editor — that's the level of re-architecture this is.

```
# Start a standalone Agent Host from terminal
code agent host
```

That single command launches the host process. Connect to it from any VS Code window, the Agents panel, or even remote clients via the Agent Host Protocol (AHP).

## Sessions That Outlive Your Editor Window

The practical difference: you can now kick off a background agent to refactor a module, keep working on something else in the foreground, and check back on the agent's progress without losing state.

On October 28, Microsoft and GitHub announced that AHP reached version 1.0 — building on the team's experience with the Language Server Protocol and Debug Adapter Protocol. Sessions can run:

- **Locally** — on your machine as a utility process
- **In Dev Containers** — isolated with your project's exact toolchain
- **Remotely** — over SSH or development tunnels
- **In the cloud** — on GitHub infrastructure, accessible from VS Code, Copilot CLI, GitHub Mobile, or github.com

The key phrase: **sessions continue after you close the folder or window**.

## Dev Container Isolation: The Real Killer Feature

The most practically useful part is **running agents inside Dev Containers**. The Agent Host process runs inside your project's container, while the UI stays on your machine. File edits and commands use the tools and dependencies inside the container — not whatever you have installed on the host.

This solves a gnarly trust problem. Before containers, an AI agent could mess with your dotfiles, install random packages, or leave processes running. With Dev Container isolation, the agent gets the same sandbox you probably already use for your project. It can't touch your SSH keys, your home directory, or your running services.

VS Code 1.138 expanded this to remote Dev Container hosts (SSH, Tunnel, WSL). By 1.139, agents could run in containers on any supported remote host.

## Automations and Voice Mode

Alongside Agent Host, 1.137 ships **Automations** (preview) — scheduling recurring agent tasks hourly, daily, or weekly — and an experimental **Voice Mode** for talking to agents hands-free. Neither is as structurally significant as the container work, but they show where this is heading: VS Code as a workflow-automation platform, not a text editor with extensions.

## Where It Falls Short

It's not all roses. A few rough edges:

- **Memory-hungry.** Running multiple agent containers on a 16GB laptop eats RAM fast. You'll want 32GB if you plan on running 2+ agents simultaneously.
- **Setup friction.** Enabling the Agent Host requires `chat.agentHost.enabled` setting and, for Dev Container sessions, a configured `.devcontainer/devcontainer.json`. The docs are thorough but the initial ramp-up takes an hour.
- **Voice Mode is experimental for a reason.** It works for simple commands but gets confused with multi-step agent steering. Fun demo, not production-ready.
- **Cloud sessions cost credits.** Running agents on GitHub infrastructure burns Copilot credits at the model's standard rate (with a 30% discount through November 30, 2026). Local sessions are free.

## Should You Use It?

If you already work in Dev Containers, this is a no-brainer upgrade. The ability to delegate a background refactor, walk away, and come back to a working PR is genuinely time-saving.

If you're on bare-metal development with a single agent, the Agent Host changes less for you day-to-day — your Copilot chat still works the same way. But the direction is clear: Microsoft is betting that editors will become control centers for autonomous code work, and the plumbing they're laying down now (AHP, Dev Container isolation, cloud sessions) is the foundation.

For the price of a VS Code update and a Dev Container config, you get infrastructure that would have taken months to build yourself. I'd call that a win.

---

*Sources: [VS Code docs — Agent Host architecture](https://code.visualstudio.com/docs/agents/concepts/agent-host), [Introducing the Agent Host](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture), [Shattered.io analysis](https://shattered.io/vs-code-1-137-agent-host-dev-containers-2026)*