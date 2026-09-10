# Deutherium Color Theme

[![Marketplace](https://img.shields.io/badge/marketplace-v1.0.0-purple.svg)](https://marketplace.visualstudio.com/items?itemName=andreidurlea.deutherium)

Dark, high-contrast color theme extension for Visual Studio Code modeled after JetBrains IDE color schemes.

---

## 1. Architecture

The extension package bundles theme definition files and editor configurations:

```text
my-vscode-theme/
├── themes/
│   └── deutherium-color-theme.json   # Token color rules and UI workbench colors
├── package.json                      # Extension manifest and contributions
└── README.md
```

- **Theme Engine**: Maps TextMate grammar scopes and VS Code workbench color keys to hexadecimal color values.
- **Packaged Settings**: Contributes editor defaults configured for code contrast and typography.

---

## 2. Configuration & Reference

| Setting | Value | Description |
| :--- | :--- | :--- |
| `editor.fontFamily` | `'JetBrains Mono', monospace` | Primary monospace font family. |
| `editor.bracketPairColorization.enabled` | `false` | Bracket pair colorization state. |

> [!NOTE]
> JetBrains Mono is required for the intended font rendering:
> - **[JetBrains Mono Font Download](https://fonts.google.com/download?family=JetBrains%20Mono)**

---

## 3. Installation

### From VS Code Marketplace
Search for `Deutherium` in the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`) and select **Install**, or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=andreidurlea.deutherium).

### Manual Local Installation
1. Copy or link this directory to the local extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\my-vscode-theme`
   - **Linux / macOS**: `~/.vscode/extensions/my-vscode-theme`
2. Restart or reload Visual Studio Code.
3. Select **Deutherium** in the Color Theme picker (`Ctrl+K Ctrl+T` / `Cmd+K Cmd+T`).

---

## 4. Development & Packaging

```bash
# Install packaging toolchain
npm install

# Compile into .vsix extension package
npx @vscode/vsce package
```

---

## 5. Output Artifacts

The packaging process produces an installable VSIX file:

```bash
# Install the built VSIX directly via CLI
code --install-extension deutherium-1.0.0.vsix
```