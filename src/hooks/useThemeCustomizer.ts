import { useCallback, useMemo, useEffect } from "react";
import { ThemeCustomization, ShadowConfig } from "../types/theme";
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

const initialState: ThemeCustomization = {
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

export function useThemeCustomizer() {
  const { state, setState, undo, redo, canUndo, canRedo, clear } =
    useHistory<ThemeCustomization>(initialState);

  // Load state from URL on mount
  useEffect(() => {
    loadStateFromUrl().then((loadedState) => {
      if (loadedState) {
        setState(loadedState);
        clearUrlState();
      }
    });
  }, []);

  // Load fonts whenever theme changes
  useEffect(() => {
    const loadFonts = async () => {
      const fontsToLoad = [
        state.fonts.body,
        state.fonts.heading,
        state.fonts.mono,
      ].filter((font): font is string => !!font);

      for (const font of fontsToLoad) {
        try {
          await loadFont(font);
        } catch (err) {
          console.error(`Failed to load font ${font}:`, err);
        }
      }
    };

    loadFonts();
  }, [state.fonts.body, state.fonts.heading, state.fonts.mono]);

  // Update color
  const updateColor = useCallback(
    (key: keyof ThemeCustomization["colors"], value?: string) => {
      setState({
        ...state,
        colors: {
          ...state.colors,
          [key]: value,
        },
      });
    },
    [state, setState]
  );

  // Update chart color
  const updateChartColor = useCallback(
    (key: keyof ThemeCustomization["chartColors"], value?: string) => {
      setState({
        ...state,
        chartColors: {
          ...state.chartColors,
          [key]: value,
        },
      });
    },
    [state, setState]
  );

  // Update font
  const updateFont = useCallback(
    (category: keyof ThemeCustomization["fonts"], value?: string) => {
      setState({
        ...state,
        fonts: {
          ...state.fonts,
          [category]: value,
        },
      });
    },
    [state, setState]
  );

  // Update letter spacing
  const updateLetterSpacing = useCallback(
    (value?: number) => {
      setState({
        ...state,
        letterSpacing: {
          base: value,
        },
      });
    },
    [state, setState]
  );

  // Update spacing
  const updateSpacing = useCallback(
    (value?: number) => {
      setState({
        ...state,
        spacing: {
          base: value,
        },
      });
    },
    [state, setState]
  );

  // Update border radius
  const updateBorderRadius = useCallback(
    (value?: number) => {
      setState({
        ...state,
        borderRadius: {
          base: value,
        },
      });
    },
    [state, setState]
  );

  // Update stroke color
  const updateStrokeColor = useCallback(
    (
      key: keyof ThemeCustomization["strokeColors"],
      value?: string | number
    ) => {
      setState({
        ...state,
        strokeColors: {
          ...state.strokeColors,
          [key]: value,
        },
      });
    },
    [state, setState]
  );

  // Update chat color
  const updateChatColor = useCallback(
    (key: keyof ThemeCustomization["chatColors"], value?: string) => {
      setState({
        ...state,
        chatColors: {
          ...state.chatColors,
          [key]: value,
        },
      });
    },
    [state, setState]
  );

  // Update shadow
  const updateShadow = useCallback(
    (value?: ShadowConfig) => {
      setState({
        ...state,
        shadow: value,
      });
    },
    [state, setState]
  );

  // Update custom CSS
  const updateCustomCss = useCallback(
    (value?: string) => {
      setState({
        ...state,
        customCss: value,
      });
    },
    [state, setState]
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
    return generateCompleteTheme(state);
  }, [state]);

  // Export theme code
  const exportThemeCode = useCallback(() => {
    return generateThemeCode(
      generatedTheme.theme,
      generatedTheme.darkTheme,
      state.customCss
    );
  }, [generatedTheme, state.customCss]);

  // Generate share URL
  const getShareUrl = useCallback(async () => {
    return await generateShareUrl(state);
  }, [state]);

  return {
    // State
    customization: state,
    theme: generatedTheme.theme,
    darkTheme: generatedTheme.darkTheme,

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
