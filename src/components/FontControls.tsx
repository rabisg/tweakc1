import { useState, useMemo, useEffect } from "react";
import {
  Slider,
  Button,
  Input,
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
import {
  getPopularFonts,
  loadFont,
  getFontWeights,
  getCommonWeights,
} from "../utils/fontLoader";

interface FontControlsProps {
  fonts: ThemeCustomization["fonts"];
  fontWeight: ThemeCustomization["fontWeight"];
  letterSpacing: ThemeCustomization["letterSpacing"];
  fontSize: ThemeCustomization["fontSize"];
  onFontChange: (
    category: keyof ThemeCustomization["fonts"],
    value?: string
  ) => void;
  onFontWeightChange: (
    category: keyof ThemeCustomization["fontWeight"],
    value?: number
  ) => void;
  onLetterSpacingChange: (
    category: keyof ThemeCustomization["letterSpacing"],
    value?: number
  ) => void;
  onFontSizeChange: (value?: number) => void;
}

// Weight label mapping
const WEIGHT_LABELS: Record<number, string> = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
};

function FontSelector({
  label,
  value,
  category,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string;
  category?: "sans-serif" | "serif" | "monospace" | "system" | "all";
  onChange: (value?: string) => void;
  placeholder: string;
}) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  // Get all fonts for "allow all fonts" option
  const allFonts = getPopularFonts(
    category === "all" || category === undefined || category === "system" 
      ? undefined 
      : category
  );

  const handleSelectChange = async (selected: string) => {
    if (selected === "custom") {
      setIsCustom(true);
    } else if (selected === "") {
      onChange(undefined);
      setIsCustom(false);
    } else {
      if (!getPopularFonts("system").includes(selected)) {
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
    <div className="font-picker">
      <label className="font-picker__label">{label}</label>
      <div className="font-picker__controls">
      {!isCustom ? (
        <Select value={value || ""} onValueChange={handleSelectChange}>
            <SelectTrigger size="md" className="font-picker__select">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Popular Fonts</SelectLabel>
                {allFonts.map((font) => (
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
          <div className="font-picker__custom-input">
            <Input
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Enter Google Font name"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCustomSubmit();
              }
            }}
              style={{ flex: 1 }}
          />
            <Button variant="secondary" onClick={handleCustomSubmit}>
            Load
            </Button>
            <Button
              variant="tertiary"
            onClick={() => {
              setIsCustom(false);
              setCustomValue("");
            }}
          >
            Cancel
            </Button>
        </div>
      )}
      </div>
    </div>
  );
}

function FontWeightSelector({
  label,
  description,
  value,
  defaultValue,
  availableWeights,
  onChange,
}: {
  label: string;
  description: string;
  value?: number;
  defaultValue: number;
  availableWeights: number[];
  onChange: (value?: number) => void;
}) {
  const handleChange = (selected: string) => {
    if (selected === "") {
      onChange(undefined);
    } else {
      onChange(parseInt(selected, 10));
    }
  };

  // Find the closest available weight to the default
  const effectiveDefault = availableWeights.includes(defaultValue)
    ? defaultValue
    : availableWeights.reduce((prev, curr) =>
        Math.abs(curr - defaultValue) < Math.abs(prev - defaultValue)
          ? curr
          : prev
      );

  const currentValue = value ?? effectiveDefault;

  return (
    <div className="font-picker">
      <div className="font-picker__label-group">
        <label className="font-picker__label">{label}</label>
        <span className="font-picker__description">{description}</span>
      </div>
      <div className="font-picker__controls">
        <Select
          value={currentValue.toString()}
          onValueChange={handleChange}
        >
          <SelectTrigger size="md" className="font-picker__select">
            <SelectValue placeholder="Select weight..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableWeights.map((weight) => (
                <SelectItem key={weight} value={weight.toString()}>
                  {weight} - {WEIGHT_LABELS[weight] || "Custom"}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function LetterSpacingControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (value?: number) => void;
}) {
  const displayValue = value ?? 0;
  const [localValue, setLocalValue] = useState(displayValue.toFixed(2));

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(displayValue.toFixed(2));
  }, [displayValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    const numValue = parseFloat(localValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else {
      // Reset to current value if invalid
      setLocalValue(displayValue.toFixed(2));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="letter-spacing-row">
      <label className="letter-spacing-row__label">{label}</label>
      <div className="letter-spacing-row__input-group">
        <input
          type="number"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          step="0.1"
          min="-2"
          max="4"
          className="letter-spacing-row__input"
        />
        <span className="letter-spacing-row__unit">px</span>
      </div>
    </div>
  );
}

export function FontControls({
  fonts,
  fontWeight,
  letterSpacing,
  fontSize,
  onFontChange,
  onFontWeightChange,
  onLetterSpacingChange,
  onFontSizeChange,
}: FontControlsProps) {
  // Get the effective fonts (with defaults)
  const bodyFont = fonts.body || "Inter";
  const headingFont = fonts.heading || "Inter";
  const monoFont = fonts.mono || "Inter";

  // Calculate available weights for each category
  const regularWeights = useMemo(() => {
    // Regular weight affects body and mono fonts
    return getCommonWeights([bodyFont, monoFont]);
  }, [bodyFont, monoFont]);

  const mediumWeights = useMemo(() => {
    // Medium weight affects body and mono fonts (Heavy variants)
    return getCommonWeights([bodyFont, monoFont]);
  }, [bodyFont, monoFont]);

  const boldWeights = useMemo(() => {
    // Bold weight affects heading font
    return getFontWeights(headingFont);
  }, [headingFont]);

  // Font size state (default 16px)
  const currentFontSize = fontSize?.base ?? 16;

  return (
    <>
      <Section title="Font Family" defaultOpen={true}>
        <FontSelector
          label="Body Font"
          value={fonts.body}
          category="sans-serif"
          onChange={(value) => onFontChange("body", value)}
          placeholder="Inter"
        />
        <FontSelector
          label="Heading Font"
          value={fonts.heading}
          category="sans-serif"
          onChange={(value) => onFontChange("heading", value)}
          placeholder="Inter"
        />
        <FontSelector
          label="Numbers"
          value={fonts.mono}
          category="all"
          onChange={(value) => onFontChange("mono", value)}
          placeholder="Inter"
        />
      </Section>

      <Section title="Font Size" defaultOpen={false}>
        <p className="section__description">
          Base body font size. All other sizes adjust proportionally.
        </p>
        <div className="font-size-slider">
          <div className="font-size-slider__header">
            <span className="font-size-slider__label">Base Size</span>
            <span className="font-size-slider__value">{currentFontSize}px</span>
          </div>
            <Slider
            variant="continuous"
            value={[currentFontSize]}
            onValueChange={(values) => onFontSizeChange(values[0])}
            min={12}
            max={20}
            step={1}
          />
          <div className="font-size-slider__range">
            <span>12px</span>
            <span>20px</span>
          </div>
        </div>
      </Section>

      <Section title="Font Weight" defaultOpen={false}>
        <p className="section__description">
          Select font weights based on what's available for your chosen fonts.
        </p>
        <FontWeightSelector
          label="Regular"
          description="Body text, labels"
          value={fontWeight.regular}
          defaultValue={400}
          availableWeights={regularWeights}
          onChange={(value) => onFontWeightChange("regular", value)}
        />
        <FontWeightSelector
          label="Medium"
          description="Emphasized text"
          value={fontWeight.medium}
          defaultValue={500}
          availableWeights={mediumWeights}
          onChange={(value) => onFontWeightChange("medium", value)}
        />
        <FontWeightSelector
          label="Bold"
          description="Headings"
          value={fontWeight.bold}
          defaultValue={600}
          availableWeights={boldWeights}
          onChange={(value) => onFontWeightChange("bold", value)}
        />
      </Section>

      <Section title="Letter Spacing" defaultOpen={false}>
        <LetterSpacingControl
          label="Body"
          value={letterSpacing.body}
          onChange={(value) => onLetterSpacingChange("body", value)}
        />
        <LetterSpacingControl
          label="Heading"
          value={letterSpacing.heading}
          onChange={(value) => onLetterSpacingChange("heading", value)}
        />
        <LetterSpacingControl
          label="Numbers"
          value={letterSpacing.numbers}
          onChange={(value) => onLetterSpacingChange("numbers", value)}
        />
      </Section>
    </>
  );
}
