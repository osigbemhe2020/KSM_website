

export function NewsCard() {
  return (
    <div className="w-[350px] h-[100px] flex gap-4 bg-white shadow-lg p-1 rounded-1">
    <div className=" w-[30%] aspect-[1/1] bg-gray-300"></div>
    <div className="font-bold text-[20px]"> A heading that must span over two lines
        <div className="text-[12px]"> By <span className="font-semibold">Abi</span> 4 days ago</div>
    </div>
</div>
  )
}
