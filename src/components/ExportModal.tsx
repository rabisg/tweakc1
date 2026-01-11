import { Dialog } from "./Dialog";
import { toast } from "sonner";

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
      <pre
        style={{
          background: "var(--bg-secondary, #f3f4f6)",
          padding: "16px",
          borderRadius: "8px",
          overflow: "auto",
          fontSize: "13px",
          lineHeight: "1.5",
          maxHeight: "60vh",
          margin: "0 0 16px 0",
        }}
      >
        {themeCode}
      </pre>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            border: "1px solid var(--crayon-stroke-emphasis)",
            borderRadius: "6px",
            background: "var(--bg-secondary)",
            cursor: "pointer",
          }}
        >
          Close
        </button>
        <button
          onClick={handleCopyToClipboard}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            border: "none",
            borderRadius: "6px",
            background: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Copy to Clipboard
        </button>
      </div>
    </Dialog>
  );
}
