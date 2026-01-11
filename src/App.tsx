import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainPanel } from "./components/MainPanel";
import { useThemeCustomizer } from "./hooks/useThemeCustomizer";

interface AppProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

function App({ theme, setTheme }: AppProps) {
  const [sidebarTab, setSidebarTab] = useState("colors");

  const {
    customization,
    theme: customTheme,
    darkTheme: customDarkTheme,
    updateColor,
    updateChartColor,
    updateStrokeColor,
    updateChatColor,
    updateShadow,
    updateFont,
    updateLetterSpacing,
    updateSpacing,
    updateBorderRadius,
    updateCustomCss,
    loadPreset,
    setCustomization,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
    exportThemeCode,
    getShareUrl,
  } = useThemeCustomizer();

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
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          value={sidebarTab}
          onValueChange={setSidebarTab}
          customization={customization}
          onColorChange={updateColor}
          onChartColorChange={updateChartColor}
          onStrokeColorChange={updateStrokeColor}
          onChatColorChange={updateChatColor}
          onShadowChange={updateShadow}
          onFontChange={updateFont}
          onLetterSpacingChange={updateLetterSpacing}
          onSpacingChange={updateSpacing}
          onBorderRadiusChange={updateBorderRadius}
          onCustomCssChange={updateCustomCss}
          onPresetSelect={loadPreset}
          onReset={clear}
          onThemeGenerated={setCustomization}
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
