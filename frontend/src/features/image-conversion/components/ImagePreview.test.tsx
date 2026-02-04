// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T03]

import { render, screen, fireEvent } from '@testing-library/react';
import { ImagePreview } from './ImagePreview';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ImagePreview', () => {
    // Mock URL.createObjectURL since it's not available in jsdom
    const originalCreateObjectURL = global.URL.createObjectURL;
    const originalRevokeObjectURL = global.URL.revokeObjectURL;

    beforeEach(() => {
        global.URL.createObjectURL = vi.fn(() => 'blob:test-url');
        global.URL.revokeObjectURL = vi.fn();
    });

    afterEach(() => {
        global.URL.createObjectURL = originalCreateObjectURL;
        global.URL.revokeObjectURL = originalRevokeObjectURL;
    });

    it('renders image with correct src', () => {
        const file = new File(['dummy'], 'test.png', { type: 'image/png' });
        render(<ImagePreview file={file} onRemove={vi.fn()} />);

        const img = screen.getByRole('img') as HTMLImageElement;
        expect(img.src).toContain('blob:test-url');
        expect(screen.getByText('test.png')).toBeInTheDocument();
    });

    it('calls onRemove when delete button is clicked', () => {
        const onRemove = vi.fn();
        const file = new File(['dummy'], 'test.png', { type: 'image/png' });
        render(<ImagePreview file={file} onRemove={onRemove} />);

        const removeBtn = screen.getByLabelText('Eliminar imagen');
        fireEvent.click(removeBtn);

        expect(onRemove).toHaveBeenCalledTimes(1);
    });
});
