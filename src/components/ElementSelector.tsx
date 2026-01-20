import { useState, useEffect, useCallback, useRef } from "react";
import { X, Plus, Copy, MousePointer2 } from "lucide-react";
import { Button, IconButton } from "@crayonai/react-ui";
import { toast } from "sonner";

interface ElementSelectorProps {
  isActive: boolean;
  onClose: () => void;
  onAddToCss: (selector: string) => void;
}

interface SelectedElement {
  element: HTMLElement;
  selector: string;
  classes: string[];
  tagName: string;
}

export function ElementSelector({
  isActive,
  onClose,
  onAddToCss,
}: ElementSelectorProps) {
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const getElementSelector = useCallback((element: HTMLElement): string => {
    // Prefer class-based selectors for CSS customization
    if (element.classList.length > 0) {
      // Find the most specific class (prefer crayon- prefixed classes)
      const classes = Array.from(element.classList);
      const crayonClass = classes.find((c) => c.startsWith("crayon-"));
      if (crayonClass) {
        return `.${crayonClass}`;
      }
      // Otherwise use the first class
      return `.${classes[0]}`;
    }
    // Fallback to tag name with id if available
    if (element.id) {
      return `#${element.id}`;
    }
    return element.tagName.toLowerCase();
  }, []);

  const handleElementClick = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return;

      const target = e.target as HTMLElement;
      // Ignore clicks on the selector panel itself
      if (target.closest("[data-element-selector]")) return;
      // Ignore clicks on the sidebar
      if (target.closest("aside")) return;
      // Ignore clicks on the header
      if (target.closest("header")) return;

      e.preventDefault();
      e.stopPropagation();

      const selector = getElementSelector(target);
      setSelectedElement({
        element: target,
        selector,
        classes: Array.from(target.classList),
        tagName: target.tagName.toLowerCase(),
      });
    },
    [isActive, getElementSelector]
  );

  const handleElementHover = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return;

      const target = e.target as HTMLElement;
      // Ignore hover on the selector panel itself
      if (target.closest("[data-element-selector]")) return;
      // Ignore hover on the sidebar
      if (target.closest("aside")) return;
      // Ignore hover on the header
      if (target.closest("header")) return;

      setHoveredElement(target);
    },
    [isActive]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
  }, []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("click", handleElementClick, true);
      document.addEventListener("mouseover", handleElementHover, true);
      document.addEventListener("mouseleave", handleMouseLeave, true);
      document.body.style.cursor = "crosshair";
    }

    return () => {
      document.removeEventListener("click", handleElementClick, true);
      document.removeEventListener("mouseover", handleElementHover, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.body.style.cursor = "";
    };
  }, [isActive, handleElementClick, handleElementHover, handleMouseLeave]);

  // Clear selection when deactivated
  useEffect(() => {
    if (!isActive) {
      setSelectedElement(null);
      setHoveredElement(null);
    }
  }, [isActive]);

  const handleAddToCss = () => {
    if (selectedElement) {
      onAddToCss(selectedElement.selector);
      toast.success(`Added ${selectedElement.selector} to CSS`);
    }
  };

  const handleCopySelector = () => {
    if (selectedElement) {
      navigator.clipboard.writeText(selectedElement.selector);
      toast.success("Selector copied to clipboard");
    }
  };

  if (!isActive) return null;

  return (
    <>
      {/* Highlight overlay for hovered element */}
      {hoveredElement && !selectedElement && (
        <div
          style={{
            position: "fixed",
            top: hoveredElement.getBoundingClientRect().top,
            left: hoveredElement.getBoundingClientRect().left,
            width: hoveredElement.getBoundingClientRect().width,
            height: hoveredElement.getBoundingClientRect().height,
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            border: "2px dashed rgba(59, 130, 246, 0.8)",
            pointerEvents: "none",
            zIndex: 9998,
            transition: "all 0.1s ease",
          }}
        />
      )}

      {/* Highlight overlay for selected element */}
      {selectedElement && (
        <div
          style={{
            position: "fixed",
            top: selectedElement.element.getBoundingClientRect().top,
            left: selectedElement.element.getBoundingClientRect().left,
            width: selectedElement.element.getBoundingClientRect().width,
            height: selectedElement.element.getBoundingClientRect().height,
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            border: "2px solid rgba(34, 197, 94, 0.9)",
            pointerEvents: "none",
            zIndex: 9998,
          }}
        />
      )}

      {/* Selector panel */}
      <div
        ref={overlayRef}
        data-element-selector="true"
        style={{
          position: "fixed",
          top: 60,
          right: 16,
          width: 320,
          backgroundColor: "var(--crayon-background-fills)",
          border: "1px solid var(--crayon-stroke-emphasis)",
          borderRadius: 8,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid var(--crayon-stroke-emphasis)",
            backgroundColor: "var(--crayon-background-secondary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MousePointer2 size={16} />
            <span style={{ fontWeight: 600, fontSize: 14 }}>Element Selector</span>
          </div>
          <IconButton
            icon={<X size={16} />}
            variant="tertiary"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div style={{ padding: 16 }}>
          {!selectedElement ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "var(--crayon-secondary-text)",
              }}
            >
              <MousePointer2
                size={32}
                style={{ margin: "0 auto 12px", opacity: 0.5 }}
              />
              <p style={{ fontSize: 14, marginBottom: 8 }}>
                Click on any element in the preview to select it
              </p>
              <p style={{ fontSize: 12, opacity: 0.7 }}>
                Hover over elements to highlight them
              </p>
            </div>
          ) : (
            <div>
              {/* Selected element info */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--crayon-secondary-text)",
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  Selected Element
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    backgroundColor: "var(--crayon-background-secondary)",
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: "monospace",
                  }}
                >
                  <span style={{ color: "var(--crayon-info-text)" }}>
                    {`<${selectedElement.tagName}>`}
                  </span>
                </div>
              </div>

              {/* Selector */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--crayon-secondary-text)",
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  CSS Selector
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    backgroundColor: "var(--crayon-background-secondary)",
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: "var(--crayon-success-text)",
                  }}
                >
                  {selectedElement.selector}
                </div>
              </div>

              {/* Available classes */}
              {selectedElement.classes.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "var(--crayon-secondary-text)",
                      marginBottom: 6,
                      display: "block",
                    }}
                  >
                    Classes ({selectedElement.classes.length})
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      maxHeight: 120,
                      overflowY: "auto",
                    }}
                  >
                    {selectedElement.classes.map((cls, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            selector: `.${cls}`,
                          });
                        }}
                        style={{
                          padding: "4px 8px",
                          fontSize: 11,
                          fontFamily: "monospace",
                          backgroundColor:
                            selectedElement.selector === `.${cls}`
                              ? "var(--crayon-primary-fills)"
                              : "var(--crayon-background-secondary)",
                          color:
                            selectedElement.selector === `.${cls}`
                              ? "var(--crayon-primary-text-inverse)"
                              : "var(--crayon-primary-text)",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        .{cls}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant="primary"
                  iconLeft={<Plus size={14} />}
                  onClick={handleAddToCss}
                  style={{ flex: 1 }}
                >
                  Add to CSS
                </Button>
                <Button
                  variant="secondary"
                  iconLeft={<Copy size={14} />}
                  onClick={handleCopySelector}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


