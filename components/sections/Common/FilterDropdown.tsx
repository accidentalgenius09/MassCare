import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FilterDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  widthClass?: string;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  options,
  onChange,
  widthClass = "w-full sm:w-40",
  className = "",
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

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${widthClass} ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
          isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
        }`}
      >
        <span>{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition first:rounded-t-lg last:rounded-b-lg ${
                    option === value
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{option}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
