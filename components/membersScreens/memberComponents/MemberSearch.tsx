import React, { useMemo, useState } from 'react';
import SearchDropdownField, { DropdownOption } from './SearchDropdownField';
import { useGetMembers } from '@/hooks/member.hook';
import { useDebounce } from '@/hooks/debounce';

interface MemberSearchProps {
  searchQuery: string;                          // the selected member _id
  onMemberSelect: (option: DropdownOption | null) => void;  // called when dropdown item clicked
  onSearchChange: (value: string) => void;      // called on every keystroke
}

const MemberSearch = ({ searchQuery, onMemberSelect, onSearchChange }: MemberSearchProps) => {
  const [inputValue, setInputValue]     = useState('');
  

  const debouncedInput = useDebounce(inputValue, 400);

  // Fetch dropdown suggestions while typing
  const { data, isFetching } = useGetMembers(
    debouncedInput ? { search: debouncedInput } : {},
    1,
    8,
  );

  const members = data?.members ?? [];

  const options: DropdownOption[] = useMemo(
    () =>
      members.map((m: { _id: string; firstName: string; lastName: string; subCouncil: string }) => ({
        label: `${m.firstName} ${m.lastName}`,
        subCouncil: m.subCouncil,
        value: m._id,
      })),
    [members],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    //setShowDropdown(true);

    // If user starts typing again after selecting, clear the selected id
    // if (val && searchQuery) {
    //   onMemberSelect(null);
    // }
    
    onSearchChange(val);   // fires on every keystroke → sets searchText in parent
  };

  const handleSelect = (option: DropdownOption | null) => {
    if (!option) return;
    setInputValue(option.label);   // show name in input box
    //setShowDropdown(false);
    onMemberSelect(option);        // sets searchQuery (_id) in parent, clears searchText
  };

  
  return (
    <SearchDropdownField
      value={inputValue}
      onChange={handleChange}
      onSelect={handleSelect}
      options={options}
      loading={isFetching}
      placeholder="Search members..."
    />
  );
};

export default MemberSearch;