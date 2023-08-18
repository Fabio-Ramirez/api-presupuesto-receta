import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtiene el directorio del archivo actual
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, 'actividad.log');

export function agregarRegistro(mensaje) {
    const timestamp = new Date().toISOString();
    const logMensaje = `[${timestamp}] ${mensaje}\n`;

    fs.appendFileSync(logFilePath, logMensaje, 'utf8');
}
