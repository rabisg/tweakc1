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
    color1: z.string().optional(),
    color2: z.string().optional(),
    color3: z.string().optional(),
  }),
  strokeColors: z.object({
    base: z.string().optional(),
    opacity: z.number().min(0).max(1).optional(), // Base opacity, variants will be auto-generated
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
  letterSpacing: z.object({
    base: z.number().optional(), // in em units
  }),
  spacing: z.object({
    base: z.number().min(0.5).max(2).optional(),
  }),
  borderRadius: z.object({
    base: z.number().min(0).max(8).optional(), // in rem, 0 (sharp) to 8 (very rounded)
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
