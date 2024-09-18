import ButtonPrimary from "../components/ButtonPrimary"
import ButtonSecondary from "../components/ButtonSecondary"
import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFormLogic } from "../hooks.tsx/useFormLogic";
import { Agents, Region } from "../lib/types";
import { useFileUpload } from "../hooks.tsx/useFileUpload";

interface FilterProps {
  onFilter: (selectedRegions: number[], minPrice?: number, maxPrice?: number) => void;
}

const Filter = ({ onFilter }: FilterProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, errors, isSubmitted, onSubmit } = useFormLogic<Agents>('agents', setOpenModal);
  const { imagePreview, isPreviewVisible, handleFileChange, handleDelete } = useFileUpload();

  const regionDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

  // region filter
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [showRegionOptions, setShowRegionOptions] = useState(false);

  // price filter
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  const fetchRegions = async () => {
    try {
      const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions");
      const data: Region[] = await response.json();
      setRegions(data);
    } catch (error) {
      console.error("Failed to fetch regions", error);
    }
  };

  useEffect(() => {
    fetchRegions();
    const handleClickOutside = (event: MouseEvent) => {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
        setShowRegionOptions(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setShowPriceOptions(false);
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
    onFilter(selectedRegions, minPrice || undefined, maxPrice || undefined); // Pass minPrice and maxPrice to parent component
  };

  return (
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

          <li className="px-[14px] py-2">ფართობი</li>
          <li className="px-[14px] py-2">საძინებლების რაოდენობა</li>
        </div>

        {/* buttons */}
        <div className="flex justify-center items-center gap-4">
          <Link to='/addListing'>
            <ButtonPrimary text="ლისტინგის დამატება" />
          </Link>
          <ButtonSecondary text="აგენტის დამატება" onClick={() => setOpenModal(true)} />
        </div>

        {/* add agent */}
        <Modal dismissible show={openModal} size={'5xl'} onClose={() => setOpenModal(false)}>
          <Modal.Body>
            <div className="py-[63px] px-[81px]">
              <h2 className="font-medium text-[2rem] leading-[2.4rem] text-center">აგენტის დამატება</h2>

              <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-[61px]">
                <div className="grid grid-cols-2 gap-7">
                  {/* name */}
                  <div>
                    <label htmlFor="name" className="font-medium text-sm leading-[1.05rem]">სახელი *</label>
                    <input {...register("name", { required: true, minLength: 2, pattern: /^[A-Za-z]+$/ })} 
                        type="text" id="name" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.name ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.name ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.name ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მინიმუმ ორი სიმბოლო
                        </p>
                    </div>
                  </div>

                  {/* surname */}
                  <div>
                    <label htmlFor="surname" className="font-medium text-sm leading-[1.05rem]">გვარი *</label>
                    <input {...register("surname", { required: true, minLength: 2, pattern: /^[A-Za-z]+$/ })} 
                        type="text" id="surname" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.surname ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.surname ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.surname ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მინიმუმ ორი სიმბოლო
                        </p>
                    </div>
                  </div>

                  {/* email */}
                  <div>
                    <label htmlFor="email" className="font-medium text-sm leading-[1.05rem]">ელ-ფოსტა *</label>
                    <input {...register("email", { required: true, minLength: 2, validate: (value) => value.includes('@redberry.ge') })} 
                        type="text" id="email" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.email ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.email ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.email ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                          გამოიყენეთ @redberry.ge ფოსტა
                        </p>
                    </div>
                  </div>

                  {/* phone */}
                  <div>
                    <label htmlFor="phone" className="font-medium text-sm leading-[1.05rem]">ტელეფონის ნომერი *</label>
                    <input {...register("phone", { required: true, pattern: /^[0-9]+$/})} 
                        type="text" id="phone" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.phone ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.phone ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.phone ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მხოლოდ რიცხვები
                        </p>
                    </div>
                  </div>
                </div>

                {/* image */}
                <div className="mt-5">
                    <label htmlFor="avatar" className="font-medium text-sm leading-[1.05rem]">ატვირთეთ ფოტო *</label>
                    <div className={`relative mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.avatar ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md overflow-hidden`}>
                        <input 
                            type="file" 
                            id="avatar"
                            className="absolute -top-5 left-0 w-full h-[calc(100%+20px)]"
                            {...register("avatar", {
                                required: true,
                                validate: fileList => fileList.length > 0 ? true : "ფოტო უნდა აირჩიოთ",
                            })}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="avatar">
                            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 8V16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 12H16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                        {isPreviewVisible && (
                            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <img id="avatar-preview" src={imagePreview} alt="" className="max-h-[82px] rounded-[4px]" />
                                <svg 
                                    id="delete-preview" 
                                    onClick={handleDelete} 
                                    className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 cursor-pointer" 
                                    width="24" height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#021526"/>
                                    <path d="M6.75 8.5H7.91667H17.25" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.0834 8.50033V16.667C16.0834 16.9764 15.9605 17.2732 15.7417 17.492C15.5229 17.7107 15.2262 17.8337 14.9167 17.8337H9.08341C8.774 17.8337 8.47725 17.7107 8.25846 17.492C8.03966 17.2732 7.91675 16.9764 7.91675 16.667V8.50033M9.66675 8.50033V7.33366C9.66675 7.02424 9.78966 6.72749 10.0085 6.5087C10.2272 6.28991 10.524 6.16699 10.8334 6.16699H13.1667C13.4762 6.16699 13.7729 6.28991 13.9917 6.5087C14.2105 6.72749 14.3334 7.02424 14.3334 7.33366V8.50033" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.8333 11.417V14.917" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.1667 11.417V14.917" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        )}
                    </div>
                    
                </div>
              {/* buttons */}
              <div className="mt-[94px] w-full flex justify-end items-center gap-[15px]">
                  <ButtonSecondary text="გაუქმება" onClick={() => setOpenModal(false)} />
                  <ButtonPrimary text="დაამატე აგენტი" type="submit" />
              </div>
              </form>
              
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default Filter