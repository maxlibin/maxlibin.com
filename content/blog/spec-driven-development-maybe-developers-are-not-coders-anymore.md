---
title: "Spec-Driven Development: Maybe Developers Are Not Coders Anymore"
date: 2026-08-29T08:05:24Z
modified: 2026-08-29T08:05:24Z
excerpt: "Recently I have been changing quite a lot of things in the way I code. I slowly moved a lot of my work from Claude Code to Pi. I started using Herdr instead of my usual tmux setup, mainly because I like having multiple coding agents running in different panels and being able to clearly"
---

Recently I have been changing quite a lot of things in the way I code.

I slowly moved a lot of my work from Claude Code to Pi. I started using Herdr instead of my usual tmux setup, mainly because I like having multiple coding agents running in different panels and being able to clearly see what each agent is doing.

One agent might be researching something.

Another one is implementing.

Another one is running tests.

And I am sitting there looking at all of them.

At some point I realized something quite funny.

**I am actually writing less and less code myself.**

But I don't feel like I am doing less development.

Actually, sometimes I feel I am doing more.

The work has just moved somewhere else.

And I think this is where **spec-driven development** starts to become very interesting.

## We Had Vibe Coding. Now Maybe It Is Time for Spec Coding.

When AI coding tools first became really useful, my workflow was basically:

```text
Me:
"Can you add this feature?"

AI:
"Sure."

*starts changing 15 files*
```

And honestly, it was amazing.

You describe something, Claude Code or another agent starts working, and a few minutes later you have something running.

This is what people started calling vibe coding.

And I still enjoy it.

But there is one big problem with vibe coding.

**The AI is very fast at building the wrong thing.**

If my instruction is:

> Add an organization invitation system.

That sounds clear to me.

But actually it isn't clear at all.

Can normal members invite someone?

Can only admins do it?

Can I invite somebody who already belongs to the organization?

Can I send the invitation twice?

Does it expire?

Can I cancel it?

What happens when the email fails?

What happens if the user accepts it after being removed?

There might be 20 decisions hidden inside one simple sentence.

And if I don't make those decisions...

the AI will.

That is the dangerous part.

The AI doesn't usually stop and say:

> Max, your requirement is quite crap. Please think about it more.

😂

Normally it will just confidently decide something and start coding.

## AI Made Coding Cheap. Thinking Is Still Expensive.

This is probably the biggest change I see in software development today.

Writing code is becoming very cheap.

I can have Pi, Claude Code, Codex or another agent generate a huge amount of code very quickly.

Boilerplate?

No problem.

API?

No problem.

Database migration?

Tests?

React component?

Refactoring?

Documentation?

All can be generated.

So the bottleneck starts moving.

Previously:

```text
Idea
 ↓
Developer thinks
 ↓
Developer writes lots of code
 ↓
Test
 ↓
Ship
```

Now:

```text
Idea
 ↓
Developer defines what should happen
 ↓
Spec
 ↓
Plan
 ↓
AI writes lots of code
 ↓
AI tests it
 ↓
Developer verifies
 ↓
Ship
```

The developer hasn't disappeared.

We just moved upward.

## I Don't Think We Are Becoming "Prompt Engineers"

People used to say developers would become prompt engineers.

I don't really like that description.

Typing:

> Build me a beautiful dashboard.

isn't engineering.

I think the developer is becoming something closer to a **director**.

You decide what you want.

You decide the architecture.

You set the boundaries.

You tell the agents what they are allowed to touch.

You define what success means.

Then you let them execute.

It actually reminds me a little bit of becoming a software lead.

When you have developers working under you, you don't normally sit beside them and type every line of code.

You explain what needs to happen.

You review the direction.

You catch problems.

You make decisions when there are trade-offs.

Now imagine your team members can write code unbelievably fast, never get tired, and you can launch five of them at the same time.

That is basically where AI coding is heading.

Except these team members have another interesting characteristic:

**If your instruction is bad, they can produce a massive amount of bad code extremely quickly.**

So suddenly writing a good specification becomes very valuable.

## This Is Why I Started Looking at Spec Tools

Recently I started looking more into tools and workflows around this idea.

One of the interesting ones is **Superpowers**. [Superpowers on GitHub](https://github.com/obra/superpowers?utm_source=chatgpt.com)

Superpowers basically tries to stop your coding agent from immediately jumping into code.

The workflow is closer to:

```text
I have an idea
 ↓
AI talks through the idea with me
 ↓
We clarify the design
 ↓
Create the spec
 ↓
Create implementation plan
 ↓
Implement
 ↓
Test
 ↓
Review
```

This makes a lot of sense to me.

The agent first tries to understand what you actually want before it starts destroying — sorry, "modifying" — your codebase.

Superpowers has grown into a complete development methodology around coding agents, including brainstorming, planning, TDD and subagent-driven implementation.

## And Then There Is grill-me

Another tiny tool I found quite interesting is **grill-me**. [grill-me on GitHub](https://github.com/JRA-CodingLab/grill-me?utm_source=chatgpt.com)

The concept is very simple.

Before coding:

```text
/grill-me plan
```

And instead of coding, the agent grills you.

Why?

What should happen here?

What happens if this fails?

Is this allowed?

What shouldn't change?

What is out of scope?

How do we know the feature is complete?

Basically the annoying developer in the meeting who keeps asking questions.

Except this annoying developer is actually useful.

After implementation you can run:

```text
/grill-me check
```

and it checks the result against what you originally agreed to. Its current implementation is specifically a Claude Code skill with separate planning and verification/repair modes.

I like this idea because it solves one of my own bad habits.

Sometimes I have an idea and immediately want to see it working.

So I tell the AI:

> Let's build this.

Ten minutes later there are 20 changed files.

Then I realize:

> Wait... maybe this isn't exactly what I wanted.

The coding was fast.

The thinking wasn't finished.

## OpenSpec Takes It One Step Further

Another one I like is **OpenSpec**. [OpenSpec on GitHub](https://github.com/Fission-AI/OpenSpec?utm_source=chatgpt.com)

OpenSpec is interesting because instead of treating the conversation with the AI as the source of truth, it makes the specification something that actually lives with the project.

You have the current specification of the system and proposed changes.

Something like:

```text
openspec/
    specs/
        authentication
        organizations
        projects
        tasks

    changes/
        add-project-sharing
        improve-invitations
```

So instead of:

```text
"Remember what we discussed 4 hours ago?"
```

you have an actual artifact.

The human can read it.

The AI can read it.

Another AI agent can read it.

Future-you can read it.

And OpenSpec's own description is basically that you and your coding agent should have a shared, reviewable plan before code is written.

I think this becomes increasingly important once we start using many agents.

## Because Multi-Agent Coding Has a Context Problem

This is something I notice much more now that I like running multiple coding agents.

Suppose I have:

```text
Agent 1 → backend

Agent 2 → frontend

Agent 3 → tests

Agent 4 → review
```

What connects all four agents?

It shouldn't be my original two-line prompt.

It should be the spec.

```text
                 SPEC
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Backend    Frontend    Tests
       │          │          │
       └──────────┼──────────┘
                  ↓
               Review
```

Suddenly the spec is almost like the API between humans and agents.

Everyone is working against the same definition of the feature.

That is much better than every agent interpreting:

> "Make the project sharing feature better."

in its own creative way.

## GitHub Is Thinking About This Too

GitHub has its own project called **Spec Kit**. [GitHub Spec Kit](https://github.com/github/spec-kit?utm_source=chatgpt.com)

Its basic flow is:

```text
Specify
 ↓
Plan
 ↓
Tasks
 ↓
Implement
```

And I think the important part isn't really the commands.

It is the philosophy behind it.

GitHub describes Spec-Driven Development as moving specifications from disposable scaffolding toward something that can directly drive implementation.

That is a pretty big mental change.

Previously:

```text
Code = truth
Documentation = hopefully updated
```

Now we may be moving toward:

```text
Intent
 +
Specification
 +
Architecture
 +
Tests

      ↓

Implementation
```

And the implementation may increasingly be generated.

## Agent OS Has Another Idea I Like

There is also **Agent OS**. [Agent OS on GitHub](https://github.com/buildermethods/agent-os?utm_source=chatgpt.com)

What I like about this one is that it also thinks about your engineering standards.

Because requirements are only half the problem.

You might tell an agent exactly **what** to build.

But you also need to tell it **how we build things here**.

For example:

```text
We use Fastify.

Use JSON Schema for API validation.

Business logic doesn't belong in route handlers.

Use PostgreSQL.

Don't introduce another state library.

Don't create abstractions unless we actually need them.

Every new API requires tests.
```

Those aren't feature requirements.

Those are engineering standards.

Agent OS focuses on discovering, organizing and injecting those codebase standards while helping agents shape better specs.

That makes a lot of sense in a company environment.

Because otherwise every AI coding agent suddenly has its own architectural philosophy.

And that can get ugly very quickly.

## Then You Have the Heavy Ones Like BMAD

If you want to go much further, there is **BMAD Method**. [BMAD Method on GitHub](https://github.com/bmad-code-org/BMAD-METHOD?utm_source=chatgpt.com)

BMAD feels less like:

> Help me write this feature.

and more like:

> Here is my software company. Please give me a product manager, architect, developer, QA and other roles.

It can become a much bigger workflow around brainstorming, planning, architecture, implementation and review. Its current core includes separate brainstorming and multi-lens review skills, along with optional modules for broader workflows.

Personally, I don't think I need that level of process for every feature.

Sometimes I just want:

```text
idea
 ↓
grill me
 ↓
spec
 ↓
build it
```

I don't need a virtual board meeting before changing one API endpoint.

😂

But for a completely new product or a big project, I can see the value.

## The Spec Doesn't Need to Be Huge

And this is important.

When I say "spec-driven development," I don't mean going back to the old enterprise days where we write a 67-page Word document before anybody is allowed to touch the keyboard.

That sounds horrible.

A spec can be very small.

For example:

```text
Feature:
Organization invitations

Goal:
Allow admins to invite users by email.

Rules:
- OWNER and ADMIN can invite.
- MEMBER cannot invite.
- Existing members cannot be invited.
- Duplicate pending invites are rejected.
- Invitations expire in 7 days.

Don't:
- Automatically add the user.
- Change existing membership permissions.

Done when:
- Invite API works.
- Permission cases are covered.
- Duplicate case is covered.
- Expiration is covered.
- Tests pass.
```

That's already massively better than:

> Add invitations.

The point isn't documentation.

The point is **removing ambiguity before spending compute generating implementation**.

## AI Makes Bad Requirements More Expensive, Not Less

This is actually quite ironic.

AI made implementation cheaper.

But because implementation is cheaper, unclear requirements can become more expensive.

Before AI, if the requirement was bad, a developer might spend two hours writing something and gradually realize:

> Hmm, this doesn't make sense.

Now an AI agent can build the entire wrong feature before you realize the requirement was bad.

So you haven't removed waste.

You have accelerated it.

That's why I think we will eventually move away from pure vibe coding for serious software.

Vibe coding is fantastic for prototypes.

I use it.

I enjoy it.

I'll continue using it.

But once the feature matters, I increasingly want something like:

```text
Idea
 ↓
Explore
 ↓
Grill
 ↓
Spec
 ↓
Plan
 ↓
Implement
 ↓
Verify
```

## My Job Is Starting to Feel Different

This is probably the part I find most interesting.

When I have Herdr open with several agents working, I sometimes feel less like the programmer and more like the person standing above the whole system.

One agent is coding.

One is looking at another issue.

One is running tests.

Maybe another is investigating the repository.

And my job becomes:

> No, don't do that.
> 
> This abstraction isn't necessary.
> 
> We already have something for this.
> 
> This should belong in the backend.
> 
> Why are you changing that file?
> 
> This isn't what I meant.
> 
> Okay, this part looks good.

Which, when I think about it, sounds suspiciously like being a software lead.

Except now every developer in the team is an AI agent that can type unbelievably fast.

The skill becomes less:

> How fast can I write TypeScript?

and more:

> How clearly can I define the system?

## Maybe the Developer Becomes the Spec

I don't think code is disappearing.

And I definitely don't think understanding code becomes unnecessary.

If anything, when an agent can generate thousands of lines for you, knowing whether those thousands of lines are nonsense becomes even more important.

But the center of gravity is shifting.

My value isn't that I can type:

```ts
const result = await prisma.organization.findMany(...)
```

The AI can type that perfectly fine.

The valuable part is knowing:

> We shouldn't query the database this way because this relationship works differently.

or:

> This feature shouldn't exist at this layer.

or:

> If we design it this way now, we are going to regret it six months later.

or simply:

> This isn't actually the problem the user has.

AI is very good at execution.

Humans still need to provide judgment.

## So Maybe This Is the Next Phase After Vibe Coding

I don't think spec-driven development replaces AI coding.

It's actually the opposite.

It becomes important **because AI coding is getting so good**.

When implementation was expensive, writing extremely detailed instructions sometimes wasn't worth it.

When implementation takes minutes, defining the right implementation becomes the bottleneck.

So perhaps the progression looks like:

```text
Manual coding
     ↓
Copilot
     ↓
AI chat
     ↓
AI coding agents
     ↓
Vibe coding
     ↓
Spec-driven agents
     ↓
Multiple agents executing one intent
```

And I think we are somewhere around the last few steps right now.

I'm still experimenting with Superpowers, OpenSpec, grill-me and the other approaches.

I don't think there is one perfect workflow yet.

Maybe there never will be.

But one thing is becoming quite clear to me:

**The better AI gets at writing code, the less interesting writing the code itself becomes.**

The interesting part moves to deciding:

**What exactly should we build?**

**Why are we building it?**

**What should it do?**

**What should it never do?**

**And how do we know the AI actually built the thing we asked for?**

Maybe developers are slowly becoming less like code writers and more like directors of software.

And personally, I actually quite enjoy that.
