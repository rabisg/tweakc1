import { ThemeCustomization, ColorEngine } from "../types/theme";
import { colorEngines } from "./colorEngines";

// Helper to parse rgba and extract RGB components
function parseRGBA(rgba: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
  if (!match) return { r: 0, g: 0, b: 0, a: 1 };
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

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
  letterSpacing?: number
): Record<string, string> {
  const result: Record<string, string> = {};

  if (fonts.body) {
    result.fontBody = `375 16px/1.5 ${fonts.body}`;
    result.fontBodyLink = `375 16px/1.5 ${fonts.body}`;
    result.fontBodyHeavy = `450 16px/1.5 ${fonts.body}`;
    result.fontBodyMedium = `375 16px/1.5 ${fonts.body}`;
    result.fontBodySmall = `375 14px/1.5 ${fonts.body}`;
    result.fontBodySmallHeavy = `450 14px/1.5 ${fonts.body}`;
    result.fontBodyLarge = `375 18px/1.5 ${fonts.body}`;
    result.fontBodyLargeHeavy = `450 18px/1.5 ${fonts.body}`;
    result.fontLabel = `375 16px/1.2 ${fonts.body}`;
    result.fontLabelHeavy = `450 16px/1.2 ${fonts.body}`;
    result.fontLabelSmall = `375 14px/1.2 ${fonts.body}`;
    result.fontLabelSmallHeavy = `450 14px/1.2 ${fonts.body}`;
    result.fontLabelExtraSmall = `375 12px/1.2 ${fonts.body}`;
    result.fontLabelExtraSmallHeavy = `450 12px/1.2 ${fonts.body}`;
    result.fontLabelLarge = `375 18px/1.2 ${fonts.body}`;
    result.fontLabelLargeHeavy = `450 18px/1.2 ${fonts.body}`;
    result.fontLabelMedium = `375 16px/1.2 ${fonts.body}`;
    result.fontLabelMediumHeavy = `450 16px/1.2 ${fonts.body}`;
    result.fontLabel2ExtraSmall = `375 12px/1.2 ${fonts.body}`;
    result.fontLabel2ExtraSmallHeavy = `450 12px/1.2 ${fonts.body}`;
  }

  if (fonts.heading) {
    result.fontHeadingLarge = `550 28px/1.15 ${fonts.heading}`;
    result.fontHeadingMedium = `550 24px/1.15 ${fonts.heading}`;
    result.fontHeadingSmall = `550 18px/1.25 ${fonts.heading}`;
    result.fontHeadingExtraSmall = `550 16px/1.25 ${fonts.heading}`;
  }

  if (fonts.mono) {
    result.fontNumber = `375 16px/1.5 ${fonts.mono}`;
    result.fontNumberHeavy = `450 16px/1.5 ${fonts.mono}`;
    result.fontNumberSmall = `375 14px/1.5 ${fonts.mono}`;
    result.fontNumberSmallHeavy = `450 14px/1.5 ${fonts.mono}`;
    result.fontNumberExtraSmall = `375 12px/1.5 ${fonts.mono}`;
    result.fontNumberExtraSmallHeavy = `450 12px/1.5 ${fonts.mono}`;
    result.fontNumberLarge = `375 18px/1.5 ${fonts.mono}`;
    result.fontNumberLargeHeavy = `450 18px/1.5 ${fonts.mono}`;
    result.fontNumberTitle = `550 28px/1.5 ${fonts.mono}`;
    result.fontNumberTitleMedium = `550 24px/1.5 ${fonts.mono}`;
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
  const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  let finalColor = color;

  if (colorMatch) {
    const r = colorMatch[1];
    const g = colorMatch[2];
    const b = colorMatch[3];
    finalColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

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
  const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (colorMatch) {
    const r = colorMatch[1];
    const g = colorMatch[2];
    const b = colorMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
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

  const palette: string[] = [];
  const opacities =
    mode === "light"
      ? [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.07]
      : [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.14, 0.07];

  // Generate variants for each base color
  colors.forEach((color) => {
    const { r, g, b } = parseRGBA(color);
    // In dark mode, lighten the base colors slightly
    const adjustedR = mode === "dark" ? Math.min(255, r + 20) : r;
    const adjustedG = mode === "dark" ? Math.min(255, g + 20) : g;
    const adjustedB = mode === "dark" ? Math.min(255, b + 20) : b;

    opacities.forEach((opacity) => {
      palette.push(
        `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${opacity})`
      );
    });
  });

  // Return first 11 colors
  return palette.slice(0, 11);
}

// Generate complete theme
export function generateCompleteTheme(customization: ThemeCustomization): {
  theme?: Record<string, any>;
  darkTheme?: Record<string, any>;
} {
  const engine =
    colorEngines[customization.colorEngine] || colorEngines.default;

  const lightTheme: Record<string, any> = {};
  const darkTheme: Record<string, any> = {};

  // Generate colors
  const lightColors = generateSemanticColors(
    customization.colors,
    engine,
    "light"
  );
  const darkColors = generateSemanticColors(
    customization.colors,
    engine,
    "dark"
  );
  Object.assign(lightTheme, lightColors);
  Object.assign(darkTheme, darkColors);

  // Generate fonts
  const fonts = generateFontVariables(
    customization.fonts,
    customization.letterSpacing.base
  );
  Object.assign(lightTheme, fonts);
  Object.assign(darkTheme, fonts);

  // Generate spacing
  if (customization.spacing.base !== undefined) {
    const spacing = generateSpacingScale(customization.spacing.base);
    Object.assign(lightTheme, spacing);
    Object.assign(darkTheme, spacing);
  }

  // Generate border radius
  if (customization.borderRadius.base !== undefined) {
    const radius = generateBorderRadiusScale(customization.borderRadius.base);
    Object.assign(lightTheme, radius);
    Object.assign(darkTheme, radius);
  }

  // Generate chart palette
  const lightChartPalette = generateChartPalette(
    customization.chartColors,
    "light"
  );
  const darkChartPalette = generateChartPalette(
    customization.chartColors,
    "dark"
  );
  if (lightChartPalette.length > 0) {
    lightTheme.defaultChartPalette = lightChartPalette;
  }
  if (darkChartPalette.length > 0) {
    darkTheme.defaultChartPalette = darkChartPalette;
  }

  // Generate shadows
  const shadows = generateShadows(customization.shadow);
  Object.assign(lightTheme, shadows);
  Object.assign(darkTheme, shadows);

  // Generate stroke colors
  const strokes = generateStrokeColors(customization.strokeColors, {
    danger: customization.colors.danger,
    success: customization.colors.success,
    info: customization.colors.info,
    alert: customization.colors.alert,
    accent: customization.colors.primary,
  });
  Object.assign(lightTheme, strokes);
  Object.assign(darkTheme, strokes);

  // Generate chat colors
  const chatColors = generateChatColors(customization.chatColors);
  Object.assign(lightTheme, chatColors);
  Object.assign(darkTheme, chatColors);

  // Return undefined if no customizations
  if (Object.keys(lightTheme).length === 0) {
    return { theme: undefined, darkTheme: undefined };
  }

  return { theme: lightTheme, darkTheme: darkTheme };
}

// Generate TypeScript code for export
export function generateThemeCode(
  theme?: Record<string, any>,
  darkTheme?: Record<string, any>
): string {
  if (!theme || !darkTheme) {
    return "export const customTheme = {\n  theme: {},\n  darkTheme: {}\n};";
  }

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
    return entries
      .map(([key, value]) => `${indent}${key}: ${formatValue(value)}`)
      .join(",\n");
  };

  return `export const customTheme = {
  theme: {
${formatObject(theme)}
  },
  darkTheme: {
${formatObject(darkTheme)}
  }
};

// Usage:
// <ThemeProvider theme={customTheme.theme} darkTheme={customTheme.darkTheme}>
//   <C1Chat ... />
// </ThemeProvider>`;
}
