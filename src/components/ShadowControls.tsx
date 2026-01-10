import { Slider } from "@crayonai/react-ui";
import { Section } from "./Section";
import { ColorPicker } from "./ColorPicker";
import { ThemeCustomization, ShadowConfig } from "../types/theme";

interface ShadowControlsProps {
  shadow?: ShadowConfig;
  onShadowChange: (value?: ShadowConfig) => void;
}

export function ShadowControls({
  shadow,
  onShadowChange,
}: ShadowControlsProps) {
  const config = shadow || {
    color: "rgba(0, 0, 0, 1)",
    opacity: 0.1,
    blur: 4,
    spread: 0,
    offsetX: 0,
    offsetY: 1,
  };

  const updateField = <K extends keyof ShadowConfig>(
    field: K,
    value: ShadowConfig[K]
  ) => {
    onShadowChange({ ...config, [field]: value });
  };

  // Generate preview shadows at different scales
  const generatePreview = (scale: number) => {
    const blur = Math.round((config.blur || 4) * scale);
    const spread = Math.round((config.spread || 0) * scale);
    const offsetX = Math.round((config.offsetX || 0) * scale);
    const offsetY = Math.round((config.offsetY || 1) * scale);
    const finalColor = config.color?.replace(
      /rgba?\((\d+),\s*(\d+),\s*(\d+).*\)/,
      (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${config.opacity})`
    );
    return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${finalColor}`;
  };

  return (
    <Section title="Shadow" defaultOpen={true}>
      <div
        style={{
          marginBottom: "16px",
          fontSize: "13px",
          color: "var(--text-secondary)",
        }}
      >
        Configure a base shadow. Small, Medium, Large, and XL shadows will be
        auto-generated.
      </div>

      <ColorPicker
        label="Shadow Color"
        value={config.color}
        onChange={(color) => updateField("color", color)}
      />

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "var(--text-primary)",
          }}
        >
          Shadow Opacity
        </label>
        <Slider
          variant="continuous"
          min={0}
          max={1}
          step={0.01}
          value={[config.opacity || 0.1]}
          onValueChange={(values) => updateField("opacity", values[0])}
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
                value={(config.opacity || 0.1).toFixed(2)}
                readOnly
                style={{
                  width: "80px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "6px",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  textAlign: "right",
                  outline: "none",
                }}
              />
            </div>
          }
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "var(--text-primary)",
          }}
        >
          Blur Radius
        </label>
        <Slider
          variant="continuous"
          min={0}
          max={100}
          step={1}
          value={[config.blur || 4]}
          onValueChange={(values) => updateField("blur", values[0])}
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
                value={config.blur || 4}
                readOnly
                style={{
                  width: "80px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "6px",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  textAlign: "right",
                  outline: "none",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  minWidth: "30px",
                }}
              >
                px
              </span>
            </div>
          }
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "var(--text-primary)",
          }}
        >
          Spread
        </label>
        <Slider
          variant="continuous"
          min={-50}
          max={50}
          step={1}
          value={[config.spread || 0]}
          onValueChange={(values) => updateField("spread", values[0])}
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
                value={config.spread || 0}
                readOnly
                style={{
                  width: "80px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "6px",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  textAlign: "right",
                  outline: "none",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  minWidth: "30px",
                }}
              >
                px
              </span>
            </div>
          }
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "var(--text-primary)",
          }}
        >
          Offset X
        </label>
        <Slider
          variant="continuous"
          min={-50}
          max={50}
          step={1}
          value={[config.offsetX || 0]}
          onValueChange={(values) => updateField("offsetX", values[0])}
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
                value={config.offsetX || 0}
                readOnly
                style={{
                  width: "80px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "6px",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  textAlign: "right",
                  outline: "none",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  minWidth: "30px",
                }}
              >
                px
              </span>
            </div>
          }
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "var(--text-primary)",
          }}
        >
          Offset Y
        </label>
        <Slider
          variant="continuous"
          min={-50}
          max={50}
          step={1}
          value={[config.offsetY || 1]}
          onValueChange={(values) => updateField("offsetY", values[0])}
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
                value={config.offsetY || 1}
                readOnly
                style={{
                  width: "80px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "6px",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  textAlign: "right",
                  outline: "none",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  minWidth: "30px",
                }}
              >
                px
              </span>
            </div>
          }
        />
      </div>
    </Section>
  );
}
