import * as fs from "fs";
import * as path from "path";
import { BASELINE_ACCENT } from "./palette";
import { DEUTERIUM_TEMPLATE, DEUTERIUM_LITE_TEMPLATE } from "./templates_data";

export function generateThemes(extensionPath: string, accentHex: string): void {
  const normHex = accentHex.toLowerCase();
  const baselineLower = BASELINE_ACCENT.toLowerCase();

  const themesDir = path.join(extensionPath, "themes");
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  for (const [file, templateStr] of [
    ["deuterium-color-theme.json", DEUTERIUM_TEMPLATE],
    ["deuterium-lite-color-theme.json", DEUTERIUM_LITE_TEMPLATE]
  ] as const) {
    try {
      const baseStr = templateStr.replace(new RegExp(baselineLower, "gi"), normHex);
      const themeObj = JSON.parse(baseStr);
      themeObj.colors = themeObj.colors || {};

      // Update the bottom bar and button coloring
      themeObj.colors["statusBar.noFolderBackground"] = normHex;
      themeObj.colors["statusBar.background"] = normHex;
      themeObj.colors["button.background"] = normHex;
      themeObj.colors["button.hoverBackground"] = normHex;
      themeObj.colors["progressBar.background"] = normHex;

      fs.writeFileSync(
        path.join(themesDir, file),
        JSON.stringify(themeObj, null, 2),
        "utf8"
      );
    } catch (_) {}
  }
}
