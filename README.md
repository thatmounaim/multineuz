# MultiNeuz

![alt text](resources/icon.png "MultiNeuz")

An Electron WebView based Multi Client for Flyff Universe with Svelte and TypeScript
## Features
- Multi Session Management with Unique Session for Each Character
- Ctrl + Tab for Fast Swapping Between Characters
- Integrated Mini Browser Overlay
    - Default Homepage : DuckDuckGo
    - Community Shortcuts for The Browser
        - Flyffipedia
        - Flyffulator
## Download Pre-compiled

[View Latest Releases](https://github.com/thatmounaim/multineuz/releases)
## Project Setup - Build From Source

### Clone Project Repository
```bash
$ git clone {repo_url}
```

### Install Dependencies

```bash
$ pnpm install
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

## Dev Notes 

The base of the project was generate with [electron-vite](https://electron-vite.org/) using the Svelte Template

Some TS Warnings might appear in editor, found it okay to ignore, will give more importance to then in future.

## Todo
- Cleanup Renderer Code and Organise Into more components
- Figure out a fix for the browser Back/Forward buttons
- Add Comments to the Code
- Auto Updater in Future Versions
- Build in Tools :
    - Pet Food Calculator
    - Pet Cost Calculator
