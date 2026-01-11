import { Tabs, TabsList, TabsTrigger, TabsContent } from "@crayonai/react-ui";
import { Sparkles } from "lucide-react";
import { ThemeCustomization, ShadowConfig, ThemeMode } from "../types/theme";
import { ColorControls } from "./ColorControls";
import { FontControls } from "./FontControls";
import { SpacingControls } from "./SpacingControls";
import { StrokeControls } from "./StrokeControls";
import { ChatControls } from "./ChatControls";
import { ShadowControls } from "./ShadowControls";
import { PresetSelector } from "./PresetSelector";
import { GenerateControls } from "./GenerateControls";
import { CssOverrideControls } from "./CssOverrideControls";

interface SidebarProps {
  value: string;
  onValueChange: (value: string) => void;
  customization: ThemeCustomization;
  currentMode: ThemeMode;
  onColorChange: (
    key: keyof ThemeCustomization["colors"],
    value?: string
  ) => void;
  onChartColorChange: (
    key: keyof ThemeCustomization["chartColors"],
    value?: string
  ) => void;
  onStrokeColorChange: (
    key: keyof ThemeCustomization["strokeColors"],
    value?: string | number
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
  onLetterSpacingChange: (value?: number) => void;
  onSpacingChange: (value?: number) => void;
  onBorderRadiusChange: (value?: number) => void;
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
  onColorChange,
  onChartColorChange,
  onStrokeColorChange,
  onChatColorChange,
  onShadowChange,
  onFontChange,
  onLetterSpacingChange,
  onSpacingChange,
  onBorderRadiusChange,
  onPresetSelect,
  onReset,
  onCurrentModeThemeGenerated,
  onCustomCssChange,
}: SidebarProps) {
  return (
    <aside
      className="w-140 overflow-y-auto flex flex-col"
      style={{
        borderRight: "1px solid var(--crayon-stroke-emphasis)",
      }}
    >
      <PresetSelector
        onPresetSelect={onPresetSelect}
        onReset={onReset}
        customization={customization}
      />
      <Tabs value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="colors" text="Colors" />
          <TabsTrigger value="typography" text="Typography" />
          <TabsTrigger value="other" text="Other" />
          <TabsTrigger value="css" text="CSS" />
          <TabsTrigger value="generate" text="Generate" icon={<Sparkles />} />
        </TabsList>
        <TabsContent value="generate">
          <GenerateControls
            customization={customization}
            currentMode={currentMode}
            onThemeGenerated={onCurrentModeThemeGenerated}
            onApiKeyChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="colors">
          <ChatControls
            chatColors={customization.chatColors}
            onChatColorChange={onChatColorChange}
          />
          <ColorControls
            colors={customization.colors}
            chartColors={customization.chartColors}
            onColorChange={onColorChange}
            onChartColorChange={onChartColorChange}
          />
          <StrokeControls
            strokeColors={customization.strokeColors}
            onStrokeColorChange={onStrokeColorChange}
          />
        </TabsContent>
        <TabsContent value="typography">
          <FontControls
            fonts={customization.fonts}
            letterSpacing={customization.letterSpacing}
            onFontChange={onFontChange}
            onLetterSpacingChange={onLetterSpacingChange}
          />
        </TabsContent>
        <TabsContent value="other">
          <SpacingControls
            spacing={customization.spacing}
            borderRadius={customization.borderRadius}
            onSpacingChange={onSpacingChange}
            onBorderRadiusChange={onBorderRadiusChange}
          />
          <ShadowControls
            shadow={customization.shadow}
            onShadowChange={onShadowChange}
          />
        </TabsContent>
        <TabsContent value="css">
          <CssOverrideControls
            customCss={customization.customCss}
            onCustomCssChange={onCustomCssChange}
          />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
