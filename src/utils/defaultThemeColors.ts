// Default theme colors for light and dark modes
// These match the exact Crayon/genui-sdk theme values

export const defaultColors = {
  light: {
    // Fills
    "--crayon-background-fills": "#f1f1f1",
    "--crayon-container-fills": "#ffffff",
    "--crayon-overlay-fills": "rgba(0, 0, 0, 0.5)",
    "--crayon-sunk-fills": "rgba(0, 0, 0, 0.04)",
    "--crayon-container-hover-fills": "rgba(0, 0, 0, 0.04)",
    "--crayon-danger-fills": "#fff0ee",
    "--crayon-success-fills": "#e8fff0",
    "--crayon-info-fills": "#f3f2ff",
    "--crayon-elevated-fills": "rgba(255, 255, 255, 0.2)",
    "--crayon-alert-fills": "#fff8f1",
    "--crayon-sunk-bg-fills": "rgba(0, 0, 0, 0.04)",
    "--crayon-inverted-fills": "#101010",
    "--crayon-highlight-subtle": "rgba(0, 0, 0, 0.02)",
    
    // Strokes
    "--crayon-stroke-default": "rgba(0, 0, 0, 0.06)",
    "--crayon-stroke-interactive-el": "rgba(0, 0, 0, 0.1)",
    "--crayon-stroke-interactive-el-hover": "rgba(0, 0, 0, 0.3)",
    "--crayon-stroke-interactive-el-selected": "rgba(0, 0, 0, 0.5)",
    "--crayon-stroke-emphasis": "rgba(0, 0, 0, 0.2)",
    "--crayon-stroke-accent": "rgba(255, 255, 255, 0.04)",
    "--crayon-stroke-accent-emphasis": "rgba(255, 255, 255, 0.08)",
    "--crayon-stroke-info": "#ececff",
    "--crayon-stroke-info-emphasis": "#5879ff",
    "--crayon-stroke-alert": "#fff2d9",
    "--crayon-stroke-alert-emphasis": "#d9ae12",
    "--crayon-stroke-success": "#cdffe3",
    "--crayon-stroke-success-emphasis": "#0ab17d",
    "--crayon-stroke-danger": "#ffe9e5",
    "--crayon-stroke-danger-emphasis": "#eb4b35",
    
    // Text
    "--crayon-primary-text": "#1b1b1b",
    "--crayon-secondary-text": "#717171",
    "--crayon-disabled-text": "#afafaf",
    "--crayon-danger-text": "#a61d0e",
    "--crayon-success-text": "#007a54",
    "--crayon-link-text": "#454c9f",
    "--crayon-info-text": "#2047c9",
    "--crayon-alert-text": "#9a6700",
    "--crayon-accent-primary-text": "rgba(255, 255, 255, 1)",
    "--crayon-accent-secondary-text": "rgba(255, 255, 255, 0.7)",
    "--crayon-accent-disabled-text": "rgba(255, 255, 255, 0.4)",
    
    // Interactive
    "--crayon-interactive-default": "rgba(255, 255, 255, 0.02)",
    "--crayon-interactive-hover": "rgba(0, 0, 0, 0.04)",
    "--crayon-interactive-pressed": "rgba(0, 0, 0, 0.06)",
    "--crayon-interactive-disabled": "rgba(255, 255, 255, 0.02)",
    "--crayon-interactive-accent": "#5861CB",
    "--crayon-interactive-accent-hover": "#4b52ad",
    "--crayon-interactive-accent-pressed": "#3e448e",
    "--crayon-interactive-accent-disabled": "#a3a8e2",
    "--crayon-interactive-destructive": "#fff0ee",
    "--crayon-interactive-destructive-hover": "#ffe9e5",
    "--crayon-interactive-destructive-pressed": "#ffded8",
    "--crayon-interactive-destructive-disabled": "#fff0ee",
    
    // Chat
    "--crayon-chat-container-bg": "#f1f1f1",
    "--crayon-chat-assistant-response-bg": "#ffffff",
    "--crayon-chat-assistant-response-text": "#1b1b1b",
    "--crayon-chat-user-response-bg": "#d6d6d6",
    "--crayon-chat-user-response-text": "#242424",
  },
  dark: {
    // Fills
    "--crayon-background-fills": "#101010",
    "--crayon-container-fills": "#1a1a1a",
    "--crayon-overlay-fills": "rgba(0, 0, 0, 0.7)",
    "--crayon-sunk-fills": "rgba(255, 255, 255, 0.04)",
    "--crayon-container-hover-fills": "rgba(255, 255, 255, 0.06)",
    "--crayon-danger-fills": "#2d1410",
    "--crayon-success-fills": "#0d2818",
    "--crayon-info-fills": "#1a1a2e",
    "--crayon-elevated-fills": "rgba(255, 255, 255, 0.1)",
    "--crayon-alert-fills": "#2d2610",
    "--crayon-sunk-bg-fills": "rgba(255, 255, 255, 0.02)",
    "--crayon-inverted-fills": "#f1f1f1",
    "--crayon-highlight-subtle": "rgba(255, 255, 255, 0.02)",
    
    // Strokes
    "--crayon-stroke-default": "rgba(255, 255, 255, 0.06)",
    "--crayon-stroke-interactive-el": "rgba(255, 255, 255, 0.1)",
    "--crayon-stroke-interactive-el-hover": "rgba(255, 255, 255, 0.3)",
    "--crayon-stroke-interactive-el-selected": "rgba(255, 255, 255, 0.5)",
    "--crayon-stroke-emphasis": "rgba(255, 255, 255, 0.2)",
    "--crayon-stroke-accent": "rgba(255, 255, 255, 0.04)",
    "--crayon-stroke-accent-emphasis": "rgba(255, 255, 255, 0.08)",
    "--crayon-stroke-info": "#1a1a2e",
    "--crayon-stroke-info-emphasis": "#818cf8",
    "--crayon-stroke-alert": "#2d2610",
    "--crayon-stroke-alert-emphasis": "#fbbf24",
    "--crayon-stroke-success": "#0d2818",
    "--crayon-stroke-success-emphasis": "#4ade80",
    "--crayon-stroke-danger": "#2d1410",
    "--crayon-stroke-danger-emphasis": "#f87171",
    
    // Text
    "--crayon-primary-text": "#f5f5f5",
    "--crayon-secondary-text": "#a3a3a3",
    "--crayon-disabled-text": "#737373",
    "--crayon-danger-text": "#f87171",
    "--crayon-success-text": "#4ade80",
    "--crayon-link-text": "#818cf8",
    "--crayon-info-text": "#60a5fa",
    "--crayon-alert-text": "#fbbf24",
    "--crayon-accent-primary-text": "rgba(0, 0, 0, 1)",
    "--crayon-accent-secondary-text": "rgba(0, 0, 0, 0.7)",
    "--crayon-accent-disabled-text": "rgba(0, 0, 0, 0.4)",
    
    // Interactive
    "--crayon-interactive-default": "rgba(255, 255, 255, 0.02)",
    "--crayon-interactive-hover": "rgba(255, 255, 255, 0.06)",
    "--crayon-interactive-pressed": "rgba(255, 255, 255, 0.1)",
    "--crayon-interactive-disabled": "rgba(255, 255, 255, 0.02)",
    "--crayon-interactive-accent": "#818cf8",
    "--crayon-interactive-accent-hover": "#6366f1",
    "--crayon-interactive-accent-pressed": "#4f46e5",
    "--crayon-interactive-accent-disabled": "#4338ca",
    "--crayon-interactive-destructive": "#2d1410",
    "--crayon-interactive-destructive-hover": "#3d1a15",
    "--crayon-interactive-destructive-pressed": "#4d201a",
    "--crayon-interactive-destructive-disabled": "#1d0d0a",
    
    // Chat
    "--crayon-chat-container-bg": "#101010",
    "--crayon-chat-assistant-response-bg": "#1a1a1a",
    "--crayon-chat-assistant-response-text": "#f5f5f5",
    "--crayon-chat-user-response-bg": "#2a2a2a",
    "--crayon-chat-user-response-text": "#f5f5f5",
  },
} as const;

export function getDefaultColor(
  cssVariable: string,
  mode: "light" | "dark"
): string {
  const colors = defaultColors[mode];
  return colors[cssVariable as keyof typeof colors] || "";
}
