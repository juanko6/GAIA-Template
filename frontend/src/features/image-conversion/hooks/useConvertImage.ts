// [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-FE-T03]

import { useState } from 'react';
import { UploadResponse, ConvertResponse, ApiError } from '../api/types';

// TODO: Move to a shared config or env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8005/api/v1';

interface UseConvertImageResult {
    convert: (file: File, targetFormat: string) => Promise<ConvertResponse | null>;
    isLoading: boolean;
    error: string | null;
    status: 'idle' | 'uploading' | 'converting' | 'success' | 'error';
    reset: () => void;
}

export const useConvertImage = (): UseConvertImageResult => {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'converting' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setStatus('idle');
        setError(null);
    };

    const convert = async (file: File, targetFormat: string): Promise<ConvertResponse | null> => {
        setError(null);

        try {
            // 1. Upload
            setStatus('uploading');
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) {
                const errData = await uploadRes.json() as ApiError;
                throw new Error(errData.detail || 'Error uploading file');
            }

            const uploadData = await uploadRes.json() as UploadResponse;
            const fileId = uploadData.file_id;

            // 2. Convert
            setStatus('converting');
            const convertRes = await fetch(`${API_BASE_URL}/convert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file_id: fileId,
                    target_format: targetFormat,
                }),
            });

            if (!convertRes.ok) {
                const errData = await convertRes.json() as ApiError;
                throw new Error(errData.detail || 'Error converting file');
            }

            const convertData = await convertRes.json() as ConvertResponse;
            setStatus('success');
            return convertData;

        } catch (err) {
            setStatus('error');
            const message = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(message);
            return null;
        }
    };

    return { convert, isLoading: status === 'uploading' || status === 'converting', error, status, reset };
};
