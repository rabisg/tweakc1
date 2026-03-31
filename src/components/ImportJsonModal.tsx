import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "@crayonai/react-ui";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { toast } from "sonner";

interface ImportJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (themeObject: Record<string, any>) => void;
}

export function ImportJsonModal({
  isOpen,
  onClose,
  onImport,
}: ImportJsonModalProps) {
  const [jsonValue, setJsonValue] = useState("");

  const handleImport = () => {
    const trimmed = jsonValue.trim();
    if (!trimmed) {
      toast.error("Please paste your theme JSON");
      return;
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed !== "object" || parsed === null) {
        toast.error("JSON must be an object");
        return;
      }
      if (!parsed.theme && !parsed.darkTheme) {
        toast.error('JSON must have a "theme" or "darkTheme" key');
        return;
      }
      onImport(parsed);
      toast.success("Theme imported successfully!");
      setJsonValue("");
      onClose();
    } catch {
      toast.error("Invalid JSON — please check the syntax");
    }
  };

  const handleClose = () => {
    setJsonValue("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Import Theme JSON" maxWidth="lg">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p
          style={{
            margin: 0,
            font: "var(--crayon-font-body-small)",
            color: "var(--crayon-secondary-text)",
          }}
        >
          Paste your theme JSON below. It should have the format:{" "}
          <code
            style={{
              font: "var(--crayon-font-number-small)",
              backgroundColor: "var(--crayon-sunk-fills)",
              padding: "1px 5px",
              borderRadius: "4px",
            }}
          >
            {'{ "theme": { ... }, "darkTheme": { ... } }'}
          </code>
        </p>

        <div
          style={{
            border: "1px solid var(--crayon-stroke-interactive-el)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <CodeMirror
            value={jsonValue}
            onChange={setJsonValue}
            extensions={[json()]}
            theme={tokyoNight}
            height="320px"
            placeholder='{ "theme": { ... }, "darkTheme": { ... } }'
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              bracketMatching: true,
              closeBrackets: true,
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleImport}>
            Import & Apply
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
