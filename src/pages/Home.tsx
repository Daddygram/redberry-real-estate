import { useEffect, useState } from "react";
import Filter from "../partials/Filter"
import Listing from "../partials/Listing"
import { Inputs } from "../lib/types";

const Home = () => {
  const [listings, setListings] = useState<Inputs[]>([]);

  useEffect(() => {
    fetchListings()
  }, [])

  console.log(listings[0])

  const fetchListings = async () => {
    const token = '9d040684-0d70-417e-8eb3-3ffdfa7dca5c';
      try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add token here
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const listings = await response.json();
        if (listings) {
          setListings(listings)
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
        return null;
    }
  }
  return (
    <>
        <Filter />
        <div className="mt-8 grid grid-cols-4 gap-5">
          {listings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
    </>
  )
}

export default Home