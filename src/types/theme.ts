export interface ShadowConfig {
  color?: string;
  opacity?: number;
  blur?: number;
  spread?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface ThemeCustomization {
  colors: {
    background?: string;
    container?: string;
    primary?: string;
    textPrimary?: string;
    textSecondary?: string;
    linkText?: string;
    danger?: string;
    success?: string;
    info?: string;
    alert?: string;
  };
  chartColors: {
    color1?: string;
    color2?: string;
    color3?: string;
  };
  strokeColors: {
    base?: string;
    opacity?: number; // Base opacity, variants will be auto-generated
  };
  chatColors: {
    containerBg?: string;
    assistantBg?: string;
    assistantText?: string;
    userBg?: string;
    userText?: string;
  };
  shadow?: ShadowConfig; // Single base shadow, others auto-generated
  colorEngine: "default";
  fonts: {
    body?: string;
    heading?: string;
    mono?: string;
  };
  letterSpacing: {
    base?: number; // in em units
  };
  spacing: {
    base?: number;
  };
  borderRadius: {
    base?: number;
  };
}

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
