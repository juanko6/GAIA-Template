import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConverterForm } from './ConverterForm';
import { useConvertImage } from '../hooks/useConvertImage';

// Mock the hook
vi.mock('../hooks/useConvertImage', () => ({
    useConvertImage: vi.fn(),
}));

// Mock sub-components
vi.mock('./UploadZone', () => ({
    UploadZone: ({ onFileSelected }: { onFileSelected: (f: File) => void }) => (
        <button onClick={() => onFileSelected(new File(['(⌐□_□)'], 'test.png', { type: 'image/png' }))}>
            Mock Upload
        </button>
    ),
}));

vi.mock('./ImagePreview', () => ({
    ImagePreview: ({ onRemove }: { onRemove: () => void }) => (
        <div>
            Mock Preview
            <button onClick={onRemove}>Remove</button>
        </div>
    ),
}));

vi.mock('./FormatSelector', () => ({
    FormatSelector: () => <div>Mock Selector</div>,
}));

describe('ConverterForm', () => {
    const mockConvert = vi.fn();
    const mockReset = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useConvertImage as any).mockReturnValue({
            convert: mockConvert,
            isLoading: false,
            error: null,
            status: 'idle',
            reset: mockReset,
        });
    });

    it('renders initial upload state', () => {
        render(<ConverterForm />);
        expect(screen.getByText('Conversor de Imágenes')).toBeInTheDocument();
        expect(screen.getByText('Mock Upload')).toBeInTheDocument();
    });

    it('shows preview and convert button after file selection', async () => {
        render(<ConverterForm />);

        fireEvent.click(screen.getByText('Mock Upload'));

        expect(screen.getByText('Mock Preview')).toBeInTheDocument();
        expect(screen.getByText('Convertir Imagen')).toBeInTheDocument();
    });

    it('calls convert when button clicked', async () => {
        render(<ConverterForm />);
        fireEvent.click(screen.getByText('Mock Upload'));
        fireEvent.click(screen.getByText('Convertir Imagen'));

        expect(mockConvert).toHaveBeenCalled();
    });

    it('displays loading state', async () => {
        (useConvertImage as any).mockReturnValue({
            convert: mockConvert,
            isLoading: true,
            status: 'converting',
            error: null,
            reset: mockReset,
        });

        render(<ConverterForm />);
        fireEvent.click(screen.getByText('Mock Upload'));

        expect(screen.getByText('Convirtiendo...')).toBeInTheDocument();
    });

    it('displays error message', async () => {
        (useConvertImage as any).mockReturnValue({
            convert: mockConvert,
            isLoading: false,
            status: 'error',
            error: 'Failed to convert',
            reset: mockReset,
        });

        render(<ConverterForm />);
        expect(screen.getByText('Failed to convert')).toBeInTheDocument();
    });

    it('displays success message and download button after conversion', async () => {
        const mockResult = {
            download_url: 'http://localhost:8005/api/v1/download/test.png',
            file_id: 'test.png',
            format: 'png'
        };
        mockConvert.mockResolvedValue(mockResult);

        // First render
        const { rerender } = render(<ConverterForm />);

        // 1. Upload file
        fireEvent.click(screen.getByText('Mock Upload'));

        // 2. Click convert
        fireEvent.click(screen.getByText('Convertir Imagen'));

        // 3. Update mock for success
        (useConvertImage as any).mockReturnValue({
            convert: mockConvert,
            isLoading: false,
            status: 'success',
            error: null,
            reset: mockReset,
        });

        // 4. Trigger re-render by mock update or just wait if component state updates
        rerender(<ConverterForm />);

        expect(await screen.findByText('¡Conversión exitosa!')).toBeInTheDocument();
        expect(screen.getByText('Descargar Imagen')).toBeInTheDocument();

        const downloadLink = screen.getByText('Descargar Imagen') as HTMLAnchorElement;
        expect(downloadLink.href).toContain('test.png');
    });
});
