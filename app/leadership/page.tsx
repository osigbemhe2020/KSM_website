
const Profile = () => {
    return (
        <div className="mb-10">
            <div className="relative">
            <div className="bg-gray-300 max-w-[500px] rounded-lg overflow-hidden h-80">
              <div className="w-full  h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
            </div>
            <div className="absolute -bottom-4 -right-2 bg-green-700 text-white p-4 rounded-lg shadow-lg">
              <p className="font-bold text-lg">Sir Johnson Jimoh</p>
              <p className="text-sm text-green-100">Metro Grand Knight</p>
            </div>
          </div>
        </div>
    )
}

const Leadership = () => {
    return (
        <main className="py-10 px-6">
            <h2 className="text-3xl text-center font-bold">Our Leadership</h2>
            <p className="text-[16px] p-4 text-center font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
                <Profile/>
                <Profile/>
                <Profile/>
                <Profile/>
                <Profile/>
                <Profile/>
            </div>
        </main>
    )
}

export default Leadership