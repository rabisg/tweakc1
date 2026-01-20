// Theme Manager
// Handles theme selection and persistence
// Custom CSS is now handled via preset files (customCss property)

export const THEME_NAMES = {
  default: 'Default',
  vercel: 'Vercel',
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  perplexity: 'Perplexity',
  twitter: 'Twitter',
  t3chat: 'T3 Chat',
} as const;

export type ThemeName = keyof typeof THEME_NAMES;

let currentThemeName: ThemeName = 'default';

/**
 * Set the current theme
 * @param themeName - The name of the theme to set
 */
export async function loadTheme(themeName: ThemeName): Promise<void> {
  currentThemeName = themeName;
}

/**
 * Get the currently selected theme
 */
export function getCurrentTheme(): ThemeName {
  return currentThemeName;
}

/**
 * Initialize theme from localStorage or default
 */
export function initializeTheme(): ThemeName {
  const savedTheme = localStorage.getItem('selected-theme') as ThemeName | null;
  if (savedTheme && savedTheme in THEME_NAMES) {
    currentThemeName = savedTheme;
    return savedTheme;
  }
  return 'default';
}

/**
 * Save theme preference to localStorage
 */
export function saveThemePreference(themeName: ThemeName): void {
  localStorage.setItem('selected-theme', themeName);
}
