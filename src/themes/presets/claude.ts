import { ThemePreset } from "./types";

// Common custom CSS for Claude theme
const commonCustomCss = `
.crayon-shell-thread-message-assistant__logo { 
  visibility: hidden;
}

.crayon-card {
  background: none;
  border: none;
}

.crayon-shell-thread-message-user__content {
  border-radius: 14px;
}

.crayon-shell-thread-composer__input {
  height: 60px !important;
}
`;

const lightCustomCss = `${commonCustomCss}
.crayon-shell-thread-composer__input-wrapper {
  background: white;
  border-radius: 20px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 6px -3px rgba(0,0,0,0.25);
}
`;

const darkCustomCss = `${commonCustomCss}
.crayon-shell-thread-composer__input-wrapper {
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0px 0px 8px -3px #000000;
}
`;

export const claudePreset: ThemePreset = {
  name: "Claude",
  config: {
    light: {
      // Fills
      fills: {
        backgroundFills: "#FAF9F5",
        containerFills: "#FAF9F5",
        containerHoverFills: "rgba(242,237,236,1)",
        dangerFills: "rgba(212,14,20,0.04)",
        successFills: "rgba(-5,126,70,0.04)",
        infoFills: "rgba(-77,134,212,0.04)",
        alertFills: "rgba(208,144,30,0.04)",
      },
      // Text
      text: {
        primaryText: "rgba(5,5,5,1)",
        secondaryText: "rgba(5,5,5,0.5)",
        linkText: "oklch(0.60 0.11 40)",
        dangerText: "oklch(0.55 0.22 28)",
        successText: "oklch(0.52 0.13 155)",
        infoText: "rgba(61,133,209,1)",
        disabledText: "rgba(5,5,5,0.3)",
        accentPrimaryText: "rgba(255,255,255,1)",
        accentSecondaryText: "rgba(255,255,255,0.5)",
        accentDisabledText: "rgba(255,255,255,0.3)",
        brandText: "rgba(255,255,255,1)",
        brandSecondaryText: "rgba(255,255,255,0.5)",
      },
      // Interactive
      interactive: {
        interactiveAccent: "oklch(0.60 0.11 40)",
        interactiveAccentHover: "rgba(162,93,68,1)",
        interactiveAccentPressed: "rgba(165,94,68,1)",
        interactiveAccentDisabled: "rgba(183,104,76,0.21)",
        interactiveDestructive: "rgba(212,14,20,0.04)",
        interactiveDestructiveHover: "rgba(199,13,19,1)",
        interactiveDestructivePressed: "rgba(191,13,18,1)",
      },
      // Legacy colors
      colors: {
        background: "#FAF9F5",
        container: "#FAF9F5",
        primary: "oklch(0.60 0.11 40)",
        textPrimary: "rgba(5,5,5,1)",
        textSecondary: "rgba(5,5,5,0.5)",
        linkText: "oklch(0.60 0.11 40)",
        danger: "oklch(0.55 0.22 28)",
        success: "oklch(0.52 0.13 155)",
        info: "rgba(61,133,209,1)",
        alert: "oklch(0.70 0.14 75)",
      },
      chartColors: {
        primary: "rgba(183,104,76,1)",
      },
      // Strokes
      strokeColors: {
        default: "rgba(0,0,0,0.06)",
        interactiveEl: "rgba(0,0,0,0.12)",
        interactiveElHover: "rgba(0,0,0,0.20)",
        interactiveElSelected: "rgba(0,0,0,1)",
        emphasis: "rgba(0,0,0,0.32)",
        accent: "rgba(255,255,255,0.06)",
        accentEmphasis: "rgba(255,255,255,0.3)",
        info: "rgba(232,240,253,1)",
        infoEmphasis: "rgba(77,163,255,1)",
        alert: "#fff8e6",
        alertEmphasis: "#cc8800",
        success: "#e6f7ed",
        successEmphasis: "#10a37f",
        danger: "#fef2f2",
        dangerEmphasis: "#dc2626",
      },
      // Chat colors
      chatColors: {
        containerBg: "#FAF9F5",
        assistantBg: "#FAF9F5",
        assistantText: "rgb(20, 20, 19)",
        userBg: "rgb(240, 238, 230)",
        userText: "rgb(20, 20, 19)",
      },
      // Shadow
      shadow: {
        color: "rgba(183,104,76,1)",
        opacity: 0.06,
        blur: 4,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: "default",
      fonts: {
        body: "Bitter",
        heading: "Bitter",
        mono: "Bitter",
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
        backgroundFills: "#262624",
        containerFills: "#262624",
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
        brandText: "rgba(255,255,255,1)",
        brandSecondaryText: "rgba(255,255,255,0.6)",
        primaryText: "#f5f5f5",
        secondaryText: "#8c8c8c",
        disabledText: "#525252",
        dangerText: "#f87171",
        successText: "#4ade80",
        linkText: "#818cf8",
        infoText: "#60a5fa",
        alertText: "#fbbf24",
        accentPrimaryText: "rgba(255,255,255,1)",
        accentSecondaryText: "rgba(255,255,255,0.6)",
        accentDisabledText: "rgba(255,255,255,0.4)",
      },
      // Interactive
      interactive: {
        interactiveDefault: "rgba(255, 255, 255, 0.02)",
        interactiveHover: "rgba(255, 255, 255, 0.06)",
        interactivePressed: "rgba(255, 255, 255, 0.1)",
        interactiveDisabled: "rgba(255, 255, 255, 0.02)",
        interactiveAccent: "#CC6F4B",
        interactiveAccentHover: "rgba(210,121,86,1)",
        interactiveAccentPressed: "rgba(210,121,86,1)",
        interactiveAccentDisabled: "rgba(210,121,86,0.5)",
        interactiveDestructive: "#2d1410",
        interactiveDestructiveHover: "#3d1a15",
        interactiveDestructivePressed: "#4d201a",
        interactiveDestructiveDisabled: "#1d0d0a",
      },
      // Legacy colors
      colors: {
        background: "#262624",
        container: "#262624",
        primary: "#CC6F4B",
        textPrimary: "#f5f5f5",
        textSecondary: "#8c8c8c",
        linkText: "#818cf8",
        danger: "#f87171",
        success: "#4ade80",
        info: "#60a5fa",
        alert: "#fbbf24",
      },
      chartColors: {
        primary: "rgba(255,167,121,1)",
      },
      // Strokes
      strokeColors: {
        default: "rgba(255,255,255,0.08)",
        interactiveEl: "rgba(255,255,255,0.2)",
        interactiveElHover: "rgba(255,255,255,0.32)",
        interactiveElSelected: "rgba(255,255,255,1)",
        emphasis: "rgba(255,255,255,0.32)",
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
        containerBg: "#262624",
        assistantBg: "#262624",
        assistantText: "#f5f5f5",
        userBg: "rgba(13,13,13,1)",
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
        body: "Bitter",
        heading: "Bitter",
        mono: "Bitter",
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
