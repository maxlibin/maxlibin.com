---
title: "Running Multiple AI Coding Agents? Give Them Separate Git Worktrees"
date: 2026-09-29T00:00:00Z
modified: 2026-09-29T00:00:00Z
excerpt: "A practical Git worktree setup for running multiple AI coding agents, keeping changes separate, and reviewing their work before merging."
---

In my [post about moving from tmux to Herdr](https://maxlibin.com/im-using-herdr-instead-of-tmux-now/), I wrote about having several AI coding agents open at once. I like being able to see which agent is working and which one needs my attention.

But there is another question worth asking: where are those agents making their changes?

Two terminal panes can point at the same project folder. If both agents start editing, the changes end up mixed together. One might run tests while the other is halfway through rewriting a file. Later, someone has to work out which edits belong to which task.

Opening another pane is easy. Making the work easy to review takes a little more thought.

Git worktrees are worth a look here. This is the setup I would use for a small experiment with two agents working on independent tasks.

## Give each task somewhere to live

[Git worktrees](https://git-scm.com/docs/git-worktree) let you check out different branches in separate directories attached to one repository. The directories have their own working files and index, while sharing the repository’s objects and branch references.

Suppose a project needs CSV export and a settings-page layout fix. From the repository root, with both tasks starting from an up-to-date local `main`:

```bash
git worktree add -b feat/csv-export ../app-csv main
git worktree add -b fix/settings-layout ../app-settings main
git worktree list
```

Replace `main` if your project uses another base branch. These examples assume the branch names and destination directories do not already exist.

Open one terminal in `../app-csv` and another in `../app-settings`, then start your preferred coding agent in each. Uncommitted changes from your original directory are not included.

Now I can give each session a specific job and know where its edits should be.

I would also name the panes after the tasks. “CSV export” tells me more than “Agent 2,” especially when I return to the terminal after doing something else.

## The task still needs a boundary

Separate directories help, but the instructions matter just as much.

For the CSV task, I might write:

> Add CSV export to the existing transactions screen. Export the currently filtered results using the existing API and authorization rules. Keep the current table behaviour. Avoid changing shared UI components or dependencies unless necessary; explain any such change. Run the relevant checks, then report the changed files, what you verified, and anything still unresolved. Do not merge the branch.

There are still questions to settle. Should the export include every matching result or only the visible page? Which columns belong in it? What should happen when there are no results?

I would answer those before letting the agent implement the feature.

That connects to what I wrote about [spec-driven development](https://maxlibin.com/spec-driven-development-maybe-developers-are-not-coders-anymore/). A short request can hide decisions that affect the whole implementation.

For parallel work, I would add another consideration: how much do the tasks depend on each other?

A CSV export and an isolated CSS fix could be reasonable candidates. Changing an API response while another agent builds a screen around that response would need coordination. I would agree on the interface first, or finish the API change before starting the screen.

If I spend the afternoon carrying decisions between two sessions, I probably split the work badly.

## Check what the running apps share

I would write down the local setup for each task before starting it: dependencies, environment configuration, development port, and database.

For example, I might assign port 3001 to the export work and 3002 to the settings work. Otherwise, it is surprisingly easy to open a browser tab and review the wrong application.

I would set up each directory using the project’s normal development instructions. Local files such as an ignored `.env` need deliberate setup; creating a worktree checks out repository content, not the rest of my development environment.

The database deserves particular attention. If both applications point at the same development database, a migration or destructive test in one can affect the other. For tasks involving schema changes, I would use separate disposable databases or run them sequentially.

The same thinking applies to queues, uploaded files, and external integrations.

A worktree also provides no security boundary. An agent’s filesystem and network access depend on the permissions and sandbox of the tool running it. I would treat workspace separation and access control as separate setup decisions.

## Review before combining

When an agent finishes, I want something more useful than “done.”

I would ask it to commit the intended changes on its task branch and provide a short handoff: what changed, which commands it ran, whether they passed, and what it could not verify.

Then I would inspect the committed branch:

```bash
git diff --stat main...feat/csv-export
git diff main...feat/csv-export
```

The three-dot form compares the branch with its common ancestor with `main`. It does not include uncommitted work, so I would also check the task directory’s status. The [Git diff documentation](https://git-scm.com/docs/git-diff) explains the comparison.

For CSV export, I would look beyond whether a file downloads. Does filtering behave as agreed? Are commas and line breaks handled correctly? Can a user export records they should not be able to access?

Those checks come from the feature’s requirements. An agent adding tests is useful, but I still need to understand what those tests establish.

After reviewing each task, I would combine the branches one at a time on a temporary integration branch or through the project’s normal pull-request process. Start with a clean working directory; Git’s [merge documentation](https://git-scm.com/docs/git-merge) explains why existing uncommitted changes complicate recovery.

Then run the relevant checks on the combined result and try the affected workflows together. Two branches can each work independently and still disagree once combined. A merge without conflicts only tells me Git could combine the changes.

Once the work is committed, integrated, and no longer needed locally, clean up from the original repository:

```bash
git worktree remove ../app-csv
git worktree remove ../app-settings
```

Git normally refuses to remove a dirty worktree. If that happens, I would inspect what remains before removing anything.

## Start with two

I would start with two tasks. That is enough to find out whether parallel work helps without creating a pile of changes waiting for review.

The part I want to keep manageable is my own attention. If both agents finish and I can understand their changes, check them, and combine them comfortably, the arrangement is useful. If I have six completed branches and no idea which one to inspect first, I have given myself a different kind of backlog.

For a first attempt, I would pick one small feature and one unrelated fix, give each a clear scope, and see how the review goes.
