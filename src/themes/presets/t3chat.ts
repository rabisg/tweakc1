import { ThemePreset } from "./types";

// Common custom CSS for T3 Chat theme
const commonCustomCss = `
.crayon-shell-thread-composer__input {
  width: 100%;
}
  
.crayon-card {
  border: none;
  background: transparent;
}

.crayon-shell-thread-message-assistant__logo {
  opacity: 0;
}

.crayon-shell-thread-message-user__content {
  border-radius: 16px 16px 16px 16px;
}

.crayon-shell-thread-composer__input-wrapper .crayon-icon-button {
  width: 40px;
}

.crayon-table child {
  border-radius: 0px;
}

.crayon-table-row:nth-child(even) {
  background-color: transparent;
}

.crayon-table thead {
  background-color: var(--crayon-highlight-subtle);
}

.c1-mini-card {
  padding: 10px;
}
`;

const lightCustomCss = `${commonCustomCss}
.crayon-shell-thread-composer__input-wrapper {
  margin-bottom: -12px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0,0.0);
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 0 0 8px #FFDFFE;
  border-radius: 12px 12px 0px 0px;
}
`;

const darkCustomCss = `${commonCustomCss}
.crayon-shell-thread-composer__input-wrapper {
  margin-bottom: -12px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0,0.0);
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 0 0 8px #241F2A;
  border-radius: 12px 12px 0px 0px;
}
`;

export const t3chatPreset: ThemePreset = {
  name: "T3 Chat",
  config: {
    light: {
      fills: {
        backgroundFills: "#FAF3FB",
        containerFills: "#F6DEF7",
        containerHoverFills: "#F6DEF7",
        dangerFills: "rgba(216,-35,-14,0.04)",
        successFills: "rgba(-20,133,72,0.04)",
        infoFills: "rgba(-61,142,200,0.04)",
        alertFills: "rgba(215,151,0,0.04)",
        sunkFills: "rgba(78,42,100,0.04)",
        sunkBgFills: "rgba(78,42,100,0.04)",
        highlightSubtle: "rgba(78,42,100,0.02)",
      },
      text: {
        primaryText: "rgba(78,42,100,1)",
        secondaryText: "rgba(78,42,100,0.5)",
        linkText: "rgba(56,117,214,1)",
        dangerText: "oklch(0.54 0.24 28)",
        successText: "oklch(0.54 0.14 155)",
        infoText: "rgba(56,117,214,1)",
        accentPrimaryText: "rgba(255,255,255,1)",
        accentSecondaryText: "rgba(255,255,255,0.5)",
        brandText: "rgba(255,255,255,1)",
        brandSecondaryText: "rgba(255,255,255,0.5)",
        disabledText: "rgba(78,42,100,0.3)",
        accentDisabledText: "rgba(255,255,255,0.3)",
        alertText: "oklch(0.72 0.15 78)",
      },
      interactive: {
        interactiveAccent: "#B2346C",
        interactiveAccentHover: "rgba(206,90,142,1)",
        interactiveAccentPressed: "rgba(206,90,142,1)",
        interactiveAccentDisabled: "rgba(206,90,142,0.5)",
        interactiveDestructive: "rgba(216,-35,-14,0.04)",
        interactiveDestructiveHover: "rgba(203,-33,-13,1)",
        interactiveDestructivePressed: "rgba(194,-31,-13,1)",
      },
      colors: {
        background: "#FAF3FB",
        container: "#F6DEF7",
        primary: "#B2346C",
        textPrimary: "rgba(78,42,100,1)",
        textSecondary: "rgba(78,42,100,0.5)",
        linkText: "rgba(56,117,214,1)",
        danger: "oklch(0.54 0.24 28)",
        success: "oklch(0.54 0.14 155)",
        info: "rgba(56,117,214,1)",
        alert: "oklch(0.72 0.15 78)",
      },
      chartColors: {
        primary: "rgba(178,52,108,1)",
      },
      strokeColors: {
        default: "rgba(0,0,0,0.06)",
        interactiveEl: "rgba(0,0,0,0.12)",
        interactiveElHover: "rgba(0,0,0,0.2)",
        interactiveElSelected: "rgba(0,0,0,1)",
        emphasis: "rgba(0,0,0,0.32)",
        accent: "rgba(255,255,255,0.2)",
        accentEmphasis: "rgba(59,130,246,0.4)",
        info: "#eff6ff",
        infoEmphasis: "#3b82f6",
        alert: "#fffbeb",
        alertEmphasis: "#f59e0b",
        success: "#ecfdf5",
        successEmphasis: "#10b981",
        danger: "#fef2f2",
        dangerEmphasis: "#ef4444",
      },
      chatColors: {
        containerBg: "#FAF3FB",
        assistantBg: "#FAF3FB",
        assistantText: "#4E2A64",
        userBg: "#F6DEF7",
        userText: "#4E2A64",
      },
      shadow: {
        color: "rgba(14,18,22,1)",
        opacity: 0.04,
        blur: 3,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: "default",
      fonts: {
        body: "Raleway",
        heading: "Raleway",
        mono: "Raleway",
      },
      fontWeight: {
        regular: 500,
        medium: 600,
        bold: 700,
      },
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
        rounded3xs: 2,
        rounded2xs: 4,
        roundedXs: 6,
        roundedS: 8,
        roundedM: 10,
        roundedL: 12,
        roundedXl: 16,
        rounded2xl: 20,
        rounded3xl: 24,
        rounded4xl: 28,
        roundedClickable: 10,
      },
      customCss: lightCustomCss,
    },
    dark: {
      // Fills
      fills: {
        backgroundFills: "#221C27",
        containerFills: "#191116",
        overlayFills: "rgba(0, 0, 0, 0.7)",
        sunkFills: "rgba(238,89,164,0.06)",
        containerHoverFills: "rgba(255, 255, 255, 0.06)",
        dangerFills: "#2d1410",
        successFills: "#0d2818",
        infoFills: "#1a1a2e",
        elevatedFills: "rgba(255, 255, 255, 0.1)",
        alertFills: "#2d2610",
        sunkBgFills: "rgba(238,89,164,0.06)",
        invertedFills: "#f1f1f1",
        highlightSubtle: "rgba(238,89,164,0.02)",
      },
      // Text
      text: {
        brandText: "rgba(255,255,255,1)",
        brandSecondaryText: "rgba(255,255,255,0.5)",
        primaryText: "#F4EBFB",
        secondaryText: "rgba(244,235,251,0.5)",
        disabledText: "rgba(244,235,251,0.3)",
        dangerText: "#f87171",
        successText: "#4ade80",
        linkText: "#818cf8",
        infoText: "#60a5fa",
        alertText: "#fbbf24",
        accentPrimaryText: "rgba(255,255,255,1)",
        accentSecondaryText: "rgba(255,255,255,0.5)",
        accentDisabledText: "rgba(255,255,255,0.3)",
      },
      // Interactive
      interactive: {
        interactiveDefault: "rgba(255, 255, 255, 0.02)",
        interactiveHover: "rgba(255, 255, 255, 0.06)",
        interactivePressed: "rgba(255, 255, 255, 0.1)",
        interactiveDisabled: "rgba(255, 255, 255, 0.02)",
        interactiveAccent: "#8E0047",
        interactiveAccentHover: "rgba(168,11,89,1)",
        interactiveAccentPressed: "rgba(168,11,89,1)",
        interactiveAccentDisabled: "rgba(168,11,89,0.5)",
        interactiveDestructive: "#2d1410",
        interactiveDestructiveHover: "#3d1a15",
        interactiveDestructivePressed: "#4d201a",
        interactiveDestructiveDisabled: "#1d0d0a",
      },
      // Legacy colors
      colors: {
        background: "#221C27",
        container: "#191116",
        primary: "#8E0047",
        textPrimary: "#F4EBFB",
        textSecondary: "rgba(244,235,251,0.5)",
        linkText: "#818cf8",
        danger: "#f87171",
        success: "#4ade80",
        info: "#60a5fa",
        alert: "#fbbf24",
      },
      chartColors: {
        primary: "rgba(241,54,148,1)",
      },
      // Strokes
      strokeColors: {
        default: "rgba(255,255,255,0.06)",
        interactiveEl: "rgba(255,255,255,0.12)",
        interactiveElHover: "rgba(255,255,255,0.3)",
        interactiveElSelected: "rgba(255,255,255,1)",
        emphasis: "rgba(255,255,255,0.3)",
        accent: "rgba(255,255,255,0.06)",
        accentEmphasis: "rgba(255,255,255,0.2)",
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
        containerBg: "#221C27",
        assistantBg: "#221C27",
        assistantText: "#F4EBFB",
        userBg: "#2C2532",
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
        body: "Raleway",
        heading: "Raleway",
        mono: "Raleway",
      },
      fontWeight: {
        regular: 500,
        medium: 600,
        bold: 700,
      },
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
        rounded3xs: 1,
        rounded2xs: 2,
        roundedXs: 4,
        roundedS: 6,
        roundedM: 8,
        roundedL: 10,
        roundedXl: 12,
        rounded2xl: 14,
        rounded3xl: 18,
        rounded4xl: 24,
        roundedClickable: 810,
      },
      customCss: darkCustomCss,
    },
  },
};
