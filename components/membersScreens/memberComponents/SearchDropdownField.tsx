import React from 'react';

export interface DropdownOption {
  label: string;
  subCouncil?: string;
  value: string;
}

interface SearchDropdownFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (option: DropdownOption) => void;
  options: DropdownOption[];
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

const SearchDropdownField = ({
  value,
  onChange,
  onSelect,
  options,
  loading = false,
  placeholder = 'Search...',
  className = '',
}: SearchDropdownFieldProps) => {
  return (
    <div className={`relative w-[300px] ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-2 border-[#EAEAEA] rounded-lg p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#006A05] transition-colors"
      />

      {/* Dropdown only renders when there is input value */}
      {value.length > 0 && (
        <ul className="absolute top-full left-0 z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-[220px] overflow-y-auto">
          {loading ? (
            <li className="px-4 py-2 text-sm text-gray-400">
              Loading...
            </li>
          ) : options.length === 0 ? (
            <li className="px-4 py-2 text-sm text-gray-400">
              No results found
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                onMouseDown={(e) => {
                  e.preventDefault(); // prevents input blur before click registers
                  onSelect(option);
                }}
                className="px-4 py-2  cursor-pointer hover:bg-[#F4F4F4] transition-colors"
              >
                <h3 className='text-base font-medium'>{option.label}</h3>
                <p className='text-sm text-gray-500'>{option.subCouncil}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdownField;