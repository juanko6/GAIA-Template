"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var react_1 = require("@testing-library/react");
var ConverterForm_1 = require("./ConverterForm");
var useConvertImage_1 = require("../hooks/useConvertImage");
var react_2 = require("react");
// Mock the hook
vitest_1.vi.mock('../hooks/useConvertImage', function () { return ({
    useConvertImage: vitest_1.vi.fn(),
}); });
// Mock sub-components
vitest_1.vi.mock('./UploadZone', function () { return ({
    UploadZone: function (_a) {
        var onFileSelected = _a.onFileSelected;
        return (<button onClick={function () { return onFileSelected(new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })); }}>
            Mock Upload
        </button>);
    },
}); });
vitest_1.vi.mock('./ImagePreview', function () { return ({
    ImagePreview: function (_a) {
        var onRemove = _a.onRemove;
        return (<div>
            Mock Preview
            <button onClick={onRemove}>Remove</button>
        </div>);
    },
}); });
vitest_1.vi.mock('./FormatSelector', function () { return ({
    FormatSelector: function () { return <div>Mock Selector</div>; },
}); });
(0, vitest_1.describe)('ConverterForm', function () {
    var mockConvert = vitest_1.vi.fn();
    var mockReset = vitest_1.vi.fn();
    (0, vitest_1.beforeEach)(function () {
        vitest_1.vi.clearAllMocks();
        useConvertImage_1.useConvertImage.mockReturnValue({
            convert: mockConvert,
            isLoading: false,
            error: null,
            status: 'idle',
            reset: mockReset,
        });
    });
    (0, vitest_1.it)('renders initial upload state', function () {
        (0, react_1.render)(<ConverterForm_1.ConverterForm />);
        (0, vitest_1.expect)(react_1.screen.getByText('Conversor de Imágenes')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('Mock Upload')).toBeInTheDocument();
    });
    (0, vitest_1.it)('shows preview and convert button after file selection', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, react_1.render)(<ConverterForm_1.ConverterForm />);
            react_1.fireEvent.click(react_1.screen.getByText('Mock Upload'));
            (0, vitest_1.expect)(react_1.screen.getByText('Mock Preview')).toBeInTheDocument();
            (0, vitest_1.expect)(react_1.screen.getByText('Convertir Imagen')).toBeInTheDocument();
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.it)('calls convert when button clicked', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, react_1.render)(<ConverterForm_1.ConverterForm />);
            react_1.fireEvent.click(react_1.screen.getByText('Mock Upload'));
            react_1.fireEvent.click(react_1.screen.getByText('Convertir Imagen'));
            (0, vitest_1.expect)(mockConvert).toHaveBeenCalled();
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.it)('displays loading state', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            useConvertImage_1.useConvertImage.mockReturnValue({
                convert: mockConvert,
                isLoading: true,
                status: 'converting',
                error: null,
                reset: mockReset,
            });
            (0, react_1.render)(<ConverterForm_1.ConverterForm />);
            // Need to set file state implicitly by mocking hook logic or ensuring render logic passes
            // Since component local state holds 'file', simply re-rendering with mock hook won't set 'file' state unless we interact.
            // We need to simulate the flow or expose internals.
            // For this test, we accept that 'Mock Upload' needs to be clicked to enter the state where loading is visible
            react_1.fireEvent.click(react_1.screen.getByText('Mock Upload'));
            (0, vitest_1.expect)(react_1.screen.getByText('Convirtiendo...')).toBeInTheDocument();
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.it)('displays error message', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            useConvertImage_1.useConvertImage.mockReturnValue({
                convert: mockConvert,
                isLoading: false,
                status: 'error',
                error: 'Failed to convert',
                reset: mockReset,
            });
            (0, react_1.render)(<ConverterForm_1.ConverterForm />);
            (0, vitest_1.expect)(react_1.screen.getByText('Failed to convert')).toBeInTheDocument();
            return [2 /*return*/];
        });
    }); });
});
