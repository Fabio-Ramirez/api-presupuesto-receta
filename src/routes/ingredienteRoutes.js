import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import {
    getIngredientes, getIngredienteById, registerIngrediente,
    updateIngrediente, deleteIngrediente, modificarPrecio, restaurarIngrediente,
    getIngredientesEliminados, buscarIngredientes, getIngredienteNombre,
    verPrecio
} from '../controllers/ingredienteControllers.js';

const router = express.Router();


// Ruta para obtener todos los ingresos

router.get('/', getIngredientes);
router.get('/eliminados', getIngredientesEliminados);
router.get('/:id', getIngredienteById);
router.get('/buscarIngredienteNombre/:term', getIngredienteNombre);
router.get('/verPrecioIngrediente/:id', verPrecio);
router.patch('/buscarIngredientes', buscarIngredientes);
router.post('/',
    [
        check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , registerIngrediente);
router.patch('/:id', updateIngrediente);
router.delete('/:nombre', deleteIngrediente);
router.patch('/precio/:id', modificarPrecio);
router.patch('/resturarIngrediente/:nombre', restaurarIngrediente);

export default router;