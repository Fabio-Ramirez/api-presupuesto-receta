
import express from 'express';
import cors from 'cors';
import ingredienteRoutes from './routes/ingredienteRoutes.js';


const app = express();

// Configurar middlewares
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Configurar rutas
app.use('/ingrediente', ingredienteRoutes);

export default app 