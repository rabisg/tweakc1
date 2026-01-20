import { Section } from "./Section";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

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
    <Section title="Custom CSS" fullHeight>
      <div className="css-override-container">
        <CodeMirror
          value={cssValue}
          height="100%"
          theme={tokyoNight}
          extensions={[css()]}
          onChange={(value) => onCustomCssChange(value || undefined)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="css-editor-codemirror"
        />
        <p className="css-editor__hint">
          Write custom CSS to override theme styles. Changes apply immediately.
        </p>
      </div>
    </Section>
  );
}
