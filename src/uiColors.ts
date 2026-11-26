export type StatusBarColor = "accent" | "background";

const BLACK = "#000000";
const WHITE = "#ffffff";

function expandHex(hex: string): string {
  const value = hex.trim().replace("#", "");
  return value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
}

function luminance(hex: string): number {
  const value = expandHex(hex);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(value.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG contrast: white wins when (1.05) / (L + 0.05) exceeds (L + 0.05) / 0.05.
export function contrastText(background: string): string {
  const l = luminance(background);
  return 1.05 / (l + 0.05) > (l + 0.05) / 0.05 ? WHITE : BLACK;
}

export interface StatusBarStyle {
  color: StatusBarColor;
  textColor?: string;
}

export interface ThemeBase {
  background: string;
  lineNumber: string;
}

function statusBarTextColor(statusBar: string, style: StatusBarStyle, base: ThemeBase): string {
  if (style.textColor) {
    return style.textColor;
  }
  return style.color === "background" ? base.lineNumber : contrastText(statusBar);
}

export function accentColors(accentHex: string, style: StatusBarStyle, base: ThemeBase): Record<string, string> {
  const statusBar = style.color === "background" ? base.background : accentHex;
  const statusBarText = statusBarTextColor(statusBar, style, base);
  return {
    "statusBar.background": statusBar,
    "statusBar.noFolderBackground": statusBar,
    "statusBar.foreground": statusBarText,
    "statusBar.noFolderForeground": statusBarText,
    "button.background": accentHex,
    "button.hoverBackground": accentHex,
    "button.foreground": contrastText(accentHex),
    "progressBar.background": accentHex
  };
}
