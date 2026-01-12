import { ColorEngine } from "../types/theme";
import { parseColor } from "./colorParser";

// Alias for backwards compatibility
const parseRGBA = parseColor;

// Helper function to create rgba string
function toRGBA(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
}

// Helper to darken color (for light mode)
function darken(rgba: string, amount: number): string {
  const { r, g, b, a } = parseRGBA(rgba);
  const factor = 1 - amount;
  return toRGBA(r * factor, g * factor, b * factor, a);
}

// Helper to lighten color (for dark mode)
function lighten(rgba: string, amount: number): string {
  const { r, g, b, a } = parseRGBA(rgba);
  const factor = amount;
  return toRGBA(
    r + (255 - r) * factor,
    g + (255 - g) * factor,
    b + (255 - b) * factor,
    a
  );
}

// Helper to adjust alpha
function adjustAlpha(rgba: string, alpha: number): string {
  const { r, g, b } = parseRGBA(rgba);
  return toRGBA(r, g, b, alpha);
}

// Default color engine
const defaultEngine: ColorEngine = {
  name: "default",

  generateHover: (base: string, mode: "light" | "dark"): string => {
    if (mode === "light") {
      return darken(base, 0.06);
    } else {
      return lighten(base, 0.08);
    }
  },

  generatePressed: (base: string, mode: "light" | "dark"): string => {
    if (mode === "light") {
      return darken(base, 0.1);
    } else {
      return lighten(base, 0.16);
    }
  },

  generateDisabled: (base: string, mode: "light" | "dark"): string => {
    if (mode === "light") {
      return adjustAlpha(base, 0.21);
    } else {
      return adjustAlpha(base, 0.4);
    }
  },

  generateEmphasis: (base: string, mode: "light" | "dark"): string => {
    const { r, g, b } = parseRGBA(base);
    if (mode === "light") {
      // Increase saturation slightly
      return toRGBA(r, g, b, 1.0);
    } else {
      // Lighten and full opacity
      return lighten(toRGBA(r, g, b, 1.0), 0.1);
    }
  },

  generateSubtle: (base: string, mode: "light" | "dark"): string => {
    if (mode === "light") {
      return adjustAlpha(base, 0.04);
    } else {
      return adjustAlpha(base, 0.02);
    }
  },
};

// Export registry of engines
export const colorEngines: Record<string, ColorEngine> = {
  default: defaultEngine,
  // Future engines can be added here
};

// Export default for convenience
export default defaultEngine;
