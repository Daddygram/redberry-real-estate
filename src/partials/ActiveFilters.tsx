import { useEffect, useState } from "react";
import { Region } from "../lib/types";
import { fetchRegions } from "../utils/ApiUtils";

interface ActiveFiltersProps {
    selectedRegions: number[];
    setSelectedRegions: (regions: number[]) => void;
    minPrice: number | undefined;
    setMinPrice: (price: number | undefined) => void;
    maxPrice: number | undefined;
    setMaxPrice: (price: number | undefined) => void;
    minArea: number | undefined;
    setMinArea: (area: number | undefined) => void;
    maxArea: number | undefined;
    setMaxArea: (area: number | undefined) => void;
    bedroomCount: number | undefined;
    setBedroomCount: (count: number | undefined) => void;
  }

export const ActiveFilters = ({
    selectedRegions,
    setSelectedRegions,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
    bedroomCount,
    setBedroomCount
  }: ActiveFiltersProps) => {

    const hasActiveFilters = () => {
        return (
          selectedRegions.length > 0 ||
          minArea !== undefined || maxArea !== undefined ||
          minPrice !== undefined || maxPrice !== undefined ||
          bedroomCount !== undefined
        );
      };  
    
      const clearAllFilters = () => {
        setSelectedRegions([]);
        setMinArea(undefined);
        setMaxArea(undefined);
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setBedroomCount(undefined);
      };

      const [regions, setRegions] = useState<Region[]>([]);
    
      useEffect(() => {
        const loadInitialData = async () => {
          const regionsData = await fetchRegions();
          setRegions(regionsData);
        };
        loadInitialData();
      }, []);
    
      const getRegionNameById = (id: number): string | undefined => {
        const region = regions.find(region => region.id === id);
        return region?.name;
      };
    
  
  return (
    <>
      {/* active filters */}
      {hasActiveFilters() && (
        <div className="mt-4 w-full flex flex-wrap items-center gap-2">
            {/* Location Filter */}
            {selectedRegions.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    {selectedRegions.map(regionId => (
                    <span key={regionId} className="flex items-center gap-1 py-[6px] px-[10px] border border-solid border-grey rounded-full">
                        <span>{getRegionNameById(regionId)}</span>
                        <span onClick={() => setSelectedRegions(selectedRegions.filter(id => id !== regionId))}>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 4L3.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.5 4L10.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                    </span>
                    ))}
                </div>
            )}
          
            {/* Area Filter */}
            {(minArea !== undefined || maxArea !== undefined) && (
                <span className="flex items-center gap-1 py-[6px] px-[10px] border border-solid border-grey rounded-full">
                {minArea !== undefined ? minArea : 0} მ² - {maxArea !== undefined ? maxArea : '∞'} მ²
                <span onClick={() => { setMinArea(undefined); setMaxArea(undefined); }}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 4L3.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 4L10.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                </span>
            )}

            {/* Price Filter */}
            {(minPrice !== undefined || maxPrice !== undefined) && (
                <span className="flex items-center gap-1 py-[6px] px-[10px] border border-solid border-grey rounded-full">
                {minPrice !== undefined ? minPrice : 0}₾ - {maxPrice !== undefined ? maxPrice : '∞'}₾
                <span onClick={() => { setMinPrice(undefined); setMaxPrice(undefined); }}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 4L3.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 4L10.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                </span>
            )}

            {/* Bedroom Count Filter */}
            {bedroomCount !== undefined && (
                <span className="flex items-center gap-1 py-[6px] px-[10px] border border-solid border-grey rounded-full">
                {bedroomCount}
                <span onClick={() => setBedroomCount(undefined)}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 4L3.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 4L10.5 11" stroke="#354451" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                </span>
            )}

            {/* Clear All Filters */}
            <span className="font-medium text-sm text-black cursor-pointer" onClick={() => clearAllFilters()}>
                გასუფთავება
            </span>
        </div>
      )}
    </>
  )
}
