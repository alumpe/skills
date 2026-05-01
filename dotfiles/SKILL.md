---
name: dotfiles
description: >
  Guide for working with the dotfiles repository managed by chezmoi.
  Triggers on: "dotfiles", "chezmoi", "dot files".
---

# Dotfiles

The dotfiles repository is located at `~/dotfiles` and is managed by [chezmoi](https://chezmoi.io).

The chezmoi source directory is the single source of truth for all managed config files. Live files are deployed to their standard locations (e.g. `~/.config/`) via `chezmoi apply`.

## Permission Requirement

Never run any `chezmoi` commands unless explicitly told to do so by the user.
