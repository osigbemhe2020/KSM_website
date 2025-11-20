'use client';

import Link from 'next/link';
import { BellDot } from 'lucide-react';

const MemberHeader = () => {
  return (
    <header className="px-3 flex justify-between items-center lg:px-4 py-3 bg-green-700 text-white z-10">
      <div className="flex gap-6">
        <Link href="/" className="text-[16px] font-semibold hover:text-gray-600">Return Home</Link>
        <Link href="#" className="text-[16px] font-semibold hover:text-gray-600">Ask for help</Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative rounded-full bg-[#E8E8E8] p-2">
          <BellDot className="text-xl text-gray-700" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full border border-[#858585]">
          </div>
          <div>
            <p className="text-sm text-white font-semibold">Lawrence Dirisu</p>
            <p className="text-xs text-gray-200">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;