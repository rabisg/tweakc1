import { useState, useEffect } from "react";
import { ColorPickerProps } from "../types/theme";

// Helper to convert rgba to hex
function rgbaToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return "#000000";

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Helper to convert hex to rgba
function hexToRgba(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "rgba(0, 0, 0, 1)";

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

// Validate if a color string is valid according to browser
function isValidColor(color: string): boolean {
  if (!color) return false;

  // Create a temporary element to test color validity
  const tempElement = document.createElement("div");
  tempElement.style.color = "";
  tempElement.style.color = color;

  // If the browser accepted the color, style.color will be non-empty
  return tempElement.style.color !== "";
}

export function ColorPicker({
  value,
  onChange,
  label,
  disabled,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isValid, setIsValid] = useState(true);

  const hexValue = value ? rgbaToHex(value) : "#000000";

  // Sync input value when external value changes
  useEffect(() => {
    if (value !== inputValue && isValid) {
      setInputValue(value || "");
    }
  }, [value, isValid]);

  const handleTextChange = (newValue: string) => {
    setInputValue(newValue);

    // Empty string means reset/clear the color
    if (newValue.trim() === "") {
      setIsValid(true);
      onChange(undefined as any); // Reset to undefined
    } else if (isValidColor(newValue)) {
      setIsValid(true);
      onChange(newValue);
    } else {
      setIsValid(false);
    }
  };

  const handleBlur = () => {
    // Reset to last valid value on blur if invalid
    if (!isValid) {
      setInputValue(value || "");
      setIsValid(true);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "var(--crayon-primary-text)",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "6px",
            background: value || "#ffffff",
            border: "1px solid var(--crayon-stroke-emphasis)",
            flexShrink: 0,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <input
            type="color"
            value={hexValue}
            onChange={(e) => {
              const rgbaColor = hexToRgba(e.target.value);
              onChange(rgbaColor);
              setInputValue(rgbaColor);
              setIsValid(true);
            }}
            disabled={disabled}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleTextChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="e.g., oklch(0.922 0 0)"
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "14px",
            border: `1px solid ${
              isValid ? "var(--crayon-stroke-emphasis)" : "#ef4444"
            }`,
            borderRadius: "6px",
            background: "var(--crayon-background-fills)",
            color: isValid ? "var(--crayon-primary-text)" : "#ef4444",
            outline: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
        />
      </div>
      {!isValid && (
        <div
          style={{
            marginTop: "4px",
            fontSize: "12px",
            color: "#ef4444",
          }}
        >
          Invalid color format
        </div>
      )}
    </div>
  );
}
