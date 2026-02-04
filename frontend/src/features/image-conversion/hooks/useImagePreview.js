"use strict";
// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T03]
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImagePreview = void 0;
var react_1 = require("react");
var useImagePreview = function (file) {
    var _a = (0, react_1.useState)(null), previewUrl = _a[0], setPreviewUrl = _a[1];
    (0, react_1.useEffect)(function () {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        var objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        // Cleanup memory on unmount or file change
        return function () {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);
    return previewUrl;
};
exports.useImagePreview = useImagePreview;
