import { z } from "zod";

export const ShadowConfigSchema = z.object({
  color: z.string().optional(),
  opacity: z.number().optional(),
  blur: z.number().optional(),
  spread: z.number().optional(),
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
});

export const ThemeCustomizationSchema = z.object({
  // Fills
  fills: z.object({
    backgroundFills: z.string().optional(),
    containerFills: z.string().optional(),
    overlayFills: z.string().optional(),
    sunkFills: z.string().optional(),
    containerHoverFills: z.string().optional(),
    dangerFills: z.string().optional(),
    successFills: z.string().optional(),
    infoFills: z.string().optional(),
    elevatedFills: z.string().optional(),
    alertFills: z.string().optional(),
    sunkBgFills: z.string().optional(),
    invertedFills: z.string().optional(),
    highlightSubtle: z.string().optional(),
  }).optional(),
  // Text colors
  text: z.object({
    brandText: z.string().optional(),
    brandSecondaryText: z.string().optional(),
    primaryText: z.string().optional(),
    secondaryText: z.string().optional(),
    disabledText: z.string().optional(),
    dangerText: z.string().optional(),
    successText: z.string().optional(),
    linkText: z.string().optional(),
    infoText: z.string().optional(),
    alertText: z.string().optional(),
    accentPrimaryText: z.string().optional(),
    accentSecondaryText: z.string().optional(),
    accentDisabledText: z.string().optional(),
  }).optional(),
  // Interactive colors
  interactive: z.object({
    interactiveDefault: z.string().optional(),
    interactiveHover: z.string().optional(),
    interactivePressed: z.string().optional(),
    interactiveDisabled: z.string().optional(),
    interactiveAccent: z.string().optional(),
    interactiveAccentHover: z.string().optional(),
    interactiveAccentPressed: z.string().optional(),
    interactiveAccentDisabled: z.string().optional(),
    interactiveDestructive: z.string().optional(),
    interactiveDestructiveHover: z.string().optional(),
    interactiveDestructivePressed: z.string().optional(),
    interactiveDestructiveDisabled: z.string().optional(),
  }).optional(),
  // Legacy colors object for backwards compatibility
  colors: z.object({
    background: z.string().optional(),
    container: z.string().optional(),
    primary: z.string().optional(),
    textPrimary: z.string().optional(),
    textSecondary: z.string().optional(),
    linkText: z.string().optional(),
    danger: z.string().optional(),
    success: z.string().optional(),
    info: z.string().optional(),
    alert: z.string().optional(),
  }),
  chartColors: z.object({
    primary: z.string().optional(), // Main chart color (position 6 in single mode, position 5 in dual mode)
    secondary: z.string().optional(), // Second chart color (position 6 in dual mode)
    useDualMode: z.boolean().optional(), // If true, use two colors; if false/undefined, use single color
  }),
  strokeColors: z.object({
    // Base stroke colors
    default: z.string().optional(),
    interactiveEl: z.string().optional(),
    interactiveElHover: z.string().optional(),
    interactiveElSelected: z.string().optional(),
    emphasis: z.string().optional(),
    // Accent strokes
    accent: z.string().optional(),
    accentEmphasis: z.string().optional(),
    // Status strokes
    info: z.string().optional(),
    infoEmphasis: z.string().optional(),
    alert: z.string().optional(),
    alertEmphasis: z.string().optional(),
    success: z.string().optional(),
    successEmphasis: z.string().optional(),
    danger: z.string().optional(),
    dangerEmphasis: z.string().optional(),
  }),
  chatColors: z.object({
    containerBg: z.string().optional(),
    assistantBg: z.string().optional(),
    assistantText: z.string().optional(),
    userBg: z.string().optional(),
    userText: z.string().optional(),
  }),
  shadow: ShadowConfigSchema.optional(), // Single base shadow, others auto-generated
  colorEngine: z.literal("default"),
  fonts: z.object({
    body: z.string().optional(),
    heading: z.string().optional(),
    mono: z.string().optional(),
  }),
  fontWeight: z.object({
    regular: z.number().min(100).max(900).optional(), // overrides 400 weight fonts
    medium: z.number().min(100).max(900).optional(),  // overrides 500 weight fonts
    bold: z.number().min(100).max(900).optional(),    // overrides 600 weight fonts
  }),
  letterSpacing: z.object({
    body: z.number().optional(), // in px units
    heading: z.number().optional(), // in px units
    numbers: z.number().optional(), // in px units (for monospace)
  }),
  fontSize: z.object({
    base: z.number().min(12).max(20).optional(), // base body font size in px (default 16)
  }),
  spacing: z.object({
    base: z.number().min(0.5).max(2).optional(),
    // Individual spacing values (in px)
    spacing0: z.number().optional(),
    spacing3xs: z.number().optional(),
    spacing2xs: z.number().optional(),
    spacingXs: z.number().optional(),
    spacingS: z.number().optional(),
    spacingM: z.number().optional(),
    spacingL: z.number().optional(),
    spacingXl: z.number().optional(),
    spacing2xl: z.number().optional(),
    spacing3xl: z.number().optional(),
  }),
  borderRadius: z.object({
    base: z.number().min(0).max(8).optional(), // in rem, 0 (sharp) to 8 (very rounded)
    // Individual border radius values (in px)
    rounded0: z.number().optional(),
    rounded3xs: z.number().optional(),
    rounded2xs: z.number().optional(),
    roundedXs: z.number().optional(),
    roundedS: z.number().optional(),
    roundedM: z.number().optional(),
    roundedL: z.number().optional(),
    roundedXl: z.number().optional(),
    rounded2xl: z.number().optional(),
    rounded3xl: z.number().optional(),
    rounded4xl: z.number().optional(),
    roundedFull: z.number().optional(),
    roundedClickable: z.number().optional(),
  }),
  customCss: z.string().optional(),
});

export type ShadowConfig = z.infer<typeof ShadowConfigSchema>;
export type ThemeCustomization = z.infer<typeof ThemeCustomizationSchema>;

// Dual-mode theme customization
export const DualModeThemeCustomizationSchema = z.object({
  light: ThemeCustomizationSchema,
  dark: ThemeCustomizationSchema,
});

export type DualModeThemeCustomization = z.infer<typeof DualModeThemeCustomizationSchema>;

export type ThemeMode = "light" | "dark";

// Future enhancements that could be added:
// - Interactive state colors (neutral default/hover/pressed/disabled)
// - Extended fill colors (overlay, sunk, elevated, inverted)
// - Brand colors (separate from primary)
// - Disabled text color
// - Extended text variants (inverted colors for each status)
// - Font weight/line height customization
// - Per-category letter spacing
// - Destructive interactive states

export interface ColorEngine {
  name: string;
  generateHover: (base: string, mode: "light" | "dark") => string;
  generatePressed: (base: string, mode: "light" | "dark") => string;
  generateDisabled: (base: string, mode: "light" | "dark") => string;
  generateEmphasis: (base: string, mode: "light" | "dark") => string;
  generateSubtle: (base: string, mode: "light" | "dark") => string;
}

export interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
  onClear?: () => void;
  disabled?: boolean;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}
