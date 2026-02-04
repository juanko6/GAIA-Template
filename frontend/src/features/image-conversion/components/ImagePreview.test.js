"use strict";
// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T03]
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var ImagePreview_1 = require("./ImagePreview");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('ImagePreview', function () {
    // Mock URL.createObjectURL since it's not available in jsdom
    var originalCreateObjectURL = global.URL.createObjectURL;
    var originalRevokeObjectURL = global.URL.revokeObjectURL;
    (0, vitest_1.beforeEach)(function () {
        global.URL.createObjectURL = vitest_1.vi.fn(function () { return 'blob:test-url'; });
        global.URL.revokeObjectURL = vitest_1.vi.fn();
    });
    (0, vitest_1.afterEach)(function () {
        global.URL.createObjectURL = originalCreateObjectURL;
        global.URL.revokeObjectURL = originalRevokeObjectURL;
    });
    (0, vitest_1.it)('renders image with correct src', function () {
        var file = new File(['dummy'], 'test.png', { type: 'image/png' });
        (0, react_1.render)(<ImagePreview_1.ImagePreview file={file} onRemove={vitest_1.vi.fn()}/>);
        var img = react_1.screen.getByRole('img');
        (0, vitest_1.expect)(img.src).toContain('blob:test-url');
        (0, vitest_1.expect)(react_1.screen.getByText('test.png')).toBeInTheDocument();
    });
    (0, vitest_1.it)('calls onRemove when delete button is clicked', function () {
        var onRemove = vitest_1.vi.fn();
        var file = new File(['dummy'], 'test.png', { type: 'image/png' });
        (0, react_1.render)(<ImagePreview_1.ImagePreview file={file} onRemove={onRemove}/>);
        var removeBtn = react_1.screen.getByLabelText('Eliminar imagen');
        react_1.fireEvent.click(removeBtn);
        (0, vitest_1.expect)(onRemove).toHaveBeenCalledTimes(1);
    });
});
