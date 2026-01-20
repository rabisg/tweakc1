import { ThemeCustomization, ColorEngine, ShadowConfig } from "../types/theme";
import { colorEngines } from "./colorEngines";
import { parseColor } from "./colorParser";

// Alias for backwards compatibility
const parseRGBA = parseColor;

// Export the default color engine for tests
export const defaultColorEngine = colorEngines.default;

// Extended colors type for backwards compatibility with legacy presets
type ExtendedColors = ThemeCustomization["colors"] & {
  backgroundSecondary?: string;
  backgroundTertiary?: string;
  containerHover?: string;
  sunk?: string;
  elevated?: string;
  overlay?: string;
  highlightSubtle?: string;
  primaryHover?: string;
  primaryPressed?: string;
  primaryDisabled?: string;
  neutralDefault?: string;
  neutralHover?: string;
  neutralPressed?: string;
  neutralDisabled?: string;
  textPrimaryInverse?: string;
  textDisabled?: string;
  dangerHover?: string;
  dangerPressed?: string;
};

// Generate semantic colors using the selected engine
export function generateSemanticColors(
  colors: ThemeCustomization["colors"],
  engine: ColorEngine,
  mode: "light" | "dark"
): Record<string, string> {
  const result: Record<string, string> = {};
  // Cast to extended type to support legacy properties
  const extColors = colors as ExtendedColors;

  // Background fills
  if (extColors.background) {
    result.backgroundFills = extColors.background;
    result.chatContainerBg = extColors.background;
  }
  if (extColors.backgroundSecondary) {
    result.backgroundSecondary = extColors.backgroundSecondary;
  }
  if (extColors.backgroundTertiary) {
    result.backgroundTertiary = extColors.backgroundTertiary;
  }
  if (extColors.container) {
    result.containerFills = extColors.container;
    result.chatAssistantResponseBg = extColors.container;
  }
  if (extColors.containerHover) {
    result.containerHoverFills = extColors.containerHover;
  } else if (extColors.container) {
    result.containerHoverFills = engine.generateHover(extColors.container, mode);
  }
  if (extColors.sunk) {
    result.sunkFills = extColors.sunk;
  }
  if (extColors.elevated) {
    result.elevatedFills = extColors.elevated;
  }
  if (extColors.overlay) {
    result.overlayFills = extColors.overlay;
  }
  if (extColors.highlightSubtle) {
    result.highlightSubtle = extColors.highlightSubtle;
  }

  // Interactive accent colors
  if (extColors.primary) {
    result.interactiveAccent = extColors.primary;
  }
  if (extColors.primaryHover) {
    result.interactiveAccentHover = extColors.primaryHover;
  } else if (extColors.primary) {
    result.interactiveAccentHover = engine.generateHover(extColors.primary, mode);
  }
  if (extColors.primaryPressed) {
    result.interactiveAccentPressed = extColors.primaryPressed;
  } else if (extColors.primary) {
    result.interactiveAccentPressed = engine.generatePressed(extColors.primary, mode);
  }
  if (extColors.primaryDisabled) {
    result.interactiveAccentDisabled = extColors.primaryDisabled;
  } else if (extColors.primary) {
    result.interactiveAccentDisabled = engine.generateDisabled(extColors.primary, mode);
  }

  // Interactive neutral colors
  if (extColors.neutralDefault) {
    result.neutralDefault = extColors.neutralDefault;
  }
  if (extColors.neutralHover) {
    result.neutralHover = extColors.neutralHover;
  }
  if (extColors.neutralPressed) {
    result.neutralPressed = extColors.neutralPressed;
  }
  if (extColors.neutralDisabled) {
    result.neutralDisabled = extColors.neutralDisabled;
  }

  // Text colors
  if (extColors.textPrimary) {
    result.primaryText = extColors.textPrimary;
    result.chatAssistantResponseText = extColors.textPrimary;
    result.chatUserResponseText = extColors.textPrimary;
  }
  if (extColors.textSecondary) {
    result.secondaryText = extColors.textSecondary;
  }
  if (extColors.textPrimaryInverse) {
    result.primaryTextInverse = extColors.textPrimaryInverse;
  }
  if (extColors.textDisabled) {
    result.disabledText = extColors.textDisabled;
  }
  if (extColors.linkText) {
    result.linkText = extColors.linkText;
  }

  // Status colors - Danger
  if (extColors.danger) {
    result.dangerFills = engine.generateSubtle(extColors.danger, mode);
    result.dangerText = extColors.danger;
    result.dangerPrimaryText = extColors.danger;
    result.interactiveDestructive = engine.generateSubtle(extColors.danger, mode);
  }
  if (extColors.dangerHover) {
    result.interactiveDestructiveHover = extColors.dangerHover;
  } else if (extColors.danger) {
    result.interactiveDestructiveHover = engine.generateHover(extColors.danger, mode);
  }
  if (extColors.dangerPressed) {
    result.interactiveDestructivePressed = extColors.dangerPressed;
  } else if (extColors.danger) {
    result.interactiveDestructivePressed = engine.generatePressed(extColors.danger, mode);
  }

  // Status colors - Success
  if (extColors.success) {
    result.successFills = engine.generateSubtle(extColors.success, mode);
    result.successText = extColors.success;
    result.successPrimaryText = extColors.success;
  }

  // Status colors - Info
  if (extColors.info) {
    result.infoFills = engine.generateSubtle(extColors.info, mode);
    result.infoText = extColors.info;
    result.infoPrimaryText = extColors.info;
  }

  // Status colors - Alert
  if (extColors.alert) {
    result.alertFills = engine.generateSubtle(extColors.alert, mode);
    result.alertPrimaryText = extColors.alert;
  }

  return result;
}

// Generate font variables
export function generateFontVariables(
  fonts: ThemeCustomization["fonts"],
  letterSpacing?: ThemeCustomization["letterSpacing"],
  fontWeight?: ThemeCustomization["fontWeight"],
  fontSize?: ThemeCustomization["fontSize"]
): Record<string, string> {
  const result: Record<string, string> = {};

  // Default to Inter if no fonts specified
  const bodyFont = fonts.body || "Inter";
  const headingFont = fonts.heading || "Inter";
  const monoFont = fonts.mono || "Menlo";

  // Font weights: regular (400), medium (500), bold (600)
  const regular = fontWeight?.regular ?? 400;
  const medium = fontWeight?.medium ?? 500;
  const bold = fontWeight?.bold ?? 600;

  // Base font size (default 16px)
  const baseSize = fontSize?.base ?? 16;
  // Calculate offset from default 16px
  const sizeOffset = baseSize - 16;

  // Helper to calculate adjusted size
  const size = (defaultPx: number) => defaultPx + sizeOffset;

  // Convert px to em for letter spacing (px / 16 = em)
  const bodyLetterSpacing = letterSpacing?.body
    ? `${(letterSpacing.body / 16).toFixed(4)}em`
    : undefined;
  const headingLetterSpacing = letterSpacing?.heading
    ? `${(letterSpacing.heading / 16).toFixed(4)}em`
    : undefined;
  const numbersLetterSpacing = letterSpacing?.numbers
    ? `${(letterSpacing.numbers / 16).toFixed(4)}em`
    : undefined;

  console.log("[generateFontVariables]", {
    fontWeight,
    regular,
    medium,
    bold,
    bodyFont,
    headingFont,
    monoFont,
    letterSpacing,
    fontSize,
    baseSize,
    sizeOffset,
  });

  if (bodyFont) {
    result.fontBody = `${regular} ${size(16)}px/1.5 ${bodyFont}`;
    result.fontBodyLink = `${regular} ${size(16)}px/1.5 ${bodyFont}`;
    result.fontBodyHeavy = `${medium} ${size(16)}px/1.5 ${bodyFont}`;
    result.fontBodyMedium = `${regular} ${size(16)}px/1.5 ${bodyFont}`;
    result.fontBodySmall = `${regular} ${size(14)}px/1.5 ${bodyFont}`;
    result.fontBodySmallHeavy = `${medium} ${size(14)}px/1.5 ${bodyFont}`;
    result.fontBodyLarge = `${regular} ${size(18)}px/1.5 ${bodyFont}`;
    result.fontBodyLargeHeavy = `${medium} ${size(18)}px/1.5 ${bodyFont}`;
    result.fontLabel = `${regular} ${size(16)}px/1.2 ${bodyFont}`;
    result.fontLabelHeavy = `${medium} ${size(16)}px/1.2 ${bodyFont}`;
    result.fontLabelSmall = `${regular} ${size(14)}px/1.2 ${bodyFont}`;
    result.fontLabelSmallHeavy = `${medium} ${size(14)}px/1.2 ${bodyFont}`;
    result.fontLabelExtraSmall = `${regular} ${size(12)}px/1.2 ${bodyFont}`;
    result.fontLabelExtraSmallHeavy = `${medium} ${size(12)}px/1.2 ${bodyFont}`;
    result.fontLabelLarge = `${regular} ${size(18)}px/1.2 ${bodyFont}`;
    result.fontLabelLargeHeavy = `${medium} ${size(18)}px/1.2 ${bodyFont}`;
    result.fontLabelMedium = `${regular} ${size(16)}px/1.2 ${bodyFont}`;
    result.fontLabelMediumHeavy = `${medium} ${size(16)}px/1.2 ${bodyFont}`;
    result.fontLabel2ExtraSmall = `${regular} ${size(12)}px/1.2 ${bodyFont}`;
    result.fontLabel2ExtraSmallHeavy = `${medium} ${size(12)}px/1.2 ${bodyFont}`;
  }

  if (headingFont) {
    result.fontHeadingLarge = `${bold} ${size(28)}px/1.15 ${headingFont}`;
    result.fontHeadingMedium = `${bold} ${size(24)}px/1.15 ${headingFont}`;
    result.fontHeadingSmall = `${bold} ${size(18)}px/1.25 ${headingFont}`;
    result.fontHeadingExtraSmall = `${bold} ${size(16)}px/1.25 ${headingFont}`;
  }

  if (monoFont) {
    result.fontNumber = `${regular} ${size(16)}px/1.5 ${monoFont}`;
    result.fontNumberHeavy = `${medium} ${size(16)}px/1.5 ${monoFont}`;
    result.fontNumberSmall = `${regular} ${size(14)}px/1.5 ${monoFont}`;
    result.fontNumberSmallHeavy = `${medium} ${size(14)}px/1.5 ${monoFont}`;
    result.fontNumberExtraSmall = `${regular} ${size(12)}px/1.5 ${monoFont}`;
    result.fontNumberExtraSmallHeavy = `${medium} ${size(12)}px/1.5 ${monoFont}`;
    result.fontNumberLarge = `${regular} ${size(18)}px/1.5 ${monoFont}`;
    result.fontNumberLargeHeavy = `${medium} ${size(18)}px/1.5 ${monoFont}`;
    result.fontNumberTitle = `${bold} ${size(28)}px/1.5 ${monoFont}`;
    result.fontNumberTitleMedium = `${bold} ${size(24)}px/1.5 ${monoFont}`;
  }

  // Add letter spacing per category
  if (bodyLetterSpacing) {
    // Body fonts
    [
      "fontBody",
      "fontBodyLink",
      "fontBodyMedium",
      "fontBodySmall",
      "fontBodyLarge",
      "fontLabel",
      "fontLabelSmall",
      "fontLabelExtraSmall",
      "fontLabelLarge",
      "fontLabelMedium",
      "fontLabel2ExtraSmall",
    ].forEach((key) => {
      result[`${key}LetterSpacing`] = bodyLetterSpacing;
    });
    // Body heavy fonts
    [
      "fontBodyHeavy",
      "fontBodySmallHeavy",
      "fontBodyLargeHeavy",
      "fontLabelHeavy",
      "fontLabelSmallHeavy",
      "fontLabelExtraSmallHeavy",
      "fontLabelLargeHeavy",
      "fontLabelMediumHeavy",
      "fontLabel2ExtraSmallHeavy",
    ].forEach((key) => {
      result[`${key}LetterSpacing`] = bodyLetterSpacing;
    });
  }

  if (headingLetterSpacing) {
    // Heading fonts
    [
      "fontHeadingLarge",
      "fontHeadingMedium",
      "fontHeadingSmall",
      "fontHeadingExtraSmall",
    ].forEach((key) => {
      result[`${key}LetterSpacing`] = headingLetterSpacing;
    });
  }

  if (numbersLetterSpacing) {
    // Number/mono fonts
    [
      "fontNumber",
      "fontNumberSmall",
      "fontNumberExtraSmall",
      "fontNumberLarge",
      "fontNumberTitle",
      "fontNumberTitleMedium",
    ].forEach((key) => {
      result[`${key}LetterSpacing`] = numbersLetterSpacing;
    });
    // Number heavy fonts
    [
      "fontNumberHeavy",
      "fontNumberSmallHeavy",
      "fontNumberExtraSmallHeavy",
      "fontNumberLargeHeavy",
    ].forEach((key) => {
      result[`${key}LetterSpacing`] = numbersLetterSpacing;
    });
  }

  return result;
}

// Generate spacing scale
export function generateSpacingScale(
  base: number,
  customValues?: Partial<Record<string, number>>
): Record<string, string> {
  const defaults = {
    spacing0: 0,
    spacing3xs: base,
    spacing2xs: base * 2,
    spacingXs: base * 3,
    spacingS: base * 4,
    spacingM: base * 6,
    spacingL: base * 9,
    spacingXl: base * 12,
    spacing2xl: base * 18,
    spacing3xl: base * 24,
  };

  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(defaults)) {
    const customValue = customValues?.[key];
    result[key] = `${customValue ?? value}px`;
  }

  return result;
}

// Generate border radius scale
export function generateBorderRadiusScale(
  base: number,
  customValues?: Partial<Record<string, number>>
): Record<string, string> {
  const defaults = {
    rounded0: 0,
    rounded3xs: base,
    rounded2xs: base * 2,
    roundedXs: base * 3,
    roundedS: base * 4,
    roundedM: base * 5,
    roundedL: base * 6,
    roundedXl: base * 8,
    rounded2xl: base * 10,
    rounded3xl: base * 12,
    rounded4xl: base * 14,
    roundedClickable: base * 5,
  };

  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(defaults)) {
    const customValue = customValues?.[key];
    result[key] = `${customValue ?? value}px`;
  }

  // roundedFull is always 999px
  result.roundedFull = customValues?.roundedFull
    ? `${customValues.roundedFull}px`
    : "999px";

  return result;
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

// Generate stroke colors from individual stroke color settings
export function generateStrokeColors(
  strokeColors: ThemeCustomization["strokeColors"]
): Record<string, string> {
  const result: Record<string, string> = {};

  // Base strokes
  if (strokeColors.default) {
    result.strokeDefault = strokeColors.default;
  }
  if (strokeColors.interactiveEl) {
    result.strokeInteractiveEl = strokeColors.interactiveEl;
  }
  if (strokeColors.interactiveElHover) {
    result.strokeInteractiveElHover = strokeColors.interactiveElHover;
  }
  if (strokeColors.interactiveElSelected) {
    result.strokeInteractiveElSelected = strokeColors.interactiveElSelected;
  }
  if (strokeColors.emphasis) {
    result.strokeEmphasis = strokeColors.emphasis;
  }
  
  // Accent strokes
  if (strokeColors.accent) {
    result.strokeAccent = strokeColors.accent;
  }
  if (strokeColors.accentEmphasis) {
    result.strokeAccentEmphasis = strokeColors.accentEmphasis;
  }

  // Status strokes
  if (strokeColors.info) {
    result.strokeInfo = strokeColors.info;
  }
  if (strokeColors.infoEmphasis) {
    result.strokeInfoEmphasis = strokeColors.infoEmphasis;
  }
  if (strokeColors.alert) {
    result.strokeAlert = strokeColors.alert;
  }
  if (strokeColors.alertEmphasis) {
    result.strokeAlertEmphasis = strokeColors.alertEmphasis;
  }
  if (strokeColors.success) {
    result.strokeSuccess = strokeColors.success;
  }
  if (strokeColors.successEmphasis) {
    result.strokeSuccessEmphasis = strokeColors.successEmphasis;
  }
  if (strokeColors.danger) {
    result.strokeDanger = strokeColors.danger;
  }
  if (strokeColors.dangerEmphasis) {
    result.strokeDangerEmphasis = strokeColors.dangerEmphasis;
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
  const palette: string[] = [];

  // Helper to create color with opacity
  const colorWithOpacity = (color: string, opacity: number): string => {
    const { r, g, b } = parseRGBA(color);
    // In dark mode, lighten the base colors slightly for better visibility
    const adjustedR = mode === "dark" ? Math.min(255, r + 20) : r;
    const adjustedG = mode === "dark" ? Math.min(255, g + 20) : g;
    const adjustedB = mode === "dark" ? Math.min(255, b + 20) : b;
    return `rgba(${adjustedR},${adjustedG},${adjustedB},${opacity})`;
  };

  const primaryColor = chartColors.primary;
  const secondaryColor = chartColors.secondary;
  const useDualMode = chartColors.useDualMode;

  if (!primaryColor) return [];

  if (useDualMode && secondaryColor) {
    // Dual color mode: 10 colors
    // Positions 1-4: Primary color with opacities 0.2, 0.4, 0.6, 0.8
    // Position 5: Primary color (full opacity)
    // Position 6: Secondary color (full opacity)
    // Positions 7-10: Secondary color with opacities 0.8, 0.6, 0.4, 0.2
    palette.push(colorWithOpacity(primaryColor, 0.2));  // Position 1
    palette.push(colorWithOpacity(primaryColor, 0.4));  // Position 2
    palette.push(colorWithOpacity(primaryColor, 0.6));  // Position 3
    palette.push(colorWithOpacity(primaryColor, 0.8));  // Position 4
    palette.push(colorWithOpacity(primaryColor, 1.0));  // Position 5 - Primary full
    palette.push(colorWithOpacity(secondaryColor, 1.0)); // Position 6 - Secondary full
    palette.push(colorWithOpacity(secondaryColor, 0.8)); // Position 7
    palette.push(colorWithOpacity(secondaryColor, 0.6)); // Position 8
    palette.push(colorWithOpacity(secondaryColor, 0.4)); // Position 9
    palette.push(colorWithOpacity(secondaryColor, 0.2)); // Position 10
  } else {
    // Single color mode: 10 colors
    // Positions 1-5: Primary color with opacities 0.5, 0.57, 0.65, 0.72, 0.85
    // Position 6: Primary color (full opacity)
    // Positions 7-10: Primary color with opacities 0.4, 0.3, 0.2, 0.1
    palette.push(colorWithOpacity(primaryColor, 0.5));   // Position 1
    palette.push(colorWithOpacity(primaryColor, 0.57));  // Position 2
    palette.push(colorWithOpacity(primaryColor, 0.65));  // Position 3
    palette.push(colorWithOpacity(primaryColor, 0.72));  // Position 4
    palette.push(colorWithOpacity(primaryColor, 0.85));  // Position 5
    palette.push(colorWithOpacity(primaryColor, 1.0));   // Position 6 - Full
    palette.push(colorWithOpacity(primaryColor, 0.4));   // Position 7
    palette.push(colorWithOpacity(primaryColor, 0.3));   // Position 8
    palette.push(colorWithOpacity(primaryColor, 0.2));   // Position 9
    palette.push(colorWithOpacity(primaryColor, 0.1));   // Position 10
  }

  return palette;
}

// Generate fills from the new fills property
function generateFillColors(
  fills: ThemeCustomization["fills"]
): Record<string, string> {
  const result: Record<string, string> = {};
  if (!fills) return result;

  if (fills.backgroundFills) result.backgroundFills = fills.backgroundFills;
  if (fills.containerFills) result.containerFills = fills.containerFills;
  if (fills.overlayFills) result.overlayFills = fills.overlayFills;
  if (fills.sunkFills) result.sunkFills = fills.sunkFills;
  if (fills.containerHoverFills) result.containerHoverFills = fills.containerHoverFills;
  if (fills.dangerFills) result.dangerFills = fills.dangerFills;
  if (fills.successFills) result.successFills = fills.successFills;
  if (fills.infoFills) result.infoFills = fills.infoFills;
  if (fills.elevatedFills) result.elevatedFills = fills.elevatedFills;
  if (fills.alertFills) result.alertFills = fills.alertFills;
  if (fills.sunkBgFills) result.sunkBgFills = fills.sunkBgFills;
  if (fills.invertedFills) result.invertedFills = fills.invertedFills;
  if (fills.highlightSubtle) result.highlightSubtle = fills.highlightSubtle;

  return result;
}

// Generate text colors from the new text property
function generateTextColors(
  text: ThemeCustomization["text"]
): Record<string, string> {
  const result: Record<string, string> = {};
  if (!text) return result;

  // Map brand text to accent text (they are the same)
  if (text.brandText) {
    result.brandText = text.brandText;
    result.accentPrimaryText = text.brandText;
  }
  if (text.brandSecondaryText) {
    result.brandSecondaryText = text.brandSecondaryText;
    result.accentSecondaryText = text.brandSecondaryText;
  }
  // Also handle direct accentPrimaryText/accentSecondaryText values (overrides brand if both present)
  if (text.accentPrimaryText) {
    result.accentPrimaryText = text.accentPrimaryText;
    result.brandText = text.accentPrimaryText;
  }
  if (text.accentSecondaryText) {
    result.accentSecondaryText = text.accentSecondaryText;
    result.brandSecondaryText = text.accentSecondaryText;
  }
  if (text.primaryText) result.primaryText = text.primaryText;
  if (text.secondaryText) result.secondaryText = text.secondaryText;
  if (text.disabledText) result.disabledText = text.disabledText;
  if (text.dangerText) result.dangerText = text.dangerText;
  if (text.successText) result.successText = text.successText;
  if (text.linkText) result.linkText = text.linkText;
  if (text.infoText) result.infoText = text.infoText;
  if (text.alertText) result.alertText = text.alertText;
  if (text.accentDisabledText) result.accentDisabledText = text.accentDisabledText;

  return result;
}

// Generate interactive colors from the new interactive property
function generateInteractiveColors(
  interactive: ThemeCustomization["interactive"]
): Record<string, string> {
  const result: Record<string, string> = {};
  if (!interactive) return result;

  if (interactive.interactiveDefault) result.interactiveDefault = interactive.interactiveDefault;
  if (interactive.interactiveHover) result.interactiveHover = interactive.interactiveHover;
  if (interactive.interactivePressed) result.interactivePressed = interactive.interactivePressed;
  if (interactive.interactiveDisabled) result.interactiveDisabled = interactive.interactiveDisabled;
  if (interactive.interactiveAccent) result.interactiveAccent = interactive.interactiveAccent;
  if (interactive.interactiveAccentHover) result.interactiveAccentHover = interactive.interactiveAccentHover;
  if (interactive.interactiveAccentPressed) result.interactiveAccentPressed = interactive.interactiveAccentPressed;
  if (interactive.interactiveAccentDisabled) result.interactiveAccentDisabled = interactive.interactiveAccentDisabled;
  if (interactive.interactiveDestructive) result.interactiveDestructive = interactive.interactiveDestructive;
  if (interactive.interactiveDestructiveHover) result.interactiveDestructiveHover = interactive.interactiveDestructiveHover;
  if (interactive.interactiveDestructivePressed) result.interactiveDestructivePressed = interactive.interactiveDestructivePressed;
  if (interactive.interactiveDestructiveDisabled) result.interactiveDestructiveDisabled = interactive.interactiveDestructiveDisabled;

  return result;
}

// Generate complete theme for a single mode
export function generateCompleteTheme(
  customization: ThemeCustomization,
  mode: "light" | "dark"
): Record<string, any> {
  const engine =
    colorEngines[customization.colorEngine] || colorEngines.default;

  const theme: Record<string, any> = {};

  // Generate colors from legacy colors object
  const colors = generateSemanticColors(customization.colors, engine, mode);
  Object.assign(theme, colors);

  // Generate fills from new fills property (overrides legacy colors if present)
  const fills = generateFillColors(customization.fills);
  Object.assign(theme, fills);

  // Generate text colors from new text property (overrides legacy colors if present)
  const textColors = generateTextColors(customization.text);
  Object.assign(theme, textColors);

  // Generate interactive colors from new interactive property (overrides legacy colors if present)
  const interactiveColors = generateInteractiveColors(customization.interactive);
  Object.assign(theme, interactiveColors);

  // Generate fonts
  const fonts = generateFontVariables(
    customization.fonts,
    customization.letterSpacing,
    customization.fontWeight,
    customization.fontSize
  );
  Object.assign(theme, fonts);

  // Generate spacing
  const { base: spacingBase, ...spacingCustomValues } = customization.spacing;
  const hasSpacingCustomValues = Object.keys(spacingCustomValues).length > 0;
  if (spacingBase !== undefined || hasSpacingCustomValues) {
    const spacing = generateSpacingScale(spacingBase ?? 1, spacingCustomValues);
    Object.assign(theme, spacing);
  }

  // Generate border radius
  const { base: radiusBase, ...radiusCustomValues } = customization.borderRadius;
  const hasRadiusCustomValues = Object.keys(radiusCustomValues).length > 0;
  if (radiusBase !== undefined || hasRadiusCustomValues) {
    const radius = generateBorderRadiusScale(radiusBase ?? 2, radiusCustomValues);
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
  const strokes = generateStrokeColors(customization.strokeColors);
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
