---
title: "Why I’m Slowly Ditching Claude Code for Pi"
date: 2026-08-21T07:30:30Z
modified: 2026-08-27T14:15:45Z
excerpt: "I’ve been using Claude Code quite heavily for coding, and to be clear: I still think it’s a very good tool. But recently I noticed something. I’m opening Claude Code less and less. And instead, I’ve slowly been moving more of my daily coding work to Pi. This wasn’t really a planned migration. I didn’t"
---

I’ve been using Claude Code quite heavily for coding, and to be clear: I still think it’s a very good tool.

But recently I noticed something.

I’m opening Claude Code less and less.

And instead, I’ve slowly been moving more of my daily coding work to **Pi**.

This wasn’t really a planned migration. I didn’t wake up one morning and decide, *“Okay, Claude Code is dead to me.”*

It was more like this:

I tried Pi.

Then I used it again the next day.

Then again.

And after a while, I realized I was naturally reaching for `pi` instead of `claude`.

There are a few reasons why.

## The first thing I noticed: it feels lighter

Probably the biggest immediate difference for me was **token usage**.

This is purely based on my own usage rather than some scientific benchmark, but Pi generally feels much less wasteful with context.

With coding agents, token usage can get ridiculous surprisingly fast.

You ask something simple.

The agent scans half the repository.

It thinks.

It calls another tool.

It reads another 20 files.

Suddenly a seemingly small task has consumed a massive amount of context.

With Pi, I feel like I have much more control over this.

Part of that comes from Pi deliberately being a fairly minimal coding harness. The default setup gives the model a small set of core tools, and the system itself is designed around letting you decide what gets added on top.

That simplicity matters more than I expected.

I don’t necessarily want my coding agent to be an entire operating system.

Sometimes I just want:

> Here is my code. Understand it. Change these three things. Show me what you are doing.

Pi feels much closer to that philosophy.

## I can actually see what is happening

This is probably the thing I appreciate most.

**Pi feels transparent.**

When it reads something, I can see it.

When it edits something, I can see it.

When the context is getting large, I have ways of managing it.

There is less of that feeling where you send a prompt and then watch some mysterious agent machinery disappear into the background.

I’ve realized that I don’t actually want a coding agent to hide everything from me.

I want AI to do the boring work, yes.

But I still want to understand what it is doing to my codebase.

Especially when the code actually matters.

For me, a good coding agent shouldn’t just be autonomous.

It should be **inspectable**.

That difference sounds small, but after using these tools every day, it changes the whole experience.

## `/tree` is surprisingly addictive

One feature I didn’t expect to care much about is Pi’s session tree.

Run:

`/tree`

and you can navigate back through the history of the conversation.

Pi stores sessions as trees rather than pretending a coding session is one giant straight line. You can go back to an earlier point, explore another direction, fork from previous messages, clone a branch, or compact older context.

This matches how coding actually works.

Coding conversations are almost never:

A → B → C → D → success.

They are more like:

A → B → C

then...

“Actually, this approach sucks.”

Back to B.

Try something else.

Then realize something from C was useful.

Then branch again.

With a traditional linear chat, all of those failed experiments stay mixed into the context.

Pi embraces the fact that conversations branch.

I can explore one solution, decide I don’t like it, jump backwards and continue from somewhere else without mentally carrying all the garbage from the abandoned path.

Once you get used to it, it feels strangely obvious.

Why *wouldn't* coding-agent history work like Git branches?

## Pi feels more like a tool I own

This is probably the bigger philosophical reason I’m moving toward Pi.

Pi itself is intentionally small, but you can extend it with TypeScript extensions, skills, prompt templates, themes and packages.

That means instead of waiting for the company behind the coding agent to decide what feature I’m allowed to have, I can change the environment myself.

Want different behavior?

Extend it.

Want another provider?

Configure it.

Want project-specific instructions?

Use `AGENTS.md`, `CLAUDE.md`, or your own system configuration.

Want to completely change how compaction behaves?

That can be extended too.

This feels much closer to the Unix philosophy that I like:

**give me a small tool and let me compose it into what I need.**

Claude Code increasingly feels like a product.

Pi feels more like infrastructure.

And I’m starting to prefer infrastructure.

## The awkward part: Claude subscriptions

There was one problem though.

I still like Claude models.

A lot.

Moving away from Claude Code doesn’t necessarily mean I want to move away from Claude itself.

And this is where things get a little complicated.

Anthropic explicitly restricts how Claude subscription OAuth credentials can be used. Their current documentation says OAuth for Claude subscriptions is intended for Claude Code and other native Anthropic applications, while developers building third-party products should use API-key authentication instead. Anthropic also says third parties aren't permitted to route requests through Free, Pro or Max subscription credentials on behalf of users.

From Anthropic’s point of view, I can understand the business reason.

From a user point of view, though, it definitely feels like lock-in.

I’m already paying for access to Claude.

I like Claude.

I just want to choose the coding harness around it.

That tension is one of the reasons open coding-agent ecosystems are becoming much more interesting to me.

## And of course, the community found a way

One thing I like about an extensible tool is that when somebody encounters a problem, they can build something around it.

There are already community extensions such as **`pi-claude-code-auth`** and **`pi-claude-auth`** that integrate existing Claude Code credentials with Pi.

That said, there is an important warning here.

At least one of these extensions explicitly warns that it relies on behavior that Anthropic does not officially permit for third-party subscription access, and that using it may create account-suspension or compatibility risks.

So this isn’t something I’d describe as an officially supported solution.

Use it only if you understand what it is doing and understand the risk.

For normal supported usage, Pi itself also supports API-key providers and documents subscription login options for supported providers.

Still, I find the existence of these extensions interesting for another reason:

**the tool doesn't dictate the ecosystem.**

People can experiment.

People can replace pieces.

People can build their own workflow.

That is something I increasingly value.

## Switching models should be normal

Another thing I’m becoming less interested in is tying my coding workflow to a single model vendor.

Claude might be the model I prefer today.

Maybe tomorrow I’ll want GPT.

For some tasks I might want Gemini.

For something cheap and simple, maybe I want a smaller model.

For local or sensitive work, perhaps eventually I’ll want something running locally.

The important part is that **my coding environment shouldn't have to change every time my preferred model changes**.

The coding harness and the intelligence behind it should be two separate choices.

Pi feels much closer to that world.

And I think this is where coding agents are eventually heading anyway.

The model becomes interchangeable.

The valuable part becomes your context, tools, skills, rules, extensions and workflow.

## I don't need my coding agent to do everything

There has been a trend in AI developer tools toward doing more and more.

More agents.

More sub-agents.

More background processes.

More orchestration.

More automatic planning.

More tools.

More magic.

Some of that is genuinely useful.

But after using coding agents heavily, I’m starting to appreciate the opposite direction too.

I don't always want more intelligence.

Sometimes I want **less machinery between me and the intelligence**.

Give the model good context.

Give it some simple tools.

Let me see what it is doing.

And get out of the way.

That is probably the best way I can describe why Pi has been growing on me.

## Am I completely leaving Claude Code?

Not yet.

There are still things Claude Code does extremely well, and it is certainly more polished in some areas.

I’m also not claiming Pi magically produces better code.

The underlying model still matters enormously.

What has changed is my preference for the **environment around the model**.

I want lower overhead.

I want transparency.

I want control over context.

I want to move backwards through conversations.

I want to fork ideas.

I want to switch models.

I want extensions.

And most importantly, I don't want my entire developer workflow to depend on one AI company deciding what my coding interface should look like.

So for now, I’m not dramatically “quitting Claude Code.”

I’m just noticing that every week, I type:

`pi`

a little more often.

And:

`claude`

a little less.

Usually, that’s how a tool gets replaced.

Not with a big announcement.

You simply stop opening the old one.
