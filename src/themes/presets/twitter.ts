import { ThemePreset } from "./types";

const lightCustomCss = `
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

.crayon-shell-thread-composer__input-wrapper {
  padding: 8px;
  border-radius: 999px;
  padding-left: 16px;
  background-color: rgba(0,0,0,0.03);
}

.crayon-shell-thread-composer__input-wrapper .crayon-icon-button {
  height: 40px;
  width: 40px;
  border-radius: 999px;
}
`;

const darkCustomCss = `
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

.crayon-shell-thread-composer__input-wrapper {
  padding: 8px;
  border-radius: 999px;
  padding-left: 16px;
  background-color: rgba(255,255,255,0.03);
}

.crayon-shell-thread-composer__input-wrapper .crayon-icon-button {
  height: 40px;
  width: 40px;
  border-radius: 999px;
}

.crayon-shell-thread-message-user__content {
  border-radius: 20px 20px 0px 20px;
}
`;

export const twitterPreset: ThemePreset = {
  name: "Grok",
  config: {
    light: {
      // Fills (from Vercel light)
      fills: {
        backgroundFills: "#fefefe",
        containerFills: "#fefefe",
        overlayFills: "rgba(0, 0, 0, 0.5)",
        sunkFills: "rgba(0, 0, 0, 0.04)",
        containerHoverFills: "rgba(0, 0, 0, 0.04)",
        dangerFills: "#fff0ee",
        successFills: "#e8fff0",
        infoFills: "#f3f2ff",
        elevatedFills: "rgba(255, 255, 255, 0.2)",
        alertFills: "#fff8f1",
        sunkBgFills: "rgba(0, 0, 0, 0.04)",
        invertedFills: "#101010",
        highlightSubtle: "rgba(0, 0, 0, 0.02)",
      },
      // Text (from Vercel light)
      text: {
        brandText: "rgba(255, 255, 255, 1)",
        brandSecondaryText: "rgba(255,255,255,0.5)",
        primaryText: "rgba(0,0,0,1)",
        secondaryText: "rgba(0,0,0,0.5)",
        disabledText: "rgba(0,0,0,0.3)",
        dangerText: "#a61d0e",
        successText: "#007a54",
        linkText: "rgba(71,85,245,1)",
        infoText: "rgba(71,85,245,1)",
        alertText: "#9a6700",
        accentPrimaryText: "rgba(255, 255, 255, 1)",
        accentSecondaryText: "rgba(255,255,255,0.5)",
        accentDisabledText: "rgba(255,255,255,0.3)",
      },
      // Interactive (from Vercel light)
      interactive: {
        interactiveDefault: "rgba(255, 255, 255, 0.02)",
        interactiveHover: "rgba(0, 0, 0, 0.04)",
        interactivePressed: "rgba(0, 0, 0, 0.06)",
        interactiveDisabled: "rgba(255, 255, 255, 0.02)",
        interactiveAccent: "rgba(0,0,0,1)",
        interactiveAccentHover: "rgba(0,0,0,0.7)",
        interactiveAccentPressed: "rgba(0,0,0,0.7)",
        interactiveAccentDisabled: "rgba(0,0,0,0.4)",
        interactiveDestructive: "#fff0ee",
        interactiveDestructiveHover: "#ffe9e5",
        interactiveDestructivePressed: "#ffded8",
        interactiveDestructiveDisabled: "#fff0ee",
      },
      // Legacy colors (from Vercel light)
      colors: {
        background: "#fefefe",
        container: "#fefefe",
        primary: "rgba(0,0,0,1)",
        textPrimary: "rgba(0,0,0,1)",
        textSecondary: "rgba(0,0,0,0.5)",
        linkText: "rgba(71,85,245,1)",
        danger: "#a61d0e",
        success: "#007a54",
        info: "rgba(71,85,245,1)",
        alert: "#9a6700",
      },
      chartColors: {
        primary: "rgba(0,0,0,1)",
      },
      // Strokes (from Vercel light)
      strokeColors: {
        default: "rgba(0, 0, 0, 0.06)",
        interactiveEl: "rgba(0, 0, 0, 0.1)",
        interactiveElHover: "rgba(0, 0, 0, 0.3)",
        interactiveElSelected: "rgba(0, 0, 0, 0.5)",
        emphasis: "rgba(0, 0, 0, 0.2)",
        accent: "rgba(255, 255, 255, 0.04)",
        accentEmphasis: "rgba(255, 255, 255, 0.08)",
        info: "#ececff",
        infoEmphasis: "#5879ff",
        alert: "#fff2d9",
        alertEmphasis: "#d9ae12",
        success: "#cdffe3",
        successEmphasis: "#0ab17d",
        danger: "#ffe9e5",
        dangerEmphasis: "#eb4b35",
      },
      // Chat colors (from Vercel light)
      chatColors: {
        containerBg: "#fefefe",
        assistantBg: "#fefefe",
        assistantText: "rgba(0,0,0,1)",
        userBg: "rgba(230,230,230,1)",
        userText: "rgba(0,0,0,1)",
      },
      // Shadow (from Vercel light)
      shadow: {
        color: "rgba(0,0,0,1)",
        opacity: 0.03,
        blur: 4,
        spread: 0,
        offsetX: 0,
        offsetY: 1,
      },
      colorEngine: "default",
      fonts: {
        body: "Geist",
        heading: "Geist",
        mono: "Geist",
      },
      fontWeight: {},
      letterSpacing: {},
      fontSize: {
        base: 15,
      },
      // Spacing (from Vercel light)
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
      // Border radius (from Vercel light)
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
        rounded3xl: 16,
        rounded4xl: 20,
        roundedClickable: 10,
      },
      customCss: lightCustomCss,
    },
    dark: {
      // Fills
      fills: {
        backgroundFills: "#050505",
        containerFills: "#0a0a0a",
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
        accentPrimaryText: "rgba(0, 0, 0, 1)",
        accentSecondaryText: "rgba(0, 0, 0, 0.7)",
        primaryText: "#f5f5f5",
        secondaryText: "#8c8c8c",
        disabledText: "#525252",
        alertText: "#fbbf24",
        accentDisabledText: "rgba(0, 0, 0, 0.4)",
        dangerText: "#f87171",
        successText: "#4ade80",
        linkText: "#818cf8",
        infoText: "#60a5fa",
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
        background: "#050505",
        container: "#0a0a0a",
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
        primary: "#ffffff",
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
        containerBg: "#050505",
        assistantBg: "#0a0a0a",
        assistantText: "#f5f5f5",
        userBg: "#1a1a1a",
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
        body: "Geist",
        heading: "Geist",
        mono: "Geist",
      },
      fontWeight: {},
      letterSpacing: {},
      fontSize: {},
      // Spacing
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
        rounded3xs: 1,
        rounded2xs: 2,
        roundedXs: 4,
        roundedS: 6,
        roundedM: 8,
        roundedL: 10,
        roundedXl: 12,
        rounded2xl: 14,
        rounded3xl: 16,
        rounded4xl: 20,
        roundedClickable: 10,
      },
      customCss: darkCustomCss,
    },
  },
};
