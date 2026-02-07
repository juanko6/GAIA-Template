// [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-FE-T01]

import { render, screen } from '@testing-library/react';
import { FormatSelector } from './FormatSelector';
import { vi, describe, it, expect } from 'vitest';

describe('FormatSelector', () => {
    it('renders label and current value', () => {
        render(<FormatSelector value="jpeg" onChange={vi.fn()} />);

        expect(screen.getByText('Formato de destino')).toBeInTheDocument();
        expect(screen.getByText('JPG')).toBeInTheDocument(); // Label for 'jpeg'
    });
});
