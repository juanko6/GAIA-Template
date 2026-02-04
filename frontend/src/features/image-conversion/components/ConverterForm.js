"use strict";
// [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-FE-T03]
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
exports.ConverterForm = void 0;
var react_1 = require("react");
var UploadZone_1 = require("./UploadZone");
var ImagePreview_1 = require("./ImagePreview");
var FormatSelector_1 = require("./FormatSelector");
var useConvertImage_1 = require("../hooks/useConvertImage");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils"); // Assuming this utility exists
var ConverterForm = function () {
    var _a = (0, react_1.useState)(null), file = _a[0], setFile = _a[1];
    var _b = (0, react_1.useState)('jpeg'), format = _b[0], setFormat = _b[1]; // Default
    var _c = (0, useConvertImage_1.useConvertImage)(), convert = _c.convert, isLoading = _c.isLoading, error = _c.error, status = _c.status, reset = _c.reset;
    var _d = (0, react_1.useState)(null), downloadUrl = _d[0], setDownloadUrl = _d[1];
    var handleFileSelect = function (selectedFile) {
        setFile(selectedFile);
        reset();
        setDownloadUrl(null);
    };
    var handleRemoveFile = function () {
        setFile(null);
        reset();
        setDownloadUrl(null);
    };
    var handleConvert = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!file)
                        return [2 /*return*/];
                    return [4 /*yield*/, convert(file, format)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        setDownloadUrl(result.download_url);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Conversor de Imágenes</h2>
                <p className="text-gray-500">Sube tu imagen, elige el formato y descárgala al instante.</p>
            </div>

            {/* ERROR ALERT */}
            {error && (<div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2">
                    <lucide_react_1.AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5"/>
                    <div>
                        <h4 className="font-semibold text-sm text-red-900">Ha ocurrido un error</h4>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>)}

            {/* STAGE 1: UPLOAD */}
            {!file && (<div className="animate-in fade-in zoom-in-95 duration-300">
                    <UploadZone_1.UploadZone onFileSelected={handleFileSelect}/>
                </div>)}

            {/* STAGE 2: PREVIEW + OPTIONS */}
            {file && status !== 'success' && (<div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-1/2">
                            <ImagePreview_1.ImagePreview file={file} onRemove={isLoading ? undefined : handleRemoveFile}/>
                        </div>

                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Formato de destino</label>
                                <FormatSelector_1.FormatSelector value={format} onValueChange={setFormat}/>
                            </div>

                            <div className="pt-4">
                                <button onClick={handleConvert} disabled={isLoading} className={(0, utils_1.cn)("w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all shadow-md active:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed", "bg-primary text-primary-foreground hover:bg-primary/90")}>
                                    {isLoading ? (<>
                                            <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>
                                            {status === 'uploading' ? 'Subiendo...' : 'Convirtiendo...'}
                                        </>) : (<>
                                            Convertir Imagen
                                            <lucide_react_1.ArrowRight className="w-4 h-4"/>
                                        </>)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}

            {/* STAGE 3: SUCCESS */}
            {status === 'success' && downloadUrl && (<div className="text-center space-y-6 py-8 animate-in zoom-in-95 duration-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
                        <lucide_react_1.CheckCircle className="w-8 h-8"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">¡Conversión exitosa!</h3>
                        <p className="text-gray-500">Tu imagen está lista para descargar.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href={downloadUrl} // Note: This URL must be absolute or proxied correctly.
         
        // In dev: http://localhost:8005/download/xyz
        // For now, let's assume API returns full URL or valid relative path.
        // The backend returns "/download/{file_id}". We need to prepend API Base or similar if it's relative to root but hosted elsewhere.
        // Actually, backend returns "/download/...", waiting for FE to handle domain.
        // Let's fix this in hook or here.
        download className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all">
                            Descargar Imagen
                        </a>
                        <button onClick={handleRemoveFile} className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
                            <lucide_react_1.RefreshCcw className="w-4 h-4"/>
                            Convertir otra
                        </button>
                    </div>
                </div>)}

        </div>);
};
exports.ConverterForm = ConverterForm;
