---
title: "Alias git to pull current branch"
date: 2020-03-03T00:41:07Z
modified: 2023-01-30T09:57:38Z
excerpt: "Alias git to pull current branch Git 2.22 onwards has a current branch flag, with git branch —show-current allows you to see which brach you are at now, sometime you want to pull current branch changes, and the easiest config in my opinion is to set a alias in your bash_profile or zshrc without messing"
---

Alias git to pull current branch  
Git 2.22 onwards has a current branch flag, with git branch —show-current allows you to see which brach you are at now, sometime you want to pull current branch changes, and the easiest config in my opinion is to set a alias in your bash\_profile or zshrc without messing your git config settings.

```
alias gp=“git pull origin $(git branch —show-current)”
```

now you just need to type gp, it will pull your current branch origin.

This can be quite useful for many other things, for example I am also using it to bind to git reflog

```
alias rlog=“git reflog $(git branch —show-current)”
```

Hope you enjoy this kind of git binding.

Update: Please make sure that you use single quote intead of double quote for this alias, or else zsh will prompt you if there are not git repo in this folder when you start zsh.

```
alias gp='git pull origin $(git branch —show-current)'
```
