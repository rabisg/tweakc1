import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";
import { ThemeCustomization, ThemeMode } from "../types/theme";

// Define the fill keys type
type FillKeys = "backgroundFills" | "containerFills" | "overlayFills" | "sunkFills" | "containerHoverFills" | "dangerFills" | "successFills" | "infoFills" | "elevatedFills" | "alertFills" | "sunkBgFills" | "invertedFills" | "highlightSubtle";
type TextKeys = "brandText" | "brandSecondaryText" | "primaryText" | "secondaryText" | "disabledText" | "dangerText" | "successText" | "linkText" | "infoText" | "alertText" | "accentPrimaryText" | "accentSecondaryText" | "accentDisabledText";
type InteractiveKeys = "interactiveDefault" | "interactiveHover" | "interactivePressed" | "interactiveDisabled" | "interactiveAccent" | "interactiveAccentHover" | "interactiveAccentPressed" | "interactiveAccentDisabled" | "interactiveDestructive" | "interactiveDestructiveHover" | "interactiveDestructivePressed" | "interactiveDestructiveDisabled";
type ChartColorKeys = "primary" | "secondary" | "useDualMode";

interface ColorControlsProps {
  fills?: ThemeCustomization["fills"];
  text?: ThemeCustomization["text"];
  interactive?: ThemeCustomization["interactive"];
  chartColors: ThemeCustomization["chartColors"];
  onFillChange: (key: FillKeys, value?: string) => void;
  onTextChange: (key: TextKeys, value?: string) => void;
  onInteractiveChange: (key: InteractiveKeys, value?: string) => void;
  onChartColorChange: (key: ChartColorKeys, value?: string | boolean) => void;
  mode: ThemeMode;
}

export function ColorControls({
  fills,
  text,
  interactive,
  chartColors,
  onFillChange,
  onTextChange,
  onInteractiveChange,
  onChartColorChange,
  mode,
}: ColorControlsProps) {
  return (
    <>
      <Section title="Fills" defaultOpen={true}>
        <ColorPicker
          label="Background"
          value={fills?.backgroundFills}
          onChange={(color) => onFillChange("backgroundFills", color)}
          cssVariable="--crayon-background-fills"
          mode={mode}
        />
        <ColorPicker
          label="Container"
          value={fills?.containerFills}
          onChange={(color) => onFillChange("containerFills", color)}
          cssVariable="--crayon-container-fills"
          mode={mode}
        />
        <ColorPicker
          label="Container Hover"
          value={fills?.containerHoverFills}
          onChange={(color) => onFillChange("containerHoverFills", color)}
          cssVariable="--crayon-container-hover-fills"
          mode={mode}
        />
        <ColorPicker
          label="Sunk"
          value={fills?.sunkFills}
          onChange={(color) => onFillChange("sunkFills", color)}
          cssVariable="--crayon-sunk-fills"
          mode={mode}
        />
        <ColorPicker
          label="Sunk Background"
          value={fills?.sunkBgFills}
          onChange={(color) => onFillChange("sunkBgFills", color)}
          cssVariable="--crayon-sunk-bg-fills"
          mode={mode}
        />
        <ColorPicker
          label="Elevated"
          value={fills?.elevatedFills}
          onChange={(color) => onFillChange("elevatedFills", color)}
          cssVariable="--crayon-elevated-fills"
          mode={mode}
        />
        <ColorPicker
          label="Overlay"
          value={fills?.overlayFills}
          onChange={(color) => onFillChange("overlayFills", color)}
          cssVariable="--crayon-overlay-fills"
          mode={mode}
        />
        <ColorPicker
          label="Inverted"
          value={fills?.invertedFills}
          onChange={(color) => onFillChange("invertedFills", color)}
          cssVariable="--crayon-inverted-fills"
          mode={mode}
        />
        <ColorPicker
          label="Highlight Subtle"
          value={fills?.highlightSubtle}
          onChange={(color) => onFillChange("highlightSubtle", color)}
          cssVariable="--crayon-highlight-subtle"
          mode={mode}
        />
        <ColorPicker
          label="Danger"
          value={fills?.dangerFills}
          onChange={(color) => onFillChange("dangerFills", color)}
          cssVariable="--crayon-danger-fills"
          mode={mode}
        />
        <ColorPicker
          label="Success"
          value={fills?.successFills}
          onChange={(color) => onFillChange("successFills", color)}
          cssVariable="--crayon-success-fills"
          mode={mode}
        />
        <ColorPicker
          label="Info"
          value={fills?.infoFills}
          onChange={(color) => onFillChange("infoFills", color)}
          cssVariable="--crayon-info-fills"
          mode={mode}
        />
        <ColorPicker
          label="Alert"
          value={fills?.alertFills}
          onChange={(color) => onFillChange("alertFills", color)}
          cssVariable="--crayon-alert-fills"
          mode={mode}
        />
      </Section>

      <Section title="Text" defaultOpen={false}>
        <ColorPicker
          label="Primary"
          value={text?.primaryText}
          onChange={(color) => onTextChange("primaryText", color)}
          cssVariable="--crayon-primary-text"
          mode={mode}
        />
        <ColorPicker
          label="Secondary"
          value={text?.secondaryText}
          onChange={(color) => onTextChange("secondaryText", color)}
          cssVariable="--crayon-secondary-text"
          mode={mode}
        />
        <ColorPicker
          label="Disabled"
          value={text?.disabledText}
          onChange={(color) => onTextChange("disabledText", color)}
          cssVariable="--crayon-disabled-text"
          mode={mode}
        />
        <ColorPicker
          label="Link"
          value={text?.linkText}
          onChange={(color) => onTextChange("linkText", color)}
          cssVariable="--crayon-link-text"
          mode={mode}
        />
        <ColorPicker
          label="Accent Primary"
          value={text?.accentPrimaryText}
          onChange={(color) => onTextChange("accentPrimaryText", color)}
          cssVariable="--crayon-accent-primary-text"
          mode={mode}
        />
        <ColorPicker
          label="Accent Secondary"
          value={text?.accentSecondaryText}
          onChange={(color) => onTextChange("accentSecondaryText", color)}
          cssVariable="--crayon-accent-secondary-text"
          mode={mode}
        />
        <ColorPicker
          label="Accent Disabled"
          value={text?.accentDisabledText}
          onChange={(color) => onTextChange("accentDisabledText", color)}
          cssVariable="--crayon-accent-disabled-text"
          mode={mode}
        />
        <ColorPicker
          label="Danger"
          value={text?.dangerText}
          onChange={(color) => onTextChange("dangerText", color)}
          cssVariable="--crayon-danger-text"
          mode={mode}
        />
        <ColorPicker
          label="Success"
          value={text?.successText}
          onChange={(color) => onTextChange("successText", color)}
          cssVariable="--crayon-success-text"
          mode={mode}
        />
        <ColorPicker
          label="Info"
          value={text?.infoText}
          onChange={(color) => onTextChange("infoText", color)}
          cssVariable="--crayon-info-text"
          mode={mode}
        />
        <ColorPicker
          label="Alert"
          value={text?.alertText}
          onChange={(color) => onTextChange("alertText", color)}
          cssVariable="--crayon-alert-text"
          mode={mode}
        />
      </Section>

      <Section title="Interactive" defaultOpen={false}>
        <ColorPicker
          label="Default"
          value={interactive?.interactiveDefault}
          onChange={(color) => onInteractiveChange("interactiveDefault", color)}
          cssVariable="--crayon-interactive-default"
          mode={mode}
        />
        <ColorPicker
          label="Hover"
          value={interactive?.interactiveHover}
          onChange={(color) => onInteractiveChange("interactiveHover", color)}
          cssVariable="--crayon-interactive-hover"
          mode={mode}
        />
        <ColorPicker
          label="Pressed"
          value={interactive?.interactivePressed}
          onChange={(color) => onInteractiveChange("interactivePressed", color)}
          cssVariable="--crayon-interactive-pressed"
          mode={mode}
        />
        <ColorPicker
          label="Disabled"
          value={interactive?.interactiveDisabled}
          onChange={(color) => onInteractiveChange("interactiveDisabled", color)}
          cssVariable="--crayon-interactive-disabled"
          mode={mode}
        />
        <ColorPicker
          label="Accent"
          value={interactive?.interactiveAccent}
          onChange={(color) => onInteractiveChange("interactiveAccent", color)}
          cssVariable="--crayon-interactive-accent"
          mode={mode}
        />
        <ColorPicker
          label="Accent Hover"
          value={interactive?.interactiveAccentHover}
          onChange={(color) => onInteractiveChange("interactiveAccentHover", color)}
          cssVariable="--crayon-interactive-accent-hover"
          mode={mode}
        />
        <ColorPicker
          label="Accent Pressed"
          value={interactive?.interactiveAccentPressed}
          onChange={(color) => onInteractiveChange("interactiveAccentPressed", color)}
          cssVariable="--crayon-interactive-accent-pressed"
          mode={mode}
        />
        <ColorPicker
          label="Accent Disabled"
          value={interactive?.interactiveAccentDisabled}
          onChange={(color) => onInteractiveChange("interactiveAccentDisabled", color)}
          cssVariable="--crayon-interactive-accent-disabled"
          mode={mode}
        />
        <ColorPicker
          label="Destructive"
          value={interactive?.interactiveDestructive}
          onChange={(color) => onInteractiveChange("interactiveDestructive", color)}
          cssVariable="--crayon-interactive-destructive"
          mode={mode}
        />
        <ColorPicker
          label="Destructive Hover"
          value={interactive?.interactiveDestructiveHover}
          onChange={(color) => onInteractiveChange("interactiveDestructiveHover", color)}
          cssVariable="--crayon-interactive-destructive-hover"
          mode={mode}
        />
        <ColorPicker
          label="Destructive Pressed"
          value={interactive?.interactiveDestructivePressed}
          onChange={(color) => onInteractiveChange("interactiveDestructivePressed", color)}
          cssVariable="--crayon-interactive-destructive-pressed"
          mode={mode}
        />
        <ColorPicker
          label="Destructive Disabled"
          value={interactive?.interactiveDestructiveDisabled}
          onChange={(color) => onInteractiveChange("interactiveDestructiveDisabled", color)}
          cssVariable="--crayon-interactive-destructive-disabled"
          mode={mode}
        />
      </Section>

      <Section title="Chart colors" defaultOpen={false}>
        <ColorPicker
          label={chartColors.useDualMode ? "Primary" : "Chart Color"}
          value={chartColors.primary}
          onChange={(color) => onChartColorChange("primary", color)}
          mode={mode}
        />
        {chartColors.useDualMode && (
          <ColorPicker
            label="Secondary"
            value={chartColors.secondary}
            onChange={(color) => onChartColorChange("secondary", color)}
            mode={mode}
          />
        )}
        <div className="chart-colors__toggle">
          <label className="chart-colors__toggle-label">
            <input
              type="checkbox"
              checked={chartColors.useDualMode || false}
              onChange={(e) => onChartColorChange("useDualMode", e.target.checked ? "true" : undefined)}
            />
            <span>Use two colors</span>
          </label>
    </div>
      </Section>
    </>
  );
}
