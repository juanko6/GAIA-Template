// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T02]

import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { cn } from '../../../lib/utils';
import { UploadCloud, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
    onFileSelected: (file: File) => void;
    maxSizeMB?: number;
    acceptedFormats?: Record<string, string[]>;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
    onFileSelected,
    maxSizeMB = 20,
    acceptedFormats = {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
        'image/bmp': ['.bmp'],
        'image/gif': ['.gif']
    }
}) => {
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        setError(null);

        // Handle rejections (size or type)
        if (fileRejections.length > 0) {
            const rejection = fileRejections[0];
            if (rejection.errors[0].code === 'file-too-large') {
                setError(`El archivo es demasiado grande (Máx ${maxSizeMB}MB)`);
            } else if (rejection.errors[0].code === 'file-invalid-type') {
                setError("Formato no soportado. Usa JPG, PNG, WEBP, BMP o GIF.");
            } else {
                setError("Error al subir el archivo.");
            }
            return;
        }

        if (acceptedFiles.length > 0) {
            onFileSelected(acceptedFiles[0]);
        }
    }, [onFileSelected, maxSizeMB]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: maxSizeMB * 1024 * 1024,
        accept: acceptedFormats
    });

    return (
        <div className="w-full max-w-xl mx-auto space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors bg-white",
                    isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:bg-gray-50",
                    error ? "border-red-500 bg-red-50" : ""
                )}
            >
                <input {...getInputProps()} data-testid="dropzone-input" />

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className={cn("w-12 h-12 mb-3", isDragActive ? "text-primary" : "text-gray-400")} />
                    <p className="mb-2 text-sm text-gray-500 font-medium">
                        <span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                        JPG, PNG, WEBP, BMP o GIF (Máx. {maxSizeMB}MB)
                    </p>
                </div>
            </div>

            {error && (
                <div className="flex items-center text-sm text-red-600 gap-2 p-2 bg-red-50 rounded animate-in fade-in">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};
