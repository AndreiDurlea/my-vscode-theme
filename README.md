# Deuterium Color Themes

[![Open VSX Version](https://img.shields.io/open-vsx/v/andreidurlea/deutherium.svg?color=white)](https://open-vsx.org/extension/andreidurlea/deutherium)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/andreidurlea/deutherium.svg?color=white)](https://open-vsx.org/extension/andreidurlea/deutherium)

Dark, high-contrast color themes for Visual Studio Code and Antigravity IDE modeled after JetBrains color schemes. Available in two distinct variants: **Deuterium** and **Deuterium Lite**, with dynamic accent color customization.

---

## 1. Download & Install

Install directly through your preferred extension marketplace:

- **[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=andreidurlea.deutherium)**
- **[Open VSX Registry](https://open-vsx.org/extension/andreidurlea/deutherium)**

Alternatively, search for `Deuterium` in the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`) in Visual Studio Code or Antigravity IDE and select **Install**.

---

## 2. Theme Previews

### Deuterium (Classic)

![Deuterium](./images/deuterium-preview.png)

---

### Deuterium Lite

![Deuterium Lite](./images/deuterium-lite-preview.png)

---

## 3. Activation

1. Open the Color Theme picker using `Ctrl+K Ctrl+T` (or `Cmd+K Cmd+T` on macOS).
2. Select **Deuterium** or **Deuterium Lite**.

> [!TIP]
> For the intended typography and rendering, the [JetBrains Mono](https://fonts.google.com/download?family=JetBrains%20Mono) font is recommended.

---

## 4. Accent Color Customization

Deuterium lets you customize the primary accent color across syntax tokens and UI highlights:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Type **`Deuterium: Select Accent Color`**.
3. Choose from curated presets or enter your own custom hex:
   - **Infrared** (`#f57385` - default for Deuterium)
   - **Limelight** (`#abf29d` - default for Deuterium Lite)
   - **Silverstone** (`#e6ffff`)
   - **Papaya** (`#ffc629`)
   - **Ultraviolet** (`#d3baff`)
   - **Custom Hex...** (e.g. `#f57385` or `#abf29d`)
4. Click **Reload Window** when prompted to immediately apply the new accent.

You can also set your preference directly in `settings.json`:

```json
"deuterium.accentColor": "infrared"
```
