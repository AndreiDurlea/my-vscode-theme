export interface AccentOption {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export const BASELINE_ACCENT = "#abf29d";

export const ACCENT_PRESETS: Record<string, AccentOption> = {
  infrared: {
    id: "infrared",
    name: "Infrared",
    hex: "#ff4e32",
    description: "#ff4e32 - Red accent (default for Deuterium)"
  },
  limelight: {
    id: "limelight",
    name: "Limelight",
    hex: "#edf77a",
    description: "#edf77a - Lime accent (default for Deuterium Lite)"
  },
  silverstone: {
    id: "silverstone",
    name: "Silverstone",
    hex: "#e6ffff",
    description: "#e6ffff - Silverstone accent"
  },
  papaya: {
    id: "papaya",
    name: "Papaya",
    hex: "#ffc629",
    description: "#ffc629 - Papaya accent"
  },
  ultraviolet: {
    id: "ultraviolet",
    name: "Ultraviolet",
    hex: "#d3baff",
    description: "#d3baff - Ultraviolet accent"
  }
};
