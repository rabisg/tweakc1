import { useState, useEffect } from "react";
import { Button, IconButton, SwitchItem, Tabs, TabsList, TabsTrigger } from "@crayonai/react-ui";
import { Undo2, Redo2, RotateCcw, Upload, Code2 } from "lucide-react";
import { toast } from "sonner";
import { ExportModal } from "./ExportModal";
import "./Header.css";

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
  selectorMode: boolean;
  onToggleSelectorMode: () => void;
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
  selectorMode,
  onToggleSelectorMode,
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
      <header className="header">
        {/* Left side - Logo */}
        <div className="header__left">
          <span className="header__logo">TweakC1</span>
        </div>

        {/* Right side - Controls */}
        <div className="header__right">
          {/* Selector Toggle */}
          <div className="header__selector-toggle">
            <span className="header__selector-label">Selector</span>
            <SwitchItem className="header__selector-switch"
              checked={selectorMode}
              onChange={onToggleSelectorMode}
            />
          </div>

          {/* Light/Dark Toggle - Tabs with card variant */}
          <Tabs value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")} variant="card">
            <TabsList>
              <TabsTrigger value="light" text="Light" />
              <TabsTrigger value="dark" text="Dark" />
            </TabsList>
          </Tabs>

          {/* Undo/Redo/Reset */}
          <div className="header__actions">
            <IconButton
              icon={<RotateCcw size={16} />}
              variant="secondary"
              onClick={onReset}
              title="Reset"
            />
            <IconButton
              icon={<Undo2 size={16} />}
              variant="secondary"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
            />
            <IconButton
              icon={<Redo2 size={16} />}
              variant="secondary"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
            />
          </div>

          {/* Action Buttons */}
          <div className="header__buttons">
            <Button
              variant="secondary"
              onClick={() =>
                window.open("https://discord.com/invite/Pbv5PsqUSv", "_blank")
              }
            >
              Join discord
            </Button>
            <Button
              variant="secondary"
              iconRight={<Upload size={14} />}
              onClick={handleShare}
            >
              Share
            </Button>
            <Button
              variant="primary"
              iconLeft={<Code2 size={14} />}
              onClick={handleExport}
            >
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
