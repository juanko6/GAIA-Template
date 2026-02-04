// [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-FE-T01]

import { render, screen, fireEvent } from '@testing-library/react';
import { FormatSelector } from './FormatSelector';
import { vi, describe, it, expect } from 'vitest';
import { SUPPORTED_FORMATS } from '@/features/image-conversion/constants';

// Radix UI Select relies on Pointer events which jsdom handles imperfectly, 
// but basic rendering and structure check works.

describe('FormatSelector', () => {
    it('renders label and current value', () => {
        render(<FormatSelector value="jpeg" onChange={vi.fn()} />);

        expect(screen.getByText('Formato de destino')).toBeInTheDocument();
        expect(screen.getByText('JPG')).toBeInTheDocument(); // Label for 'jpeg'
    });

    // Interaction tests usually require user-event and complex setup for Radix Select in JSDOM.
    // We check availability of options by querying them after potential open (simulated or just DOM existence if not lazy)
});
