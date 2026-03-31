import type {
  ThemeCustomization,
  DualModeThemeCustomization,
  ShadowConfig,
} from "../types/theme";

function parseFontFamily(fontShorthand: string): string | undefined {
  const match = fontShorthand.match(/^\d+\s+[\d.]+px\/[\d.]+\s+(.+)$/);
  if (!match?.[1]) return undefined;
  // Take first font family (before comma fallbacks), strip CSS quotes
  return match[1].split(",")[0].trim().replace(/^['"]|['"]$/g, "");
}

function parseFontWeight(fontShorthand: string): number | undefined {
  const match = fontShorthand.match(/^(\d+)\s+/);
  return match ? parseInt(match[1], 10) : undefined;
}

function parseFontSizePx(fontShorthand: string): number | undefined {
  const match = fontShorthand.match(/^\d+\s+([\d.]+)px/);
  return match ? parseFloat(match[1]) : undefined;
}

function parseLetterSpacingEm(emValue: string): number | undefined {
  // Forward: px / 16 = em → "0.0313em". Reverse: parse em, multiply by 16
  const match = emValue.match(/^([\d.]+)em$/);
  return match ? parseFloat(match[1]) * 16 : undefined;
}

function parsePxValue(pxString: string): number | undefined {
  const match = pxString.match(/^([\d.]+)px$/);
  return match ? parseFloat(match[1]) : undefined;
}

function parseShadowString(shadowCss: string): ShadowConfig | undefined {
  // Format: "offsetX offsetY blur [spread] rgba(r,g,b,opacity)"
  // e.g. "0px 1px 4px rgba(0,0,0,0.1)" or "0px 1px 4px 2px rgba(0,0,0,0.1)"
  const match = shadowCss.match(
    /^(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s+(?:([\d.]+)px\s+)?rgba\((\d+),(\d+),(\d+),([\d.]+)\)$/
  );
  if (!match) return undefined;
  return {
    offsetX: parseFloat(match[1]),
    offsetY: parseFloat(match[2]),
    blur: parseFloat(match[3]),
    spread: match[4] ? parseFloat(match[4]) : 0,
    color: `rgba(${match[5]},${match[6]},${match[7]},1)`,
    opacity: parseFloat(match[8]),
  };
}

function reverseMapTokens(
  tokens: Record<string, any>,
  customCss?: string
): ThemeCustomization {
  const fills: NonNullable<ThemeCustomization["fills"]> = {};
  if (tokens.backgroundFills) fills.backgroundFills = tokens.backgroundFills;
  if (tokens.containerFills) fills.containerFills = tokens.containerFills;
  if (tokens.overlayFills) fills.overlayFills = tokens.overlayFills;
  if (tokens.sunkFills) fills.sunkFills = tokens.sunkFills;
  if (tokens.containerHoverFills)
    fills.containerHoverFills = tokens.containerHoverFills;
  if (tokens.dangerFills) fills.dangerFills = tokens.dangerFills;
  if (tokens.successFills) fills.successFills = tokens.successFills;
  if (tokens.infoFills) fills.infoFills = tokens.infoFills;
  if (tokens.elevatedFills) fills.elevatedFills = tokens.elevatedFills;
  if (tokens.alertFills) fills.alertFills = tokens.alertFills;
  if (tokens.sunkBgFills) fills.sunkBgFills = tokens.sunkBgFills;
  if (tokens.invertedFills) fills.invertedFills = tokens.invertedFills;
  if (tokens.highlightSubtle) fills.highlightSubtle = tokens.highlightSubtle;

  const text: NonNullable<ThemeCustomization["text"]> = {};
  if (tokens.primaryText) text.primaryText = tokens.primaryText;
  if (tokens.secondaryText) text.secondaryText = tokens.secondaryText;
  if (tokens.disabledText) text.disabledText = tokens.disabledText;
  if (tokens.dangerText) text.dangerText = tokens.dangerText;
  if (tokens.successText) text.successText = tokens.successText;
  if (tokens.linkText) text.linkText = tokens.linkText;
  if (tokens.infoText) text.infoText = tokens.infoText;
  if (tokens.alertText) text.alertText = tokens.alertText;
  if (tokens.brandText) text.brandText = tokens.brandText;
  if (tokens.brandSecondaryText)
    text.brandSecondaryText = tokens.brandSecondaryText;
  if (tokens.accentPrimaryText)
    text.accentPrimaryText = tokens.accentPrimaryText;
  if (tokens.accentSecondaryText)
    text.accentSecondaryText = tokens.accentSecondaryText;
  if (tokens.accentDisabledText)
    text.accentDisabledText = tokens.accentDisabledText;

  const interactive: NonNullable<ThemeCustomization["interactive"]> = {};
  if (tokens.interactiveDefault)
    interactive.interactiveDefault = tokens.interactiveDefault;
  if (tokens.interactiveHover)
    interactive.interactiveHover = tokens.interactiveHover;
  if (tokens.interactivePressed)
    interactive.interactivePressed = tokens.interactivePressed;
  if (tokens.interactiveDisabled)
    interactive.interactiveDisabled = tokens.interactiveDisabled;
  if (tokens.interactiveAccent)
    interactive.interactiveAccent = tokens.interactiveAccent;
  if (tokens.interactiveAccentHover)
    interactive.interactiveAccentHover = tokens.interactiveAccentHover;
  if (tokens.interactiveAccentPressed)
    interactive.interactiveAccentPressed = tokens.interactiveAccentPressed;
  if (tokens.interactiveAccentDisabled)
    interactive.interactiveAccentDisabled = tokens.interactiveAccentDisabled;
  if (tokens.interactiveDestructive)
    interactive.interactiveDestructive = tokens.interactiveDestructive;
  if (tokens.interactiveDestructiveHover)
    interactive.interactiveDestructiveHover =
      tokens.interactiveDestructiveHover;
  if (tokens.interactiveDestructivePressed)
    interactive.interactiveDestructivePressed =
      tokens.interactiveDestructivePressed;
  if (tokens.interactiveDestructiveDisabled)
    interactive.interactiveDestructiveDisabled =
      tokens.interactiveDestructiveDisabled;

  const strokeColors: ThemeCustomization["strokeColors"] = {};
  if (tokens.strokeDefault) strokeColors.default = tokens.strokeDefault;
  if (tokens.strokeInteractiveEl)
    strokeColors.interactiveEl = tokens.strokeInteractiveEl;
  if (tokens.strokeInteractiveElHover)
    strokeColors.interactiveElHover = tokens.strokeInteractiveElHover;
  if (tokens.strokeInteractiveElSelected)
    strokeColors.interactiveElSelected = tokens.strokeInteractiveElSelected;
  if (tokens.strokeEmphasis) strokeColors.emphasis = tokens.strokeEmphasis;
  if (tokens.strokeAccent) strokeColors.accent = tokens.strokeAccent;
  if (tokens.strokeAccentEmphasis)
    strokeColors.accentEmphasis = tokens.strokeAccentEmphasis;
  if (tokens.strokeInfo) strokeColors.info = tokens.strokeInfo;
  if (tokens.strokeInfoEmphasis)
    strokeColors.infoEmphasis = tokens.strokeInfoEmphasis;
  if (tokens.strokeAlert) strokeColors.alert = tokens.strokeAlert;
  if (tokens.strokeAlertEmphasis)
    strokeColors.alertEmphasis = tokens.strokeAlertEmphasis;
  if (tokens.strokeSuccess) strokeColors.success = tokens.strokeSuccess;
  if (tokens.strokeSuccessEmphasis)
    strokeColors.successEmphasis = tokens.strokeSuccessEmphasis;
  if (tokens.strokeDanger) strokeColors.danger = tokens.strokeDanger;
  if (tokens.strokeDangerEmphasis)
    strokeColors.dangerEmphasis = tokens.strokeDangerEmphasis;

  const chatColors: ThemeCustomization["chatColors"] = {};
  if (tokens.chatContainerBg) chatColors.containerBg = tokens.chatContainerBg;
  if (tokens.chatAssistantResponseBg)
    chatColors.assistantBg = tokens.chatAssistantResponseBg;
  if (tokens.chatAssistantResponseText)
    chatColors.assistantText = tokens.chatAssistantResponseText;
  if (tokens.chatUserResponseBg)
    chatColors.userBg = tokens.chatUserResponseBg;
  if (tokens.chatUserResponseText)
    chatColors.userText = tokens.chatUserResponseText;

  // Fonts
  const fonts: ThemeCustomization["fonts"] = {};
  if (tokens.fontBody) fonts.body = parseFontFamily(tokens.fontBody);
  if (tokens.fontHeadingLarge)
    fonts.heading = parseFontFamily(tokens.fontHeadingLarge);
  if (tokens.fontNumber) fonts.mono = parseFontFamily(tokens.fontNumber);

  // Font weight
  const fontWeight: ThemeCustomization["fontWeight"] = {};
  if (tokens.fontBody) fontWeight.regular = parseFontWeight(tokens.fontBody);
  if (tokens.fontBodyHeavy)
    fontWeight.medium = parseFontWeight(tokens.fontBodyHeavy);
  if (tokens.fontHeadingLarge)
    fontWeight.bold = parseFontWeight(tokens.fontHeadingLarge);

  // Font size
  const fontSize: ThemeCustomization["fontSize"] = {};
  if (tokens.fontBody) fontSize.base = parseFontSizePx(tokens.fontBody);

  // Letter spacing: forward generates em values (px / 16), reverse back to px
  const letterSpacing: ThemeCustomization["letterSpacing"] = {};
  if (tokens.fontBodyLetterSpacing) {
    const v = parseLetterSpacingEm(tokens.fontBodyLetterSpacing);
    if (v !== undefined) letterSpacing.body = v;
  }
  if (tokens.fontHeadingLargeLetterSpacing) {
    const v = parseLetterSpacingEm(tokens.fontHeadingLargeLetterSpacing);
    if (v !== undefined) letterSpacing.heading = v;
  }
  if (tokens.fontNumberLetterSpacing) {
    const v = parseLetterSpacingEm(tokens.fontNumberLetterSpacing);
    if (v !== undefined) letterSpacing.numbers = v;
  }

  // Spacing: forward generates "Npx" strings from individual or base-scaled values
  const spacing: ThemeCustomization["spacing"] = {};
  const spacingKeys = [
    "spacing0",
    "spacing3xs",
    "spacing2xs",
    "spacingXs",
    "spacingS",
    "spacingM",
    "spacingL",
    "spacingXl",
    "spacing2xl",
    "spacing3xl",
  ] as const;
  for (const key of spacingKeys) {
    if (tokens[key]) {
      const v = parsePxValue(tokens[key]);
      if (v !== undefined)
        (spacing as Record<string, number>)[key] = v;
    }
  }

  // Border radius: forward generates "Npx" strings
  const borderRadius: ThemeCustomization["borderRadius"] = {};
  const radiusKeys = [
    "rounded0",
    "rounded3xs",
    "rounded2xs",
    "roundedXs",
    "roundedS",
    "roundedM",
    "roundedL",
    "roundedXl",
    "rounded2xl",
    "rounded3xl",
    "rounded4xl",
    "roundedFull",
    "roundedClickable",
  ] as const;
  for (const key of radiusKeys) {
    if (tokens[key]) {
      const v = parsePxValue(tokens[key]);
      if (v !== undefined)
        (borderRadius as Record<string, number>)[key] = v;
    }
  }

  // Shadow: reverse from shadowM (1x scale = base shadow)
  let shadow: ShadowConfig | undefined;
  if (tokens.shadowM) {
    shadow = parseShadowString(tokens.shadowM);
  }

  return {
    fills,
    text,
    interactive,
    colors: {},
    chartColors: {},
    strokeColors,
    chatColors,
    shadow,
    colorEngine: "default" as const,
    fonts,
    fontWeight,
    letterSpacing,
    fontSize,
    spacing,
    borderRadius,
    customCss,
  };
}

export function reverseMapThemeObject(
  themeObject: { theme?: Record<string, any>; darkTheme?: Record<string, any> },
  customCss?: { light: string; dark: string }
): DualModeThemeCustomization {
  const light = themeObject.theme
    ? reverseMapTokens(themeObject.theme, customCss?.light)
    : reverseMapTokens({}, customCss?.light);

  const dark = themeObject.darkTheme
    ? reverseMapTokens(themeObject.darkTheme, customCss?.dark)
    : reverseMapTokens({}, customCss?.dark);

  return { light, dark };
}
