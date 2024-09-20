import { useState, useEffect } from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import { Agents, City, Inputs, Region } from "../lib/types";
import { useFormLogic } from "../hooks.tsx/useFormLogic";
import { useFileUpload } from "../hooks.tsx/useFileUpload";
import { Modal } from "flowbite-react";
import { useWatch } from "react-hook-form";
import { fetchAgents, fetchCities, fetchRegions } from "../utils/ApiUtils";



const AddListing = () => {
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit, control, setValue, errors, isSubmitted, onSubmit } = useFormLogic<Inputs>('real-estates');
    const { register: registerAgent, handleSubmit: handleAgentSubmit, control: agentControl, setValue: setAgentValue, errors: agentErrors, isSubmitted: isAgentSubmitted, onSubmit: onAgentSubmit } = useFormLogic<Agents>('agents', setOpenModal);

    // Watching the form values
    const formValues = useWatch({ control });
    const agentFormValues = useWatch({ control: agentControl })

    // Load saved form data from local storage
    useEffect(() => {
        const savedFormData = localStorage.getItem('addListingForm');
        const savedAgentFormData = localStorage.getItem('addAgentForm');
        if (savedFormData) {
            const parsedFormData = JSON.parse(savedFormData);
            Object.keys(parsedFormData).forEach((key) => {
                setValue(key as keyof Inputs, parsedFormData[key]);
            });
        }
        if (savedAgentFormData) {
            const parsedFormData = JSON.parse(savedAgentFormData);
            Object.keys(parsedFormData).forEach((key) => {
                setAgentValue(key as keyof Agents, parsedFormData[key]);
            });
        }
    }, [setAgentValue, setValue]);

    // Save form data to local storage whenever form changes
    useEffect(() => {
        localStorage.setItem('addListingForm', JSON.stringify(formValues));
    }, [formValues]);

    // Save agent form data to local storage (if required)
    useEffect(() => {
        localStorage.setItem('addAgentForm', JSON.stringify(agentFormValues));
    }, [agentFormValues]);

    // city & region states
    const [regions, setRegions] = useState<Region[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [showRegionOptions, setShowRegionOptions] = useState(false);
    const [showCityOptions, setShowCityOptions] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // Agents States
    const [agents, setAgents] = useState<Agents[]>([]);
    const [showAgentOptions, setShowAgentOptions] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

    // Fetch regions and cities on component mount
    useEffect(() => {
        const loadInitialData = async () => {
          const regionsData = await fetchRegions();
          const citiesData = await fetchCities();
          const agentsData = await fetchAgents();
          setRegions(regionsData);
          setCities(citiesData);
          setAgents(agentsData);
        };
        loadInitialData();
      }, []);

    useEffect(() => {
        fetchAgents();
    }, [onAgentSubmit]);

    useEffect(() => {
        // Filter cities based on selected region
        if (selectedRegionId !== null) {
            const filtered = cities.filter(city => city.region_id === selectedRegionId);
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    }, [selectedRegionId, cities]);

    const handleRegionSelect = (region: Region) => {
        setSelectedRegion(region.name);
        setSelectedRegionId(region.id); // Set selected region ID
        setValue("region_id", region.id); // Update the form value for region
        setShowRegionOptions(false);
        setSelectedCity(null); // Reset selected city
        setValue("city_id", 0); // Clear the city value in the form
    };

    const handleCitySelect = (city: City) => {
        setSelectedCity(city.name);
        setValue("city_id", city.id); // Update the form value for city
        setShowCityOptions(false);
    };

    const { imagePreview, isPreviewVisible, handleFileChange, handleDelete } = useFileUpload('listingImagePreview');
    const { imagePreview: agentImagePreview, isPreviewVisible: isAgentPreviewVisible, handleFileChange: handleAgentFileChange, handleDelete: handleAgentDelete } = useFileUpload('agentImagePreview');
    
    const handleAgentSelect = (agent: Agents) => {
        setSelectedAgent(agent.name);
        setValue("agent_id", agent.id);
        setShowAgentOptions(false);
    };

    return (
    <div className="mt-[62px] max-w-[790px] mx-auto text-black">
        <h1 className="font-medium text-[2rem] leading-[2.4rem] text-center">ლისტინგის დამატება</h1>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
            {/* sell type */}
            <p className="mt-[61px] mb-2 font-medium text-blackSecondary leading-[1.221rem]">გარიგების ტიპი</p>
            <div className="flex items-center gap-20">
                <span className="radio flex justify-start items-center gap-2">
                    <input {...register("is_rental", { required: true, valueAsNumber: true })} type="radio" id="sell" value={0}/>
                    <label htmlFor="sell" className="radio-label text-sm leading-[1.05rem]">იყიდება</label>
                </span>
                <span className="radio flex justify-start items-center gap-2">
                    <input {...register("is_rental", { required: true, valueAsNumber: true })} type="radio" id="rent" value={1} />
                    <label htmlFor="rent" className="radio-label text-sm leading-[1.05rem]">ქირავდება</label>
                </span>
            </div>
            
            {/* location */}
            <p className="mt-20 mb-2 font-medium text-blackSecondary leading-[1.221rem]">მდებარეობა</p>
            <div className="mt-[22px] grid grid-cols-2 gap-5">
                {/* address */}
                <div>
                    <label htmlFor="location" className="font-medium text-sm leading-[1.05rem]">მისამართი *</label>
                    <input {...register("address", { required: true, minLength: 2 })} 
                        type="text" id="location" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.address ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.address ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.address ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მინიმუმ ორი სიმბოლო
                        </p>
                    </div>
                </div>

                {/* post index */}
                <div>
                    <label htmlFor="postId" className="font-medium text-sm leading-[1.05rem]">საფოსტო ინდექსი *</label>
                    <input {...register("zip_code", { required: true, pattern: /^[0-9]+$/})} 
                        type="text" id="postId" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.zip_code ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.zip_code ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.zip_code ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მხოლოდ რიცხვები
                        </p>
                    </div>
                </div>

                {/* Region Dropdown */}
                <div>
                    <label htmlFor="region" className="font-medium text-sm leading-[1.05rem]">რეგიონი</label>
                    <div className="select-menu w-full relative">
                        <div className={`select flex items-center justify-between px-[10px] py-3 border border-solid ${errors.region_id ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-lg cursor-pointer`}
                            onClick={() => setShowRegionOptions(!showRegionOptions)}>
                            <span className="text-sm leading-4 text-black">{selectedRegion || "აირჩიეთ რეგიონი"}</span>
                            <svg className={`cityChevron transition-all duration-100 ${showRegionOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Options List for Regions */}
                        {showRegionOptions && (
                            <div className="options-list absolute w-full mt-1 bg-white text-sm leading-4 border-solid max-h-40 border-grey rounded-lg shadow-lg z-10 overflow-y-auto customScroll transition-all duration-100">
                                {regions.map((region) => (
                                    <div
                                        key={region.id}
                                        className="option py-2 px-4 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleRegionSelect(region)}
                                    >
                                        {region.name}
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            {...register("region_id", { required: true })}
                            type="hidden"
                            value={selectedRegion || ""}
                        />
                    </div>
                    {errors.region_id && (
                        <span className="text-redPrimary text-sm">რეგიონის არჩევა აუცილებელია</span>
                    )}
                </div>

                {/* City Dropdown */}
                <div>
                    <label htmlFor="city" className="font-medium text-sm leading-[1.05rem]">ქალაქი</label>
                    <div className="select-menu w-full relative">
                        <div className={`select flex items-center justify-between px-[10px] py-3 border border-solid ${errors.city_id ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-lg cursor-pointer`}
                            onClick={() => setShowCityOptions(!showCityOptions)}
                        >
                        <span className="text-sm leading-4 text-black">{selectedCity || "აირჩიეთ ქალაქი"}</span>
                        <svg className={`cityChevron transition-all duration-100 ${showCityOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </div>

                        {/* Options List for Cities */}
                        {showCityOptions && (
                            <div className="options-list absolute w-full mt-1 bg-white text-sm leading-4 border-solid max-h-40 border-grey rounded-lg shadow-lg z-10 overflow-y-auto customScroll transition-all duration-100">
                                {filteredCities.map((city) => (
                                    <div
                                        key={city.id}
                                        className="option py-2 px-4 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleCitySelect(city)}
                                    >
                                        {city.name}
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            id="city"
                            {...register("city_id", { required: true })}
                            type="hidden"
                            value={selectedCity || ""}
                        />
                    </div>
                    {errors.city_id && (
                        <span className="text-redPrimary text-sm">ქალაქის არჩევა აუცილებელია</span>
                    )}
                </div>
            </div>

            {/* appartment details */}
            <p className="mt-[100px] mb-2 font-medium text-blackSecondary leading-[1.221rem]">ბინის დეტალები</p>
            <div className="mt-[22px] grid grid-cols-2 gap-5">
                {/* price */}
                <div>
                    <label htmlFor="price" className="font-medium text-sm leading-[1.05rem]">ფასი</label>
                    <input {...register("price", { required: true })} 
                        type="number" id="price" step="0.01" min="0" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.price ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.price ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.price ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მხოლოდ რიცხვები
                        </p>
                    </div>
                </div>

                {/* area */}
                <div>
                    <label htmlFor="area" className="font-medium text-sm leading-[1.05rem]">ფართობი</label>
                    <input {...register("area", { required: true })} 
                        type="number" id="area" step="0.01" min="0" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.price ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.area ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.area ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მხოლოდ რიცხვები
                        </p>
                    </div>
                </div>

                {/* bedrooms count */}
                <div>
                    <label htmlFor="bedrooms" className="font-medium text-sm leading-[1.05rem]">საძინებლების რაოდენობა *</label>
                    <input {...register("bedrooms", { required: true })} 
                        type="number" id="bedrooms" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.price ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                    <div className="mt-1 flex items-center gap-[7px]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.bedrooms ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`text-sm leading-[1.05rem] ${errors.bedrooms ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                            მხოლოდ რიცხვები
                        </p>
                    </div>
                </div>
            </div>

            {/* description */}
            <div className="mt-5">
                <label htmlFor="description" className="font-medium text-sm leading-[1.05rem]">აღწერა *</label>
                <textarea {...register("description", { required: true, validate: value => value.trim().split(/\s+/).length >= 5 })} 
                    id="description" className={`mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${errors.description ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md resize-none`}/>
                <div className="mt-1 flex items-center gap-[7px]">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${errors.description ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className={`text-sm leading-[1.05rem] ${errors.description ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                        მინიმუმ ხუთი სიტყვა
                    </p>
                </div>
            </div>

            {/* image */}
            <div className="mt-5">
                <label htmlFor="image" className="font-medium text-sm leading-[1.05rem]">ატვირთეთ ფოტო *</label>
                <div className={`relative mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-dashed border-darkGrey ${errors.image ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md overflow-hidden`}>
                    <input 
                        type="file" 
                        id="image"
                        className="absolute -top-5 left-0 w-full h-[calc(100%+20px)]"
                        {...register("image", {
                            required: true,
                            validate: fileList => fileList.length > 0 ? true : "ფოტო უნდა აირჩიოთ",
                        })}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="image">
                        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8V16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 12H16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </label>
                    {isPreviewVisible && (
                        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <img id="image-preview" src={imagePreview} alt="" className="max-h-[82px] rounded-[4px]" />
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

            {/* agents */}
            <p className="mt-20 mb-2 font-medium text-blackSecondary leading-[1.221rem]">აგენტი</p>
            {/* Agent Dropdown */}
            <div className="grid grid-cols-2">
                <div className="select-menu w-full relative">
                    <div
                        className={`select flex items-center justify-between px-[10px] py-3 border border-solid ${errors.agent_id ? 'border-redPrimary' : isSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-lg cursor-pointer`}
                        onClick={() => setShowAgentOptions(!showAgentOptions)}
                    >
                        <span className="text-sm leading-4 text-black">{selectedAgent || "Select an Agent"}</span>
                        <svg className={`cityChevron transition-all duration-100 ${showAgentOptions ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {showAgentOptions && (
                        <div className="options-list absolute w-full mt-1 bg-white text-sm leading-4 border-solid max-h-40 border-grey rounded-lg shadow-lg z-10 overflow-y-auto customScroll transition-all duration-100">
                            <div
                                className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                                onClick={() => setOpenModal(true)}
                                >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8V16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 12H16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p>დაამატე აგენტი</p>
                            </div>
                            {agents.map(agent => (
                                <div
                                    key={agent.id}
                                    className="option py-2 px-4 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleAgentSelect(agent)}
                                >
                                    {agent.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <input
                        {...register("agent_id", { required: true })}
                        type="hidden"
                        value={selectedAgent || ""}
                    />
                </div>
                {errors.agent_id && (
                    <span className="text-redPrimary text-sm">Selecting an agent is required</span>
                )}
            </div>
            

            {/* buttons */}
            <div className="mt-[90px] w-full flex justify-end items-center gap-[15px]">
                <ButtonSecondary text="გაუქმება" />
                <ButtonPrimary text="დაამატე ლისტინგი" type="submit" />
            </div>
            
        </form>

                {/* add agent */}
        <Modal dismissible show={openModal} size={'5xl'} onClose={() => setOpenModal(false)}>
            <Modal.Body>
            <div className="py-[63px] px-[81px]">
                <h2 className="font-medium text-[2rem] leading-[2.4rem] text-center">აგენტის დამატება</h2>

                <form action="" onSubmit={handleAgentSubmit(onAgentSubmit)} className="mt-[61px]">
                <div className="grid grid-cols-2 gap-7">
                    {/* name */}
                    <div>
                        <label htmlFor="name" className="font-medium text-sm leading-[1.05rem]">სახელი *</label>
                        <input {...registerAgent("name", { required: true, minLength: 2 })} 
                            type="text" id="name" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${agentErrors.name ? 'border-redPrimary' : isAgentSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                        <div className="mt-1 flex items-center gap-[7px]">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${agentErrors.name ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className={`text-sm leading-[1.05rem] ${agentErrors.name ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                                მინიმუმ ორი სიმბოლო
                            </p>
                        </div>
                    </div>

                    {/* surname */}
                    <div>
                        <label htmlFor="surname" className="font-medium text-sm leading-[1.05rem]">გვარი *</label>
                        <input {...registerAgent("surname", { required: true, minLength: 2 })} 
                            type="text" id="surname" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${agentErrors.surname ? 'border-redPrimary' : isAgentSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                        <div className="mt-1 flex items-center gap-[7px]">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${agentErrors.surname ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className={`text-sm leading-[1.05rem] ${agentErrors.surname ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                                მინიმუმ ორი სიმბოლო
                            </p>
                        </div>
                    </div>

                    {/* email */}
                    <div>
                        <label htmlFor="email" className="font-medium text-sm leading-[1.05rem]">ელ-ფოსტა *</label>
                        <input {...registerAgent("email", { required: true, minLength: 2, validate: (value) => value.includes('@redberry.ge') })} 
                            type="text" id="email" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${agentErrors.email ? 'border-redPrimary' : isAgentSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                        <div className="mt-1 flex items-center gap-[7px]">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${agentErrors.email ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className={`text-sm leading-[1.05rem] ${agentErrors.email ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                                გამოიყენეთ @redberry.ge ფოსტა
                            </p>
                        </div>
                    </div>

                    {/* phone */}
                    <div>
                        <label htmlFor="phone" className="font-medium text-sm leading-[1.05rem]">ტელეფონის ნომერი *</label>
                        <input {...registerAgent("phone", { required: true, pattern: /^[0-9]+$/})} 
                            type="text" id="phone" className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${agentErrors.phone ? 'border-redPrimary' : isAgentSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md`}/>
                        <div className="mt-1 flex items-center gap-[7px]">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1.40918L3.125 9.591L0 5.87199" stroke={`${agentErrors.phone ? '#f93b1d' : isSubmitted ? '#45a849' : '#021526'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className={`text-sm leading-[1.05rem] ${agentErrors.phone ? 'text-redPrimary' : isSubmitted ? 'text-greenPrimary' : 'text-black'}`}>
                                მხოლოდ რიცხვები
                            </p>
                        </div>
                    </div>
                </div>

                {/* image */}
                <div className="mt-5">
                    <label htmlFor="avatar" className="font-medium text-sm leading-[1.05rem]">ატვირთეთ ფოტო *</label>
                    <div className={`relative mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-dashed border-darkGrey ${agentErrors.avatar ? 'border-redPrimary' : isAgentSubmitted ? 'border-greenPrimary' : 'border-black'} rounded-md overflow-hidden`}>
                        <input 
                            type="file" 
                            id="avatar"
                            className="absolute -top-5 left-0 w-full h-[calc(100%+20px)]"
                            {...registerAgent("avatar", {
                                required: true,
                                validate: fileList => fileList.length > 0 ? true : "ფოტო უნდა აირჩიოთ",
                            })}
                            onChange={handleAgentFileChange}
                        />
                        <label htmlFor="avatar">
                            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 8V16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 12H16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                        {isAgentPreviewVisible && (
                            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <img id="avatar-preview" src={agentImagePreview} alt="" className="max-h-[82px] rounded-[4px]" />
                                <svg 
                                    id="delete-preview" 
                                    onClick={handleAgentDelete} 
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
        {/* for better visual */}
        <div className="mb-[200px]"></div>
    </div>
  )
}

export default AddListing