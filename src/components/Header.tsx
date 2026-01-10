import { useState, useEffect } from "react";
import { Button, Buttons, IconButton, SwitchItem } from "@crayonai/react-ui";
import {
  Sparkles,
  Undo2,
  Redo2,
  RotateCcw,
  MessageCircle,
  Share2,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { ExportModal } from "./ExportModal";

interface HeaderProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onExport: () => string;
  onReset: () => void;
  onShare: () => Promise<string>;
}

export function Header({
  theme,
  setTheme,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onExport,
  onReset,
  onShare,
}: HeaderProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [themeCode, setThemeCode] = useState("");

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) onUndo();
      } else if (modKey && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        if (canRedo) onRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canUndo, canRedo, onUndo, onRedo]);

  const handleExport = () => {
    setThemeCode(onExport());
    setShowExportModal(true);
  };

  const handleShare = async () => {
    try {
      const url = await onShare();
      await navigator.clipboard.writeText(url);
      toast.success("Share URL copied to clipboard");
    } catch (error) {
      toast.error("Failed to generate share URL");
    }
  };

  return (
    <>
      <header
        className="flex items-center justify-between p-2"
        style={{
          backgroundColor: "var(--bg-tertiary)",
          borderColor: "var(--border-primary)",
        }}
      >
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="flex items-center justify-center">
              <Sparkles size={16} />
            </span>
            tweakc1
          </div>
        </div>
        <div className="flex items-center">
          <SwitchItem
            checked={theme === "dark"}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
          <div className="flex items-center gap-1">
            <IconButton
              icon={<Undo2 size={16} />}
              variant="tertiary"
              onClick={onUndo}
              disabled={!canUndo}
            />
            <IconButton
              icon={<Redo2 size={16} />}
              variant="tertiary"
              onClick={onRedo}
              disabled={!canRedo}
            />
            <IconButton
              icon={<RotateCcw size={16} />}
              variant="tertiary"
              onClick={onReset}
            />
            <Button
              variant="tertiary"
              iconLeft={<MessageCircle size={16} />}
              onClick={() =>
                window.open("https://discord.com/invite/Pbv5PsqUSv", "_blank")
              }
            >
              Discord
            </Button>
            <Button variant="tertiary" iconLeft={<Share2 size={16} />} onClick={handleShare}>
              Share
            </Button>
            <Button variant="primary" iconLeft={<Code2 size={16} />} onClick={handleExport}>
              Export
            </Button>
          </div>
        </div>
      </header>
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        themeCode={themeCode}
      />
    </>
  );
}
