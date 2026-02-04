// [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-FE-T03]

import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { ImagePreview } from './ImagePreview';
import { FormatSelector } from './FormatSelector';
import { useConvertImage } from '../hooks/useConvertImage';
import { SupportedFormat } from '../constants';
import { Loader2, ArrowRight, CheckCircle, RefreshCcw, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils'; // Assuming this utility exists

export const ConverterForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [format, setFormat] = useState<SupportedFormat>('jpeg'); // Default
    const { convert, isLoading, error, status, reset } = useConvertImage();
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        reset();
        setDownloadUrl(null);
    };

    const handleRemoveFile = () => {
        setFile(null);
        reset();
        setDownloadUrl(null);
    };

    const handleConvert = async () => {
        if (!file) return;
        const result = await convert(file, format);
        if (result) {
            setDownloadUrl(result.download_url);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Conversor de Imágenes</h2>
                <p className="text-gray-500">Sube tu imagen, elige el formato y descárgala al instante.</p>
            </div>

            {/* ERROR ALERT */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-sm text-red-900">Ha ocurrido un error</h4>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            )}

            {/* STAGE 1: UPLOAD */}
            {!file && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    <UploadZone onFileSelected={handleFileSelect} />
                </div>
            )}

            {/* STAGE 2: PREVIEW + OPTIONS */}
            {file && status !== 'success' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-1/2">
                            <ImagePreview file={file} onRemove={isLoading ? () => { } : handleRemoveFile} />
                        </div>

                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="space-y-2">
                                {/* FormatSelector needs NO Label wrapper as it has it inside? Wait, FormatSelector has label inside? */}
                                {/* In FormatSelector.tsx: It HAS a label inside. */}
                                {/* So I should remove the label wrapper here to avoid duplicate label or just keep it minimal. */}
                                {/* FormatSelector expects 'onChange' */}
                                <FormatSelector value={format} onChange={setFormat} />
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={handleConvert}
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all shadow-md active:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed",
                                        "bg-primary text-primary-foreground hover:bg-primary/90"
                                    )}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            {status === 'uploading' ? 'Subiendo...' : 'Convirtiendo...'}
                                        </>
                                    ) : (
                                        <>
                                            Convertir Imagen
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STAGE 3: SUCCESS */}
            {status === 'success' && downloadUrl && (
                <div className="text-center space-y-6 py-8 animate-in zoom-in-95 duration-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">¡Conversión exitosa!</h3>
                        <p className="text-gray-500">Tu imagen está lista para descargar.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={downloadUrl} // Note: This URL must be absolute or proxied correctly.
                            // In dev: http://localhost:8005/download/xyz
                            // For now, let's assume API returns full URL or valid relative path.
                            // The backend returns "/download/{file_id}". We need to prepend API Base or similar if it's relative to root but hosted elsewhere.
                            // Actually, backend returns "/download/...", waiting for FE to handle domain.
                            // Let's fix this in hook or here.
                            download
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all"
                        >
                            Descargar Imagen
                        </a>
                        <button
                            onClick={handleRemoveFile}
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Convertir otra
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
