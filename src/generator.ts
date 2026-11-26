import * as fs from "fs";
import * as path from "path";
import { DEUTERIUM_TEMPLATE, DEUTERIUM_LITE_TEMPLATE } from "./templates_data";
import { accentColors, StatusBarStyle, ThemeBase } from "./uiColors";

export const THEMES = [
  { label: "Deuterium", file: "deuterium-color-theme.json", template: DEUTERIUM_TEMPLATE },
  { label: "Deuterium Lite", file: "deuterium-lite-color-theme.json", template: DEUTERIUM_LITE_TEMPLATE }
] as const;

export function themeBase(template: string): ThemeBase {
  const colors = JSON.parse(template).colors;
  return { background: colors["editor.background"], lineNumber: colors["editorLineNumber.foreground"] };
}

export function generateThemes(extensionPath: string, accentHex: string, statusBarStyle: StatusBarStyle): void {
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
        ...accentColors(normHex, statusBarStyle, themeBase(template))
      };

      fs.writeFileSync(
        path.join(themesDir, file),
        JSON.stringify(themeObj, null, 2),
        "utf8"
      );
    } catch (_) {}
  }
}
