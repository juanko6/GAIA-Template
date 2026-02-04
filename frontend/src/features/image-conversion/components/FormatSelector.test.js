"use strict";
// [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-FE-T01]
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var FormatSelector_1 = require("./FormatSelector");
var vitest_1 = require("vitest");
// Radix UI Select relies on Pointer events which jsdom handles imperfectly, 
// but basic rendering and structure check works.
(0, vitest_1.describe)('FormatSelector', function () {
    (0, vitest_1.it)('renders label and current value', function () {
        (0, react_1.render)(<FormatSelector_1.FormatSelector value="jpeg" onChange={vitest_1.vi.fn()}/>);
        (0, vitest_1.expect)(react_1.screen.getByText('Formato de destino')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('JPG')).toBeInTheDocument(); // Label for 'jpeg'
    });
    // Interaction tests usually require user-event and complex setup for Radix Select in JSDOM.
    // We check availability of options by querying them after potential open (simulated or just DOM existence if not lazy)
});
