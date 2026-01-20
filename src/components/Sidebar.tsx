import { ThemeCustomization, ShadowConfig, ThemeMode } from "../types/theme";
import { ColorControls } from "./ColorControls";
import { FontControls } from "./FontControls";
import { SpacingControls } from "./SpacingControls";
import { StrokeControls } from "./StrokeControls";
import { ChatControls } from "./ChatControls";
import { PresetSelector } from "./PresetSelector";
import { GenerateControls } from "./GenerateControls";
import { CssOverrideControls } from "./CssOverrideControls";

interface SidebarProps {
  value: string;
  onValueChange: (value: string) => void;
  customization: ThemeCustomization;
  currentMode: ThemeMode;
  currentPreset: string;
  onPresetChange: (preset: string) => void;
  onColorChange: (
    key: keyof ThemeCustomization["colors"],
    value?: string
  ) => void;
  onFillChange: (
    key: keyof NonNullable<ThemeCustomization["fills"]>,
    value?: string
  ) => void;
  onTextChange: (
    key: keyof NonNullable<ThemeCustomization["text"]>,
    value?: string
  ) => void;
  onInteractiveChange: (
    key: keyof NonNullable<ThemeCustomization["interactive"]>,
    value?: string
  ) => void;
  onChartColorChange: (
    key: keyof ThemeCustomization["chartColors"],
    value?: string | boolean
  ) => void;
  onStrokeColorChange: (
    key: keyof ThemeCustomization["strokeColors"],
    value?: string
  ) => void;
  onChatColorChange: (
    key: keyof ThemeCustomization["chatColors"],
    value?: string
  ) => void;
  onShadowChange: (value?: ShadowConfig) => void;
  onFontChange: (
    category: keyof ThemeCustomization["fonts"],
    value?: string
  ) => void;
  onLetterSpacingChange: (
    category: keyof ThemeCustomization["letterSpacing"],
    value?: number
  ) => void;
  onFontWeightChange: (
    category: keyof ThemeCustomization["fontWeight"],
    value?: number
  ) => void;
  onFontSizeChange: (value?: number) => void;
  onSpacingChange: (value?: number) => void;
  onBorderRadiusChange: (value?: number) => void;
  onIndividualSpacingChange: (key: string, value?: number) => void;
  onIndividualBorderRadiusChange: (key: string, value?: number) => void;
  onApplyBorderRadiusPreset: (values: Record<string, number>) => void;
  onApplySpacingPreset: (values: Record<string, number>) => void;
  onPresetSelect: (presetName: string) => void;
  onReset: () => void;
  onCurrentModeThemeGenerated: (theme: ThemeCustomization) => void;
  onCustomCssChange: (value?: string) => void;
}

export function Sidebar({
  value,
  onValueChange,
  customization,
  currentMode,
  currentPreset,
  onPresetChange,
  onColorChange: _onColorChange,
  onFillChange,
  onTextChange,
  onInteractiveChange,
  onChartColorChange,
  onStrokeColorChange,
  onChatColorChange,
  // onShadowChange,
  onFontChange,
  onLetterSpacingChange,
  onFontWeightChange,
  onFontSizeChange,
  onSpacingChange,
  onBorderRadiusChange,
  onIndividualSpacingChange,
  onIndividualBorderRadiusChange,
  onApplyBorderRadiusPreset,
  onApplySpacingPreset,
  onPresetSelect,
  onReset,
  onCurrentModeThemeGenerated,
  onCustomCssChange,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <PresetSelector
        onPresetSelect={onPresetSelect}
        onReset={onReset}
        customization={customization}
        currentPreset={currentPreset}
        onPresetChange={onPresetChange}
      />

      <div className="custom-tabs">
        <div className="custom-tabs__list">
          <button
            className={`custom-tabs__trigger ${value === "colors" ? "custom-tabs__trigger--active" : ""}`}
            onClick={() => onValueChange("colors")}
          >
            Colors
          </button>
          <button
            className={`custom-tabs__trigger ${value === "typography" ? "custom-tabs__trigger--active" : ""}`}
            onClick={() => onValueChange("typography")}
          >
            Typography
          </button>
          <button
            className={`custom-tabs__trigger ${value === "other" ? "custom-tabs__trigger--active" : ""}`}
            onClick={() => onValueChange("other")}
          >
            Other
          </button>
          <button
            className={`custom-tabs__trigger ${value === "css" ? "custom-tabs__trigger--active" : ""}`}
            onClick={() => onValueChange("css")}
          >
            CSS
          </button>
          <button
            className={`custom-tabs__trigger ${value === "generate" ? "custom-tabs__trigger--active" : ""}`}
            onClick={() => onValueChange("generate")}
          >
            Generate
          </button>
        </div>

        <div className="custom-tabs__content">
          {value === "colors" && (
            <>
              <ColorControls
                fills={customization.fills || {}}
                text={customization.text || {}}
                interactive={customization.interactive || {}}
                chartColors={customization.chartColors}
                onFillChange={onFillChange}
                onTextChange={onTextChange}
                onInteractiveChange={onInteractiveChange}
                onChartColorChange={onChartColorChange}
                mode={currentMode}
              />
              <StrokeControls
                strokeColors={customization.strokeColors}
                onStrokeColorChange={onStrokeColorChange}
                mode={currentMode}
              />
              <ChatControls
                chatColors={customization.chatColors}
                onChatColorChange={onChatColorChange}
                mode={currentMode}
              />
            </>
          )}

          {value === "typography" && (
            <FontControls
              fonts={customization.fonts}
              fontWeight={customization.fontWeight}
              letterSpacing={customization.letterSpacing}
              fontSize={customization.fontSize}
              onFontChange={onFontChange}
              onFontWeightChange={onFontWeightChange}
              onLetterSpacingChange={onLetterSpacingChange}
              onFontSizeChange={onFontSizeChange}
            />
          )}

          {value === "other" && (
            <SpacingControls
              spacing={customization.spacing}
              borderRadius={customization.borderRadius}
              onSpacingChange={onSpacingChange}
              onBorderRadiusChange={onBorderRadiusChange}
              onIndividualSpacingChange={onIndividualSpacingChange}
              onIndividualBorderRadiusChange={onIndividualBorderRadiusChange}
              onApplyBorderRadiusPreset={onApplyBorderRadiusPreset}
              onApplySpacingPreset={onApplySpacingPreset}
              currentPreset={currentPreset}
            />
          )}

          {value === "generate" && (
            <GenerateControls
              customization={customization}
              currentMode={currentMode}
              onThemeGenerated={onCurrentModeThemeGenerated}
              onApiKeyChange={() => {}}
            />
          )}

          {value === "css" && (
            <CssOverrideControls
              customCss={customization.customCss}
              onCustomCssChange={onCustomCssChange}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
