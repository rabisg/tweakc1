import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";
import { ThemeCustomization, ThemeMode } from "../types/theme";

interface ChatControlsProps {
  chatColors: ThemeCustomization["chatColors"];
  onChatColorChange: (
    key: keyof ThemeCustomization["chatColors"],
    value?: string
  ) => void;
  mode: ThemeMode;
}

export function ChatControls({
  chatColors,
  onChatColorChange,
  mode,
}: ChatControlsProps) {
  return (
    <Section title="User message" defaultOpen={false}>
      <ColorPicker
        label="User Background"
        value={chatColors.userBg}
        onChange={(color) => onChatColorChange("userBg", color)}
        cssVariable="--crayon-chat-user-response-bg"
        mode={mode}
      />
      <ColorPicker
        label="User Text"
        value={chatColors.userText}
        onChange={(color) => onChatColorChange("userText", color)}
        cssVariable="--crayon-chat-user-response-text"
        mode={mode}
      />
    </Section>
  );
}
