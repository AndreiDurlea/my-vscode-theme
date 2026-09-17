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

  const customDeuterium = DEUTERIUM_TEMPLATE.replace(
    new RegExp(baselineLower, "gi"),
    normHex
  );

  const customDeuteriumLite = DEUTERIUM_LITE_TEMPLATE.replace(
    new RegExp(baselineLower, "gi"),
    normHex
  );

  fs.writeFileSync(
    path.join(themesDir, "deuterium-color-theme.json"),
    customDeuterium,
    "utf8"
  );

  fs.writeFileSync(
    path.join(themesDir, "deuterium-lite-color-theme.json"),
    customDeuteriumLite,
    "utf8"
  );
}
