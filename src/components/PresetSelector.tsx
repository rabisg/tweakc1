import { useEffect } from "react";
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
import { loadTheme, saveThemePreference, type ThemeName } from "../themes/themeManager";

interface PresetSelectorProps {
  onPresetSelect: (presetName: string) => void;
  onReset: () => void;
  customization: ThemeCustomization;
  currentPreset: string;
  onPresetChange: (preset: string) => void;
}

export function PresetSelector({
  onPresetSelect,
  onReset,
  customization,
  currentPreset,
  onPresetChange,
}: PresetSelectorProps) {
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
      !customization.borderRadius.base;

    if (isEmpty) {
      onPresetChange("default");
    }
  }, [customization, onPresetChange]);

  const handleChange = async (value: string) => {
    onPresetChange(value);
    
    // Load theme CSS
    try {
      await loadTheme(value as ThemeName);
      saveThemePreference(value as ThemeName);
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
    
    if (value === "default") {
      onReset();
    } else {
      onPresetSelect(value);
    }
  };

  return (
    <div className="preset-selector">
      <Select value={currentPreset} onValueChange={handleChange}>
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
