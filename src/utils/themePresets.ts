// Re-export types
export type { ThemePreset } from "../themes/presets/types";

// Import individual presets
import {
  vercelPreset,
  chatgptPreset,
  claudePreset,
  perplexityPreset,
  twitterPreset,
  t3chatPreset,
  type ThemePreset,
} from "../themes/presets";

// Combined presets registry
export const themePresets: Record<string, ThemePreset> = {
  vercel: vercelPreset,
  chatgpt: chatgptPreset,
  claude: claudePreset,
  perplexity: perplexityPreset,
  twitter: twitterPreset,
  t3chat: t3chatPreset,
};

export function getPresetNames(): string[] {
  return Object.keys(themePresets);
}

export function getPreset(name: string): ThemePreset | undefined {
  return themePresets[name];
}
