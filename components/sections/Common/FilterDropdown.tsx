import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

interface OptionItem {
  label: string;
  value: string | number;
}

type DropdownOption = string | OptionItem;

interface FilterDropdownProps {
  value: string | number | OptionItem | null;
  options: DropdownOption[];
  onChange: (option: OptionItem) => void;
  widthClass?: string;
  className?: string;
  disabled?: boolean;
}

// Small Portal component that mounts children into document.body
function Portal({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(children, elRef.current);
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  options,
  onChange,
  widthClass = "w-full sm:w-40",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement | null>(null); // used to measure trigger
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Normalize options to always have label and value
  const normalizeOptions = (opts: DropdownOption[]): OptionItem[] => {
    return opts.map((option) => {
      if (typeof option === "string") {
        return { label: option, value: option };
      }
      return option;
    });
  };

  const normalizedOptions = normalizeOptions(options);

  // Get display label for current value
  const getDisplayLabel = (): string => {
    if (value && typeof value === "object" && "label" in value) {
      return value.label;
    }

    if (!value) {
      return normalizedOptions.length > 0 ? normalizedOptions[0].label : "";
    }

    const selected = normalizedOptions.find((opt) => opt.value === value);
    return selected?.label || (value ? String(value) : "");
  };

  const handleSelect = (option: OptionItem) => {
    onChange(option);
    setIsOpen(false);
  };

  // position the portal menu based on the trigger button's bounding rect
  const updateMenuPosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();

    const computedStyle: React.CSSProperties = {
      position: "absolute",
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      minWidth: rect.width,
      zIndex: 9999,
    };

    // if the menu would overflow right edge, try to align right
    const viewportWidth = document.documentElement.clientWidth;
    // estimate dropdown width equal to button width (minWidth) — you can override later
    if (rect.left + rect.width > viewportWidth - 8) {
      computedStyle.left = Math.max(
        8 + window.scrollX,
        viewportWidth - rect.width - 8 + window.scrollX
      );
    }

    setMenuStyle(computedStyle);
  };

  useEffect(() => {
    if (isOpen) {
      updateMenuPosition();

      const handleResizeOrScroll = () => {
        updateMenuPosition();
      };

      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll, true); // capture scroll on ancestors

      return () => {
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll, true);
      };
    }
  }, [isOpen]);

  // close on outside click (works across portal boundary)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        (menuRef.current.contains(target) ||
          buttonRef.current?.contains(target))
      ) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-visible ${widthClass} ${className}`}
    >
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((p) => !p)}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition ${
          isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
        } ${
          disabled
            ? "bg-gray-100 cursor-not-allowed text-gray-500"
            : "bg-white text-gray-700"
        }`}
      >
        <span>{getDisplayLabel()}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <Portal>
          <div
            ref={menuRef}
            style={menuStyle}
            className="rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <ul className="max-h-60 overflow-y-auto py-1">
              {normalizedOptions.map((option) => {
                const isSelected =
                  (value &&
                    typeof value === "object" &&
                    "value" in value &&
                    option.value === value.value) ||
                  ((!value || typeof value !== "object") &&
                    option.value === value);

                return (
                  <li key={String(option.value)}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition first:rounded-t-lg last:rounded-b-lg ${
                        isSelected
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{option.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default FilterDropdown;
