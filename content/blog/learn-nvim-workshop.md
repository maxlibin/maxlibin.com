---
title: "learn nvim workshop"
date: 2024-09-04T04:22:53Z
modified: 2024-10-28T08:18:20Z
excerpt: "Install nvim To install Neovim, you can refer to the official installation guide: Installation Guide The easiest way to install Neovim, in my opinion, is by building it from source: Install from Source Getting Started with nvim To start using Neovim, open your terminal, navigate to your project folder, and type: nvim This command opens"
---

## Install nvim

To install Neovim, you can refer to the official installation guide:

-   [Installation Guide](https://github.com/neovim/neovim/blob/master/INSTALL.md)

The easiest way to install Neovim, in my opinion, is by building it from source:

-   [Install from Source](https://github.com/neovim/neovim/blob/master/INSTALL.md#install-from-source)

## Getting Started with nvim

To start using Neovim, open your terminal, navigate to your project folder, and type:

```bash
nvim
```

This command opens Neovim with the current folder as the root directory. You can also open a specific file by typing:

```bash
nvim ./fileName.md
```

### Basic Commands

-   **Quit the current window:** `:q`
-   **Save the file:** `:w`
-   **Save and quit:** `:wq`
-   **Quit all open files:** `:qa`

### Accessing Help

One of Neovim's most powerful features is its built-in help system. You can access it by typing:

```bash
:h (optional topic)
```

This command will open the help documentation related to the topic you specify, or a general help guide if no topic is provided.

## Understanding Modes in nvim

Neovim operates in different modes, each serving a specific purpose:

-   **Normal Mode:** The default mode for navigation and command execution.
-   **Insert Mode:** Used for inserting text.
-   **Visual Mode:** Allows for text selection.

### Switching Modes

-   **To enter Insert Mode:** Press `i`
-   **To return to Normal Mode:** Press `Esc`
-   **To enter Visual Mode:** Press `v`

Always aim to keep your editor in Normal Mode when not actively editing text, as this mode allows for efficient navigation using programmable keys. You can observe the current mode in the status bar of Neovim.

### Navigation Basics

Neovim uses the `hjkl` keys for navigation:

-   `h` - Move left
-   `j` - Move down
-   `k` - Move up
-   `l` - Move right

### Copying and Pasting

-   **Copy a line (yank):** `yy` or `y$` to copy from the cursor to the end of the line.
-   **Paste:** `p`

#### Exercise:

Copy line 62 and paste it below. If line numbers are not displayed, enable them with:

```bash
:set number
```

### Moving to Specific Lines

-   **Go to line 24:** `24G`
-   **Go back to line 79:** `79G`

You can combine navigation commands with line numbers for efficient movement. Consider enabling relative line numbers with:

```bash
:set rnu
```

### Screen Navigation

-   **Move to the first line:** `gg`
-   **Move to the last line:** `G`
-   **Move to the top of the screen:** `H`
-   **Move to the middle of the screen:** `M`
-   **Move to the bottom of the screen:** `L`

You can also scroll the screen:

-   **Downwards:** `Ctrl-D`
-   **Upwards:** `Ctrl-U`

### Horizontal Navigation

-   **Find a character forward:** `f<char>`
-   **Find a character backward:** `F<char>`
-   **Move to the end of the line:** `$`
-   **Move to the beginning of the line:** `0`
-   **Move to the first non-blank character of the line:** `^`
-   **Move forward by a word:** `w`
-   **Move to the end of the word:** `e`
-   **Move backward by a word:** `b`

#### Exercise:

Go to line 119 and find the second comma `,` using `f,`. Try combining commands like `2f<char>` to jump to the second occurrence of a character.

## Editing Text

Neovim provides various commands for efficient text editing.

### Inserting Text

-   **Insert before the cursor:** `i`
-   **Insert after the cursor:** `a`

#### Exercise:

In the following code block, try adding `>{` to line 135:

```javascript
const goTo = () =
  // go to line 24
};
```

### Deleting Text

-   **Delete with motion:** `d<motion>`
-   **Delete a single character:** `x`
-   **Delete a word:** `dw`
-   **Delete to the end of the line:** `D`
-   **Delete from the beginning of the line to the cursor:** `d0`

#### Exercise:

Go to line 143, find `x`, and delete it.

### Changing and Replacing Text

-   **Change text:** `c<motion>` (deletes the selected text and enters Insert Mode)
-   **Replace a single character:** `r<char>`

You can combine Visual Mode with `c` to quickly edit blocks of code.

#### Example:

In the following code block, use `vi{` to visually select inside the block, and then change it using `c`:

```javascript
const changeBlock = () => {
  // selection block
};
```

### Combining Motions and Editing

Now that we've covered the basics of motions, it's time to explore how combining these motions can make editing more efficient, especially when working with blocks of code.

#### Editing Inside Code Blocks

A common scenario when coding is the need to quickly navigate and edit inside functions or blocks of code. Neovim provides powerful ways to do this with combinations of motions and commands.

For example, if you want to quickly jump inside a block of code (e.g., within curly braces `{}` or parentheses `()`), you can use the following sequence:

-   **Visual selection inside a block:** `vi{` or `vi(`
    
    -   This selects everything inside the `{}` or `()` where the cursor is currently located.
-   **Copying (yanking) the selection:** `y`
    
    -   After selecting the content inside the block with `vi{`, press `y` to yank (copy) it.
-   **Changing the content inside a block:** `ci{` or `ci(`
    
    -   This command deletes everything inside the `{}` or `()` and puts you into Insert Mode, allowing you to immediately start typing the new content.

#### Example Workflow

Consider the following example where you have a function:

```javascript
function exampleFunction() {
  let x = 10;
  console.log(x);
}
```

Suppose you want to quickly copy everything inside the function's curly braces `{}`:

1.  **Move the cursor inside the block:** Place your cursor anywhere within the function.
2.  **Select the inside of the block:** Type `vi{`.
3.  **Copy the selected text:** Press `y`.
4.  **Paste it somewhere else:** Move the cursor to the desired location and press `p`.

Alternatively, if you want to change the content inside the curly braces:

1.  **Move the cursor inside the block:** Place your cursor anywhere within the function.
2.  **Change the content inside the block:** Type `ci{`.
3.  **Start typing the new content:** Neovim will delete the existing content inside the block and put you in Insert Mode to enter new content.

#### Additional Motion Combinations

You can also combine motions to perform more complex edits:

-   **Delete from the cursor to a specific character inside a line:** `dt<char>`
    
    -   This deletes from the cursor to just before the specified character.
-   **Change a word:** `cw`
    
    -   Deletes the word under the cursor and enters Insert Mode to allow for immediate replacement.
-   **Jump to the next occurrence of a character and edit:** `cf<char>`
    
    -   This deletes from the cursor to and including the specified character, and enters Insert Mode.

#### Practice Exercise:

1.  **Select and copy the content inside a block:**
    
    -   Place the cursor inside a code block, type `vi{` to select everything inside the braces, and then `y` to copy it.
2.  **Change the content inside a block:**
    
    -   Place the cursor inside a code block, type `ci{`, and replace the content by typing something new.
3.  **Delete until a specific character:**
    
    -   Move the cursor to the start of a line, type `dt,` to delete everything up to the next comma.

By mastering these combinations, you can navigate and edit your code with remarkable speed and precision, making Neovim a powerful tool in your development workflow.

You can download this workshop file here (rename it to .md):  
[nvim-workshop](/files/learn-nvim-workshop/nvim-workshop.txt "nvim-workshop")
