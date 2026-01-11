import { Slider } from "@crayonai/react-ui";
import { Section } from "./Section";
import { ThemeCustomization } from "../types/theme";

interface SpacingControlsProps {
  spacing: ThemeCustomization["spacing"];
  borderRadius: ThemeCustomization["borderRadius"];
  onSpacingChange: (value?: number) => void;
  onBorderRadiusChange: (value?: number) => void;
}


export function SpacingControls({
  spacing,
  borderRadius,
  onSpacingChange,
  onBorderRadiusChange,
}: SpacingControlsProps) {
  const spacingValue = spacing.base ?? 2;
  const radiusValue = borderRadius.base ?? 2;

  return (
    <div style={{ padding: "16px" }}>
      <Section title="Radius" defaultOpen={true}>
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
            Radius
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Slider
              variant="continuous"
              min={0}
              max={8}
              step={0.1}
              value={[radiusValue]}
              onValueChange={(values) => onBorderRadiusChange(values[0])}
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
                    value={radiusValue.toFixed(3)}
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
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--crayon-secondary-text)",
                      minWidth: "30px",
                    }}
                  >
                    rem
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </Section>

      <Section title="Spacing" defaultOpen={false}>
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
            Base Spacing
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Slider
              variant="continuous"
              min={1}
              max={8}
              step={1}
              value={[spacingValue]}
              onValueChange={(values) => onSpacingChange(values[0])}
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
                    value={spacingValue}
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
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--crayon-secondary-text)",
                      minWidth: "30px",
                    }}
                  >
                    px
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
