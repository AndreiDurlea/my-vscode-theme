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
    hex: "#f57385",
    description: "#f57385 - Light red / coral accent"
  },
  limelight: {
    id: "limelight",
    name: "Limelight",
    hex: "#abf29d",
    description: "#abf29d - Light green accent"
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
