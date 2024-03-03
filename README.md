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
        - SiegeStats
     
## Note
The project will undergo a full rewrite in the near future, appologies for lack of updates and quality of life improvements.
## Download Pre-compiled

[View Latest Releases](https://github.com/thatmounaim/multineuz/releases)
## Project Setup - Build From Source

### Clone Project Repository
```bash
$ git clone https://github.com/thatmounaim/multineuz.git
```

### Install Dependencies

```bash
$ pnpm install
$ pnpm postinstall
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

```bash
# Run Devmode
$ pnpm dev
```or
