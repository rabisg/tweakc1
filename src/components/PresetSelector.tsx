import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@crayonai/react-ui";
import { getPresetNames, getPreset } from "../utils/themePresets";
import { ThemeCustomization } from "../types/theme";

interface PresetSelectorProps {
  onPresetSelect: (presetName: string) => void;
  onReset: () => void;
  customization: ThemeCustomization;
}

export function PresetSelector({
  onPresetSelect,
  onReset,
  customization,
}: PresetSelectorProps) {
  const [selectedPreset, setSelectedPreset] = useState("default");
  const presetNames = getPresetNames();

  // Reset to "default" when all customization is cleared
  useEffect(() => {
    const isEmpty =
      Object.keys(customization.colors).length === 0 &&
      Object.keys(customization.chartColors).length === 0 &&
      Object.keys(customization.strokeColors).length === 0 &&
      Object.keys(customization.chatColors).length === 0 &&
      Object.keys(customization.fonts).length === 0 &&
      !customization.shadow &&
      !customization.spacing.base &&
      !customization.borderRadius.base &&
      !customization.letterSpacing.base;

    if (isEmpty) {
      setSelectedPreset("default");
    }
  }, [customization]);

  const handleChange = (value: string) => {
    setSelectedPreset(value);
    if (value === "default") {
      onReset();
    } else {
      onPresetSelect(value);
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        borderBottom: "1px solid var(--crayon-stroke-emphasis)",
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "8px",
          color: "var(--crayon-primary-text)",
        }}
      >
        Theme Preset
      </label>
      <Select value={selectedPreset} onValueChange={handleChange}>
        <SelectTrigger size="md" style={{ width: "100%" }}>
          <SelectValue placeholder="Select a preset..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="default">Default</SelectItem>
            {presetNames.map((name) => {
              const preset = getPreset(name);
              return (
                <SelectItem key={name} value={name}>
                  {preset?.name || name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
