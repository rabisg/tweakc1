import { Section } from "./Section";

interface CssOverrideControlsProps {
  customCss?: string;
  onCustomCssChange: (value?: string) => void;
}

const DEFAULT_CSS = `/* Chat container */
.c1-chat-container {
  /* your styles here */
}

/* User message bubble */
.c1-user-message {
  /* your styles here */
}

/* Assistant message bubble */
.c1-assistant-message {
  /* your styles here */
}

/* Input area */
.c1-chat-input {
  /* your styles here */
}

/* Thread sidebar */
.c1-thread-list {
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
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-primary)",
            borderRadius: "4px",
            resize: "vertical",
          }}
        />
        <p
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "var(--text-secondary)",
          }}
        >
          Write custom CSS to override theme styles. Changes apply immediately.
        </p>
      </div>
    </Section>
  );
}
