import ButtonPrimary from "../components/ButtonPrimary"
import ButtonSecondary from "../components/ButtonSecondary"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Region } from "../lib/types";
import { fetchRegions } from "../utils/ApiUtils";
import AgentModal from "./AgentModal";

interface FilterProps {
  onFilter: (selectedRegions: number[], minPrice?: number, maxPrice?: number,  minArea?: number, maxArea?: number, bedroomCount?: number ) => void;
}

const Filter = ({ onFilter }: FilterProps) => {
  const [openModal, setOpenModal] = useState(false);

  const regionDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const areaDropdownRef = useRef<HTMLDivElement>(null);
  const bedroomDropdownRef = useRef<HTMLDivElement>(null);

  // region filter
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [showRegionOptions, setShowRegionOptions] = useState(false);

  // price filter
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  // area filter
  const [minArea, setMinArea] = useState<number | ''>('');
  const [maxArea, setMaxArea] = useState<number | ''>('');
  const [showAreaOptions, setShowAreaOptions] = useState(false);

  // bedrooms count filter
  const [bedroomCount, setBedroomCount] = useState<number | ''>('');
  const [showBedroomOptions, setShowBedroomOptions] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const regionsData = await fetchRegions();
      setRegions(regionsData);
    };
    loadInitialData();
    const handleClickOutside = (event: MouseEvent) => {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
        setShowRegionOptions(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setShowPriceOptions(false);
      }
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target as Node)) { // Handle click outside for Area filter
        setShowAreaOptions(false);
      }
      if (bedroomDropdownRef.current && !bedroomDropdownRef.current.contains(event.target as Node)) { // Handle click outside for Area filter
        setShowBedroomOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRegionSelect = (regionId: number) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions((prev) => prev.filter((id) => id !== regionId));
    } else {
      setSelectedRegions((prev) => [...prev, regionId]);
    }
  };

  const applyFilter = () => {
    onFilter(selectedRegions, minPrice || undefined, maxPrice || undefined, minArea || undefined, maxArea || undefined, bedroomCount || undefined);
  };

  return (
    <>
      <div className="mt-[77px] flex justify-between items-center">
          {/* filters */}
          <div className="flex justify-center items-center gap-6 p-[6px] border border-solid border-grey rounded-[10px] text-nowrap whitespace-nowrap">

            {/* Region Dropdown */}
            <div className="select-menu relative hover:bg-lightGrey active:bg-lightGrey rounded-md" ref={regionDropdownRef}>
              <div
                className='select px-[14px] py-2 flex items-center gap-1 cursor-pointer'
                onClick={() => setShowRegionOptions(!showRegionOptions)}>
                <span className="font-medium text-black leading-[1.2rem]">რეგიონი</span>
                <svg className={`transition-all duration-100 ${showRegionOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Options List for Regions */}
              {showRegionOptions && (
                <div className="options-list absolute top-14 -left-[6px] w-fit p-6 bg-white text-sm leading-4 border border-solid border-grey rounded-lg z-10 overflow-hidden transition-all duration-100 shadow-custom" >
                  <span className="font-medium text-black text-base leading-[1.2rem]">რეგიონის მიხედვით</span>
                  <div className="mt-6 grid grid-cols-3 gap-y-4 gap-x-20 min-w-max">
                    {regions.map((region) => (
                        <label
                          key={region.id}
                          className="relative w-full flex items-center justify-start gap-2 option cursor-pointer"
                        >
                          <input 
                            type="checkbox" 
                            className="absolute w-full h-full peer opacity-0 cursor-pointer"
                            onChange={() => handleRegionSelect(region.id)}
                            checked={selectedRegions.includes(region.id)}/>
                          <svg className="border border-solid border-grey peer-checked:fill-greenPrimary peer-checked:border-0 rounded-sm" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="20" height="20" rx="2"/>
                            <path d="M15.4546 5.4541L8.57959 13.6359L5.45459 9.91691" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {region.name}
                        </label>
                    ))}
                  </div>
                  <div className="mt-8 w-full flex justify-end">
                    <ButtonPrimary text="არჩევა" onClick={applyFilter} />
                  </div>
                </div>
              )}
            </div>
            
            {/* Price Filter */}
            <div className="select-menu relative hover:bg-lightGrey active:bg-lightGrey rounded-md" ref={priceDropdownRef}>
              <div
                className='select px-[14px] py-2 flex items-center gap-1 cursor-pointer'
                onClick={() => setShowPriceOptions(!showPriceOptions)}>
                <span className="font-medium text-black leading-[1.2rem]">საფასო კატეგორია</span>
                <svg className={`transition-all duration-100 ${showPriceOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {showPriceOptions && (
                <div className="options-list absolute top-14 -left-[6px] w-fit p-6 bg-white text-sm leading-4 border border-solid border-grey rounded-lg z-10 overflow-hidden transition-all duration-100 shadow-custom">
                  <span className="font-medium text-black text-base leading-[1.2rem]">ფასის მიხედვით</span>
                  <div className="mt-6 min-w-max grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="დან"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="border border-solid border-grey rounded-md px-[10px] py-3 text-sm placeholder:text-black/40 focus:border-black"
                      />
                      <span className="absolute right-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-black" >₾</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="მდე"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="border border-solid border-grey rounded-md px-[10px] py-3 text-sm placeholder:text-black/40 focus:border-black"
                      />
                      <span className="absolute right-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-black" >₾</span>
                    </div>
                    {/* Quick Select for Minimum Price */}
                    <div className="flex flex-col">
                      <p className="font-medium text-black text-sm">მინ. ფასი</p>
                      <span className="mt-4 cursor-pointer" onClick={() => setMinPrice(50000)}>50,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinPrice(100000)}>100,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinPrice(150000)}>150,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinPrice(200000)}>200,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinPrice(300000)}>300,000 ₾</span>
                    </div>

                    {/* Quick Select for Maximum Price */}
                    <div className="flex flex-col">
                      <p className="font-medium text-black text-sm">მაქს. ფასი</p>
                      <span className="mt-4 cursor-pointer" onClick={() => setMaxPrice(50000)}>50,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxPrice(100000)}>100,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxPrice(150000)}>150,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxPrice(200000)}>200,000 ₾</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxPrice(300000)}>300,000 ₾</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ButtonPrimary text="არჩევა" onClick={applyFilter} />
                  </div>
                </div>
              )}
            </div>

            {/* Area Filter */}
            <div className="select-menu relative hover:bg-lightGrey active:bg-lightGrey rounded-md" ref={areaDropdownRef}>
              <div
                className='select px-[14px] py-2 flex items-center gap-1 cursor-pointer'
                onClick={() => setShowAreaOptions(!showAreaOptions)}>
                <span className="font-medium text-black leading-[1.2rem]">ფართობი</span>
                <svg className={`transition-all duration-100 ${showAreaOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {showAreaOptions && (
                <div className="options-list absolute top-14 -left-[6px] w-fit p-6 bg-white text-sm leading-4 border border-solid border-grey rounded-lg z-10 overflow-hidden transition-all duration-100 shadow-custom">
                  <span className="font-medium text-black text-base leading-[1.2rem]">ფართობის მიხედვით</span>
                  <div className="mt-6 min-w-max grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="დან"
                        value={minArea}
                        onChange={(e) => setMinArea(e.target.value === '' ? '' : Number(e.target.value))}
                        className="border border-solid border-grey rounded-md px-[10px] py-3 text-sm placeholder:text-black/40 focus:border-black"
                      />
                      <span className="absolute right-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-black" >მ²</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="მდე"
                        value={maxArea}
                        onChange={(e) => setMaxArea(e.target.value === '' ? '' : Number(e.target.value))}
                        className="border border-solid border-grey rounded-md px-[10px] py-3 text-sm placeholder:text-black/40 focus:border-black"
                      />
                      <span className="absolute right-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-black" >მ²</span>
                    </div>
                    {/* Quick Select for Minimum Area */}
                    <div className="flex flex-col">
                      <p className="font-medium text-black text-sm">მინ. ფასი</p>
                      <span className="mt-4 cursor-pointer" onClick={() => setMinArea(50)}>50 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinArea(100)}>100 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinArea(150)}>150 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinArea(200)}>200 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMinArea(300)}>300 მ²</span>
                    </div>

                    {/* Quick Select for Maximum Area */}
                    <div className="flex flex-col">
                      <p className="font-medium text-black text-sm">მაქს. ფასი</p>
                      <span className="mt-4 cursor-pointer" onClick={() => setMaxArea(50)}>50 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxArea(100)}>100 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxArea(150)}>150 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxArea(200)}>200 მ²</span>
                      <span className="mt-2 cursor-pointer" onClick={() => setMaxArea(300)}>300 მ²</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ButtonPrimary text="არჩევა" onClick={applyFilter} />
                  </div>
                </div>
              )}
            </div>

            {/* Bedroom Count Filter */}
            <div className="select-menu relative hover:bg-lightGrey active:bg-lightGrey rounded-md" ref={bedroomDropdownRef}>
              <div
                className='select px-[14px] py-2 flex items-center gap-1 cursor-pointer'
                onClick={() => setShowBedroomOptions(!showBedroomOptions)}>
                <span className="font-medium text-black leading-[1.2rem]">საძინებლების რაოდენობა</span>
                <svg className={`transition-all duration-100 ${showBedroomOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {showBedroomOptions && (
                <div className="options-list absolute top-14 -left-[6px] w-fit p-6 bg-white text-sm leading-4 border border-solid border-grey rounded-lg z-10 overflow-hidden transition-all duration-100 shadow-custom">
                  <span className="font-medium text-black text-base leading-[1.2rem]">საძინებლების რაოდენობა</span>
                  <div className="mt-6 min-w-max">
                    <input
                      type="number"
                      placeholder=""
                      value={bedroomCount}
                      onChange={(e) => setBedroomCount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="max-w-11 border border-solid border-grey rounded-md px-[10px] py-3 text-sm placeholder:text-black/40 focus:border-black"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ButtonPrimary text="არჩევა" onClick={applyFilter} />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* buttons */}
          <div className="flex justify-center items-center gap-4">
            <Link to='/addListing'>
              <ButtonPrimary text="ლისტინგის დამატება" />
            </Link>
            <ButtonSecondary text="აგენტის დამატება" onClick={() => setOpenModal(true)} />
          </div>

          {/* add agent */}
          <AgentModal
              openModal={openModal}
              onClose={() => setOpenModal(false)}
              setOpenModal={setOpenModal}
          />
      </div>
    </>
  )
}

export default Filter