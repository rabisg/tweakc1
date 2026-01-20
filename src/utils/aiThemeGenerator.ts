import OpenAI from "openai";
import {
  ThemeCustomization,
  ThemeCustomizationSchema,
  ThemeMode,
} from "../types/theme";

const THEME_SCHEMA = ThemeCustomizationSchema.toJSONSchema();

const SYSTEM_PROMPT = `You are a professional UI/UX theme designer. Generate theme customizations based on user descriptions.

IMPORTANT: Only generate the fields that need to change based on the user's request. If the user asks for a specific change (like "make it sharp", "use blue", "darker background"), only modify those relevant fields. For completely new themes, generate all fields.

You are generating for a specific mode (light or dark). Consider the mode when generating colors and contrast.

Theme System Overview:
- Colors: Use hex format (#RRGGBB) or oklch format. Consider the mode (light/dark) for appropriate contrast and brightness.
- Fonts: Use Google Fonts names (e.g., "Inter", "Roboto Mono", "Playfair Display")
- Spacing: Multiplier from 0.5 (compact) to 2 (spacious), default 1
- Border Radius (borderRadius.base): Number in rem from 0 (sharp/square corners) to 8 (very rounded), default 2. Common values: 0 (sharp), 1 (subtle), 2 (modern), 4 (rounded), 6-8 (very rounded)
- Stroke Colors: Individual stroke colors (default, interactiveEl, interactiveElHover, emphasis, accent). Use rgba format with opacity included (e.g., "rgba(0,0,0,0.2)")
- Letter Spacing: Number in em units. Negative for tighter, positive for looser. Range: -0.05 to 0.2
- Shadows: Configure color, opacity, blur, spread, and offset
- Color Engine: Always use "default"

Terminology Guide:
- "remove borders" / "no borders" → set strokeColors.default to "transparent"
- "sharp corners" / "no rounded corners" / "square" → set borderRadius.base to 0
- "more rounded" / "rounder corners" → increase borderRadius.base
- "subtle borders" → set strokeColors.default to a low-opacity color like "rgba(0,0,0,0.1)"

Examples:
- "make it sharp" → only update borderRadius.base to 0
- "remove all borders" → only update strokeColors.default to "transparent"
- "no rounded corners" → only update borderRadius.base to 0
- "use a blue primary color" → only update colors.primary
- "darker background" → only update colors.background
- "more spacing" → only update spacing.base
- "retro terminal theme" → generate all fields for complete theme

Best Practices:
1. Ensure sufficient contrast for accessibility (WCAG AA minimum)
2. Use harmonious color palettes (complementary, analogous, or monochromatic)
3. Match fonts to the theme personality (serif for classic, sans for modern, mono for tech)
4. Consider the use case (dark themes for coding, light for documentation, etc.)
5. Chart colors should be distinct and visually balanced
6. Stroke/border colors should be subtle but visible
7. Chat colors should clearly differentiate user and assistant messages
8. Border radius should be appropriate to the theme style (sharp for technical/modern, rounded for friendly/approachable)`;

// Deep merge helper to combine current theme with AI updates
function deepMerge(
  current: ThemeCustomization,
  updates: Partial<ThemeCustomization>
): ThemeCustomization {
  return {
    colors: { ...current.colors, ...updates.colors },
    chartColors: { ...current.chartColors, ...updates.chartColors },
    strokeColors: { ...current.strokeColors, ...updates.strokeColors },
    chatColors: { ...current.chatColors, ...updates.chatColors },
    shadow: updates.shadow !== undefined ? updates.shadow : current.shadow,
    colorEngine: updates.colorEngine ?? current.colorEngine,
    fonts: { ...current.fonts, ...updates.fonts },
    fontWeight: { ...current.fontWeight, ...updates.fontWeight },
    letterSpacing: { ...current.letterSpacing, ...updates.letterSpacing },
    fontSize: { ...current.fontSize, ...updates.fontSize },
    spacing: { ...current.spacing, ...updates.spacing },
    borderRadius: { ...current.borderRadius, ...updates.borderRadius },
  };
}

export async function generateThemeWithAI(
  apiKey: string,
  description: string,
  currentTheme: ThemeCustomization,
  mode: ThemeMode
): Promise<ThemeCustomization> {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const userPrompt = `Generate theme updates for ${mode} mode based on this description: "${description}"

Current ${mode} mode theme:
${JSON.stringify(currentTheme, null, 2)}

Instructions:
- You are generating for ${mode} mode specifically
- If this is an incremental change (like "make it sharp", "darker", "use blue"), only provide the specific fields that need to change
- If this is a complete theme request (like "retro terminal theme"), provide all fields
- Only include fields that should be updated or are necessary for a complete theme
- Ensure colors are appropriate for ${mode} mode (proper contrast and brightness)`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "theme_customization",
          schema: THEME_SCHEMA,
        },
      },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const aiUpdates = JSON.parse(content) as Partial<ThemeCustomization>;

    // Deep merge AI updates with current theme for iterative changes
    const mergedTheme = deepMerge(currentTheme, aiUpdates);

    return mergedTheme;
  } catch (error: any) {
    if (error?.status === 401) {
      throw new Error("Invalid API key. Please check your OpenAI API key.");
    } else if (error?.status === 429) {
      throw new Error(
        "Rate limit exceeded. Please wait a moment and try again."
      );
    } else if (error?.status === 500 || error?.status === 503) {
      throw new Error(
        "OpenAI service is temporarily unavailable. Please try again later."
      );
    } else if (error?.message?.includes("model")) {
      throw new Error(
        "Model not available. Please check if you have access to gpt-5.2."
      );
    } else {
      throw new Error(
        error?.message || "Failed to generate theme. Please try again."
      );
    }
  }
}
