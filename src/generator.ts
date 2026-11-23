import * as fs from "fs";
import * as path from "path";
import { DEUTERIUM_TEMPLATE, DEUTERIUM_LITE_TEMPLATE } from "./templates_data";
import { accentColors, StatusBarColor } from "./uiColors";

export const THEMES = [
  { label: "Deuterium", file: "deuterium-color-theme.json", template: DEUTERIUM_TEMPLATE },
  { label: "Deuterium Lite", file: "deuterium-lite-color-theme.json", template: DEUTERIUM_LITE_TEMPLATE }
] as const;

export function editorBackground(template: string): string {
  return JSON.parse(template).colors["editor.background"];
}

export function generateThemes(extensionPath: string, accentHex: string, statusBarColor: StatusBarColor): void {
  const normHex = accentHex.toLowerCase();

  const themesDir = path.join(extensionPath, "themes");
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  for (const { file, template } of THEMES) {
    try {
      const themeObj = JSON.parse(template);
      themeObj.colors = {
        ...(themeObj.colors || {}),
        ...accentColors(normHex, statusBarColor, editorBackground(template))
      };

      fs.writeFileSync(
        path.join(themesDir, file),
        JSON.stringify(themeObj, null, 2),
        "utf8"
      );
    } catch (_) {}
  }
}
