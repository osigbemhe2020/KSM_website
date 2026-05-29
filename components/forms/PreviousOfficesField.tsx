import React, { useState } from 'react';

const OFFICE_OPTIONS = [
  'Grand Knight',
  'Deputy Grand Knight',
  'Secretary',
  'Assistant Secretary',
  'Warden',
  'Warden 2',
  'Provost',
  'Provost 2',
  'Advocate',
  'Financial Secretary',
  'Treasurer',
];

interface PreviousOfficesFieldProps {
  values: string[];                              // current selected offices array
  setFieldValue: (name: string, value: string[]) => void;
  error?: string;
}

// ── Pill ─────────────────────────────────────────────────────────────────────

const Pill = ({ value, onDelete }: { value: string; onDelete: (v: string) => void }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E8F5E9] text-[#1E4D3A] text-sm rounded-full border border-[#1E4D3A]">
    {value}
    <button
      type="button"
      onClick={() => onDelete(value)}
      className="ml-1 text-[#1E4D3A] hover:text-red-500 font-bold leading-none"
    >
      ×
    </button>
  </span>
);

// ── Main Component ────────────────────────────────────────────────────────────

const PreviousOfficesField = ({ values, setFieldValue, error }: PreviousOfficesFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (office: string) => {
    if (values.includes(office)) return;          // prevent duplicates
    setFieldValue('previousOfficesHeld', [...values, office]);
  };

  const handleDelete = (office: string) => {
    setFieldValue('previousOfficesHeld', values.filter((v) => v !== office));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700">
        Previous Offices Held
        <span className="text-gray-400 font-normal ml-1">(optional)</span>
      </label>

      {/* Dropdown trigger */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          className={`w-full px-4 py-3 border rounded-lg text-left text-sm bg-white shadow-sm transition-colors
            ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
            focus:outline-none focus:ring-2 focus:ring-[#1E4D3A] focus:border-transparent`}
        >
          <span className="text-gray-400">Select previous offices...</span>
          <span className="float-right text-gray-400">{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-[220px] overflow-y-auto">
            {OFFICE_OPTIONS.map((office) => {
              const isSelected = values.includes(office);
              return (
                <li
                  key={office}
                  onMouseDown={(e) => {
                    e.preventDefault();           // prevent blur before click
                    if (!isSelected) handleSelect(office);
                  }}
                  className={`px-4 py-2 text-sm transition-colors
                    ${isSelected
                      ? 'text-gray-300 cursor-not-allowed bg-gray-50'  // disabled style
                      : 'text-gray-800 cursor-pointer hover:bg-[#F4F4F4]'
                    }`}
                >
                  {office}
                  {isSelected && <span className="ml-2 text-xs text-gray-300">✓ added</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {/* Pills */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {values.map((office) => (
            <Pill key={office} value={office} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousOfficesField;