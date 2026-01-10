import { Tabs, TabsList, TabsTrigger, TabsContent } from "@crayonai/react-ui";
import { Sparkles } from "lucide-react";
import { ThemeCustomization, ShadowConfig } from "../types/theme";
import { ColorControls } from "./ColorControls";
import { FontControls } from "./FontControls";
import { SpacingControls } from "./SpacingControls";
import { StrokeControls } from "./StrokeControls";
import { ChatControls } from "./ChatControls";
import { ShadowControls } from "./ShadowControls";

interface SidebarProps {
  value: string;
  onValueChange: (value: string) => void;
  customization: ThemeCustomization;
  onColorChange: (key: keyof ThemeCustomization['colors'], value?: string) => void;
  onChartColorChange: (key: keyof ThemeCustomization['chartColors'], value?: string) => void;
  onStrokeColorChange: (key: keyof ThemeCustomization['strokeColors'], value?: string | number) => void;
  onChatColorChange: (key: keyof ThemeCustomization['chatColors'], value?: string) => void;
  onShadowChange: (value?: ShadowConfig) => void;
  onFontChange: (category: keyof ThemeCustomization['fonts'], value?: string) => void;
  onLetterSpacingChange: (value?: number) => void;
  onSpacingChange: (value?: number) => void;
  onBorderRadiusChange: (value?: number) => void;
}

export function Sidebar({
  value,
  onValueChange,
  customization,
  onColorChange,
  onChartColorChange,
  onStrokeColorChange,
  onChatColorChange,
  onShadowChange,
  onFontChange,
  onLetterSpacingChange,
  onSpacingChange,
  onBorderRadiusChange,
}: SidebarProps) {
  return (
    <aside
      className="w-140 overflow-y-auto flex flex-col"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-primary)",
      }}
    >
      <Tabs value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="colors" text="Colors" />
          <TabsTrigger value="typography" text="Typography" />
          <TabsTrigger value="other" text="Other" />
          <TabsTrigger value="generate" text="Generate" icon={<Sparkles />} />
        </TabsList>
        <TabsContent value="generate">
          <div style={{ padding: '16px', color: "var(--text-secondary)" }}>
            AI generation controls will appear here
          </div>
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
      </Tabs>
    </aside>
  );
}
