import { useEffect, useState } from "react";
import Filter from "../partials/Filter";
import Listing from "../partials/Listing";
import { Inputs } from "../lib/types";

const Home = () => {
  const [listings, setListings] = useState<Inputs[]>([]);
  const [filteredListings, setFilteredListings] = useState<Inputs[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minArea, setMinArea] = useState<number | undefined>(undefined);
  const [maxArea, setMaxArea] = useState<number | undefined>(undefined);
  const [bedroomCount, setBedroomCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchListings();
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

  const fetchListings = async () => {
    const token = "9d040684-0d70-417e-8eb3-3ffdfa7dca5c";
    try {
      const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const listings = await response.json();
      if (listings) {
        setListings(listings);
        setFilteredListings(listings); // Initially show all listings
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      return null;
    }
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
      {filteredListings.length > 0 ? (
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
