import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';

export const useFormLogic = <T extends FieldValues>(endpoint: 'agents' | 'real-estates', setOpenModal?: (open: boolean) => void) => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = useForm<T>();

    const onSubmit: SubmitHandler<T> = async (data) => {
        const token = '9d040684-0d70-417e-8eb3-3ffdfa7dca5c';
        const baseUrl = 'https://api.real-estate-manager.redberryinternship.ge/api/';
        const url = `${baseUrl}${endpoint}`;

        // Create a FormData object for real-estates or agents
        const formData = new FormData();

        if (endpoint === 'agents') {
            formData.append('name', data.name as string);
            formData.append('surname', data.surname as string);
            formData.append('email', data.email as string);
            formData.append('phone', data.phone as string);

            if (data.avatar && data.avatar[0]) {
                formData.append('avatar', data.avatar[0] as File);
            } else {
                console.error('Avatar file is missing or not properly selected');
                return;
            }
        } else if (endpoint === 'real-estates') {
            formData.append('price', data.price as string);
            formData.append('zip_code', data.zip_code as string);
            formData.append('description', data.description as string);
            formData.append('area', data.area as string);
            
            // Ensure city_id and region_id are appended as strings
            formData.append('city_id', (data.city_id as number).toString());
            formData.append('region_id', (data.region_id as number).toString());
            formData.append('agent_id', (data.agent_id as number).toString());
            
            formData.append('address', data.address as string);
            formData.append('bedrooms', data.bedrooms as string);
            formData.append('is_rental', data.is_rental as string);
            console.log(data);
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0] as File); // Ensure it's a File object for image uploads
            } else {
                console.error('Image file is missing or not properly selected');
                return;
            }
        }

        // Use axios to make the POST request
        try {
            const response =
             await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            console.log('Form submission successful:', response.data);
            if (setOpenModal) {
                setOpenModal(false);
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Form submission failed with validation error:', error.response.data);
            } else {
                console.error('Form submission failed:', error);
            }
        }
    };

    return { register, handleSubmit, setValue, errors, isSubmitted, onSubmit };
};
