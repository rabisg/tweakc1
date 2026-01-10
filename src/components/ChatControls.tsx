import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";
import { ThemeCustomization } from "../types/theme";

interface ChatControlsProps {
  chatColors: ThemeCustomization["chatColors"];
  onChatColorChange: (
    key: keyof ThemeCustomization["chatColors"],
    value?: string
  ) => void;
}

export function ChatControls({
  chatColors,
  onChatColorChange,
}: ChatControlsProps) {
  return (
    <div style={{ padding: "16px" }}>
      <Section title="Chat UI Colors" defaultOpen={true}>
        <ColorPicker
          label="Container Background"
          value={chatColors.containerBg}
          onChange={(color) => onChatColorChange("containerBg", color)}
        />
        <ColorPicker
          label="Assistant Background"
          value={chatColors.assistantBg}
          onChange={(color) => onChatColorChange("assistantBg", color)}
        />
        <ColorPicker
          label="Assistant Text"
          value={chatColors.assistantText}
          onChange={(color) => onChatColorChange("assistantText", color)}
        />
        <ColorPicker
          label="User Background"
          value={chatColors.userBg}
          onChange={(color) => onChatColorChange("userBg", color)}
        />
        <ColorPicker
          label="User Text"
          value={chatColors.userText}
          onChange={(color) => onChatColorChange("userText", color)}
        />
      </Section>
    </div>
  );
}
