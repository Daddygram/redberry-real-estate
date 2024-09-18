const SkeletonLoader = () => {
    return (
        <div className="mt-8 grid grid-cols-4 gap-5">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="h-[455px] border border-solid border-grey-200 rounded-[14px] animate-pulse">
                    <div className="bg-gray-200 w-full h-[307px] rounded-t-[14px]"></div>
                    <div className="px-[25px] py-[22px]">
                        <div className="bg-gray-200 w-1/4 h-[34px] rounded-full"></div>
                        <div className="bg-gray-200 mt-[6px] w-3/4 h-[20px] rounded-full"></div>
                        <div className="bg-gray-200 mt-[20px] w-2/4 h-[24px] rounded-full"></div>
                    </div>
                </div>
            ))}
      </div>
    );
  };
  
export default SkeletonLoader;
  