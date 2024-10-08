import ButtonGrey from "../components/ButtonGrey";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Inputs } from "../lib/types";
import { Modal } from "flowbite-react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";

const ListingDetails = () => {
    const [openModal, setOpenModal] = useState(false);

    const { listingId } = useParams();
    const [listing, setListing] = useState<Inputs>();
    
    const navigate = useNavigate();

    const fetchListing = useCallback(async () => {
        const token = '9d040684-0d70-417e-8eb3-3ffdfa7dca5c';
        const url = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${listingId}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token here
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data: Inputs = await response.json();
            setListing(data);
        } catch (error) {
            console.error('Error fetching listing:', error);
        }
    }, [listingId]);

    const handleDelete = async () => {
        const token = "9d040684-0d70-417e-8eb3-3ffdfa7dca5c";
        const url = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${listingId}`;
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            // Redirect or update the UI after successful deletion
            console.log("Listing deleted successfully");
            navigate('/'); // Redirect to listings page or wherever appropriate
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error deleting listing:", error);
        }
    };

    useEffect(() => {
        fetchListing();
    }, [fetchListing]);
    
    if(listing){

    const formattedPrice = new Intl.NumberFormat('en-US', {
        useGrouping: true,
        maximumFractionDigits: 0,
    }).format(listing.price);

    const formatDate = (dateString:string) => {
        // Parse the date string into a Date object
        const date = new Date(dateString);
    
        // Extract day, month, and year
        const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure two digits
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
    
        // Format the date as MM/DD/YY
        return `${month}/${day}/${year}`;
    };

        return (
            <div className="mt-[29px] flex gap-[68px] text-darkGrey">
                {/* image + date */}
                <div className="w-full max-w-[839px]">
                    <div className="relative">
                        <span className="absolute top-[41px] left-[41px] px-[26.5px] py-[8.5px] bg-black/50 text-white font-medium text-[1.25rem] leading-6 rounded-[20px]">
                            <p className="-translate-y-[2px]">{listing.is_rental ? 'ქირავდება' : 'იყიდება'}</p>
                        </span>
                        <img src={listing.image} alt="" className="h-[670px] object-cover rounded-t-[14px]" />
                    </div>
                    <div className="mt-[11px] flex items-center justify-end gap-[10px] leading-[1.2rem]">
                        <p>გამოქვეყნების თარიღი</p>
                        <p>{listing.created_at ? formatDate(listing.created_at) : ''}</p>
                    </div>
                </div>

                {/* listing details */}
                <div className="mt-[30px]">
                    {/* price */}
                    <span className="text-black font-bold text-[3rem] leading-[3.6rem]">{formattedPrice} ₾</span>
                    {/* deeper details */}
                    <div className="mt-6 flex flex-col gap-4 text-[1.5rem] leading-[1.75rem]">
                        <div className="mt-[6px] flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="#021526" fillOpacity="0.5"/>
                            </svg>
                            <p className=" leading-[1.2rem] ">{listing.city ? listing.city.name : ''}, {listing.address}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16ZM9 3H15V9H13V5H9V3ZM3 9H5V13H9V15H3V9Z" fill="#021526" fillOpacity="0.5"/>
                            </svg>
                            <p className=" leading-[1.2rem] ">ფართი {listing.area} მ<span className="mb-[7px] text-[0.625rem] leading-[0.75rem]">2</span></p>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.25 10.8141C19.7772 10.6065 19.2664 10.4996 18.75 10.5H5.25C4.73368 10.4995 4.22288 10.6063 3.75 10.8136C3.08166 11.1059 2.51294 11.5865 2.11336 12.1968C1.71377 12.8071 1.50064 13.5205 1.5 14.25V19.5C1.5 19.6989 1.57902 19.8897 1.71967 20.0303C1.86032 20.171 2.05109 20.25 2.25 20.25C2.44891 20.25 2.63968 20.171 2.78033 20.0303C2.92098 19.8897 3 19.6989 3 19.5V19.125C3.00122 19.0259 3.04112 18.9312 3.11118 18.8612C3.18124 18.7911 3.27592 18.7512 3.375 18.75H20.625C20.7241 18.7512 20.8188 18.7911 20.8888 18.8612C20.9589 18.9312 20.9988 19.0259 21 19.125V19.5C21 19.6989 21.079 19.8897 21.2197 20.0303C21.3603 20.171 21.5511 20.25 21.75 20.25C21.9489 20.25 22.1397 20.171 22.2803 20.0303C22.421 19.8897 22.5 19.6989 22.5 19.5V14.25C22.4993 13.5206 22.2861 12.8073 21.8865 12.1971C21.4869 11.5869 20.9183 11.1063 20.25 10.8141Z" fill="#021526" fillOpacity="0.5"/>
                                <path d="M17.625 3.75H6.375C5.67881 3.75 5.01113 4.02656 4.51884 4.51884C4.02656 5.01113 3.75 5.67881 3.75 6.375V9.75C3.75002 9.77906 3.75679 9.80771 3.76979 9.8337C3.78278 9.85969 3.80163 9.8823 3.82486 9.89976C3.84809 9.91721 3.87505 9.92903 3.90363 9.93428C3.93221 9.93953 3.96162 9.93806 3.98953 9.93C4.39897 9.81025 4.82341 9.74964 5.25 9.75H5.44828C5.49456 9.75029 5.53932 9.73346 5.57393 9.70274C5.60855 9.67202 5.63058 9.62958 5.63578 9.58359C5.67669 9.21712 5.85115 8.87856 6.12586 8.63256C6.40056 8.38656 6.75625 8.25037 7.125 8.25H9.75C10.119 8.25003 10.475 8.38606 10.75 8.63209C11.025 8.87812 11.1997 9.21688 11.2406 9.58359C11.2458 9.62958 11.2679 9.67202 11.3025 9.70274C11.3371 9.73346 11.3818 9.75029 11.4281 9.75H12.5747C12.621 9.75029 12.6657 9.73346 12.7003 9.70274C12.735 9.67202 12.757 9.62958 12.7622 9.58359C12.8031 9.21736 12.9773 8.87899 13.2517 8.63303C13.5261 8.38706 13.8815 8.25072 14.25 8.25H16.875C17.244 8.25003 17.6 8.38606 17.875 8.63209C18.15 8.87812 18.3247 9.21688 18.3656 9.58359C18.3708 9.62958 18.3929 9.67202 18.4275 9.70274C18.4621 9.73346 18.5068 9.75029 18.5531 9.75H18.75C19.1766 9.74979 19.6011 9.81057 20.0105 9.93047C20.0384 9.93854 20.0679 9.94 20.0965 9.93473C20.1251 9.92945 20.1521 9.91759 20.1753 9.90009C20.1986 9.88258 20.2174 9.8599 20.2304 9.83385C20.2433 9.8078 20.2501 9.7791 20.25 9.75V6.375C20.25 5.67881 19.9734 5.01113 19.4812 4.51884C18.9889 4.02656 18.3212 3.75 17.625 3.75Z" fill="#021526" fillOpacity="0.5"/>
                            </svg>
                            <p className=" leading-[1.2rem] ">საძინებელი {listing.bedrooms}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.01717 0.338139C6.80803 0.554674 6.69051 0.848379 6.69045 1.15465V4.14122H1.11507C0.819339 4.14122 0.535715 4.2629 0.326598 4.47948C0.117481 4.69607 0 4.98982 0 5.29612V9.91571C0 10.222 0.117481 10.5158 0.326598 10.7323C0.535715 10.9489 0.819339 11.0706 1.11507 11.0706H6.69045V18H8.9206V11.0706H12.859C13.0225 11.0705 13.1839 11.0333 13.3319 10.9614C13.4799 10.8896 13.6108 10.7849 13.7154 10.6548L15.8709 7.97548C15.9543 7.87172 16 7.74095 16 7.60591C16 7.47088 15.9543 7.34011 15.8709 7.23635L13.7154 4.55698C13.6108 4.42691 13.4799 4.32225 13.3319 4.2504C13.1839 4.17856 13.0225 4.14128 12.859 4.14122H8.9206V1.15465C8.92055 0.926271 8.85513 0.703031 8.7326 0.513154C8.61007 0.323278 8.43594 0.175289 8.23221 0.0878981C8.02849 0.000506892 7.80432 -0.0223635 7.58805 0.0221781C7.37178 0.0667197 7.17311 0.176673 7.01717 0.338139Z" fill="#021526" fillOpacity="0.5"/>
                            </svg>
                            <p className=" leading-[1.2rem] ">საფოსტო ინდექსი {listing.zip_code}</p>
                        </div>
                    </div>
                    
                    <div className="max-w-[503px]">
                        {/* description */}
                        <p className="mt-10 leading-[1.625rem] max-h-[78px] overflow-hidden">
                            {listing.description}
                        </p>
                    
                        {/* agent details */}
                        <div className="mt-[50px] mb-5 px-5 py-6 border border-solid border-grey rounded-lg">
                            <div className="flex items-center gap-[14px]">
                                <img src={listing.agent ? listing.agent.avatar : ''} alt="agent" className="w-[72px] h-[72px] rounded-full object-cover overflow-hidden" />
                                <div>
                                    <span className="text-black leading-[1.2rem]">{listing.agent ? listing.agent.name : ''}</span>
                                    <p className="mt-1">აგენტი</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center gap-[5px]">
                                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.84341e-05 2.15414C-1.95112e-05 2.16127 -3.14003e-05 2.16839 6.24258e-05 2.17551V10.8333C6.24258e-05 12.0266 0.980211 13 2.18186 13H13.8181C15.0198 13 15.9999 12.0266 15.9999 10.8333V2.1756C16 2.16841 16 2.16122 15.9999 2.15404C15.993 0.966489 15.0155 0 13.8181 0H2.18186C0.984418 0 0.00692812 0.966547 9.84341e-05 2.15414ZM1.53211 1.84452C1.65238 1.60833 1.89971 1.44444 2.18186 1.44444H13.8181C14.1003 1.44444 14.3476 1.60833 14.4679 1.84452L8 6.34064L1.53211 1.84452ZM14.5454 3.55381V10.8333C14.5454 11.2289 14.2165 11.5556 13.8181 11.5556H2.18186C1.78353 11.5556 1.4546 11.2289 1.4546 10.8333V3.55381L7.58294 7.81389C7.83335 7.98796 8.16665 7.98796 8.41706 7.81389L14.5454 3.55381Z" fill="#808A93"/>
                                    </svg>
                                    <span className="text-[0.875rem] leading-[1.05rem]">{listing.agent ? listing.agent.email : ''}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-[5px]">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.08632 3.45996C9.69678 3.57906 10.2578 3.87762 10.6976 4.31742C11.1374 4.75722 11.436 5.31825 11.5551 5.92871M9.08632 0.959961C10.3546 1.10086 11.5373 1.66882 12.4402 2.57059C13.3431 3.47236 13.9126 4.65434 14.0551 5.92246M13.4301 10.91V12.785C13.4308 12.959 13.3951 13.1313 13.3254 13.2908C13.2557 13.4503 13.1534 13.5935 13.0251 13.7111C12.8969 13.8288 12.7454 13.9184 12.5805 13.9742C12.4157 14.0299 12.2409 14.0506 12.0676 14.035C10.1443 13.826 8.29695 13.1688 6.67382 12.1162C5.16372 11.1566 3.88341 9.87632 2.92382 8.36621C1.86756 6.73571 1.21022 4.87933 1.00507 2.94746C0.989455 2.77463 1.00999 2.60044 1.06539 2.43598C1.12078 2.27152 1.2098 2.12039 1.3268 1.99222C1.4438 1.86406 1.5862 1.76165 1.74494 1.69154C1.90368 1.62142 2.07529 1.58512 2.24882 1.58496H4.12382C4.42714 1.58198 4.72119 1.68939 4.95117 1.88717C5.18116 2.08495 5.33137 2.35962 5.37382 2.65996C5.45296 3.26 5.59973 3.84917 5.81132 4.41621C5.89541 4.63991 5.91361 4.88303 5.86376 5.11676C5.81392 5.35049 5.69811 5.56503 5.53007 5.73496L4.73632 6.52871C5.62605 8.09343 6.92161 9.38899 8.48632 10.2787L9.28007 9.48496C9.45 9.31692 9.66454 9.20112 9.89827 9.15127C10.132 9.10142 10.3751 9.11962 10.5988 9.20371C11.1659 9.41531 11.755 9.56207 12.3551 9.64121C12.6587 9.68404 12.9359 9.83697 13.1342 10.0709C13.3324 10.3048 13.4377 10.6034 13.4301 10.91Z" stroke="#808A93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-[0.875rem] leading-[1.05rem]">{listing.agent ? listing.agent.phone : ''}</span>
                                </div>
                            </div>
                        </div>
                        <ButtonGrey text="ლისტინგის წაშლა" onClick={() => setOpenModal(true)} />
                    </div>
                    <Modal dismissible show={openModal} size={'2xl'} onClose={() => setOpenModal(false)}>
                        <Modal.Body>
                            <div className="p-9 flex flex-col justify-center items-center gap-9">
                                <p className="text-xl leading-6 text-black">გსურთ წაშალოთ ლისტინგი?</p>
                                <div className="flex items-center gap-4">
                                    <ButtonSecondary text="გაუქმება" onClick={() => setOpenModal(false)} />
                                    <ButtonPrimary text="დადასტურება" onClick={handleDelete} />
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ListingDetails