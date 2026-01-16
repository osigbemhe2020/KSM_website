import { Camera } from 'lucide-react';
import memberData from '@/lib/memberData';

const Topbox = () => {
  return (
    <div className="w-full lg:h-[178px] bg-white px-4 sm:px-6 lg:px-[60px] py-3 flex flex-col lg:flex-row items-center lg:items-center gap-4">
      <div className="relative flex-shrink-0">
        <img
          src="/images/profile-image.jpg"
          className="w-24 h-24 sm:w-[150px] sm:h-[150px] border-2 border-[#006A05] rounded-full object-cover"
        />
        {/* Camera icon overlay */}
        <div className="absolute bottom-1 right-4 translate-x-1/4 translate-y-1/4 w-8 h-8 bg-[#006A05] rounded-full flex items-center justify-center">
          <Camera className="text-white text-sm" />
        </div>
      </div>

      {/* Text block */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-semibold">Lawerence Dirisu</h2>
        <p className="text-gray-600 text-base">Worthy secetary (st,Rita sub-concil)</p>
        <button className="bg-green-700 mt-2 text-white px-4 py-2 rounded-md">Edit Profile</button>
      </div>
    </div>
  );
};

const Basedata = () => {
  const member = Object.entries(memberData[0]);

  const transform = (text: string) => {
    return text
      .replace(/([A-Z])/g, " $1")      // insert space before capitals
      .replace(/^./, c => c.toUpperCase()) // capitalize first letter
      .replace(/\b\w/g, c => c.toUpperCase()); // capitalize each word
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold m-4'>Basedata</h2>
      <Topbox/>
      <div className='flex mt-6 max-w-[800px] mx-auto py-6 bg-white flex-col space-y-4'>
         {member.map(([key,value]) =>{
            return(
                <div className='grid py-2 px-6 grid-cols-[1fr_2fr] border-b border-gray-200 items-center justify-between'>
                    <p className='font-semibold'>{transform(key)}</p>
                    <p>{value}</p>
                </div>
            )
         })}
      </div>
    </div>
  )
}

export default Basedata