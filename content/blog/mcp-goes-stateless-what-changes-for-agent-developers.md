---
title: "MCP Goes Stateless: What the 2026-07-28 Spec Changes for Every Agent Developer"
date: "2026-10-30"
modified: 2026-10-30
excerpt: "The Model Context Protocol just got its biggest overhaul since launch — sessions are dead, the initialize handshake is gone, and every HTTP request is now self-describing. Here's what breaks, what gets easier, and what you need to migrate."
tags: ["mcp", "model-context-protocol", "ai-agents", "agent-infrastructure", "protocol", "scalability", "devops"]
---

If you build AI agents that call external tools — and let's be honest, that's most of us now — you've been relying on the Model Context Protocol (MCP). It's the glue connecting LLMs to databases, APIs, file systems, and search engines. As of July 2026, that glue fundamentally changed.

The 2026-07-28 MCP specification is the largest protocol update since the standard launched in late 2024. It removes protocol-level sessions and the `initialize` handshake entirely in favor of a fully stateless request model. All official SDKs (TypeScript, Python, Go, C#, Rust) now support it, and clients like Claude Code have been probing for `2026-07-28` since version 2.1.292.

Here's what actually changes, why it matters, and what you need to migrate.

## The Problem: Sessions Don't Scale

MCP started as a protocol for local tool calling — an LLM talking to a server on `stdio` over your lunch break. That worked fine. The session model (`initialize` handshake → `Mcp-Session-Id` header on every request) was designed for a single client talking to a single server process.

But then we started deploying MCP servers behind Kubernetes clusters with three, ten, a hundred pods. And session affinity broke everything.

> Standard round-robin load balancers don't know which container holds which in-memory session. A second request from the same client randomly hits a different pod and gets a 400 "Session Not Found" error.

The workarounds were painful: sticky-session routing (defeats even load distribution), shared Redis session stores (adds latency and ops overhead), or pinning every client to a specific pod (zero fault tolerance — if that pod restarts, bye-bye state).

Google's cloud infrastructure team hit this wall hard. Working with Hugging Face and others, they co-founded the MCP Transports Working Group. The result is the 2026-07-28 spec.

## What Actually Changed

The old flow looked like this:

```
POST /mcp  → initialize handshake → Mcp-Session-Id returned
POST /mcp  → tools/call + Mcp-Session-Id header → response
POST /mcp  → resources/read + Mcp-Session-Id → response
```

Every request after the first required that session header, pinning the client to the server instance that held the conversation state.

The new flow drops all of that:

```
POST /mcp  → tools/call (self-describing request) → response
POST /mcp  → resources/read → response
POST /mcp  → tools/list (cacheable, TTL-aware) → response
```

Each request now carries everything the server needs to process it — protocol version, client info, and capabilities — in the request metadata itself. No handshake. No session ID. No sticky routing.

**Concrete changes:**
- The `initialize`/`initialized` handshake (SEP-2575) is removed
- The `Mcp-Session-Id` header (SEP-2567) is gone
- The `server/discover` endpoint is now mandatory
- Tool, prompt, and resource list responses require `ttlMs` and `cacheScope` fields for client-side caching
- Multi round-trip requests (MRTR) replace server-pushed client features
- Error codes have been renumbered

## What This Means in Practice

### For Server Authors

If you maintain an MCP server, your production server likely needs an update. The official SDKs handle protocol negotiation automatically — the Python SDK v2 defaults to `mode='auto'`, which probes for `2026-07-28` and falls back gracefully. The TypeScript SDK v2 stays on the 2025-era protocol unless you opt in with `versionNegotiation: { mode: 'auto' }`.

The one thing you *must* do: stop relying on in-memory session state. If your server was using the `Mcp-Session-Id` to look up per-client context stored in memory, you need to move that context to explicit request-scoped data — a tool parameter, a resource URI, or a server-side key the client passes back.

### For Client/Host Authors

Claude Code started negotiating for `2026-07-28` around version 2.1.292. If you wrote a custom MCP client, you need to support the new protocol version or risk legacy-only fallback.

### For Teams Running MCP at Scale

This is the big win. Any pod can now handle any request. Standard HTTP load balancers work without sticky sessions. Pods can restart without dropping active connections. You can scale to thousands of concurrent agent sessions without a shared Redis cluster.

Google's post on the change calls it "more scale, more secure, just as easy." That's not marketing fluff — it's genuinely the right call for production deployments.

## What's Deprecated

The spec also flagged several features for removal in the first revision on or after 2027-07-28:
- **Roots** (use tool parameters or resource URIs instead)
- **Sampling** (call your LLM provider's API directly)
- **Logging over MCP** (use `stderr` on stdio or OpenTelemetry)
- **Dynamic Client Registration** (use Client ID Metadata Documents)

None of these are critical to most setups, but worth planning for.

## Should You Migrate Now?

If you're running a production MCP server behind any kind of load balancer, **yes, do it this quarter**. The SDKs are stable (Python 2.3.0, TypeScript v2, C# SDK 2.0 just went stable this week), and clients are already probing for the new version. If your server only supports the 2025-era protocol, it will still work — but the next Claude Code update or Copilot release might start preferring `2026-07-28`, and the legacy path gets you nothing but a slower fallback.

If you're using stdio transport (local dev, single-machine agents), the change is largely invisible. Your SDK handles negotiation. It'll work either way.

## The Bottom Line

MCP went stateless, and that's a good thing. The protocol shed its local-first assumptions and grew up to handle the scale that agent workloads demand. The migration is straightforward if your SDK is up to date, and the payoff — load-balanced, fault-tolerant, horizontally-scalable agent infrastructure — is worth the upgrade.

**One caveat**: the spec docs themselves are dense, and the SDK defaults vary. Read the migration guide for your language before you cut over. The Python SDK handles auto-negotiation seamlessly; TypeScript requires an explicit opt-in. Know which camp you're in.

*Sources: [Google Developers Blog - MCP Stateless Updates](https://developers.googleblog.com/scaling-ai-agent-infrastructure-with-the-mcp-stateless-updates), [MCP 2026-07-28 Specification Overview](https://www.bdemerson.com/article/model-context-protocol), [Stateless MCP Migration Guide](https://flaviocopes.com/mcp-2026-07-28-stateless)*
