# Deutherium Color Theme

A dark, high-contrast, distraction-free color theme for Visual Studio Code. Inspired by themes on Jetbrains IDEs.

## Features & Packaged Settings

Deutherium comes pre-configured with optimized default settings for a seamless development experience:
- **Font Family:** Configured to use `JetBrains Mono` as the primary font with standard fallbacks.
- **Bracket Pair Colorization:** Disabled by default to minimize visual noise.

> [!NOTE]
> To experience the intended typography, please download and install JetBrains Mono on your system:
> - **[Download JetBrains Mono from Google Fonts](https://fonts.google.com/download?family=JetBrains%20Mono)** (Direct ZIP download)

---

## Installation

You can install the Deutherium Color Theme using one of the following methods:

### Option 1: Install from the VS Code Marketplace (Recommended)
You can find and install the theme directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=andreidurlea.deutherium).
Alternatively, search for **Deutherium** in the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`) in VS Code and click **Install**.

### Option 2: Install Locally (Manual Installation)
1. Copy or link this repository folder into your VS Code extensions directory:
   - **Windows:** `C:\Users\<Your-Username>\.vscode\extensions\my-vscode-theme`
   - **macOS / Linux:** `~/.vscode/extensions/my-vscode-theme`
2. Restart VS Code (or reload the window).
3. Open the Color Theme picker (`Ctrl+K Ctrl+T` or `Cmd+K Cmd+T`) and select **Deutherium**.

---

## Local Development & Packaging

To compile and package this extension into a `.vsix` installer file:

1. Install development dependencies:
   ```bash
   npm install
   ```
2. Build the package:
   ```bash
   npm run package
   ```
   *(Or run `npx @vscode/vsce package` directly)*
3. This creates a file named `deutherium-1.0.0.vsix` which you can share or install via the **Extensions: Install from VSIX...** option in VS Code's command palette.
