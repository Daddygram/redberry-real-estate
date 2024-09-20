import { useEffect, useState } from "react";
import Filter from "../partials/Filter";
import Listing from "../partials/Listing";
import { Inputs } from "../lib/types";
import { ActiveFilters } from "../partials/ActiveFilters";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchListings } from "../utils/ApiUtils";

const Home = () => {
  const [listings, setListings] = useState<Inputs[]>([]);
  const [filteredListings, setFilteredListings] = useState<Inputs[]>([]);

  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minArea, setMinArea] = useState<number | undefined>(undefined);
  const [maxArea, setMaxArea] = useState<number | undefined>(undefined);
  const [bedroomCount, setBedroomCount] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter listings based on selected regions and price range
    let filtered = listings;

    if (selectedRegions.length > 0) {
      filtered = filtered.filter((listing) =>
        selectedRegions.includes(listing.city.region_id)
      );
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.price <= maxPrice);
    }
    if (minArea !== undefined) {
      filtered = filtered.filter((listing) => listing.area >= minArea);
    }

    if (maxArea !== undefined) {
      filtered = filtered.filter((listing) => listing.area <= maxArea);
    }
    
    if (bedroomCount !== undefined) {
      filtered = filtered.filter((listing) => listing.bedrooms == bedroomCount);
    }

    setFilteredListings(filtered);
  }, [selectedRegions, minPrice, maxPrice, minArea, maxArea, listings, bedroomCount]);

  const fetchData = async () => {
    setLoading(true);
    const listings = await fetchListings(); // Call the function from api.ts
    if (listings) {
      setListings(listings);
      setFilteredListings(listings);
    }
    setLoading(false);
  };

  // Handle filter event from Filter component
  const handleFilter = (
    regions: number[],
    minPrice?: number,
    maxPrice?: number,
    minArea?: number,
    maxArea?: number,
    bedroomCount?: number,
  ) => {
    setSelectedRegions(regions);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setMinArea(minArea);
    setMaxArea(maxArea);
    setBedroomCount(bedroomCount);
  };
  

  return (
    <>
      <Filter onFilter={handleFilter} />
      <ActiveFilters 
        selectedRegions={selectedRegions} 
        setSelectedRegions={setSelectedRegions}
        minPrice={minPrice} 
        setMinPrice={setMinPrice}
        maxPrice={maxPrice} 
        setMaxPrice={setMaxPrice}
        minArea={minArea} 
        setMinArea={setMinArea}
        maxArea={maxArea} 
        setMaxArea={setMaxArea}
        bedroomCount={bedroomCount} 
        setBedroomCount={setBedroomCount}
      />
      {loading ? (
        <SkeletonLoader /> // Show skeleton loader while loading
      ) : filteredListings.length > 0 ? (
        <div className="mt-8 grid grid-cols-4 gap-5">
          {filteredListings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="w-full mt-[65px] text-black/80 text-xl leading-6">აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
      )}
    </>
  );
};

export default Home;
