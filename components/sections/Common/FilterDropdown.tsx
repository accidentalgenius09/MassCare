import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  options,
  onChange,
  widthClass = "w-full sm:w-40",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Normalize options to always have label and value
  const normalizeOptions = (opts: DropdownOption[]): OptionItem[] => {
    return opts.map((option) => {
      if (typeof option === "string") {
        return { label: option, value: option };
      }
      return option;
    });
  };

  // Get display label for current value
  const getDisplayLabel = (): string => {
    // If value is an object with a label, use it directly (always, even if not in options)
    if (value && typeof value === "object" && "label" in value) {
      return value.label;
    }
    
    // Handle null or undefined value
    if (!value) {
      // Try to get the first option as default, or return empty string
      const normalized = normalizeOptions(options);
      return normalized.length > 0 ? normalized[0].label : "";
    }
    
    // Otherwise find by value in options
    const normalized = normalizeOptions(options);
    const selected = normalized.find((opt) => opt.value === value);
    return selected?.label || (value ? String(value) : "");
  };

  const handleSelect = (option: OptionItem) => {
    onChange(option);
    setIsOpen(false);
  };

  const normalizedOptions = normalizeOptions(options);

  return (
    <div ref={dropdownRef} className={`relative ${widthClass} ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
          isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
        } ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white text-gray-700"}`}
      >
        <span>{getDisplayLabel()}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-y-auto py-1">
            {normalizedOptions.map((option) => {
              // Check if this option is selected
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
      )}
    </div>
  );
};
