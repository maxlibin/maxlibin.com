---
title: "External Sandboxes for Coding Agents: The Missing Safety Layer"
date: "2026-11-18"
modified: 2026-11-18
excerpt: "Prime Radiant and Simon Willison just released three open-source sandbox implementations that let coding agents execute commands inside isolated Linux VMs — without Docker, without manual approval fatigue, and with credential injection baked in. Here's how they work and why they matter."
tags: ["coding-agents", "sandboxing", "security", "ai-agents", "claude-code", "codex", "pi", "webassembly", "devops"]
---

You've given your coding agent `sudo` access to your machine. Maybe you approve every command it wants to run. Maybe you let it auto-approve most things and just hope nothing goes wrong.

Neither approach is good.

Manual approval is a terrible workflow — it's slow, trains you to approve everything out of fatigue, and kills the whole point of having an agent in the first place. Full trust is reckless, especially with smaller models or prompt injection lurking in a README you asked your agent to install.

Enter **external sandboxes**: a pattern that keeps your coding agent on your Mac but runs every command it executes inside an isolated Linux sandbox — with no network access by default, read-only access to most of your files, and credential injection so API keys never touch the agent's context.

Prime Radiant (the lab behind Superpowers, working with Simon Willison) just released three open-source implementations. They all speak the same protocol, so you can swap them interchangeably with Claude Code, Codex, or Pi.

## How It Works

The pattern is dead simple. Your agent runs on your machine as usual. But instead of executing commands on your host, it sends them to a localhost HTTP server that runs Bash inside a Linux sandbox.

Here's the two-command demo:

```bash
# Terminal 1: Start the sandbox
npx external-sandbox-v86 --mount-rw "project=$PWD"

# Terminal 2: Connect Pi to the sandbox
npx @earendil-works/pi-coding-agent \
  -e npm:external-sandbox-pi --no-builtin-tools \
  --sandbox-url http://127.0.0.1:8686
```

Run `!uname -a` inside Pi and you'll see:

```
Linux (none) 6.12.114-0-virt #1-Alpine SMP i686 GNU/Linux
```

Your agent has full access to the project directory via a live 9p mount. But it can't touch anything else on your machine, can't make network requests unless you explicitly allow hosts, and can't see your API keys — the proxy injects them at the HTTP level, outside the agent's view.

## Three Backends, One Protocol

The three implementations share a common protocol spec (revision 1, fully documented with conformance tests):

**external-sandbox-v86** — A Node.js server that boots Alpine Linux inside [v86](https://github.com/copy/v86), an x86 emulator compiled to WebAssembly. No Docker dependency. First run downloads ~36 MB. Runs on Node.js 22+. This is the easiest to try.

**external-sandbox-container** — Python server using Apple Containers (macOS native lightweight VMs). Good if you're already on Apple Silicon and want something closer to bare metal.

**external-sandbox-quicksand** — Python server wrapping Microsoft's [Quicksand](https://github.com/microsoft/quicksand) library, which bundles QEMU and Alpine Linux in a single Python package. Portable across platforms.

All three share the same API: buffered shell (`POST /exec`), streaming shell (`WebSocket /exec/ws`), a Codex-compatible exec-server endpoint, filesystem RPC, and optional proxy/mount/browser profiles.

## Where This Changes the Game

**No more decision fatigue.** You don't approve every command. The sandbox simply *limits what damage is possible*. Read-only mounts for most of your filesystem. No network egress unless you configure an allow-list. The web UI lets you adjust the proxy rules live while the sandbox is running.

**Credential injection is the killer feature.** API keys for OpenAI, Anthropic, GitHub, etc. are stored in the proxy, not in the agent's context. When the agent's code hits `api.openai.com`, the proxy substitutes a placeholder token with the real key. The agent never sees the secret. This alone is worth the setup — it eliminates an entire class of prompt injection exfiltration risks.

**Any agent, any sandbox.** You can run Claude Code against the v86 sandbox, Codex against the Quicksand one, or Pi against the Apple Container one. The protocol is the same. Add a new sandbox backend later without changing your agent config.

## What's Not Great

**It's not fast.** v86 emulates a 32-bit x86 CPU in WebAssembly. It works for running Python scripts, git commands, and basic tooling — but don't expect to compile large projects inside it. The Apple Containers and Quicksand backends are faster but still add overhead compared to native execution.

**Network setup requires thought.** The default is no network access. This is the safe default, but it means your agent can't `npm install` or `pip install` anything unless you configure the proxy allow-list. For active development, you'll want a permissive proxy rule — and that requires understanding what your dependencies actually need.

**Node.js 22 is a hard requirement** for the v86 backend. If you're on an older Node version or Windows, you'll need to use one of the other backends.

**Early days.** The protocol is revision 1. The implementations are prototypes. Expect rough edges, especially around mount overlap handling and the WebSocket shell's stdin handling.

## The Verdict

External sandboxes solve a real pain point that's been getting worse as we trust agents with more autonomy. The manual-approval treadmill doesn't scale. Full trust doesn't either. This is a genuine third path.

For solo developers experimenting with coding agents: the v86 backend is worth a weekend afternoon to set up. The ~36 MB download and `npx` one-liner make it painless to try. You'll lose some speed, but you gain real isolation — no more hoping your agent doesn't accidentally `rm -rf` something or pipe a secret into a log file.

For teams: the credential injection and network proxy alone justify the overhead. If you're running Claude Code or Codex in production-like workflows, this gives you auditability and blast-containment that no amount of "trust the auto-review" can match.

I'd love to see hosted versions of these sandboxes (Fly's Sprites model with per-agent sandboxing). But for now, running one locally is cheap insurance.

**Try it:** `npx external-sandbox-v86` in any project directory. That's it.

*Sources: [Prime Radiant Blog - External Sandboxes for Coding Agents](https://blog.primeradiant.com/external-sandboxes-for-coding-agents/), [github.com/prime-radiant-inc/external-sandbox-v86](https://github.com/prime-radiant-inc/external-sandbox-v86)*