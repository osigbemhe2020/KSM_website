import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMembers } from '@/hooks/member.hook';
import useResponsive from '@/hooks/useResponsive';
import Pagination from './Pagination';
import MemberSearch from './MemberSearch';
import MemberFilters from './MemberFilters';
import { DropdownOption } from './SearchDropdownField';

const ITEMS_PER_PAGE = 10;

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  subCouncil: string;
  degree: string;
  officeHeld: string;
  phoneNumber: string;
}

interface FiltersState {
  subCouncil: string;
  degree: string;
  officeHeld: string;
}

const MemberTable = () => {
  const router = useRouter();

  // ── Two separate search states, exactly like Task.jsx ──────────────────────
  const [searchQuery, setSearchQuery] = useState(''); // holds selected member _id
  const [searchText, setSearchText] = useState(''); // holds typed string
  // ───────────────────────────────────────────────────────────────────────────

  const [filters, setFilters] = useState<FiltersState>({
    subCouncil: '',
    degree:     '',
    officeHeld: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { isMobile } = useResponsive();

  const activeFilters = useMemo(() => {
    const f: Record<string, string> = {};

    if (searchQuery) {
      f.id = searchQuery;        // exact _id match — from dropdown selection
    } else if (searchText) {
      f.search = searchText;     // text search — from typing
    }

    if (filters.subCouncil)  f.subCouncil  = filters.subCouncil;
    if (filters.degree)      f.degree      = filters.degree;
    if (filters.officeHeld)  f.officeHeld  = filters.officeHeld;

    return f;
  }, [searchQuery, searchText, filters]);

  console.log(activeFilters)

  const { data, isLoading, isError } = useGetMembers(activeFilters, currentPage, ITEMS_PER_PAGE);

  const members    = data?.members    ?? [];
  const pagination = data?.pagination ?? {};

  // ── Handlers mirroring Task.jsx ─────────────────────────────────────────────

  // Called on every keystroke from MemberSearch
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setSearchQuery(''); 
    setCurrentPage(1);
  };

  // Called when a dropdown item is clicked
  const handleMemberSelect = (option: DropdownOption | null) => {
    if (option) {
      setSearchQuery(option.value);  // set the _id
      setSearchText('');             // clear typed text
    } else {
      setSearchQuery('');            // clear id (user started typing again)
    }
    setCurrentPage(1);
  };

  // ────────────────────────────────────────────────────────────────────────────

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  
  return (
    <div className="border-2 border-[#EAEAEA] rounded-lg p-4 text-black bg-white">

      <header className="flex flex-col sm:flex-row justify-between gap-4 mb-12">
        <MemberSearch
          searchQuery={searchQuery}
          onMemberSelect={handleMemberSelect}
          onSearchChange={handleSearchChange}
        />
        <MemberFilters filters={filters} onFilterChange={handleFilterChange} />
      </header>

      {isMobile ? (
        <table className="w-full">
          <thead className="bg-[#F4F4F4]">
            <tr>
              <th className="px-4 py-3 text-left font-medium uppercase text-[#5A5A5A] text-[13px] leading-[120%]">ID</th>
              <th className="px-4 py-3 text-left font-medium uppercase text-[#5A5A5A] text-[13px] leading-[120%]">Name</th>
              <th className="px-4 py-3 text-left font-medium uppercase text-[#5A5A5A] text-[13px] leading-[120%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-red-500">
                  Failed to load members. Please try again.
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-400">
                  No members found.
                </td>
                </tr>
            ): (
              members.map((member: Member, index: number) => (
                <tr key={member._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="px-4 py-2 text-sm">
                    <div className="flex flex-col">
                      <span>{member.firstName} {member.lastName}</span>
                      <span className="text-[12px] text-[#5A5A5A]">{member.subCouncil}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-sm">
                    <button
                      className="bg-[#F4F4F4] mt-2 text-[13px] text-[#5A5A5A] px-4 py-2 rounded-md"
                      onClick={() => router.push(`/member-page/directory/${member._id}`)}
                    >
                      View Full Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-[#F4F4F4]">
              {['ID', 'First Name', 'Last Name', 'Sub-Council', 'Degree', 'Office Held', 'Phone No', 'Action'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium uppercase text-[#5A5A5A] text-[13px] leading-[120%]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-red-500">
                  Failed to load members. Please try again.
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-400">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member: Member, index: number) => (
                <tr key={member._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="px-4 py-2 text-sm">{member.firstName}</td>
                  <td className="px-4 py-2 text-sm">{member.lastName}</td>
                  <td className="px-4 py-2 text-sm">{member.subCouncil}</td>
                  <td className="px-4 py-2 text-sm">{member.degree}</td>
                  <td className="px-4 py-2 text-sm">{member.officeHeld}</td>
                  <td className="px-4 py-2 text-sm">{member.phoneNumber}</td>
                  <td className="w-[150px] px-3 py-2 text-sm">
                    <button
                      className="bg-[#F4F4F4] mt-2 text-[13px] text-[#5A5A5A] px-4 py-2 rounded-md"
                      onClick={() => router.push(`/member-page/directory/${member._id}`)}
                    >
                      View Full Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages ?? 1}
        totalItems={pagination.totalMembers ?? 0}
        startIndex={(currentPage - 1) * ITEMS_PER_PAGE}
        endIndex={Math.min(currentPage * ITEMS_PER_PAGE, pagination.totalMembers ?? 0)}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default MemberTable;