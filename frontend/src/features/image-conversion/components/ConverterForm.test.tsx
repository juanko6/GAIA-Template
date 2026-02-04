import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConverterForm } from './ConverterForm';
import { useConvertImage } from '../hooks/useConvertImage';
// React unused

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
        // Need to set file state implicitly by mocking hook logic or ensuring render logic passes
        // Since component local state holds 'file', simply re-rendering with mock hook won't set 'file' state unless we interact.
        // We need to simulate the flow or expose internals.
        // For this test, we accept that 'Mock Upload' needs to be clicked to enter the state where loading is visible

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
});
