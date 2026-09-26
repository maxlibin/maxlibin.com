---
title: "What Is an FDE? Why I’m Paying Attention to Forward Deployed Engineers"
date: 2026-09-26T00:00:00Z
modified: 2026-09-26T00:00:00Z
excerpt: "A developer’s take on forward deployed engineers: why AI companies hire them, what the work involves, and how to build the skills to become one."
---

With AI helping us write code faster, I keep thinking about what becomes more valuable for developers.

I use AI coding tools myself, and I enjoy being able to move from an idea to something working more quickly. But there are decisions I still have to make. What should I build? Does it solve the actual problem? Will anyone use it after the first try?

That is why the **forward deployed engineer**, or **FDE**, caught my attention.

The title sounds fancy. Once you look at the work, though, the idea feels quite familiar: work closely with a customer, understand their problem, build a solution, and stay involved long enough to make it useful.

I think there is something here for developers, even those who have no intention of applying for an FDE job.

## So, what does an FDE do?

An FDE is a software engineer who works directly with customers to build and deploy solutions in their environment.

That could mean sitting with an operations team to understand a process, connecting several internal systems, writing an application, or figuring out why something that worked in a demo fails with the customer’s data.

“Forward deployed” refers to being close to where the work happens. Some roles involve substantial time at customer sites; others combine visits with remote collaboration.

The role existed long before ChatGPT. Palantir helped popularize it, and its [2020 explanation of the role](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1) is still a useful introduction.

What interests me is where the work starts. A customer might say:

> “My team spends half the day checking documents. Can we do something about that?”

There may be no ticket, no agreed architecture, and no clear explanation of what “checking” involves. The engineer has to help work that out.

If this sounds like parts of consulting, solutions engineering, or being a developer at a small company, I agree. There is plenty of overlap. I would look at the responsibilities before getting too attached to the title.

## Why is it getting attention now?

Look at what [OpenAI](https://openai.com/careers/forward-deployed-engineer-singapore-singapore/) and [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5302966008) are hiring FDEs to do: work with customers, build production applications, and help turn their models into something useful inside a business.

To me, that says a lot about the work still needed around AI.

Imagine giving two companies access to the same model. One wants to handle support requests. The other wants to process supplier documents. Even if both want a chatbot, their data, permissions, systems, and expectations will differ.

Someone needs to understand those details.

A demo can use a clean document and a carefully chosen question. A business has old records, missing information, people with different access levels, and exceptions that someone has been handling manually for years.

My view is that this explains much of the interest in FDEs. Companies need engineers who can get involved in that messy part and make progress.

There is a benefit for the software vendor too. When engineers keep encountering the same problem across customers, they can bring that information back to the product team. A custom fix today might reveal a feature that many customers need.

I find this more interesting than another discussion about which coding tool generates a function fastest. Faster coding is useful. I also want to know whether we are getting better at choosing what to build.

## What would the work look like?

Let’s take a hypothetical invoice-processing project.

A finance team receives invoices by email, opens each attachment, checks it against a purchase order, and enters the details into an accounting system. Someone asks for an AI agent to automate it.

My first question would be: “Can you show me how you do it today?”

Watching the process might reveal that reading the invoice is fairly easy. Most of the time goes into figuring out which purchase order it belongs to, or chasing someone when the amount does not match.

That changes what I would build.

An initial version might extract the invoice details, suggest a matching purchase order, and show the result to a person for review. Ordinary code can check totals. A model can help interpret the document. Payment approval can stay with the finance team.

Then the less glamorous work begins. What if the supplier sends the same invoice twice? What if the scan is unreadable? What if the accounting API times out after accepting the request?

You need to handle those cases, make errors visible, and give people a way to recover.

Once the team starts using it, I would want to measure the time spent per invoice, how often the output needs correcting, and how much review work remains. I would also ask the users what still annoys them.

That is the part of FDE work I find appealing. You get to follow the problem far enough to see whether your decisions helped.

## The skills I would focus on

You still need to be a capable software engineer. APIs, databases, authentication, testing, and deployment all matter. You should be able to trace a failure through a system and explain what happened.

For someone already working with TypeScript, Python, and databases, there is a useful foundation to build on. I would spend time getting better at integrations: reading unfamiliar API documentation, mapping data between systems, handling retries, and working out access permissions.

I would also get comfortable with imperfect data. In our invoice example, the same supplier might have three slightly different names across three systems. An impressive model does not automatically make that problem disappear.

For AI-focused roles, you need practical experience with model APIs, structured outputs, retrieval, tool calling, and evaluations. An evaluation gives you a repeatable way to test the system against representative examples. Without one, it is easy to mistake a few good responses for a reliable application.

You should understand the cost and latency of your design, what the model can get wrong, and what actions it is allowed to take.

Then there is the skill I suspect some developers would underestimate: asking good questions.

When someone says, “We need an AI assistant,” can you get them to explain the task they are struggling with? Can you agree on a useful first version? Can you explain why a requested feature would delay the project without helping much?

You do not need to become the loudest person in the meeting. Listening carefully, writing clearly, and being honest about uncertainty will take you a long way.

You also need enough curiosity to learn the customer’s domain. You cannot make sensible decisions about an invoice workflow if you never bother to understand how the finance team works.

## Who is hiring?

These are a few examples from official job listings I checked for this article:

| Company | What its FDE work involves |
|---|---|
| [OpenAI](https://openai.com/careers/forward-deployed-engineer-singapore-singapore/) | Taking customer AI deployments from discovery and design through to production. There is a Singapore role. |
| [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5302966008) | Building production applications with Claude inside customer systems and developing reusable deployment patterns. |
| [Palantir](https://jobs.lever.co/palantir/5168e8fd-fec1-4fea-b7a1-81bdaea65850) | Building applications, data solutions, and AI workflows around customers’ operational problems. |
| [Reducto](https://jobs.ashbyhq.com/reducto/b0c9caa5-6448-4b7c-8ee1-6e9630a60951/) | Integrating and tuning document-processing systems, including debugging difficult customer cases. |

*Listings checked on 26 September 2026; availability and requirements can change.*

The experience requirements vary. The OpenAI listing asks for five or more years, while Anthropic asks for four or more. Palantir also lists [new-graduate opportunities](https://www.palantir.com/careers/open-positions/).

I would pay close attention to the everyday expectations. How much coding will you do? How many customers will you work with? Who maintains what you ship?

Travel matters too. The OpenAI Singapore listing specifies 50% travel, and the Anthropic listing estimates 25%. That is a meaningful part of the job to consider, especially if you have a family.

## How would I get started?

If I were moving toward an FDE role, I would start with one real user and one problem.

Find someone doing a repetitive task. It could be a team at work or a small business willing to let you help. Ask them to walk you through it before you propose anything.

Choose a small piece you can improve. Agree on what success would look like, build it using data you have permission to access, and let them try it.

Then come back after they have used it for a while.

Did they keep using it? Where did they get stuck? Did it save time, or did the work move somewhere else?

That experience gives you something valuable to discuss in an application: how you understood the problem, what you chose to build, what failed, and what changed after feedback.

I would write it up as a short case study with a diagram, the main technical decisions, and whatever results I could honestly measure. If it is a simulated project using synthetic data, I would make that clear.

If you are already a developer, look for opportunities to join customer conversations and take responsibility beyond implementation. If you are new to programming, focus first on learning to build, debug, and deploy a complete application. The customer work adds to that foundation.

For interviews, I would practice working through vague requests aloud. Ask questions, explain your assumptions, propose a manageable scope, and discuss how you would test it. Keep your coding skills sharp too.

I would not wait until I knew every agent framework before starting.

What draws me to FDE work is how close it puts engineering to the consequences of what we build. You have to care whether the data is usable, whether the workflow makes sense, and whether someone can rely on the result.

I still enjoy writing code, and I want AI to help me do it faster. I also want to spend more time understanding the people who will use it. The next time someone asks me to build an AI feature, “show me how you do this today” feels like a good place to start.
