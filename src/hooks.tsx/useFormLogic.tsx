import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

export const useFormLogic = <T extends FieldValues>() => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = useForm<T>();

    // Define the onSubmit handler
    const onSubmit: SubmitHandler<T> = (data) => {
        // Handle form submission here
        console.log(data);
    };

    // Return methods and properties for use in components
    return { register, handleSubmit, setValue, errors, isSubmitted, onSubmit };
};
