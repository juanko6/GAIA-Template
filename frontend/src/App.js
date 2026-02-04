"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConverterForm_1 = require("./features/image-conversion/components/ConverterForm");
require("./App.css");
function App() {
    return (<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Conversor de Imágenes <span className="text-primary">GAIA</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-600">
          Transforma tus imágenes de forma rápida, segura y gratuita.
        </p>
      </div>

      <ConverterForm_1.ConverterForm />

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>&copy; 2026 GAIA Template. Todos los derechos reservados.</p>
      </footer>
    </div>);
}
exports.default = App;
