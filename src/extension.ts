import * as vscode from "vscode";
import { ACCENT_PRESETS } from "./palette";
import { generateThemes } from "./generator";

function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim());
}

function getThemeVariant(): "deuterium" | "lite" {
  const currentTheme = vscode.workspace
    .getConfiguration("workbench")
    .get<string>("colorTheme", "");
  return currentTheme.toLowerCase().includes("lite") ? "lite" : "deuterium";
}

function resolveAccentHex(config: vscode.WorkspaceConfiguration): { name: string; hex: string } {
  const variant = getThemeVariant();
  const defaultKey = variant === "lite" ? "limelight" : "infrared";
  const accentKey = config.get<string>("accentColor", defaultKey);
  if (accentKey === "custom") {
    const defaultHex = variant === "lite" ? ACCENT_PRESETS.limelight.hex : ACCENT_PRESETS.infrared.hex;
    const customHex = config.get<string>("customAccentColor", defaultHex).trim();
    return { name: `Custom (${customHex})`, hex: isValidHex(customHex) ? customHex : defaultHex };
  }
  const preset = ACCENT_PRESETS[accentKey] || ACCENT_PRESETS[defaultKey] || ACCENT_PRESETS.infrared;
  return { name: preset.name, hex: preset.hex };
}

export function activate(context: vscode.ExtensionContext): void {
  const selectAccentCmd = vscode.commands.registerCommand(
    "deuterium.selectAccentColor",
    async () => {
      const config = vscode.workspace.getConfiguration("deuterium");
      const variant = getThemeVariant();
      const defaultKey = variant === "lite" ? "limelight" : "infrared";
      const currentAccent = config.get<string>("accentColor", defaultKey);

      const items: vscode.QuickPickItem[] = Object.values(ACCENT_PRESETS).map((preset) => {
        let label = preset.name;
        if (variant === "lite" && preset.id === "limelight") {
          label = `${preset.name} (default)`;
        } else if (variant === "deuterium" && preset.id === "infrared") {
          label = `${preset.name} (default)`;
        }

        return {
          label,
          description: preset.description,
          detail: preset.id === currentAccent ? "(Current)" : undefined
        };
      });

      items.push({
        label: "Custom Hex...",
        description: "Enter any #RRGGBB or #RGB color code",
        detail: currentAccent === "custom" ? "(Current)" : undefined
      });

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: "Select an accent color for Deuterium"
      });

      if (!selected) return;

      if (selected.label.startsWith("Custom")) {
        const customInput = await vscode.window.showInputBox({
          prompt: "Enter a custom hex color code",
          placeHolder: "#f57385 or #abf29d",
          validateInput: (value) => {
            if (!isValidHex(value)) {
              return "Please enter a valid hex color code (e.g. #f57385, #abf29d, #ff0055)";
            }
            return null;
          }
        });

        if (!customInput) return;

        await config.update("customAccentColor", customInput.trim(), vscode.ConfigurationTarget.Global);
        await config.update("accentColor", "custom", vscode.ConfigurationTarget.Global);
      } else {
        const found = Object.values(ACCENT_PRESETS).find(
          (p) => selected.label.startsWith(p.name)
        );
        if (found) {
          await config.update("accentColor", found.id, vscode.ConfigurationTarget.Global);
        }
      }
    }
  );

  const reloadCmd = vscode.commands.registerCommand("deuterium.reload", async () => {
    await vscode.commands.executeCommand("workbench.action.reloadWindow");
  });

  const configListener = vscode.workspace.onDidChangeConfiguration(async (event) => {
    if (!event.affectsConfiguration("deuterium")) {
      return;
    }

    const config = vscode.workspace.getConfiguration("deuterium");
    const { name, hex } = resolveAccentHex(config);

    try {
      generateThemes(context.extensionPath, hex);

      const reloadAction = "Reload Window";
      const choice = await vscode.window.showInformationMessage(
        `Deuterium: Accent color set to ${name}. Please reload window to apply changes.`,
        reloadAction
      );

      if (choice === reloadAction) {
        await vscode.commands.executeCommand("workbench.action.reloadWindow");
      }
    } catch (err: any) {
      vscode.window.showErrorMessage(`Deuterium: Failed to update theme files: ${err?.message || err}`);
    }
  });

  context.subscriptions.push(selectAccentCmd, reloadCmd, configListener);
}

export function deactivate(): void {}
