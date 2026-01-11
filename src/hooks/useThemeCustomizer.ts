import { useCallback, useMemo, useEffect } from "react";
import {
  DualModeThemeCustomization,
  ThemeCustomization,
  ShadowConfig,
  ThemeMode,
} from "../types/theme";
import { useHistory } from "./useHistory";
import {
  generateCompleteTheme,
  generateThemeCode,
} from "../utils/themeGenerator";
import {
  generateShareUrl,
  loadStateFromUrl,
  clearUrlState,
} from "../utils/urlState";
import { getPreset } from "../utils/themePresets";
import { loadFont } from "../utils/fontLoader";

const emptyThemeCustomization: ThemeCustomization = {
  colors: {},
  chartColors: {},
  strokeColors: {},
  chatColors: {},
  colorEngine: "default",
  fonts: {},
  letterSpacing: {},
  spacing: {},
  borderRadius: {},
};

const initialState: DualModeThemeCustomization = {
  light: { ...emptyThemeCustomization },
  dark: { ...emptyThemeCustomization },
};

export function useThemeCustomizer(displayMode: ThemeMode) {
  const { state, setState, undo, redo, canUndo, canRedo, clear } =
    useHistory<DualModeThemeCustomization>(initialState);

  // Track which mode is being edited (follows display mode)
  const currentMode = displayMode;
  const currentConfig = state[currentMode];

  // Load state from URL on mount
  useEffect(() => {
    loadStateFromUrl().then((loadedState) => {
      if (loadedState) {
        setState(loadedState);
        clearUrlState();
      }
    });
  }, []);

  // Load fonts whenever theme changes (for both modes)
  useEffect(() => {
    const loadFonts = async () => {
      const fontsToLoad = [
        state.light.fonts.body,
        state.light.fonts.heading,
        state.light.fonts.mono,
        state.dark.fonts.body,
        state.dark.fonts.heading,
        state.dark.fonts.mono,
      ].filter((font): font is string => !!font);

      // Deduplicate
      const uniqueFonts = Array.from(new Set(fontsToLoad));

      for (const font of uniqueFonts) {
        try {
          await loadFont(font);
        } catch (err) {
          console.error(`Failed to load font ${font}:`, err);
        }
      }
    };

    loadFonts();
  }, [
    state.light.fonts.body,
    state.light.fonts.heading,
    state.light.fonts.mono,
    state.dark.fonts.body,
    state.dark.fonts.heading,
    state.dark.fonts.mono,
  ]);

  // Update color
  const updateColor = useCallback(
    (key: keyof ThemeCustomization["colors"], value?: string) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          colors: {
            ...currentConfig.colors,
            [key]: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update chart color
  const updateChartColor = useCallback(
    (key: keyof ThemeCustomization["chartColors"], value?: string) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          chartColors: {
            ...currentConfig.chartColors,
            [key]: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update font
  const updateFont = useCallback(
    (category: keyof ThemeCustomization["fonts"], value?: string) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          fonts: {
            ...currentConfig.fonts,
            [category]: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update letter spacing
  const updateLetterSpacing = useCallback(
    (value?: number) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          letterSpacing: {
            base: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update spacing
  const updateSpacing = useCallback(
    (value?: number) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          spacing: {
            base: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update border radius
  const updateBorderRadius = useCallback(
    (value?: number) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          borderRadius: {
            base: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update stroke color
  const updateStrokeColor = useCallback(
    (
      key: keyof ThemeCustomization["strokeColors"],
      value?: string | number
    ) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          strokeColors: {
            ...currentConfig.strokeColors,
            [key]: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update chat color
  const updateChatColor = useCallback(
    (key: keyof ThemeCustomization["chatColors"], value?: string) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          chatColors: {
            ...currentConfig.chatColors,
            [key]: value,
          },
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update shadow
  const updateShadow = useCallback(
    (value?: ShadowConfig) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          shadow: value,
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update custom CSS
  const updateCustomCss = useCallback(
    (value?: string) => {
      setState({
        ...state,
        [currentMode]: {
          ...currentConfig,
          customCss: value,
        },
      });
    },
    [state, currentMode, currentConfig, setState]
  );

  // Update current mode's entire config (for AI generation)
  const updateCurrentModeConfig = useCallback(
    (newConfig: ThemeCustomization) => {
      setState({
        ...state,
        [currentMode]: newConfig,
      });
    },
    [state, currentMode, setState]
  );

  // Load preset
  const loadPreset = useCallback(
    (presetName: string) => {
      const preset = getPreset(presetName);
      if (preset) {
        setState(preset.config);
      }
    },
    [setState]
  );

  // Generate theme objects
  const generatedTheme = useMemo(() => {
    return {
      light: generateCompleteTheme(state.light, "light"),
      dark: generateCompleteTheme(state.dark, "dark"),
    };
  }, [state.light, state.dark]);

  // Export theme code
  const exportThemeCode = useCallback(() => {
    return generateThemeCode(state.light, state.dark);
  }, [state.light, state.dark]);

  // Generate share URL
  const getShareUrl = useCallback(async () => {
    return await generateShareUrl(state);
  }, [state]);

  return {
    // State
    customization: currentConfig,
    theme: generatedTheme.light,
    darkTheme: generatedTheme.dark,
    currentMode,

    // Update functions
    updateColor,
    updateChartColor,
    updateFont,
    updateLetterSpacing,
    updateSpacing,
    updateBorderRadius,
    updateStrokeColor,
    updateChatColor,
    updateShadow,
    updateCustomCss,
    updateCurrentModeConfig,
    loadPreset,
    setCustomization: setState,

    // History functions
    undo,
    redo,
    canUndo,
    canRedo,
    clear,

    // Export
    exportThemeCode,
    getShareUrl,
  };
}
