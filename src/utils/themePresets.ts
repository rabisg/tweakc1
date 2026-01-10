import { ThemeCustomization } from '../types/theme';

export interface ThemePreset {
  name: string;
  colors: string[]; // Primary colors for display
  config: ThemeCustomization;
}

export const themePresets: Record<string, ThemePreset> = {
  vercel: {
    name: 'Vercel',
    colors: ['#000000', '#ffffff', '#666666'],
    config: {
      colors: {
        background: 'oklch(0.98 0 0)',
        container: 'oklch(1 0 0)',
        primary: 'oklch(0 0 0)',
        textPrimary: 'oklch(0.15 0 0)',
        textSecondary: 'oklch(0.45 0 0)',
        linkText: 'oklch(0.35 0 0)',
        danger: 'oklch(0.50 0.20 25)',
        success: 'oklch(0.55 0.15 145)',
        info: 'oklch(0.55 0.12 240)',
        alert: 'oklch(0.70 0.14 80)',
      },
      chartColors: {
        color1: 'oklch(0 0 0)',
        color2: 'oklch(0.35 0 0)',
        color3: 'oklch(0.55 0 0)',
      },
      strokeColors: {
        base: 'oklch(0 0 0)',
        opacity: 0.08,
      },
      chatColors: {
        containerBg: 'oklch(0.97 0 0)',
        assistantBg: 'oklch(0.94 0 0)',
        assistantText: 'oklch(0.15 0 0)',
        userBg: 'oklch(0 0 0)',
        userText: 'oklch(1 0 0)',
      },
      shadow: {
        color: 'oklch(0 0 0)',
        opacity: 0.06,
        blur: 16,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: 'default',
      fonts: {
        body: 'Inter',
        heading: 'Inter',
        mono: 'Roboto Mono',
      },
      letterSpacing: {
        base: -0.01,
      },
      spacing: {
        base: 1,
      },
      borderRadius: {
        base: 0.5,
      },
    },
  },
  twitter: {
    name: 'Twitter',
    colors: ['#1DA1F2', '#14171A', '#657786'],
    config: {
      colors: {
        background: 'oklch(0.98 0 0)',
        container: 'oklch(1 0 0)',
        primary: 'oklch(0.65 0.18 235)',
        textPrimary: 'oklch(0.20 0.01 250)',
        textSecondary: 'oklch(0.48 0.02 250)',
        linkText: 'oklch(0.65 0.18 235)',
        danger: 'oklch(0.50 0.22 25)',
        success: 'oklch(0.55 0.15 145)',
        info: 'oklch(0.65 0.18 235)',
        alert: 'oklch(0.72 0.14 80)',
      },
      chartColors: {
        color1: 'oklch(0.65 0.18 235)',
        color2: 'oklch(0.50 0.15 235)',
        color3: 'oklch(0.75 0.12 235)',
      },
      strokeColors: {
        base: 'oklch(0.48 0.02 250)',
        opacity: 0.12,
      },
      chatColors: {
        containerBg: 'oklch(0.97 0 0)',
        assistantBg: 'oklch(0.94 0 0)',
        assistantText: 'oklch(0.20 0.01 250)',
        userBg: 'oklch(0.65 0.18 235)',
        userText: 'oklch(1 0 0)',
      },
      shadow: {
        color: 'oklch(0.20 0.01 250)',
        opacity: 0.05,
        blur: 12,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: 'default',
      fonts: {
        body: 'Inter',
        heading: 'Inter',
        mono: 'Roboto Mono',
      },
      letterSpacing: {
        base: 0,
      },
      spacing: {
        base: 1,
      },
      borderRadius: {
        base: 1,
      },
    },
  },
  t3chat: {
    name: 'T3 Chat',
    colors: ['#A855F7', '#7C3AED', '#581C87'],
    config: {
      colors: {
        background: 'oklch(0.12 0.02 285)',
        container: 'oklch(0.16 0.03 285)',
        primary: 'oklch(0.70 0.24 292)',
        textPrimary: 'oklch(0.96 0.01 285)',
        textSecondary: 'oklch(0.68 0.04 285)',
        linkText: 'oklch(0.78 0.22 292)',
        danger: 'oklch(0.55 0.22 25)',
        success: 'oklch(0.62 0.18 145)',
        info: 'oklch(0.62 0.18 240)',
        alert: 'oklch(0.75 0.18 80)',
      },
      chartColors: {
        color1: 'oklch(0.70 0.24 292)',
        color2: 'oklch(0.58 0.22 275)',
        color3: 'oklch(0.78 0.20 310)',
      },
      strokeColors: {
        base: 'oklch(0.96 0.01 285)',
        opacity: 0.10,
      },
      chatColors: {
        containerBg: 'oklch(0.14 0.03 285)',
        assistantBg: 'oklch(0.19 0.04 285)',
        assistantText: 'oklch(0.94 0.01 285)',
        userBg: 'oklch(0.70 0.24 292)',
        userText: 'oklch(0.99 0 0)',
      },
      shadow: {
        color: 'oklch(0.05 0.01 285)',
        opacity: 0.4,
        blur: 24,
        spread: 0,
        offsetX: 0,
        offsetY: 2,
      },
      colorEngine: 'default',
      fonts: {
        body: 'Inter',
        heading: 'Inter',
        mono: 'Roboto Mono',
      },
      letterSpacing: {
        base: 0,
      },
      spacing: {
        base: 1,
      },
      borderRadius: {
        base: 0.75,
      },
    },
  },
};

export function getPresetNames(): string[] {
  return Object.keys(themePresets);
}

export function getPreset(name: string): ThemePreset | undefined {
  return themePresets[name];
}
