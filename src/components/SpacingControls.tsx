import { useState, useEffect } from "react";
import { Slider, Tabs, TabsList, TabsTrigger } from "@crayonai/react-ui";
import { Section } from "./Section";
import { ThemeCustomization } from "../types/theme";

interface SpacingControlsProps {
  spacing: ThemeCustomization["spacing"];
  borderRadius: ThemeCustomization["borderRadius"];
  onSpacingChange: (value?: number) => void;
  onBorderRadiusChange: (value?: number) => void;
  onIndividualSpacingChange: (key: string, value?: number) => void;
  onIndividualBorderRadiusChange: (key: string, value?: number) => void;
  onApplyBorderRadiusPreset: (values: Record<string, number>) => void;
  onApplySpacingPreset: (values: Record<string, number>) => void;
  currentPreset: string;
}

// Spacing presets (5 discrete presets: Compact -> Tight -> Default -> Relaxed -> Spacious)
const SPACING_PRESETS = [
  {
    name: "Compact",
    values: {
      spacing0: 0,
      spacing3xs: 1,
      spacing2xs: 2,
      spacingXs: 3,
      spacingS: 4,
      spacingM: 6,
      spacingL: 8,
      spacingXl: 12,
      spacing2xl: 16,
      spacing3xl: 24,
    },
  },
  {
    name: "Tight",
    values: {
      spacing0: 0,
      spacing3xs: 1,
      spacing2xs: 3,
      spacingXs: 4,
      spacingS: 6,
      spacingM: 8,
      spacingL: 12,
      spacingXl: 16,
      spacing2xl: 24,
      spacing3xl: 32,
    },
  },
  {
    name: "Default",
    values: {
      spacing0: 0,
      spacing3xs: 2,
      spacing2xs: 4,
      spacingXs: 6,
      spacingS: 8,
      spacingM: 12,
      spacingL: 18,
      spacingXl: 24,
      spacing2xl: 36,
      spacing3xl: 48,
    },
  },
  {
    name: "Relaxed",
    values: {
      spacing0: 0,
      spacing3xs: 2,
      spacing2xs: 6,
      spacingXs: 8,
      spacingS: 12,
      spacingM: 16,
      spacingL: 24,
      spacingXl: 32,
      spacing2xl: 48,
      spacing3xl: 64,
    },
  },
  {
    name: "Spacious",
    values: {
      spacing0: 0,
      spacing3xs: 4,
      spacing2xs: 8,
      spacingXs: 12,
      spacingS: 16,
      spacingM: 24,
      spacingL: 32,
      spacingXl: 48,
      spacing2xl: 64,
      spacing3xl: 96,
    },
  },
];

// Border radius presets (5 discrete presets: Sharp -> Subtle -> Medium -> Large -> Full)
const RADIUS_PRESETS = [
  {
    name: "Sharp",
    values: {
      rounded0: 0,
      rounded3xs: 0,
      rounded2xs: 0,
      roundedXs: 0,
      roundedS: 0,
      roundedM: 0,
      roundedL: 0,
      roundedXl: 0,
      rounded2xl: 0,
      rounded3xl: 0,
      rounded4xl: 0,
      roundedFull: 999,
      roundedClickable: 0,
    },
  },
  {
    name: "Subtle",
    values: {
      rounded0: 0,
      rounded3xs: 1,
      rounded2xs: 2,
      roundedXs: 3,
      roundedS: 4,
      roundedM: 6,
      roundedL: 8,
      roundedXl: 10,
      rounded2xl: 12,
      rounded3xl: 14,
      rounded4xl: 16,
      roundedFull: 999,
      roundedClickable: 6,
    },
  },
  {
    name: "Medium",
    values: {
      rounded0: 0,
      rounded3xs: 2,
      rounded2xs: 4,
      roundedXs: 6,
      roundedS: 8,
      roundedM: 10,
      roundedL: 12,
      roundedXl: 16,
      rounded2xl: 20,
      rounded3xl: 24,
      rounded4xl: 28,
      roundedFull: 999,
      roundedClickable: 10,
    },
  },
  {
    name: "Large",
    values: {
      rounded0: 0,
      rounded3xs: 2,
      rounded2xs: 4,
      roundedXs: 6,
      roundedS: 8,
      roundedM: 12,
      roundedL: 14,
      roundedXl: 18,
      rounded2xl: 22,
      rounded3xl: 26,
      rounded4xl: 34,
      roundedFull: 999,
      roundedClickable: 12,
    },
  },
  {
    name: "Full",
    values: {
      rounded0: 0,
      rounded3xs: 2,
      rounded2xs: 4,
      roundedXs: 8,
      roundedS: 14,
      roundedM: 20,
      roundedL: 24,
      roundedXl: 28,
      rounded2xl: 32,
      rounded3xl: 36,
      rounded4xl: 40,
      roundedFull: 999,
      roundedClickable: 999,
    },
  },
];

// Mapping from our keys to CSS variable names
const CSS_VAR_MAP: Record<string, string> = {
  // Spacing
  spacing0: "--crayon-spacing-0",
  spacing3xs: "--crayon-spacing-3xs",
  spacing2xs: "--crayon-spacing-2xs",
  spacingXs: "--crayon-spacing-xs",
  spacingS: "--crayon-spacing-s",
  spacingM: "--crayon-spacing-m",
  spacingL: "--crayon-spacing-l",
  spacingXl: "--crayon-spacing-xl",
  spacing2xl: "--crayon-spacing-2xl",
  spacing3xl: "--crayon-spacing-3xl",
  // Border radius
  rounded0: "--crayon-rounded-0",
  rounded3xs: "--crayon-rounded-3xs",
  rounded2xs: "--crayon-rounded-2xs",
  roundedXs: "--crayon-rounded-xs",
  roundedS: "--crayon-rounded-s",
  roundedM: "--crayon-rounded-m",
  roundedL: "--crayon-rounded-l",
  roundedXl: "--crayon-rounded-xl",
  rounded2xl: "--crayon-rounded-2xl",
  rounded3xl: "--crayon-rounded-3xl",
  rounded4xl: "--crayon-rounded-4xl",
  roundedFull: "--crayon-rounded-full",
  roundedClickable: "--crayon-rounded-clickable",
};

// Spacing variable keys
const SPACING_KEYS = [
  { key: "spacing0", label: "Zero" },
  { key: "spacing3xs", label: "3XS" },
  { key: "spacing2xs", label: "2XS" },
  { key: "spacingXs", label: "XS" },
  { key: "spacingS", label: "S" },
  { key: "spacingM", label: "M" },
  { key: "spacingL", label: "L" },
  { key: "spacingXl", label: "XL" },
  { key: "spacing2xl", label: "2XL" },
  { key: "spacing3xl", label: "3XL" },
];

// Border radius variable keys
const RADIUS_KEYS = [
  { key: "rounded0", label: "Zero" },
  { key: "rounded3xs", label: "3XS" },
  { key: "rounded2xs", label: "2XS" },
  { key: "roundedXs", label: "XS" },
  { key: "roundedS", label: "S" },
  { key: "roundedM", label: "M" },
  { key: "roundedL", label: "L" },
  { key: "roundedXl", label: "XL" },
  { key: "rounded2xl", label: "2XL" },
  { key: "rounded3xl", label: "3XL" },
  { key: "rounded4xl", label: "4XL" },
  { key: "roundedFull", label: "Full" },
  { key: "roundedClickable", label: "Clickable" },
];

// Helper to read CSS variable value from DOM
function getCssVariableValue(varName: string): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

function IndividualValueControl({
  label,
  varKey,
  customValue,
  onChange,
}: {
  label: string;
  varKey: string;
  customValue?: number;
  onChange: (value?: number) => void;
}) {
  const cssVarName = CSS_VAR_MAP[varKey];
  const [cssValue, setCssValue] = useState<number>(0);
  
  // Read CSS variable on mount and when theme changes
  useEffect(() => {
    const readValue = () => {
      if (cssVarName) {
        const value = getCssVariableValue(cssVarName);
        setCssValue(value);
      }
    };
    
    readValue();
    
    // Re-read on theme changes (observe style changes on document)
    const observer = new MutationObserver(readValue);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme', 'style', 'class'] 
    });
    observer.observe(document.head, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [cssVarName]);
  
  // Use custom value if set, otherwise use CSS value
  const displayValue = customValue ?? cssValue;
  const [localValue, setLocalValue] = useState(displayValue.toFixed(0));

  useEffect(() => {
    setLocalValue(displayValue.toFixed(0));
  }, [displayValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    const numValue = parseFloat(localValue);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange(numValue);
    } else {
      setLocalValue(displayValue.toFixed(0));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const isCustom = customValue !== undefined;

  return (
    <div className="slider-row">
      <label className="slider-row__label">{label}</label>
      <div className="slider-row__value">
        <input
          type="number"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          min="0"
          step="1"
          className={`slider-row__input ${isCustom ? "slider-row__input--custom" : ""}`}
        />
        <span className="slider-row__unit">px</span>
      </div>
    </div>
  );
}

export function SpacingControls({
  spacing,
  borderRadius,
  onSpacingChange: _onSpacingChange,
  onBorderRadiusChange: _onBorderRadiusChange,
  onIndividualSpacingChange,
  onIndividualBorderRadiusChange,
  onApplyBorderRadiusPreset,
  onApplySpacingPreset,
  currentPreset,
}: SpacingControlsProps) {
  const isDefaultTheme = currentPreset === "default";
  
  // For default theme: start with preset tab, for others: start with custom tab
  const [radiusTabMode, setRadiusTabMode] = useState<"custom" | "preset">(
    isDefaultTheme ? "preset" : "custom"
  );
  // Spacing: always start with preset tab for all themes
  const [spacingTabMode, setSpacingTabMode] = useState<"custom" | "preset">("preset");
  
  // Store original theme borderRadius values to restore when switching back to custom
  const [originalBorderRadius, setOriginalBorderRadius] = useState<typeof borderRadius>({});
  
  // Track previous preset to detect changes
  const [prevPreset, setPrevPreset] = useState(currentPreset);

  // Find current radius preset index by checking if borderRadius values match a preset
  const findRadiusPresetIndex = () => {
    for (let i = 0; i < RADIUS_PRESETS.length; i++) {
      const preset = RADIUS_PRESETS[i];
      // Check if roundedM matches (as a representative value)
      const roundedMValue = borderRadius.roundedM ?? 
        getCssVariableValue('--crayon-rounded-m');
      if (Math.abs(roundedMValue - preset.values.roundedM) < 0.5) {
        return i;
      }
    }
    return 2; // Default to Medium
  };

  // Find current spacing preset index by checking if spacingM matches a preset
  const findSpacingPresetIndex = () => {
    for (let i = 0; i < SPACING_PRESETS.length; i++) {
      const preset = SPACING_PRESETS[i];
      const spacingMValue = spacing.spacingM ?? 
        getCssVariableValue('--crayon-spacing-m');
      if (Math.abs(spacingMValue - preset.values.spacingM) < 0.5) {
        return i;
      }
    }
    return 2; // Default to "Default"
  };

  const radiusIndex = findRadiusPresetIndex();
  const spacingIndex = findSpacingPresetIndex();

  // Initialize default theme with Medium preset on mount
  useEffect(() => {
    if (isDefaultTheme && Object.keys(borderRadius).length === 0) {
      const mediumPreset = RADIUS_PRESETS[2]; // Medium is at index 2
      onApplyBorderRadiusPreset(mediumPreset.values);
    }
    // Initialize spacing with Medium preset if empty (for all themes)
    if (Object.keys(spacing).length === 0) {
      const mediumSpacingPreset = SPACING_PRESETS[2]; // Default is at index 2
      onApplySpacingPreset(mediumSpacingPreset.values);
    }
  }, []); // Only run on mount

  // When preset changes, update tab mode and store original values
  useEffect(() => {
    if (currentPreset !== prevPreset) {
      setPrevPreset(currentPreset);
      const newIsDefault = currentPreset === "default";
      
      if (newIsDefault) {
        // Switching to default theme: use preset tab
        setRadiusTabMode("preset");
        // Apply Medium preset if borderRadius is empty
        if (Object.keys(borderRadius).length === 0) {
          const mediumPreset = RADIUS_PRESETS[2];
          onApplyBorderRadiusPreset(mediumPreset.values);
        }
      } else {
        // Switching to a preset theme: use custom tab and store values
        setRadiusTabMode("custom");
        setOriginalBorderRadius({ ...borderRadius });
      }
    }
  }, [currentPreset, prevPreset, borderRadius, onApplyBorderRadiusPreset]);

  // Handle tab mode change for radius
  const handleRadiusTabChange = (newMode: "custom" | "preset") => {
    if (newMode === "custom" && radiusTabMode === "preset") {
      // Switching from preset to custom
      if (isDefaultTheme) {
        // For default theme: copy current preset values
        const currentPresetValues = RADIUS_PRESETS[radiusIndex].values;
        onApplyBorderRadiusPreset(currentPresetValues);
      } else {
        // For other themes: restore original values
        if (Object.keys(originalBorderRadius).length > 0) {
          onApplyBorderRadiusPreset(originalBorderRadius as Record<string, number>);
        }
      }
    } else if (newMode === "preset" && radiusTabMode === "custom") {
      // Switching from custom to preset
      if (!isDefaultTheme) {
        // For non-default themes: apply Medium preset
        const mediumPreset = RADIUS_PRESETS[2];
        onApplyBorderRadiusPreset(mediumPreset.values);
      }
    }
    setRadiusTabMode(newMode);
  };

  // Handle tab mode change for spacing (simpler: all themes use preset by default)
  const handleSpacingTabChange = (newMode: "custom" | "preset") => {
    if (newMode === "custom" && spacingTabMode === "preset") {
      // Switching from preset to custom: copy current preset values
      const currentPresetValues = SPACING_PRESETS[spacingIndex].values;
      onApplySpacingPreset(currentPresetValues);
    }
    setSpacingTabMode(newMode);
  };

  return (
    <>
      <Section title="Border Radius" defaultOpen={true}>
        {/* Custom/Preset Toggle */}
        <Tabs value={radiusTabMode} onValueChange={(value) => handleRadiusTabChange(value as "custom" | "preset")} variant="card">
          <TabsList>
            <TabsTrigger value="custom" text="Custom" />
            <TabsTrigger value="preset" text="Preset" />
          </TabsList>
        </Tabs>

        <div style={{ marginTop: 'var(--crayon-spacing-m)' }}>
          {radiusTabMode === "custom" && (
            <>
              {/* Individual values in two columns */}
              <div className="spacing-grid">
                {RADIUS_KEYS.map((item) => {
                  const customValue = borderRadius[item.key as keyof typeof borderRadius] as number | undefined;
                  
                  return (
                    <IndividualValueControl
                      key={item.key}
                      label={item.label}
                      varKey={item.key}
                      customValue={customValue}
                      onChange={(value) => onIndividualBorderRadiusChange(item.key, value)}
                    />
                  );
                })}
              </div>
            </>
          )}

          {radiusTabMode === "preset" && (
            <>
              {/* Preset selector with discrete slider */}
              <div className="slider-row" style={{ marginBottom: 'var(--crayon-spacing-m)' }}>
                <div className="slider-row__controls" style={{ width: '100%' }}>
                  <Slider
                    variant="discrete"
                    min={0}
                    max={RADIUS_PRESETS.length - 1}
                    step={1}
                    value={[radiusIndex]}
                    onValueChange={(values) => {
                      const preset = RADIUS_PRESETS[values[0]];
                      // Apply all values from the preset at once
                      onApplyBorderRadiusPreset(preset.values);
                    }}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
              <div className="section-description" style={{ textAlign: 'center' }}>
                {RADIUS_PRESETS[radiusIndex]?.name || 'Medium'}
              </div>
            </>
          )}
        </div>
      </Section>

      <Section title="Spacing" defaultOpen={false}>
        {/* Custom/Preset Toggle */}
        <Tabs value={spacingTabMode} onValueChange={(value) => handleSpacingTabChange(value as "custom" | "preset")} variant="card">
          <TabsList>
            <TabsTrigger value="custom" text="Custom" />
            <TabsTrigger value="preset" text="Preset" />
          </TabsList>
        </Tabs>

        <div style={{ marginTop: 'var(--crayon-spacing-m)' }}>
          {spacingTabMode === "custom" && (
            <>
              {/* Individual values in two columns */}
              <div className="spacing-grid">
                {SPACING_KEYS.map((item) => {
                  const customValue = spacing[item.key as keyof typeof spacing] as number | undefined;
                  
                  return (
                    <IndividualValueControl
                      key={item.key}
                      label={item.label}
                      varKey={item.key}
                      customValue={customValue}
                      onChange={(value) => onIndividualSpacingChange(item.key, value)}
                    />
                  );
                })}
              </div>
            </>
          )}

          {spacingTabMode === "preset" && (
            <>
              {/* Preset selector with discrete slider */}
              <div className="slider-row" style={{ marginBottom: 'var(--crayon-spacing-m)' }}>
                <div className="slider-row__controls" style={{ width: '100%' }}>
                  <Slider
                    variant="discrete"
                    min={0}
                    max={SPACING_PRESETS.length - 1}
                    step={1}
                    value={[spacingIndex]}
                    onValueChange={(values) => {
                      const preset = SPACING_PRESETS[values[0]];
                      // Apply all values from the preset at once
                      onApplySpacingPreset(preset.values);
                    }}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
              <div className="section-description" style={{ textAlign: 'center' }}>
                {SPACING_PRESETS[spacingIndex]?.name || 'Default'}
              </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
