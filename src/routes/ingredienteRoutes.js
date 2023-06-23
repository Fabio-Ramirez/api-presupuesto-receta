import express from 'express';
import { getIngredientes, getIngredienteById, registerIngrediente, updateIngreso, deleteIngreso } from '../controllers/ingredienteControllers.js';

const router = express.Router();


// Ruta para obtener todos los ingresos

router.get('/', getIngredientes);
router.get('/:id', getIngredienteById);
router.post('/', registerIngrediente);
router.patch('/:id', updateIngreso);
router.delete('/:nombre', deleteIngreso);

export default router;