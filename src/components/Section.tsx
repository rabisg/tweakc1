import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: "1px solid var(--border-primary)",
        borderRadius: "8px",
        marginBottom: "16px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "500",
          color: "var(--text-primary)",
        }}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div
          style={{
            padding: "0 16px 16px 16px",
            borderTop: "1px solid var(--border-primary)",
          }}
        >
          <div style={{ paddingTop: "16px" }}>{children}</div>
        </div>
      )}
    </div>
  );
}
