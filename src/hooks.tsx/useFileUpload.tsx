import { useState } from 'react';

export const useFileUpload = (imagePreviewLocalStorageKey: string) => {
    const [imagePreview, setImagePreview] = useState<string>(localStorage.getItem(imagePreviewLocalStorageKey) || '');
    const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(!!localStorage.getItem(imagePreviewLocalStorageKey));
    const [imageError, setImageError] = useState<string>(''); // State to hold validation error

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Validate file type and size
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validImageTypes.includes(file.type)) {
                setImageError('უნდა იყოს სურათის ტიპი');
                return;
            }
            if (file.size > 1048576) { // 1MB in bytes
                setImageError('არ უნდა აღებმატებოდეს 1mb-ის ზომაში');
                return;
            }

            setImageError('');
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImagePreview(result);
                setIsPreviewVisible(true);

                // Store in localStorage using the key
                localStorage.setItem(imagePreviewLocalStorageKey, result);
            };
            reader.readAsDataURL(file);

            // Only keep the first file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
        }
    };

    const handleDelete = () => {
        setImagePreview('');
        setIsPreviewVisible(false);
        setImageError(''); // Clear any error on delete

        // Clear the image preview from localStorage using the key
        localStorage.removeItem(imagePreviewLocalStorageKey);

        // Clear the file input value
        const fileInput = document.querySelector<HTMLInputElement>(`input[type="file"]`);
        if (fileInput) {
            fileInput.value = '';  // Clear the file input value
        }
    };

    return {
        imagePreview,
        isPreviewVisible,
        handleFileChange,
        handleDelete,
        imageError,
    };
};
