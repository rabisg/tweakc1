import { useState } from "react";
import {
  Slider,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@crayonai/react-ui";
import { Section } from "./Section";
import { ThemeCustomization } from "../types/theme";
import { getPopularFonts, loadFont } from "../utils/fontLoader";

interface FontControlsProps {
  fonts: ThemeCustomization["fonts"];
  letterSpacing: ThemeCustomization["letterSpacing"];
  onFontChange: (
    category: keyof ThemeCustomization["fonts"],
    value?: string
  ) => void;
  onLetterSpacingChange: (value?: number) => void;
}

function FontSelector({
  label,
  value,
  category,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string;
  category: "sans-serif" | "serif" | "monospace";
  onChange: (value?: string) => void;
  placeholder: string;
}) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const fonts = getPopularFonts(category);
  const systemFonts = getPopularFonts("system");

  const handleSelectChange = async (selected: string) => {
    if (selected === "custom") {
      setIsCustom(true);
    } else if (selected === "") {
      onChange(undefined);
      setIsCustom(false);
    } else {
      if (!systemFonts.includes(selected)) {
        try {
          await loadFont(selected);
        } catch (err) {
          console.error("Failed to load font:", err);
        }
      }
      onChange(selected);
      setIsCustom(false);
    }
  };

  const handleCustomSubmit = async () => {
    if (customValue.trim()) {
      try {
        await loadFont(customValue.trim());
        onChange(customValue.trim());
        setIsCustom(false);
        setCustomValue("");
      } catch (err) {
        console.error("Failed to load custom font:", err);
        alert("Failed to load font. Please check the font name.");
      }
    }
  };

  return (
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
        {label}
      </label>

      {!isCustom ? (
        <Select value={value || ""} onValueChange={handleSelectChange}>
          <SelectTrigger size="md" style={{ width: "100%" }}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Popular Fonts</SelectLabel>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
              <SelectSeparator />
              <SelectLabel>System Fonts</SelectLabel>
              {systemFonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
              <SelectSeparator />
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Enter Google Font name"
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "14px",
              border: "1px solid var(--crayon-stroke-emphasis)",
              borderRadius: "6px",
              background: "var(--crayon-background-fills)",
              color: "var(--crayon-primary-text)",
              outline: "none",
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCustomSubmit();
              }
            }}
          />
          <button
            onClick={handleCustomSubmit}
            style={{
              padding: "12px 16px",
              fontSize: "14px",
              border: "1px solid var(--crayon-stroke-emphasis)",
              borderRadius: "6px",
              background: "var(--bg-secondary)",
              color: "var(--crayon-primary-text)",
              cursor: "pointer",
            }}
          >
            Load
          </button>
          <button
            onClick={() => {
              setIsCustom(false);
              setCustomValue("");
            }}
            style={{
              padding: "12px 16px",
              fontSize: "14px",
              border: "1px solid var(--crayon-stroke-emphasis)",
              borderRadius: "6px",
              background: "var(--bg-secondary)",
              color: "var(--crayon-primary-text)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export function FontControls({
  fonts,
  letterSpacing,
  onFontChange,
  onLetterSpacingChange,
}: FontControlsProps) {
  const letterSpacingValue = letterSpacing.base ?? 0;

  return (
    <div style={{ padding: "16px" }}>
      <Section title="Font Family" defaultOpen={true}>
        <FontSelector
          label="Body Font"
          value={fonts.body}
          category="sans-serif"
          onChange={(value) => onFontChange("body", value)}
          placeholder="Choose a font..."
        />
        <FontSelector
          label="Heading Font"
          value={fonts.heading}
          category="sans-serif"
          onChange={(value) => onFontChange("heading", value)}
          placeholder="Choose a font..."
        />
        <FontSelector
          label="Monospace Font"
          value={fonts.mono}
          category="monospace"
          onChange={(value) => onFontChange("mono", value)}
          placeholder="Choose a monospace font..."
        />
      </Section>

      <Section title="Letter Spacing" defaultOpen={false}>
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
            Base Letter Spacing
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Slider
              variant="continuous"
              min={-0.05}
              max={0.1}
              step={0.01}
              value={[letterSpacingValue]}
              onValueChange={(values) => onLetterSpacingChange(values[0])}
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
                    value={letterSpacingValue.toFixed(2)}
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
                    em
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
