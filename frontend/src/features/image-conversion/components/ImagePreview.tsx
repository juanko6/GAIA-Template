// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T03]

import React from 'react';
import { X } from 'lucide-react';
import { useImagePreview } from '@/features/image-conversion/hooks/useImagePreview';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
    file: File;
    onRemove: () => void;
    className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove, className }) => {
    const previewUrl = useImagePreview(file);

    if (!previewUrl) return null;

    return (
        <div className={cn("relative group w-full max-w-sm rounded-lg overflow-hidden border border-border bg-card shadow-sm m-auto", className)}>
            <div className="relative aspect-video flex items-center justify-center bg-gray-100">
                <img
                    src={previewUrl}
                    alt={`Vista previa de ${file.name}`}
                    className="object-contain w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={onRemove}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        aria-label="Eliminar imagen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="p-3 bg-white">
                <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        </div>
    );
};
