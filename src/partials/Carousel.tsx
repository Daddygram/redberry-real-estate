import { useEffect, useState } from 'react';
import Listing from './Listing';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper'; // Import the Swiper type

import 'swiper/css';
import 'swiper/css/navigation';
import { Inputs } from '../lib/types';


const Carousel = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const [listings, setListings] = useState<Inputs[]>([]);

  useEffect(() => {
    fetchListings()
  }, [])

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
        <h2 className='my-[52px] font-medium text-[2rem] leading-[2.4rem]'>ბინები მსგავს ლოკაციაზე</h2>
        <div className='relative'>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                loop={true}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
            >
                {listings.slice(0, 8).map(listing => (
                    <SwiperSlide key={listing.id}><Listing key={listing.id} listing={listing} /></SwiperSlide>
                ))}
            </Swiper>
  
            {/* swiper buttons */}
            <button className='absolute z-10 top-1/2 -left-[65px]' onClick={() => swiperInstance?.slidePrev()}>
                <svg className='rotate-180' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1161 5.36612C14.6043 4.87796 15.3957 4.87796 15.8839 5.36612L24.6339 14.1161C25.122 14.6043 25.122 15.3957 24.6339 15.8839L15.8839 24.6339C15.3957 25.122 14.6043 25.122 14.1161 24.6339C13.628 24.1457 13.628 23.3543 14.1161 22.8661L20.7322 16.25H6.25C5.55964 16.25 5 15.6904 5 15C5 14.3096 5.55964 13.75 6.25 13.75H20.7322L14.1161 7.13388C13.628 6.64573 13.628 5.85427 14.1161 5.36612Z" fill="#021526"/>
                </svg>
            </button>

            <button className='absolute z-10 top-1/2 -right-[65px]' onClick={() => swiperInstance?.slideNext()}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1161 5.36612C14.6043 4.87796 15.3957 4.87796 15.8839 5.36612L24.6339 14.1161C25.122 14.6043 25.122 15.3957 24.6339 15.8839L15.8839 24.6339C15.3957 25.122 14.6043 25.122 14.1161 24.6339C13.628 24.1457 13.628 23.3543 14.1161 22.8661L20.7322 16.25H6.25C5.55964 16.25 5 15.6904 5 15C5 14.3096 5.55964 13.75 6.25 13.75H20.7322L14.1161 7.13388C13.628 6.64573 13.628 5.85427 14.1161 5.36612Z" fill="#021526"/>
                </svg>
            </button>
        </div>
  
        {/* for better visual */}
        <div className='mb-[200px]'></div>
      </>
    );
  }
  
  export default Carousel;
  
