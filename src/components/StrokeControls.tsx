import { Slider } from "@crayonai/react-ui";
import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";
import { ThemeCustomization } from "../types/theme";

interface StrokeControlsProps {
  strokeColors: ThemeCustomization["strokeColors"];
  onStrokeColorChange: (
    field: keyof ThemeCustomization["strokeColors"],
    value?: string | number
  ) => void;
}

export function StrokeControls({
  strokeColors,
  onStrokeColorChange,
}: StrokeControlsProps) {
  const baseColor = strokeColors.base || "rgba(0, 0, 0, 1)";
  const opacity = strokeColors.opacity ?? 0.2;

  return (
    <div style={{ padding: "16px" }}>
      <Section title="Stroke Colors" defaultOpen={false}>
        <div
          style={{
            marginBottom: "16px",
            fontSize: "13px",
            color: "var(--crayon-secondary-text)",
          }}
        >
          Configure base stroke color and opacity. All stroke variants
          (interactive, emphasis, status) will be auto-generated.
        </div>

        <ColorPicker
          label="Base Color"
          value={baseColor}
          onChange={(color) => onStrokeColorChange("base", color)}
        />

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "8px",
              color: "var(--crayon-primary-text)",
            }}
          >
            Base Opacity
          </label>
          <Slider
            variant="continuous"
            min={0}
            max={1}
            step={0.01}
            value={[opacity]}
            onValueChange={(values) =>
              onStrokeColorChange("opacity", values[0])
            }
            style={{ flex: 1 }}
            rightContent={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginLeft: "12px",
                }}
              >
                <input
                  type="text"
                  value={opacity.toFixed(2)}
                  readOnly
                  style={{
                    width: "80px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    border: "1px solid var(--crayon-stroke-emphasis)",
                    borderRadius: "6px",
                    background: "var(--crayon-background-fills)",
                    color: "var(--crayon-primary-text)",
                    textAlign: "right",
                    outline: "none",
                  }}
                />
              </div>
            }
          />
        </div>
      </Section>
    </div>
  );
}
