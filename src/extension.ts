import * as vscode from "vscode";
import { ACCENT_PRESETS } from "./palette";
import { generateThemes } from "./generator";

interface AccentQuickPickItem extends vscode.QuickPickItem {
  id: string;
  hex?: string;
}

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

export async function applyLiveUI(hex: string | null): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const colorCustomizations = config.get<Record<string, any>>("workbench.colorCustomizations") || {};
  const updatedColors = { ...colorCustomizations };

  if (!hex) {
    delete updatedColors["[Deuterium]"];
    delete updatedColors["[Deuterium Lite]"];
  } else {
    const uiAccent = {
      "statusBar.noFolderBackground": hex,
      "statusBar.background": hex,
      "button.background": hex,
      "button.hoverBackground": hex,
      "progressBar.background": hex
    };

    updatedColors["[Deuterium]"] = {
      ...(updatedColors["[Deuterium]"] || {}),
      ...uiAccent
    };
    updatedColors["[Deuterium Lite]"] = {
      ...(updatedColors["[Deuterium Lite]"] || {}),
      ...uiAccent
    };
  }

  await config.update(
    "workbench.colorCustomizations",
    Object.keys(updatedColors).length ? updatedColors : undefined,
    vscode.ConfigurationTarget.Global
  );
}

export function activate(context: vscode.ExtensionContext): void {
  // Sync configured accent to UI on startup
  const initialConfig = vscode.workspace.getConfiguration("deuterium");
  const initialAccent = resolveAccentHex(initialConfig);
  applyLiveUI(initialAccent.hex).catch(() => {});

  const selectAccentCmd = vscode.commands.registerCommand(
    "deuterium.selectAccentColor",
    async () => {
      const rootConfig = vscode.workspace.getConfiguration();
      const config = vscode.workspace.getConfiguration("deuterium");
      const variant = getThemeVariant();
      const defaultKey = variant === "lite" ? "limelight" : "infrared";
      const currentAccent = config.get<string>("accentColor", defaultKey);
      const originalAccent = resolveAccentHex(config);
      const originalHex = originalAccent.hex;

      // Snapshot original workbench customizations to cleanly revert on Esc
      const originalColors = rootConfig.get<Record<string, any>>("workbench.colorCustomizations");

      const items: AccentQuickPickItem[] = Object.values(ACCENT_PRESETS).map((preset) => {
        let label = preset.name;
        if (variant === "lite" && preset.id === "limelight") {
          label = `${preset.name} (default)`;
        } else if (variant === "deuterium" && preset.id === "infrared") {
          label = `${preset.name} (default)`;
        }

        return {
          label,
          description: preset.description,
          detail: preset.id === currentAccent ? "(Current)" : undefined,
          id: preset.id,
          hex: preset.hex
        };
      });

      items.push({
        label: "Custom Hex...",
        description: "Enter any #RRGGBB or #RGB color code",
        detail: currentAccent === "custom" ? "(Current)" : undefined,
        id: "custom"
      });

      const qp = vscode.window.createQuickPick<AccentQuickPickItem>();
      qp.title = "Select an accent color for Deuterium";
      qp.placeholder = "Arrow up/down to preview live on bottom bar & buttons, Enter to select, Esc to cancel";
      qp.items = items;

      const activeItem = items.find((i) => i.detail === "(Current)");
      if (activeItem) {
        qp.activeItems = [activeItem];
      }

      let accepted = false;

      // LIVE RENDER BEFORE ACTUALLY SELECTING (ON ACTIVE / HOVER CHANGE)
      qp.onDidChangeActive(async (activeItems) => {
        if (!activeItems || activeItems.length === 0) return;
        const item = activeItems[0];
        if (item.hex) {
          await applyLiveUI(item.hex);
        } else if (item.id === "custom") {
          await applyLiveUI(originalHex);
        }
      });

      qp.onDidAccept(async () => {
        const selected = qp.selectedItems[0];
        if (!selected) {
          qp.hide();
          return;
        }

        accepted = true;
        qp.hide();

        if (selected.id === "custom") {
          const input = vscode.window.createInputBox();
          input.title = "Enter a custom hex color code";
          input.placeholder = "#ff4e32 or #edf77a";
          input.value = originalHex.startsWith("#") ? originalHex : `#${originalHex}`;
          let customAccepted = false;

          // LIVE RENDER WHILE TYPING CUSTOM HEX
          input.onDidChangeValue(async (val) => {
            if (isValidHex(val)) {
              await applyLiveUI(val.trim());
            } else {
              await applyLiveUI(originalHex);
            }
          });

          input.onDidAccept(async () => {
            const val = input.value.trim();
            if (!isValidHex(val)) {
              vscode.window.showErrorMessage("Please enter a valid hex color code (e.g. #ff4e32, #edf77a, #ff0055)");
              return;
            }
            customAccepted = true;
            input.hide();

            await config.update("customAccentColor", val, vscode.ConfigurationTarget.Global);
            await config.update("accentColor", "custom", vscode.ConfigurationTarget.Global);
            await applyLiveUI(val);

            try {
              generateThemes(context.extensionPath, val);
            } catch (_) {}

            vscode.window.setStatusBarMessage(`Deuterium: Accent color set to Custom (${val})`, 4000);
          });

          input.onDidHide(async () => {
            if (!customAccepted) {
              await rootConfig.update("workbench.colorCustomizations", originalColors, vscode.ConfigurationTarget.Global);
            }
            input.dispose();
          });

          input.show();
        } else if (selected.hex) {
          await config.update("accentColor", selected.id, vscode.ConfigurationTarget.Global);
          await applyLiveUI(selected.hex);

          try {
            generateThemes(context.extensionPath, selected.hex);
          } catch (_) {}

          vscode.window.setStatusBarMessage(`Deuterium: Accent color set to ${selected.label.replace(" (default)", "")}`, 4000);
        }
      });

      qp.onDidHide(async () => {
        if (!accepted) {
          // Revert cleanly on cancel (Esc) - don't do anything
          await rootConfig.update("workbench.colorCustomizations", originalColors, vscode.ConfigurationTarget.Global);
        }
        qp.dispose();
      });

      qp.show();
    }
  );

  const reloadCmd = vscode.commands.registerCommand("deuterium.reload", async () => {
    await vscode.commands.executeCommand("workbench.action.reloadWindow");
  });

  const configListener = vscode.workspace.onDidChangeConfiguration(async (event) => {
    if (!event.affectsConfiguration("deuterium.accentColor") && !event.affectsConfiguration("deuterium.customAccentColor")) {
      return;
    }

    const config = vscode.workspace.getConfiguration("deuterium");
    const { hex } = resolveAccentHex(config);
    await applyLiveUI(hex);
    try {
      generateThemes(context.extensionPath, hex);
    } catch (_) {}
  });

  context.subscriptions.push(selectAccentCmd, reloadCmd, configListener);
}

export function deactivate(): void {}
