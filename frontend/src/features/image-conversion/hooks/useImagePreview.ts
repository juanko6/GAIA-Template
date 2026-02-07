// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T03]

import { useState, useEffect } from 'react';

export const useImagePreview = (file: File | null) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Cleanup memory on unmount or file change
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    return previewUrl;
};
