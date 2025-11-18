
export default function Events() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-[700px]">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-500 mb-2">November 2025</h2>
      </div>

      {/* Event 1 */}
      <div className="mb-8 border-b border-gray-200 pb-8">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">Wed</div>
            <div className="text-3xl font-bold">11</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-1">November 11, 2025- November13,2025</div>
            <h3 className="text-xl font-bold mb-2">2025 Supreme Convention</h3>
            <p className="text-sm text-gray-600">To be held in Abuja, hosted by the New York Grand.More details to be announced later</p>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">Section 31</div>
      </div>

      {/* Event 2 */}
      <div className="mb-8 border-b border-gray-200 pb-8">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">Wed</div>
            <div className="text-3xl font-bold">20</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-1">November 20, 2025</div>
            <h3 className="text-xl font-bold mb-2">25th Metro Council Meeting</h3>
            <p className="text-sm text-gray-600">To be held in Abuja, hosted by the New York Grand.More details to be announced later</p>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">Section 32</div>
      </div>

      {/* Event 3 */}
      <div className="mb-8">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">Wed</div>
            <div className="text-3xl font-bold">27</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-1">November 27, 2025</div>
            <h3 className="text-xl font-bold mb-2">25th Metro Council Meeting</h3>
            <p className="text-sm text-gray-600">To be held in Abuja, hosted by the New York Grand.More details to be announced later</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button className="text-sm font-medium">&lt; Prev</button>
        <button className="text-sm font-medium">Next &gt;</button>
      </div>
    </div>
  );
}