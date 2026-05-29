import React from 'react';
import { useGetMemberFilters } from '@/hooks/member.hook';

interface FiltersState {
  subCouncil: string;
  degree:     string;
  officeHeld: string;
}

interface FiltersProps {
  filters: FiltersState;
  onFilterChange: (filterType: string, value: string) => void;
}

// ── Reusable Select ──────────────────────────────────────────────────────────

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

const FilterSelect = ({ value, onChange, options, placeholder }: FilterSelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border-2 border-[#EAEAEA] rounded-lg w-[180px] p-2 text-sm focus:outline-none focus:border-[#006A05] transition-colors"
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

// ── Filters ──────────────────────────────────────────────────────────────────

const MemberFilters = ({ filters, onFilterChange }: FiltersProps) => {
  const { data, isLoading } = useGetMemberFilters();

  const subCouncils = data?.subCouncils ?? [];
  const degrees     = data?.degrees     ?? [];
  const officeHelds = data?.officeHelds ?? [];

  if (isLoading) return (
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-2 border-[#EAEAEA] rounded-lg w-[180px] h-[38px] animate-pulse bg-gray-100" />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
      <FilterSelect
        value={filters.subCouncil}
        onChange={(val) => onFilterChange('subCouncil', val)}
        options={subCouncils}
        placeholder="All Councils"
      />
      <FilterSelect
        value={filters.degree}
        onChange={(val) => onFilterChange('degree', val)}
        options={degrees}
        placeholder="All Degrees"
      />
      <FilterSelect
        value={filters.officeHeld}
        onChange={(val) => onFilterChange('officeHeld', val)}
        options={officeHelds}
        placeholder="All Offices"
      />
    </div>
  );
};

export default MemberFilters;