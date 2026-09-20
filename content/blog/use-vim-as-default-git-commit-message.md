---
title: "Use vim as default Git commit message"
date: 2023-01-10T17:04:45Z
modified: 2024-07-30T03:49:52Z
excerpt: "When you doing git merge in terminal sometime you get annoyed by the default merge message editor that git provided, most of the time is in nano and sometime because you are so pro in vim editor you type too fast and accidently append the usual comands to nano. This annoyed me alot, so you"
---

When you doing git merge in terminal sometime you get annoyed by the default merge message editor that git provided, most of the time is in nano and sometime because you are so pro in vim editor you type too fast and accidently append the usual comands to nano.

This annoyed me alot, so you want to change your default commit message editor to vim or nvim.

```
git config --global core.editor "vim"
```

**Bonus:**

Consider switching your zsh/bash shell to Vi mode for enhanced efficiency and a better command-line experience.

```
set -o vi
```
