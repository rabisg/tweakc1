import { ThemeCustomization, ColorEngine, ShadowConfig } from "../types/theme";
import { colorEngines } from "./colorEngines";
import { parseColor } from "./colorParser";

// Alias for backwards compatibility
const parseRGBA = parseColor;

// Generate semantic colors using the selected engine
export function generateSemanticColors(
  colors: ThemeCustomization["colors"],
  engine: ColorEngine,
  mode: "light" | "dark"
): Record<string, string> {
  const result: Record<string, string> = {};

  // Background and container colors
  if (colors.background) {
    result.backgroundFills = colors.background;
    result.chatContainerBg = colors.background;
  }

  if (colors.container) {
    result.containerFills = colors.container;
    result.chatAssistantResponseBg = colors.container;
    result.containerHoverFills = engine.generateHover(colors.container, mode);
  }

  // Primary/accent colors
  if (colors.primary) {
    result.interactiveAccent = colors.primary;
    result.interactiveAccentHover = engine.generateHover(colors.primary, mode);
    result.interactiveAccentPressed = engine.generatePressed(
      colors.primary,
      mode
    );
    result.interactiveAccentDisabled = engine.generateDisabled(
      colors.primary,
      mode
    );
    result.strokeInteractiveElSelected = colors.primary;
  }

  // Text colors
  if (colors.textPrimary) {
    result.primaryText = colors.textPrimary;
    result.chatAssistantResponseText = colors.textPrimary;
    result.chatUserResponseText = colors.textPrimary;
  }

  if (colors.textSecondary) {
    result.secondaryText = colors.textSecondary;
  }

  // Link text color
  if (colors.linkText) {
    result.linkText = colors.linkText;
  }

  // Status colors
  if (colors.danger) {
    result.dangerFills = engine.generateSubtle(colors.danger, mode);
    result.dangerText = colors.danger;
    result.strokeDanger = engine.generateSubtle(colors.danger, mode);
    result.strokeDangerEmphasis = colors.danger;
    result.dangerPrimaryText = colors.danger;
    result.interactiveDestructive = engine.generateSubtle(colors.danger, mode);
    result.interactiveDestructiveHover = engine.generateHover(
      colors.danger,
      mode
    );
    result.interactiveDestructivePressed = engine.generatePressed(
      colors.danger,
      mode
    );
  }

  if (colors.success) {
    result.successFills = engine.generateSubtle(colors.success, mode);
    result.successText = colors.success;
    result.strokeSuccess = engine.generateSubtle(colors.success, mode);
    result.strokeSuccessEmphasis = colors.success;
    result.successPrimaryText = colors.success;
  }

  if (colors.info) {
    result.infoFills = engine.generateSubtle(colors.info, mode);
    result.infoText = colors.info;
    result.strokeInfo = engine.generateSubtle(colors.info, mode);
    result.strokeInfoEmphasis = colors.info;
    result.infoPrimaryText = colors.info;
  }

  if (colors.alert) {
    result.alertFills = engine.generateSubtle(colors.alert, mode);
    result.strokeAlert = engine.generateSubtle(colors.alert, mode);
    result.strokeAlertEmphasis = colors.alert;
    result.alertPrimaryText = colors.alert;
  }

  return result;
}

// Generate font variables
export function generateFontVariables(
  fonts: ThemeCustomization["fonts"],
  letterSpacing?: number,
  fontWeightScale?: number
): Record<string, string> {
  const result: Record<string, string> = {};
  const scale = fontWeightScale ?? 1;

  // Default to Inter if no fonts specified
  const bodyFont = fonts.body || "Inter";
  const headingFont = fonts.heading || "Inter";
  const monoFont = fonts.mono || "Menlo";

  console.log("[generateFontVariables]", {
    fontWeightScale,
    scale,
    bodyFont,
    headingFont,
    monoFont,
  });

  // Helper to scale font weight
  const w = (baseWeight: number) => Math.round(baseWeight * scale);

  if (bodyFont) {
    result.fontBody = `${w(375)} 16px/1.5 ${bodyFont}`;
    result.fontBodyLink = `${w(375)} 16px/1.5 ${bodyFont}`;
    result.fontBodyHeavy = `${w(450)} 16px/1.5 ${bodyFont}`;
    result.fontBodyMedium = `${w(375)} 16px/1.5 ${bodyFont}`;
    result.fontBodySmall = `${w(375)} 14px/1.5 ${bodyFont}`;
    result.fontBodySmallHeavy = `${w(450)} 14px/1.5 ${bodyFont}`;
    result.fontBodyLarge = `${w(375)} 18px/1.5 ${bodyFont}`;
    result.fontBodyLargeHeavy = `${w(450)} 18px/1.5 ${bodyFont}`;
    result.fontLabel = `${w(375)} 16px/1.2 ${bodyFont}`;
    result.fontLabelHeavy = `${w(450)} 16px/1.2 ${bodyFont}`;
    result.fontLabelSmall = `${w(375)} 14px/1.2 ${bodyFont}`;
    result.fontLabelSmallHeavy = `${w(450)} 14px/1.2 ${bodyFont}`;
    result.fontLabelExtraSmall = `${w(375)} 12px/1.2 ${bodyFont}`;
    result.fontLabelExtraSmallHeavy = `${w(450)} 12px/1.2 ${bodyFont}`;
    result.fontLabelLarge = `${w(375)} 18px/1.2 ${bodyFont}`;
    result.fontLabelLargeHeavy = `${w(450)} 18px/1.2 ${bodyFont}`;
    result.fontLabelMedium = `${w(375)} 16px/1.2 ${bodyFont}`;
    result.fontLabelMediumHeavy = `${w(450)} 16px/1.2 ${bodyFont}`;
    result.fontLabel2ExtraSmall = `${w(375)} 12px/1.2 ${bodyFont}`;
    result.fontLabel2ExtraSmallHeavy = `${w(450)} 12px/1.2 ${bodyFont}`;
  }

  if (headingFont) {
    result.fontHeadingLarge = `${w(550)} 28px/1.15 ${headingFont}`;
    result.fontHeadingMedium = `${w(550)} 24px/1.15 ${headingFont}`;
    result.fontHeadingSmall = `${w(550)} 18px/1.25 ${headingFont}`;
    result.fontHeadingExtraSmall = `${w(550)} 16px/1.25 ${headingFont}`;
  }

  if (monoFont) {
    result.fontNumber = `${w(375)} 16px/1.5 ${monoFont}`;
    result.fontNumberHeavy = `${w(450)} 16px/1.5 ${monoFont}`;
    result.fontNumberSmall = `${w(375)} 14px/1.5 ${monoFont}`;
    result.fontNumberSmallHeavy = `${w(450)} 14px/1.5 ${monoFont}`;
    result.fontNumberExtraSmall = `${w(375)} 12px/1.5 ${monoFont}`;
    result.fontNumberExtraSmallHeavy = `${w(450)} 12px/1.5 ${monoFont}`;
    result.fontNumberLarge = `${w(375)} 18px/1.5 ${monoFont}`;
    result.fontNumberLargeHeavy = `${w(450)} 18px/1.5 ${monoFont}`;
    result.fontNumberTitle = `${w(550)} 28px/1.5 ${monoFont}`;
    result.fontNumberTitleMedium = `${w(550)} 24px/1.5 ${monoFont}`;
  }

  // Add letter spacing
  if (letterSpacing !== undefined) {
    const letterSpacingValue = `${letterSpacing}em`;
    const letterSpacingKeys = Object.keys(result).map(
      (key) => `${key}LetterSpacing`
    );
    letterSpacingKeys.forEach((key) => {
      result[key] = letterSpacingValue;
    });
  }

  return result;
}

// Generate spacing scale
export function generateSpacingScale(base: number): Record<string, string> {
  return {
    spacing0: "0px",
    spacing3xs: `${base}px`,
    spacing2xs: `${base * 2}px`,
    spacingXs: `${base * 3}px`,
    spacingS: `${base * 4}px`,
    spacingM: `${base * 6}px`,
    spacingL: `${base * 9}px`,
    spacingXl: `${base * 12}px`,
    spacing2xl: `${base * 18}px`,
    spacing3xl: `${base * 24}px`,
  };
}

// Generate border radius scale
export function generateBorderRadiusScale(
  base: number
): Record<string, string> {
  return {
    rounded0: "0px",
    rounded3xs: `${base}px`,
    rounded2xs: `${base * 2}px`,
    roundedXs: `${base * 3}px`,
    roundedS: `${base * 4}px`,
    roundedM: `${base * 5}px`,
    roundedL: `${base * 6}px`,
    roundedXl: `${base * 8}px`,
    rounded2xl: `${base * 10}px`,
    rounded3xl: `${base * 12}px`,
    rounded4xl: `${base * 14}px`,
    roundedFull: "999px",
    roundedClickable: `${base * 5}px`,
  };
}

// Helper to convert shadow config to CSS string
function shadowConfigToString(shadow?: ShadowConfig): string | undefined {
  if (!shadow) return undefined;

  const {
    color = "rgba(0, 0, 0, 1)",
    opacity = 0.1,
    blur = 4,
    spread = 0,
    offsetX = 0,
    offsetY = 1,
  } = shadow;

  // Parse color and apply opacity
  const { r, g, b } = parseRGBA(color);
  const finalColor = `rgba(${r},${g},${b},${opacity})`;

  // Omit spread if it's 0 (standard CSS allows this)
  if (spread === 0) {
    return `${offsetX}px ${offsetY}px ${blur}px ${finalColor}`;
  }

  return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${finalColor}`;
}

// Scale a shadow config by a multiplier
function scaleShadow(shadow: ShadowConfig, scale: number): ShadowConfig {
  return {
    color: shadow.color,
    opacity: shadow.opacity,
    blur: Math.round((shadow.blur || 4) * scale),
    spread: Math.round((shadow.spread || 0) * scale),
    offsetX: Math.round((shadow.offsetX || 0) * scale),
    offsetY: Math.round((shadow.offsetY || 1) * scale),
  };
}

// Generate shadows from a single base shadow
export function generateShadows(
  baseShadow?: ShadowConfig
): Record<string, string> {
  const result: Record<string, string> = {};

  if (!baseShadow) return result;

  // Generate 4 levels: small (0.5x), medium (1x), large (2x), xl (3x)
  const shadowS = shadowConfigToString(scaleShadow(baseShadow, 0.5));
  if (shadowS) result.shadowS = shadowS;

  const shadowM = shadowConfigToString(baseShadow);
  if (shadowM) result.shadowM = shadowM;

  const shadowL = shadowConfigToString(scaleShadow(baseShadow, 2));
  if (shadowL) result.shadowL = shadowL;

  const shadowXl = shadowConfigToString(scaleShadow(baseShadow, 3));
  if (shadowXl) result.shadowXl = shadowXl;

  return result;
}

// Helper to apply opacity to a color
function applyOpacity(color: string, opacity: number): string {
  const { r, g, b } = parseRGBA(color);
  return `rgba(${r},${g},${b},${opacity})`;
}

// Generate stroke colors from base color and opacity
export function generateStrokeColors(
  strokeColors: ThemeCustomization["strokeColors"],
  statusColors?: {
    danger?: string;
    success?: string;
    info?: string;
    alert?: string;
    accent?: string;
  }
): Record<string, string> {
  const result: Record<string, string> = {};

  if (!strokeColors.base) return result;

  const baseColor = strokeColors.base;
  const baseOpacity = strokeColors.opacity || 0.2;

  // Default stroke (base opacity)
  result.strokeDefault = applyOpacity(baseColor, baseOpacity);

  // Interactive states (increasing opacity)
  result.strokeInteractiveEl = applyOpacity(baseColor, baseOpacity * 2);
  result.strokeInteractiveElHover = applyOpacity(baseColor, baseOpacity * 2.5);
  result.strokeInteractiveElSelected = applyOpacity(
    baseColor,
    baseOpacity * 3.5
  );

  // Emphasis (higher opacity)
  result.strokeEmphasis = applyOpacity(baseColor, baseOpacity * 2);

  // Accent strokes (derive from accent color if available)
  if (statusColors?.accent) {
    result.strokeAccent = applyOpacity(statusColors.accent, baseOpacity);
    result.strokeAccentEmphasis = applyOpacity(
      statusColors.accent,
      baseOpacity * 2
    );
  } else {
    result.strokeAccent = applyOpacity(baseColor, baseOpacity * 0.6);
    result.strokeAccentEmphasis = applyOpacity(baseColor, baseOpacity * 2);
  }

  // Status strokes (derive from status colors if available)
  if (statusColors?.info) {
    result.strokeInfo = applyOpacity(statusColors.info, baseOpacity);
    result.strokeInfoEmphasis = statusColors.info;
  }

  if (statusColors?.alert) {
    result.strokeAlert = applyOpacity(statusColors.alert, baseOpacity);
    result.strokeAlertEmphasis = statusColors.alert;
  }

  if (statusColors?.success) {
    result.strokeSuccess = applyOpacity(statusColors.success, baseOpacity);
    result.strokeSuccessEmphasis = statusColors.success;
  }

  if (statusColors?.danger) {
    result.strokeDanger = applyOpacity(statusColors.danger, baseOpacity);
    result.strokeDangerEmphasis = statusColors.danger;
  }

  return result;
}

// Generate chat colors
export function generateChatColors(
  chatColors: ThemeCustomization["chatColors"]
): Record<string, string> {
  const result: Record<string, string> = {};

  if (chatColors.containerBg) {
    result.chatContainerBg = chatColors.containerBg;
  }
  if (chatColors.assistantBg) {
    result.chatAssistantResponseBg = chatColors.assistantBg;
  }
  if (chatColors.assistantText) {
    result.chatAssistantResponseText = chatColors.assistantText;
  }
  if (chatColors.userBg) {
    result.chatUserResponseBg = chatColors.userBg;
  }
  if (chatColors.userText) {
    result.chatUserResponseText = chatColors.userText;
  }

  return result;
}

// Generate chart palette from base colors
export function generateChartPalette(
  chartColors: ThemeCustomization["chartColors"],
  mode: "light" | "dark"
): string[] {
  const colors: string[] = [];

  // Collect defined colors
  if (chartColors.color1) colors.push(chartColors.color1);
  if (chartColors.color2) colors.push(chartColors.color2);
  if (chartColors.color3) colors.push(chartColors.color3);

  if (colors.length === 0) return [];

  const targetCount = mode === "light" ? 10 : 11;
  const palette: string[] = [];

  // Strategy: distribute colors evenly across opacity variations
  const opacities =
    mode === "light" ? [1, 0.8, 0.6, 0.4] : [1, 0.8, 0.6, 0.4, 0.2];

  colors.forEach((color) => {
    const { r, g, b } = parseRGBA(color);
    // In dark mode, lighten the base colors slightly for better visibility
    const adjustedR = mode === "dark" ? Math.min(255, r + 20) : r;
    const adjustedG = mode === "dark" ? Math.min(255, g + 20) : g;
    const adjustedB = mode === "dark" ? Math.min(255, b + 20) : b;

    // Add color at different opacities
    const numOpacities = Math.min(
      opacities.length,
      targetCount - palette.length
    );
    for (let i = 0; i < numOpacities && palette.length < targetCount; i++) {
      palette.push(
        `rgba(${adjustedR},${adjustedG},${adjustedB},${opacities[i]})`
      );
    }
  });

  return palette;
}

// Generate complete theme for a single mode
export function generateCompleteTheme(
  customization: ThemeCustomization,
  mode: "light" | "dark"
): Record<string, any> {
  const engine =
    colorEngines[customization.colorEngine] || colorEngines.default;

  const theme: Record<string, any> = {};

  // Generate colors
  const colors = generateSemanticColors(customization.colors, engine, mode);
  Object.assign(theme, colors);

  // Generate fonts
  const fonts = generateFontVariables(
    customization.fonts,
    customization.letterSpacing.base,
    customization.fontWeight.scale
  );
  Object.assign(theme, fonts);

  // Generate spacing
  if (customization.spacing.base !== undefined) {
    const spacing = generateSpacingScale(customization.spacing.base);
    Object.assign(theme, spacing);
  }

  // Generate border radius
  if (customization.borderRadius.base !== undefined) {
    const radius = generateBorderRadiusScale(customization.borderRadius.base);
    Object.assign(theme, radius);
  }

  // Generate chart palette
  const chartPalette = generateChartPalette(customization.chartColors, mode);
  if (chartPalette.length > 0) {
    theme.defaultChartPalette = chartPalette;
  }

  // Generate shadows
  const shadows = generateShadows(customization.shadow);
  Object.assign(theme, shadows);

  // Generate stroke colors
  const strokes = generateStrokeColors(customization.strokeColors, {
    danger: customization.colors.danger,
    success: customization.colors.success,
    info: customization.colors.info,
    alert: customization.colors.alert,
    accent: customization.colors.primary,
  });
  Object.assign(theme, strokes);

  // Generate chat colors
  const chatColors = generateChatColors(customization.chatColors);
  Object.assign(theme, chatColors);

  // Always return theme object (even if empty)
  return theme;
}

// Generate TypeScript code for export
export function generateThemeCode(
  lightCustomization: ThemeCustomization,
  darkCustomization: ThemeCustomization
): string {
  const lightTheme = generateCompleteTheme(lightCustomization, "light");
  const darkTheme = generateCompleteTheme(darkCustomization, "dark");

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
      return `[\n      ${value.map((v) => `"${v}"`).join(",\n      ")}\n    ]`;
    }
    return `"${value}"`;
  };

  const formatObject = (
    obj: Record<string, any>,
    indent: string = "    "
  ): string => {
    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return "";
    }
    return entries
      .map(([key, value]) => `${indent}${key}: ${formatValue(value)}`)
      .join(",\n");
  };

  const lightCss = lightCustomization.customCss;
  const darkCss = darkCustomization.customCss;

  let customCssSection = "";
  if (lightCss || darkCss) {
    const lightCssCode = lightCss
      ? `export const lightCustomCss = \`${lightCss}\`;`
      : "";
    const darkCssCode = darkCss
      ? `export const darkCustomCss = \`${darkCss}\`;`
      : "";

    customCssSection = `\n\n${lightCssCode}${
      lightCss && darkCss ? "\n\n" : ""
    }${darkCssCode}

// Apply custom CSS:
// Add this to your component:
// useEffect(() => {
//   const style = document.createElement('style');
//   style.textContent = mode === 'light' ? lightCustomCss : darkCustomCss;
//   document.head.appendChild(style);
//   return () => style.remove();
// }, [mode]);`;
  }

  const lightThemeContent = formatObject(lightTheme);
  const darkThemeContent = formatObject(darkTheme);

  return `export const customTheme = {
  theme: {
${lightThemeContent}
  },
  darkTheme: {
${darkThemeContent}
  }
};${customCssSection}

// Usage:
// <ThemeProvider theme={customTheme.theme} darkTheme={customTheme.darkTheme}>
//   <C1Chat ... />
// </ThemeProvider>`;
}
