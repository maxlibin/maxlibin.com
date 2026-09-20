---
title: "Install latest neovim in linux machine in 3 simple steps"
date: 2024-05-30T04:24:15Z
modified: 2024-05-30T04:24:15Z
excerpt: "Built Neovim from source. Here’s the step-by-step process: Install Dependencies: sudo apt-get install ninja-build gettext cmake unzip curl Clone the Neovim Repository: git clone https://github.com/neovim/neovim.git cd neovim Build and Install Neovim: make CMAKE_BUILD_TYPE=Release sudo make install By following these steps, you should be able to build and install Neovim successfully from source."
---

Built Neovim from source. Here’s the step-by-step process:

1.  Install Dependencies:
    
    ```
    sudo apt-get install ninja-build gettext cmake unzip curl
    ```
    
2.  Clone the Neovim Repository:
    
    ```
    git clone https://github.com/neovim/neovim.git
    cd neovim
    ```
    
3.  Build and Install Neovim:
    
    ```
    make CMAKE_BUILD_TYPE=Release
    sudo make install
    ```
    

By following these steps, you should be able to build and install Neovim successfully from source.
