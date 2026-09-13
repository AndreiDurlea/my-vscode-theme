# Deuterium Color Themes

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)](./__CORECONTEXT_VERSION)
[![Marketplace](https://img.shields.io/badge/marketplace-v1.1.1-purple.svg)](https://marketplace.visualstudio.com/items?itemName=andreidurlea.deutherium)

Dark, high-contrast color theme extension for Visual Studio Code and Antigravity IDE modeled after JetBrains color schemes. Provides two distinct variants: Deuterium (classic pitch-dark background with salmon accent) and Deuterium Lite (soft dark background with neon yellow accent).

---

## 1. Architecture

The extension package bundles theme definition files, automated versioning scripts, and editor configurations:

```text
my-vscode-theme/
├── .github/
│   └── workflows/
│       └── release.yml
├── scripts/
│   └── resolve-version.py
├── themes/
│   ├── deuterium-color-theme.json
│   └── deuterium-lite-color-theme.json
├── __CORECONTEXT_VERSION
├── package.json
└── README.md
```

- Theme Engine: Maps TextMate grammar scopes and workbench color keys to hexadecimal color values.
- Dual Variants: Deuterium features `#0d0d0d` background with `#f57385` salmon accent; Deuterium Lite features `#141414` background with `#EDF77A` lime-yellow accent.
- Version Tracking: SemVer resolution managed automatically via `scripts/resolve-version.py` adhering to CoreCatalog specifications.

---

## 2. Configuration & Reference

| Setting | Value | Description |
| :--- | :--- | :--- |
| `editor.fontFamily` | `'JetBrains Mono', monospace` | Primary monospace font family. |
| `editor.bracketPairColorization.enabled` | `false` | Bracket pair colorization state. |

> [!NOTE]
> JetBrains Mono is recommended for the intended font rendering:
> - [JetBrains Mono Font Download](https://fonts.google.com/download?family=JetBrains%20Mono)

---

## 3. Installation

### From VS Code Marketplace
Search for `Deuterium` in the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`) and select Install, or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=andreidurlea.deutherium).

### Manual Local Installation
1. Copy or link this directory to the local extensions directory:
   - Windows: `%USERPROFILE%\.vscode\extensions\my-vscode-theme`
   - Linux / macOS: `~/.vscode/extensions/my-vscode-theme`
2. Restart or reload the IDE.
3. Select Deuterium or Deuterium Lite in the Color Theme picker (`Ctrl+K Ctrl+T` / `Cmd+K Cmd+T`).

---

## 4. Development & Packaging

```bash
# Install dependencies
npm install

# Compile into .vsix extension package
npx @vscode/vsce package
```

---

## 5. Output Artifacts

The packaging process produces an installable VSIX package:

```bash
# Install the built VSIX directly via CLI
code --install-extension deuterium-1.1.1.vsix
```