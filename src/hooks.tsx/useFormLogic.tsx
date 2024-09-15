import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';

export const useFormLogic = <T extends FieldValues>(endpoint: 'agents' | 'real-estates') => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = useForm<T>();

    const onSubmit: SubmitHandler<T> = async (data) => {
        const token = '9d040684-0d70-417e-8eb3-3ffdfa7dca5c';
        const baseUrl = 'https://api.real-estate-manager.redberryinternship.ge/api/';
        const url = `${baseUrl}${endpoint}`;

        // Create a FormData object to handle multipart form data
        const formData = new FormData();
        formData.append('name', data.name as string);
        formData.append('surname', data.surname as string);
        formData.append('email', data.email as string);
        formData.append('phone', data.phone as string);

        if (data.avatar && data.avatar[0]) {
            formData.append('avatar', data.avatar[0] as File); // Ensure it's a File object
        } else {
            console.error('Avatar file is missing or not properly selected');
            return;
        }

        // Use axios to make the POST request
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data' is automatically set by axios
                },
            });

            console.log('Form submission successful:', response.data);
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
