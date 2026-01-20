import { Dialog } from "./Dialog";
import { toast } from "sonner";
import { Button } from "@crayonai/react-ui";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeCode: string;
}

export function ExportModal({ isOpen, onClose, themeCode }: ExportModalProps) {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(themeCode);
      toast.success("Theme code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Export Theme"
      maxWidth="lg"
    >
      <div style={{ marginBottom: "16px" }}>
        <CodeMirror
          value={themeCode}
          height="60vh"
          theme={tokyoNight}
          extensions={[javascript({ typescript: true })]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: false,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
            bracketMatching: true,
            closeBrackets: false,
            autocompletion: false,
            rectangularSelection: false,
            crosshairCursor: false,
            highlightActiveLine: false,
            highlightSelectionMatches: false,
            closeBracketsKeymap: false,
            searchKeymap: true,
            foldKeymap: true,
            completionKeymap: false,
            lintKeymap: false,
          }}
          style={{
            fontFamily: "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            fontSize: "13px",
            borderRadius: "var(--crayon-rounded-l)",
            overflow: "hidden",
            border: "1px solid #292e42",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCopyToClipboard}>
          Copy to Clipboard
        </Button>
      </div>
    </Dialog>
  );
}
