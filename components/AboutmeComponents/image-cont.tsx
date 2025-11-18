const ImageCont = ({caption}:{caption: string}) => {
    return(
        <div className="mb-10 ">
            <div className="w-full max-w-[500px] mx-auto h-80 bg-gray-300 mb-2" />
            <div className=" px-4 py-2 max-w-[500px] mx-auto  text-sm font-medium text-black">{caption}</div>
          </div>
    )
}

export default ImageCont