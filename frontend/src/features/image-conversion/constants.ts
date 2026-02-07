export const SUPPORTED_FORMATS = [
    { value: 'jpeg', label: 'JPG' },
    { value: 'png', label: 'PNG' },
    { value: 'webp', label: 'WEBP' },
    { value: 'bmp', label: 'BMP' },
    { value: 'gif', label: 'GIF' },
] as const;

export type SupportedFormat = typeof SUPPORTED_FORMATS[number]['value'];
