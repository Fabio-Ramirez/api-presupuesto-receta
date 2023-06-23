
import express from 'express';
import ingredienteRoutes from './routes/ingredienteRoutes.js';


const app = express();

// Configurar middlewares
app.use(express.json());

// Configurar rutas
app.use('/ingrediente', ingredienteRoutes);

export default app 