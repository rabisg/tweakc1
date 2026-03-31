import { useState } from "react";
import { Dialog } from "./Dialog";
import { toast } from "sonner";
import { Button, Tabs, TabsList, TabsTrigger } from "@crayonai/react-ui";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { css } from "@codemirror/lang-css";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { Copy, Check } from "lucide-react";
import type { PlaygroundExport } from "../utils/themeGenerator";

type ExportTab = "typescript" | "playground";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeCode: string;
  playgroundExport: PlaygroundExport;
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label ?? "Code"} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleCopy}
      iconLeft={
        copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Copy size={14} />
        )
      }
    >
      {copied ? "Copied!" : `Copy ${label ?? ""}`}
    </Button>
  );
}

export function ExportModal({
  isOpen,
  onClose,
  themeCode,
  playgroundExport,
}: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<ExportTab>("playground");

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(themeCode);
      toast.success("Theme code copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Export Theme" maxWidth="lg">
      <div style={{ marginBottom: "12px" }}>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as ExportTab)}
          variant="card"
        >
          <TabsList>
            <TabsTrigger value="playground" text="Agent Builder" />
            <TabsTrigger value="typescript" text="TypeScript" />
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "typescript" && (
        <>
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
                fontFamily:
                  "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                fontSize: "13px",
                borderRadius: "var(--crayon-rounded-l)",
                overflow: "hidden",
                border: "1px solid #292e42",
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCopyAll}>
              Copy to Clipboard
            </Button>
          </div>
        </>
      )}

      {activeTab === "playground" && (
        <>
          <p
            style={{
              fontSize: "13px",
              color: "var(--crayon-secondary-text, #888)",
              marginBottom: "12px",
            }}
          >
            Copy these values and paste them into Agent Builder's advanced
            theme editor.
          </p>

          {/* Theme JSON */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--crayon-primary-text, #fff)",
                }}
              >
                Theme JSON
              </span>
              <CopyButton text={playgroundExport.themeJson} label="JSON" />
            </div>
            <CodeMirror
              value={playgroundExport.themeJson}
              height="35vh"
              theme={tokyoNight}
              extensions={[json()]}
              editable={false}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: false,
                foldGutter: true,
                highlightActiveLine: false,
                highlightSelectionMatches: false,
              }}
              style={{
                fontFamily:
                  "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                fontSize: "13px",
                borderRadius: "var(--crayon-rounded-l)",
                overflow: "hidden",
                border: "1px solid #292e42",
              }}
            />
          </div>

          {/* Light CSS */}
          {playgroundExport.lightCss && (
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--crayon-primary-text, #fff)",
                  }}
                >
                  Light Custom CSS
                </span>
                <CopyButton text={playgroundExport.lightCss} label="Light CSS" />
              </div>
              <CodeMirror
                value={playgroundExport.lightCss}
                height="15vh"
                theme={tokyoNight}
                extensions={[css()]}
                editable={false}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: false,
                  foldGutter: true,
                  highlightActiveLine: false,
                  highlightSelectionMatches: false,
                }}
                style={{
                  fontFamily:
                    "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  fontSize: "13px",
                  borderRadius: "var(--crayon-rounded-l)",
                  overflow: "hidden",
                  border: "1px solid #292e42",
                }}
              />
            </div>
          )}

          {/* Dark CSS */}
          {playgroundExport.darkCss && (
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--crayon-primary-text, #fff)",
                  }}
                >
                  Dark Custom CSS
                </span>
                <CopyButton text={playgroundExport.darkCss} label="Dark CSS" />
              </div>
              <CodeMirror
                value={playgroundExport.darkCss}
                height="15vh"
                theme={tokyoNight}
                extensions={[css()]}
                editable={false}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: false,
                  foldGutter: true,
                  highlightActiveLine: false,
                  highlightSelectionMatches: false,
                }}
                style={{
                  fontFamily:
                    "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  fontSize: "13px",
                  borderRadius: "var(--crayon-rounded-l)",
                  overflow: "hidden",
                  border: "1px solid #292e42",
                }}
              />
            </div>
          )}

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
