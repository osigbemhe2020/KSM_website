import MemberData from "@/lib/memberData"


const StripeTable = () => {
  // Generate 10 empty rows
  const rows = MemberData
 
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="px-6 py-3 text-left text-sm font-semibold">id</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Firstname</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Last name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Sub-council</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Office held</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Degree</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Occupation</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-2 text-sm">{row.id}</td>
              <td className="px-6 py-2 text-sm">{row.firstname}</td>
              <td className="px-6 py-2 text-sm">{row.lastname}</td>
              <td className="px-6 py-2 text-sm">{row.subConcil}</td>
              <td className="px-6 py-2 text-sm">{row.officeheld}</td>
              <td className="px-6 py-2 text-sm">{row.degree}</td>
              <td className="px-6 py-2 text-sm">{row.occupation}</td>
              <td className="px-6 py-2 text-sm">
                <button className="bg-green-700 mt-2 text-white px-4 py-2 rounded-md">
                  View Full Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


const Directory = () => {
  return (
    <div>
      <h2 className='text-2xl font-semibold m-4'>Directory</h2>
      <StripeTable/>
    </div>
  )
}

export default Directory