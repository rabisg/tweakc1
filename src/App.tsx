import { useState, useCallback, useEffect } from "react";
import { Button, IconButton, SwitchItem, Tabs, TabsList, TabsTrigger } from "@crayonai/react-ui";
import { Send, Undo2, Redo2, RotateCcw, Download } from "lucide-react";
import { toast } from "sonner";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainPanel } from "./components/MainPanel";
import { ElementSelector } from "./components/ElementSelector";
import { useThemeCustomizer } from "./hooks/useThemeCustomizer";
import { reverseMapThemeObject } from "./utils/themeReverseMapper";
import { ImportJsonModal } from "./components/ImportJsonModal";

interface AppProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  embedMode?: boolean;
}

function App({ theme, setTheme, embedMode = false }: AppProps) {
  const [sidebarTab, setSidebarTab] = useState("colors");
  const [selectorMode, setSelectorMode] = useState(false);
  const [currentPreset, setCurrentPreset] = useState("default");
  const [showImportModal, setShowImportModal] = useState(false);

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
    exportPlaygroundTheme,
    getShareUrl,
    setCustomization,
  } = useThemeCustomizer(theme, handleThemeModeLoaded);

  const handleAddToCss = useCallback(
    (selector: string) => {
      const newCssBlock = `\n/* ${selector} */\n${selector} {\n  /* your styles here */\n}\n`;
      const currentCss = customization.customCss || "";
      updateCustomCss(currentCss + newCssBlock);
      setSidebarTab("css");
    },
    [customization.customCss, updateCustomCss]
  );

  const handleToggleSelectorMode = useCallback(() => {
    setSelectorMode((prev) => !prev);
  }, []);

  const handleApplyToPlayground = useCallback(() => {
    const data = exportPlaygroundTheme();
    window.parent.postMessage(
      {
        type: "TWEAKC1_THEME_APPLY",
        payload: {
          themeJson: data.themeJson,
          customCss: { light: data.lightCss, dark: data.darkCss },
        },
      },
      "*"
    );
    toast.success("Theme sent to Agent Builder!");
  }, [exportPlaygroundTheme]);

  const handleImportJson = useCallback(
    (themeObject: Record<string, any>) => {
      const reversed = reverseMapThemeObject(themeObject);
      setCustomization(reversed);
    },
    [setCustomization]
  );

  useEffect(() => {
    if (!embedMode) return;
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "object" || event.data === null) return;
      if (event.data.type !== "TWEAKC1_LOAD_THEME") return;
      try {
        const { themeJson, customCss } = event.data.payload;
        const parsed = typeof themeJson === "string" ? JSON.parse(themeJson) : themeJson;
        const reversed = reverseMapThemeObject(parsed, customCss);
        setCustomization(reversed);
      } catch (err) {
        console.error("[TweakC1] Failed to load theme from parent:", err);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [embedMode, setCustomization]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {!embedMode && (
        <Header
          theme={theme}
          setTheme={setTheme}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onExport={exportThemeCode}
          onExportPlayground={exportPlaygroundTheme}
          onReset={clear}
          onShare={getShareUrl}
          selectorMode={selectorMode}
          onToggleSelectorMode={handleToggleSelectorMode}
          onImportJson={handleImportJson}
        />
      )}
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
        <div className="flex flex-1 flex-col overflow-hidden">
          {embedMode && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px",
                borderBottom: "1px solid var(--crayon-stroke-default)",
                backgroundColor: "var(--crayon-background-fills)",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid var(--crayon-stroke-interactive-el)", borderRadius: "var(--crayon-rounded-m)", padding: "4px 4px 4px 10px" }}>
                  <span style={{ font: "var(--crayon-font-label-default)", letterSpacing: "var(--crayon-font-label-small-letter-spacing)", color: "var(--crayon-primary-text)", fontSize: "13px" }}>Selector</span>
                  <SwitchItem checked={selectorMode} onChange={handleToggleSelectorMode} />
                </div>

                <Tabs value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")} variant="card">
                  <TabsList>
                    <TabsTrigger value="light" text="Light" />
                    <TabsTrigger value="dark" text="Dark" />
                  </TabsList>
                </Tabs>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconButton icon={<Download size={15} />} variant="secondary" onClick={() => setShowImportModal(true)} title="Import JSON" />
                  <IconButton icon={<RotateCcw size={15} />} variant="secondary" onClick={clear} title="Reset" />
                  <IconButton icon={<Undo2 size={15} />} variant="secondary" onClick={undo} disabled={!canUndo} title="Undo" />
                  <IconButton icon={<Redo2 size={15} />} variant="secondary" onClick={redo} disabled={!canRedo} title="Redo" />
                </div>
              </div>

              <Button
                variant="primary"
                iconLeft={<Send size={13} />}
                onClick={handleApplyToPlayground}
                style={{ fontSize: "13px", height: 34, paddingLeft: 14, paddingRight: 14 }}
              >
                Apply to Agent Builder
              </Button>
            </div>
          )}
          <MainPanel
            mode={theme}
            theme={customTheme}
            darkTheme={customDarkTheme}
            customCss={customization.customCss}
          />
        </div>
      </div>
      <ImportJsonModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportJson}
      />
    </div>
  );
}

export default App;
