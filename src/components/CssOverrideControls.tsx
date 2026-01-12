import { Section } from "./Section";

interface CssOverrideControlsProps {
  customCss?: string;
  onCustomCssChange: (value?: string) => void;
}

const DEFAULT_CSS = `/* Chat container */
.crayon-shell-container {
  /* your styles here */
}

/* User message bubble */
.crayon-shell-thread-message-user {
  /* your styles here */
}

/* Assistant message bubble */
.crayon-shell-thread-message-assistant {
  /* your styles here */
}

/* Input area */
.crayon-shell-thread-composer__input {
  /* your styles here */
}

/* Thread sidebar */
.crayon-shell-sidebar-container {
  /* your styles here */
}`;

export function CssOverrideControls({
  customCss,
  onCustomCssChange,
}: CssOverrideControlsProps) {
  const cssValue = customCss !== undefined ? customCss : DEFAULT_CSS;

  return (
    <Section title="Custom CSS">
      <div style={{ marginTop: "8px" }}>
        <textarea
          value={cssValue}
          onChange={(e) => onCustomCssChange(e.target.value || undefined)}
          style={{
            width: "100%",
            minHeight: "400px",
            padding: "12px",
            fontFamily: "monospace",
            fontSize: "13px",
            lineHeight: "1.5",
            backgroundColor: "var(--crayon-background-fills)",
            color: "var(--crayon-primary-text)",
            border: "1px solid var(--crayon-stroke-emphasis)",
            borderRadius: "4px",
            resize: "vertical",
          }}
        />
        <p
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "var(--crayon-secondary-text)",
          }}
        >
          Write custom CSS to override theme styles. Changes apply immediately.
        </p>
      </div>
    </Section>
  );
}
