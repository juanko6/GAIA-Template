"use strict";
// [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-FE-T02]
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadZone = void 0;
var react_1 = require("react");
var react_dropzone_1 = require("react-dropzone");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var UploadZone = function (_a) {
    var onFileSelected = _a.onFileSelected, _b = _a.maxSizeMB, maxSizeMB = _b === void 0 ? 20 : _b, _c = _a.acceptedFormats, acceptedFormats = _c === void 0 ? {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
        'image/bmp': ['.bmp'],
        'image/gif': ['.gif']
    } : _c;
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var onDrop = (0, react_1.useCallback)(function (acceptedFiles, fileRejections) {
        setError(null);
        // Handle rejections (size or type)
        if (fileRejections.length > 0) {
            var rejection = fileRejections[0];
            if (rejection.errors[0].code === 'file-too-large') {
                setError("El archivo es demasiado grande (M\u00E1x ".concat(maxSizeMB, "MB)"));
            }
            else if (rejection.errors[0].code === 'file-invalid-type') {
                setError("Formato no soportado. Usa JPG, PNG, WEBP, BMP o GIF.");
            }
            else {
                setError("Error al subir el archivo.");
            }
            return;
        }
        if (acceptedFiles.length > 0) {
            onFileSelected(acceptedFiles[0]);
        }
    }, [onFileSelected, maxSizeMB]);
    var _e = (0, react_dropzone_1.useDropzone)({
        onDrop: onDrop,
        maxFiles: 1,
        maxSize: maxSizeMB * 1024 * 1024,
        accept: acceptedFormats
    }), getRootProps = _e.getRootProps, getInputProps = _e.getInputProps, isDragActive = _e.isDragActive;
    return (<div className="w-full max-w-xl mx-auto space-y-4">
            <div {...getRootProps()} className={(0, utils_1.cn)("flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors bg-white", isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:bg-gray-50", error ? "border-red-500 bg-red-50" : "")}>
                <input {...getInputProps()} data-testid="dropzone-input"/>

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <lucide_react_1.UploadCloud className={(0, utils_1.cn)("w-12 h-12 mb-3", isDragActive ? "text-primary" : "text-gray-400")}/>
                    <p className="mb-2 text-sm text-gray-500 font-medium">
                        <span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                        JPG, PNG, WEBP, BMP o GIF (Máx. {maxSizeMB}MB)
                    </p>
                </div>
            </div>

            {error && (<div className="flex items-center text-sm text-red-600 gap-2 p-2 bg-red-50 rounded animate-in fade-in">
                    <lucide_react_1.AlertCircle className="w-4 h-4"/>
                    <span>{error}</span>
                </div>)}
        </div>);
};
exports.UploadZone = UploadZone;
