import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  fullHeight?: boolean;
}

export function Section({ title, children, defaultOpen = true, fullHeight = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`section ${fullHeight ? "section--full-height" : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="section__header"
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`section__icon ${isOpen ? "section__icon--open" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="section__content">
          {children}
        </div>
      )}
    </div>
  );
}
