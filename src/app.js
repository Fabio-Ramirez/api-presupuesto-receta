
import express from 'express';
import cors from 'cors';
import ingredienteRoutes from './routes/ingredienteRoutes.js';
import recetaRoutes from './routes/recetaRoute.js'


const app = express();

// Configurar middlewares
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Configurar rutas
app.use('/ingrediente', ingredienteRoutes);
app.use('/receta', recetaRoutes)

export default app 