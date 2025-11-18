type ProfileProps = {
    fname: string;
    position: string;
    description: string;
}
const Profile = ({fname, position, description}: ProfileProps) => {
    return (
        <div className="flex max-w-[500px] items-center py-4 px-2  gap-4">
            <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shrink-0"></div>
            <div>
                <h2 className="text-[20px] font-bold">{fname}</h2>
                <h4 className="text-[16px] font-semibold">{position}</h4>
                <p className=" text-[14pxtext-gray-600">
                    {description}
                </p>
            </div>
        </div>
    )
}

const option1 = () => {
    return (
       <div className="grid grid-cols-2 gap-10 mt-10 px-15 mx-auto">
                <div>
                    <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                   <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                    <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                    <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                </div>
                <div>
                    <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                   <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                    <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                    <Profile 
                    fname="Sir Johnson Jimoh" 
                    position="Metro Grand Knight" 
                    description=" Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut la
                     bore et dolore magna aliqua. Ut enim ad minim veniam, " 
                    />
                </div>
            </div>
    )
}