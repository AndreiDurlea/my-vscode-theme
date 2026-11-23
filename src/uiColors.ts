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

export function accentColors(accentHex: string, statusBarColor: StatusBarColor, editorBackground: string): Record<string, string> {
  const statusBar = statusBarColor === "background" ? editorBackground : accentHex;
  const statusBarText = contrastText(statusBar);
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
