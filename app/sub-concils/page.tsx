type SubConcilProps = {
    gkname: string;
    year: number;
    description: string;
    email: string;
}

const SubConcil = ({gkname, year, description, email}: SubConcilProps) => {
    return(
        <div className="border-b border-gray-200 py-6">
        <div className="grid grid-cols-[30%_65%] gap-[5%]  px-10 max-w-[1200px] items-center mx-auto justify-between">
            <div className="relative">
            <div className="bg-gray-300 rounded-lg overflow-hidden w-full max-h-[250px] aspect-square">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-700 text-white p-2 rounded-lg shadow-lg">
              <p className="font-bold text-lg">{gkname}</p>
              <p className="text-sm text-green-100"> Grand Knight</p>
            </div>
          </div>
            <div className="px-5">
                <div className="flex items-center mb-4 justify-between">
                    <h1 className="text-xl font-bold">St Rita Sub Concil</h1>
                    <p className="text-[16px] font-semibold"> Year of inuagration: {year}</p>
                </div>
                <div>
                    <p className="text-[14px]">
                        {description}
                    </p>
                </div>
                <div >
                    <h2 className="text-[16px] font-semibold">email: {email}</h2>
                </div>
            </div>
        </div>
        </div>
    )
}

const SubConcils = () => {
    return (
        <main className="py-8">
            <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">Sub Concils</h1>
            <p className="text-black text-center text-[16px] font-semibold mb-6">Here are the sub concils of the KSM metro</p>
            <SubConcil
             gkname="Sir Cyril Ole" 
             year={2018} 
             description="Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut l
              abore et dolore magna aliqua. Ut enim ad minim veniam, q
              uis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat." 
              email="strita@ksm.org" 
              />
              <SubConcil
             gkname="Sir Cyril Ole"
             year={2018} 
             description="Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut l
              abore et dolore magna aliqua. Ut enim ad minim veniam, q
              uis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat." 
              email="strita@ksm.org" 
              />
              <SubConcil
             gkname="Sir Cyril Ole" 
             year={2018} 
             description="Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut l
              abore et dolore magna aliqua. Ut enim ad minim veniam, q
              uis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat." 
              email="strita@ksm.org" 
              />
              <SubConcil
             gkname="Sir Cyril Ole" 
             year={2018} 
             description="Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut l
              abore et dolore magna aliqua. Ut enim ad minim veniam, q
              uis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat." 
              email="strita@ksm.org" 
              />
        </main>
    )
}

export default SubConcils