import { ThemePreset } from "./types";

// Common custom CSS for ChatGPT theme
const commonCustomCss = `
.crayon-shell-thread-message-assistant__logo {
  opacity: 0;
}

.crayon-card {
  background: transparent;
  border: none;
}

.crayon-shell-thread-message-user__content {
  border-radius: 24px;
}
`;

const lightCustomCss = `${commonCustomCss}
.crayon-shell-thread-composer__input-wrapper {
  padding: 10px;
  border-radius: 999px;
  padding-left: 16px;
  background-color: rgba(0,0,0,0.03);
}

.crayon-shell-thread-composer__input-wrapper .crayon-icon-button {
  height: 36px;
  width: 36px;
  border-radius: 999px;
}
`;

const darkCustomCss = `${commonCustomCss}
.crayon-shell-thread-composer__input-wrapper {
  padding: 10px;
  border-radius: 999px;
  padding-left: 16px;
}

.crayon-shell-thread-composer__input-wrapper .crayon-icon-button {
  height: 36px;
  width: 36px;
  border-radius: 999px;
}
`;

export const chatgptPreset: ThemePreset = {
  name: "ChatGPT",
  config: {
    light: {
      // Fills
      fills: {
        backgroundFills: "oklch(0.995 0 0)",
        containerFills: "oklch(1 0 0)",
        containerHoverFills: "rgba(240,240,240,1)",
        dangerFills: "rgba(212,-23,11,0.04)",
        successFills: "rgba(-46,147,101,0.04)",
        infoFills: "rgba(-77,140,218,0.04)",
        alertFills: "rgba(215,151,0,0.04)",
      },
      // Text
      text: {
        primaryText: "rgba(0,0,0,1)",
        secondaryText: "rgba(0,0,0,0.5)",
        linkText: "rgba(84,71,255,1)",
        dangerText: "oklch(0.54 0.23 27)",
        successText: "oklch(0.58 0.14 165)",
        infoText: "rgba(84,71,255,1)",
        disabledText: "rgba(0,0,0,0.3)",
        accentPrimaryText: "rgba(255, 255, 255, 1)",
        accentSecondaryText: "rgba(255,255,255,0.5)",
        accentDisabledText: "rgba(255,255,255,0.3)",
        brandText: "rgba(255, 255, 255, 1)",
        brandSecondaryText: "rgba(255,255,255,0.5)",
      },
      // Interactive
      interactive: {
        interactiveAccent: "rgba(0,0,0,1)",
        interactiveAccentHover: "rgba(0,0,0,0.7)",
        interactiveAccentPressed: "rgba(0,0,0,0.7)",
        interactiveAccentDisabled: "rgba(0,0,0,0.4)",
        interactiveDestructive: "rgba(212,-23,11,0.04)",
        interactiveDestructiveHover: "rgba(199,-22,10,1)",
        interactiveDestructivePressed: "rgba(191,-21,10,1)",
      },
      // Legacy colors
      colors: {
        background: "oklch(0.995 0 0)",
        container: "oklch(1 0 0)",
        primary: "rgba(0,0,0,1)",
        textPrimary: "rgba(0,0,0,1)",
        textSecondary: "rgba(0,0,0,0.5)",
        linkText: "rgba(84,71,255,1)",
        danger: "oklch(0.54 0.23 27)",
        success: "oklch(0.58 0.14 165)",
        info: "rgba(84,71,255,1)",
        alert: "oklch(0.72 0.15 78)",
      },
      chartColors: {
        primary: "rgba(77,145,255,1)",
      },
      // Strokes
      strokeColors: {
        default: "rgba(51,51,51,0.08)",
        interactiveEl: "rgba(51,51,51,0.16)",
        interactiveElHover: "rgba(51,51,51,0.2)",
        interactiveElSelected: "rgba(51,51,51,0.3)",
        emphasis: "rgba(51,51,51,0.16)",
        accent: "rgba(16,163,127,0.2)",
        accentEmphasis: "rgba(16,163,127,0.4)",
        info: "rgba(232,239,253,1)",
        infoEmphasis: "rgba(84,71,255,1)",
        alert: "#fff8e6",
        alertEmphasis: "#cc8800",
        success: "#e6f7ed",
        successEmphasis: "#10a37f",
        danger: "#fef2f2",
        dangerEmphasis: "#dc2626",
      },
      // Chat colors
      chatColors: {
        containerBg: "oklch(0.995 0 0)",
        assistantBg: "oklch(0.98 0 0)",
        assistantText: "oklch(0.20 0.01 250)",
        userBg: "rgba(230,230,230,1)",
        userText: "oklch(0.20 0.01 250)",
      },
      // Shadow
      shadow: {
        color: "rgba(19,22,26,1)",
        opacity: 0.05,
        blur: 7,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: "default",
      fonts: {
        body: "Inter",
        heading: "Inter",
        mono: "Inter",
      },
      fontWeight: {},
      letterSpacing: {},
      fontSize: {},
      spacing: {
        spacing0: 0,
        spacing3xs: 2,
        spacing2xs: 4,
        spacingXs: 6,
        spacingS: 8,
        spacingM: 12,
        spacingL: 18,
        spacingXl: 24,
        spacing2xl: 36,
        spacing3xl: 48,
      },
      // Border radius
      borderRadius: {
        rounded0: 0,
        rounded3xs: 1.5,
        rounded2xs: 3,
        roundedXs: 6,
        roundedS: 8,
        roundedM: 10,
        roundedL: 14,
        roundedXl: 17,
        rounded2xl: 20,
        rounded3xl: 26,
        rounded4xl: 32,
        roundedClickable: 10,
      },
      customCss: lightCustomCss,
    },
    dark: {
      // Fills
      fills: {
        backgroundFills: "#212121",
        containerFills: "#151515",
        overlayFills: "rgba(0, 0, 0, 0.7)",
        sunkFills: "rgba(255,255,255,0.06)",
        containerHoverFills: "rgba(255, 255, 255, 0.06)",
        dangerFills: "#2d1410",
        successFills: "#0d2818",
        infoFills: "#1a1a2e",
        elevatedFills: "rgba(255, 255, 255, 0.1)",
        alertFills: "#2d2610",
        sunkBgFills: "rgba(255,255,255,0.06)",
        invertedFills: "#f1f1f1",
        highlightSubtle: "rgba(255,255,255,0.03)",
      },
      // Text
      text: {
        brandText: "rgba(0, 0, 0, 1)",
        brandSecondaryText: "rgba(0, 0, 0, 0.7)",
        primaryText: "#f5f5f5",
        secondaryText: "#8c8c8c",
        disabledText: "#525252",
        dangerText: "#f87171",
        successText: "#4ade80",
        linkText: "#818cf8",
        infoText: "#60a5fa",
        alertText: "#fbbf24",
        accentPrimaryText: "rgba(0, 0, 0, 1)",
        accentSecondaryText: "rgba(0, 0, 0, 0.7)",
        accentDisabledText: "rgba(0, 0, 0, 0.4)",
      },
      // Interactive
      interactive: {
        interactiveDefault: "rgba(255, 255, 255, 0.02)",
        interactiveHover: "rgba(255, 255, 255, 0.06)",
        interactivePressed: "rgba(255, 255, 255, 0.1)",
        interactiveDisabled: "rgba(255, 255, 255, 0.02)",
        interactiveAccent: "#ffffff",
        interactiveAccentHover: "rgba(222,222,222,1)",
        interactiveAccentPressed: "rgba(222,222,222,1)",
        interactiveAccentDisabled: "#737373",
        interactiveDestructive: "#2d1410",
        interactiveDestructiveHover: "#3d1a15",
        interactiveDestructivePressed: "#4d201a",
        interactiveDestructiveDisabled: "#1d0d0a",
      },
      // Legacy colors
      colors: {
        background: "#212121",
        container: "#151515",
        primary: "#ffffff",
        textPrimary: "#f5f5f5",
        textSecondary: "#8c8c8c",
        linkText: "#818cf8",
        danger: "#f87171",
        success: "#4ade80",
        info: "#60a5fa",
        alert: "#fbbf24",
      },
      chartColors: {
        primary: "rgba(132,203,255,1)",
      },
      // Strokes
      strokeColors: {
        default: "rgba(255, 255, 255, 0.06)",
        interactiveEl: "rgba(255,255,255,0.15)",
        interactiveElHover: "rgba(255, 255, 255, 0.3)",
        interactiveElSelected: "rgba(255, 255, 255, 0.5)",
        emphasis: "rgba(255,255,255,0.25)",
        accent: "rgba(255,255,255,0.06)",
        accentEmphasis: "rgba(255,255,255,0.15)",
        info: "#1a1a2e",
        infoEmphasis: "rgba(128,185,255,1)",
        alert: "#2d2610",
        alertEmphasis: "#fbbf24",
        success: "#0d2818",
        successEmphasis: "#4ade80",
        danger: "#2d1410",
        dangerEmphasis: "#f87171",
      },
      // Chat colors
      chatColors: {
        containerBg: "#212121",
        assistantBg: "#151515",
        assistantText: "#f5f5f5",
        userBg: "rgba(51,51,51,1)",
        userText: "#f5f5f5",
      },
      // Shadow
      shadow: {
        color: "rgba(0,0,0,1)",
        opacity: 0.5,
        blur: 3,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: "default",
      fonts: {
        body: "Inter",
        heading: "Inter",
        mono: "Inter",
      },
      fontWeight: {},
      letterSpacing: {},
      fontSize: {
        base: 15,
      },
      spacing: {
        spacing0: 0,
        spacing3xs: 2,
        spacing2xs: 4,
        spacingXs: 6,
        spacingS: 8,
        spacingM: 12,
        spacingL: 18,
        spacingXl: 24,
        spacing2xl: 36,
        spacing3xl: 48,
      },
      // Border radius
      borderRadius: {
        rounded0: 0,
        rounded3xs: 1.5,
        rounded2xs: 3,
        roundedXs: 6,
        roundedS: 8,
        roundedM: 10,
        roundedL: 14,
        roundedXl: 17,
        rounded2xl: 20,
        rounded3xl: 26,
        rounded4xl: 32,
        roundedClickable: 10,
      },
      customCss: darkCustomCss,
    },
  },
};

