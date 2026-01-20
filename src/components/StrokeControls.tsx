import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";
import { ThemeCustomization, ThemeMode } from "../types/theme";

interface StrokeControlsProps {
  strokeColors: ThemeCustomization["strokeColors"];
  onStrokeColorChange: (
    field: keyof ThemeCustomization["strokeColors"],
    value?: string
  ) => void;
  mode: ThemeMode;
}

const strokeColorFields: {
  key: keyof ThemeCustomization["strokeColors"];
  label: string;
  cssVariable: string;
}[] = [
  // Base strokes
  { key: "default", label: "Default", cssVariable: "--crayon-stroke-default" },
  { key: "interactiveEl", label: "Interactive", cssVariable: "--crayon-stroke-interactive-el" },
  { key: "interactiveElHover", label: "Interactive Hover", cssVariable: "--crayon-stroke-interactive-el-hover" },
  { key: "interactiveElSelected", label: "Interactive Selected", cssVariable: "--crayon-stroke-interactive-el-selected" },
  { key: "emphasis", label: "Emphasis", cssVariable: "--crayon-stroke-emphasis" },
  // Accent strokes
  { key: "accent", label: "Accent", cssVariable: "--crayon-stroke-accent" },
  { key: "accentEmphasis", label: "Accent Emphasis", cssVariable: "--crayon-stroke-accent-emphasis" },
  // Status strokes
  { key: "info", label: "Info", cssVariable: "--crayon-stroke-info" },
  { key: "infoEmphasis", label: "Info Emphasis", cssVariable: "--crayon-stroke-info-emphasis" },
  { key: "alert", label: "Alert", cssVariable: "--crayon-stroke-alert" },
  { key: "alertEmphasis", label: "Alert Emphasis", cssVariable: "--crayon-stroke-alert-emphasis" },
  { key: "success", label: "Success", cssVariable: "--crayon-stroke-success" },
  { key: "successEmphasis", label: "Success Emphasis", cssVariable: "--crayon-stroke-success-emphasis" },
  { key: "danger", label: "Danger", cssVariable: "--crayon-stroke-danger" },
  { key: "dangerEmphasis", label: "Danger Emphasis", cssVariable: "--crayon-stroke-danger-emphasis" },
];

export function StrokeControls({
  strokeColors,
  onStrokeColorChange,
  mode,
}: StrokeControlsProps) {
  return (
      <Section title="Stroke Colors" defaultOpen={false}>
      <p className="section__description">
        Configure border and stroke colors for various UI states.
      </p>

      {strokeColorFields.map(({ key, label, cssVariable }) => (
        <ColorPicker
          key={key}
          label={label}
          value={strokeColors[key]}
          onChange={(color) => onStrokeColorChange(key, color)}
          cssVariable={cssVariable}
          mode={mode}
                />
      ))}
      </Section>
  );
}
