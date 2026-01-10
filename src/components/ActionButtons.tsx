import { IconButton } from "@crayonai/react-ui";
import { Undo2, Redo2, RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onReset: () => void;
}

export function ActionButtons({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onReset,
}: ActionButtonsProps) {
  return (
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
    </div>
  );
}
