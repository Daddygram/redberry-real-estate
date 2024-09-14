import { useState } from 'react';

export const useFileUpload = () => {
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);

    // Handle file changes and image preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Create a preview of the uploaded image
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
                setIsPreviewVisible(true);
            };
            reader.readAsDataURL(file);

            // Only keep the first file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
        }
    };

    // Handle deletion of the image preview
    const handleDelete = () => {
        setImagePreview('');
        setIsPreviewVisible(false);
        // Clear the file input value
        const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';  // Clear the file input value
        }
    };

    return {
        imagePreview,
        isPreviewVisible,
        handleFileChange,
        handleDelete,
    };
};
