# Theme System

Theme presets are defined in `src/themes/presets/` as TypeScript files.

## Available Themes

- **Default** - Base Crayon styles (no preset)
- **Vercel** - Minimal, clean design with sharp corners (light) / rounded (dark)
- **ChatGPT** - Modern, clean with teal accents
- **Claude** - Warm, inviting with beige background
- **Perplexity** - Clean, modern with blue accents
- **Twitter** - Bold, rounded with blue accents
- **T3 Chat** - Dark purple theme

## Architecture

Each theme preset in `presets/` contains:
- **colors** - Background, text, status colors
- **fonts** - Body, heading, mono fonts
- **chartColors** - Chart palette
- **strokeColors** - Border colors
- **chatColors** - Chat-specific colors
- **shadow** - Shadow configuration
- **spacing** - Spacing scale values
- **borderRadius** - Border radius values
- **customCss** - Additional CSS for component overrides

## Creating a New Theme

1. Create `src/themes/presets/mytheme.ts`:

```typescript
import { ThemePreset } from "./types";

export const mythemePreset: ThemePreset = {
  name: "My Theme",
  config: {
    light: {
      colors: { ... },
      fonts: { ... },
      // ... other settings
    },
    dark: {
      // ... dark mode settings
    },
  },
};
```

2. Export from `src/themes/presets/index.ts`:

```typescript
export { mythemePreset } from "./mytheme";
```

3. Register in `src/utils/themePresets.ts`:

```typescript
import { mythemePreset } from "../themes/presets";

export const themePresets = {
  // ...
  mytheme: mythemePreset,
};
```

4. Add to `src/themes/themeManager.ts`:

```typescript
export const THEME_NAMES = {
  // ...
  mytheme: 'My Theme',
} as const;
```
