import { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainPanel } from "./components/MainPanel";
import { ElementSelector } from "./components/ElementSelector";
import { useThemeCustomizer } from "./hooks/useThemeCustomizer";

interface AppProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

function App({ theme, setTheme }: AppProps) {
  const [sidebarTab, setSidebarTab] = useState("colors");
  const [selectorMode, setSelectorMode] = useState(false);
  const [currentPreset, setCurrentPreset] = useState("default");

  const handleThemeModeLoaded = useCallback((mode: "light" | "dark") => {
    setTheme(mode);
  }, [setTheme]);

  const {
    customization,
    theme: customTheme,
    darkTheme: customDarkTheme,
    currentMode,
    updateColor,
    updateFill,
    updateText,
    updateInteractive,
    updateChartColor,
    updateStrokeColor,
    updateChatColor,
    updateShadow,
    updateFont,
    updateLetterSpacing,
    updateFontWeight,
    updateFontSize,
    updateSpacing,
    updateBorderRadius,
    updateIndividualSpacing,
    updateIndividualBorderRadius,
    applyBorderRadiusPreset,
    applySpacingPreset,
    updateCustomCss,
    updateCurrentModeConfig,
    loadPreset,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
    exportThemeCode,
    getShareUrl,
  } = useThemeCustomizer(theme, handleThemeModeLoaded);

  const handleAddToCss = useCallback(
    (selector: string) => {
      const newCssBlock = `\n/* ${selector} */\n${selector} {\n  /* your styles here */\n}\n`;
      const currentCss = customization.customCss || "";
      updateCustomCss(currentCss + newCssBlock);
      // Switch to CSS tab to show the added selector
      setSidebarTab("css");
    },
    [customization.customCss, updateCustomCss]
  );

  const handleToggleSelectorMode = useCallback(() => {
    setSelectorMode((prev) => !prev);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header
        theme={theme}
        setTheme={setTheme}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onExport={exportThemeCode}
        onReset={clear}
        onShare={getShareUrl}
        selectorMode={selectorMode}
        onToggleSelectorMode={handleToggleSelectorMode}
      />
      <ElementSelector
        isActive={selectorMode}
        onClose={handleToggleSelectorMode}
        onAddToCss={handleAddToCss}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          value={sidebarTab}
          onValueChange={setSidebarTab}
          customization={customization}
          currentMode={currentMode}
          currentPreset={currentPreset}
          onPresetChange={setCurrentPreset}
          onColorChange={updateColor}
          onFillChange={updateFill}
          onTextChange={updateText}
          onInteractiveChange={updateInteractive}
          onChartColorChange={updateChartColor}
          onStrokeColorChange={updateStrokeColor}
          onChatColorChange={updateChatColor}
          onShadowChange={updateShadow}
          onFontChange={updateFont}
          onLetterSpacingChange={updateLetterSpacing}
          onFontWeightChange={updateFontWeight}
          onFontSizeChange={updateFontSize}
          onSpacingChange={updateSpacing}
          onBorderRadiusChange={updateBorderRadius}
          onIndividualSpacingChange={updateIndividualSpacing}
          onIndividualBorderRadiusChange={updateIndividualBorderRadius}
          onApplyBorderRadiusPreset={applyBorderRadiusPreset}
          onApplySpacingPreset={applySpacingPreset}
          onCustomCssChange={updateCustomCss}
          onPresetSelect={loadPreset}
          onReset={clear}
          onCurrentModeThemeGenerated={updateCurrentModeConfig}
        />
        <MainPanel
          mode={theme}
          theme={customTheme}
          darkTheme={customDarkTheme}
          customCss={customization.customCss}
        />
      </div>
    </div>
  );
}

export default App;
