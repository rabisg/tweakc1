import { parse, rgb } from 'culori';

/**
 * Parse any CSS color format and extract RGBA components
 * Supports: rgba, rgb, hex, hsl, hsla, oklch, oklab, named colors, etc.
 */
export function parseColor(color: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  if (!color || color.trim() === '') {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  try {
    const parsed = parse(color);
    if (!parsed) {
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    // Convert to RGB
    const rgbColor = rgb(parsed);
    if (!rgbColor) {
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    return {
      r: Math.round((rgbColor.r || 0) * 255),
      g: Math.round((rgbColor.g || 0) * 255),
      b: Math.round((rgbColor.b || 0) * 255),
      a: rgbColor.alpha !== undefined ? rgbColor.alpha : 1,
    };
  } catch (error) {
    console.warn('Failed to parse color:', color, error);
    return { r: 0, g: 0, b: 0, a: 1 };
  }
}

/**
 * Convert RGBA components to rgba string without spaces
 */
export function toRGBA(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
}
