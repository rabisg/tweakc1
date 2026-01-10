import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";
import { ThemeCustomization } from "../types/theme";

interface ColorControlsProps {
  colors: ThemeCustomization["colors"];
  chartColors: ThemeCustomization["chartColors"];
  onColorChange: (
    key: keyof ThemeCustomization["colors"],
    value?: string
  ) => void;
  onChartColorChange: (
    key: keyof ThemeCustomization["chartColors"],
    value?: string
  ) => void;
}

export function ColorControls({
  colors,
  chartColors,
  onColorChange,
  onChartColorChange,
}: ColorControlsProps) {
  return (
    <div style={{ padding: "16px" }}>
      <Section title="Text Colors" defaultOpen={true}>
        <ColorPicker
          label="Primary Text"
          value={colors.textPrimary}
          onChange={(color) => onColorChange("textPrimary", color)}
        />
        <ColorPicker
          label="Secondary Text"
          value={colors.textSecondary}
          onChange={(color) => onColorChange("textSecondary", color)}
        />
        <ColorPicker
          label="Link Text"
          value={colors.linkText}
          onChange={(color) => onColorChange("linkText", color)}
        />
      </Section>

      <Section title="Interactive Colors" defaultOpen={false}>
        <ColorPicker
          label="Primary/Accent"
          value={colors.primary}
          onChange={(color) => onColorChange("primary", color)}
        />
      </Section>

      <Section title="Status Colors" defaultOpen={false}>
        <ColorPicker
          label="Danger"
          value={colors.danger}
          onChange={(color) => onColorChange("danger", color)}
        />
        <ColorPicker
          label="Success"
          value={colors.success}
          onChange={(color) => onColorChange("success", color)}
        />
        <ColorPicker
          label="Info"
          value={colors.info}
          onChange={(color) => onColorChange("info", color)}
        />
        <ColorPicker
          label="Alert"
          value={colors.alert}
          onChange={(color) => onColorChange("alert", color)}
        />
      </Section>

      <Section title="Chart Colors" defaultOpen={false}>
        <ColorPicker
          label="Chart Color 1"
          value={chartColors.color1}
          onChange={(color) => onChartColorChange("color1", color)}
        />
        <ColorPicker
          label="Chart Color 2"
          value={chartColors.color2}
          onChange={(color) => onChartColorChange("color2", color)}
        />
        <ColorPicker
          label="Chart Color 3"
          value={chartColors.color3}
          onChange={(color) => onChartColorChange("color3", color)}
        />
      </Section>
    </div>
  );
}
