# Vantablack Color Theme

My custom VS Code theme, packaged from Vantablack.

## Installation

### For Local Development / Usage
1. Copy or link this folder into your VS Code extensions folder:
   - **Windows:** `C:\Users\<username>\.vscode\extensions\my-vscode-theme`
   - **macOS/Linux:** `~/.vscode/extensions/my-vscode-theme`
2. Restart VS Code (or reload window) and select "Vantablack" from the Color Theme options.

### Settings & Font
This theme includes default configurations for the editor:
- **Font Family:** `JetBrains Mono` (please ensure you have JetBrains Mono installed on your operating system).
- **Bracket Pair Colorization:** Disabled by default.

## Packaging

To package this theme into a `.vsix` installer file:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the packaging command:
   ```bash
   npm run package
   ```
   *Alternatively, run `npx @vscode/vsce package`*

3. This will generate a file named `my-vscode-theme-1.0.0.vsix` which you can share or install directly in VS Code by dragging and dropping it, or via the Extensions view (Command Palette: `Extensions: Install from VSIX...`).
