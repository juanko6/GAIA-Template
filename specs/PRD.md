# PRD – Aplicación de Conversión de Formatos de Imagen

## 1. Visión del Producto

Construir una aplicación simple, rápida y confiable que permita a las personas **convertir imágenes entre distintos formatos** de manera local o cloud, sin fricción, y con descarga inmediata del resultado.

El foco del producto es:
- Facilidad de uso
- Velocidad de conversión
- Compatibilidad con formatos populares
- Experiencia sin pasos innecesarios

---

## 2. Objetivo de Negocio

- Permitir a los usuarios convertir imágenes a distintos formatos en segundos.
- Reducir la dependencia de herramientas complejas de edición.
- Crear una base para futuras funcionalidades (batch conversion, compresión, edición básica).

**KPIs iniciales:**
- Tiempo medio de conversión < 3 segundos
- Ratio de conversión completada > 95%
- Errores de conversión < 2%

---

## 3. Usuarios Objetivo

### Usuario Primario
- Personas no técnicas (diseñadores junior, estudiantes, usuarios generales)
- Necesitan cambiar el formato de una imagen rápidamente

### Usuario Secundario
- Desarrolladores / equipos de contenido
- Requieren conversiones rápidas para assets digitales

---

## 4. Alcance (Scope)

### Incluido
- Subida de una imagen desde el dispositivo
- Selección de formato de salida desde una lista
- Conversión automática de la imagen
- Descarga manual o automática del archivo convertido
- Validaciones básicas de formato y tamaño

### Excluido (por ahora)
- Edición avanzada (crop, filtros, resize)
- Conversión masiva (batch)
- Autenticación de usuarios
- Almacenamiento histórico de imágenes

---

## 5. Flujo Principal del Usuario (Happy Path)

1. El usuario accede a la app
2. Sube una imagen desde su dispositivo
3. Visualiza una previsualización de la imagen
4. Selecciona un formato de salida desde una lista
5. Inicia la conversión
6. La imagen se convierte
7. El archivo convertido se descarga automáticamente o mediante botón

---

## 6. Requerimientos Funcionales

### RF-01 Subida de Imagen
- El sistema debe permitir subir imágenes desde el dispositivo
- Métodos soportados:
  - Click para seleccionar archivo
  - Drag & drop (si es web)

### RF-02 Formatos de Entrada Soportados
- JPG / JPEG
- PNG
- WEBP
- BMP
- GIF (estático)

### RF-03 Selección de Formato de Salida
- El sistema debe mostrar una lista desplegable con formatos disponibles
- El usuario puede seleccionar solo un formato de salida por conversión

### RF-04 Conversión de Imagen
- El sistema debe convertir la imagen al formato seleccionado
- Mantener la resolución original por defecto
- Mantener el nombre original del archivo (con nueva extensión)

### RF-05 Descarga del Archivo
- El sistema debe:
  - Descargar automáticamente el archivo convertido  
  **o**
  - Mostrar un botón explícito de descarga

### RF-06 Manejo de Errores
- Mostrar mensajes claros si:
  - El formato no es soportado
  - El archivo está corrupto
  - La conversión falla

---

## 7. Requerimientos No Funcionales

### Rendimiento
- Conversión < 3 segundos para imágenes < 10MB
- Soporte mínimo de archivos hasta 20MB

### Usabilidad
- Flujo máximo de 3 acciones principales
- UI clara, sin sobrecarga visual

### Compatibilidad
- Web responsive (desktop y mobile)
- Compatible con navegadores modernos

### Seguridad
- Las imágenes no deben almacenarse permanentemente
- Eliminación automática tras la conversión (si es backend)

---

## 8. Reglas de Negocio

- Solo se puede convertir una imagen a la vez
- El formato de salida no puede ser el mismo que el de entrada
- Si el formato de entrada no soporta transparencia (ej. JPG → PNG):
  - Se conserva fondo blanco por defecto

---

## 9. Estados del Sistema

| Estado | Descripción |
|------|-------------|
| Idle | App esperando acción |
| Imagen cargada | Imagen subida correctamente |
| Listo para convertir | Formato seleccionado |
| Convirtiendo | Proceso en ejecución |
| Convertido | Archivo listo para descarga |
| Error | Error en subida o conversión |

---

## 10. Mensajes Clave al Usuario

- “Imagen cargada correctamente”
- “Selecciona un formato de salida”
- “Convirtiendo imagen…”
- “Descarga completada”
- “Error al convertir la imagen”

---

## 11. Dependencias Técnicas

- Librería de procesamiento de imágenes (ej. ImageMagick, Sharp, Canvas API)
- Soporte del navegador / backend para formatos seleccionados
- Sistema de descarga de archivos

---

## 12. Riesgos y Mitigaciones

| Riesgo | Mitigación |
|------|-----------|
| Archivos muy grandes | Límite de tamaño + validación |
| Formatos no soportados | Validación temprana |
| Conversión lenta | Procesamiento optimizado |

---

## 13. Roadmap Futuro (No incluido en MVP)

- Conversión batch (múltiples imágenes)
- Compresión y resize
- Edición básica (crop, rotate)
- Historial de conversiones
- API pública

---

## 14. Definición de Éxito

El producto se considera exitoso cuando:
- Un usuario puede convertir y descargar una imagen en menos de 10 segundos
- El flujo no requiere explicación previa
- La conversión funciona de forma consistente en los formatos principales
