import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import { getRecetas,getRecetaById,mostrarIngredientes, agregarReceta, 
    agregarIngredienteAReceta, modificarReceta, ingredienteEnReceta, eliminarIngredienteEnReceta } from '../controllers/recetaControllers.js';

const router = express.Router();


// Ruta para obtener todos las recetas
router.get('/', getRecetas);
router.get('/:id', getRecetaById);
router.get('/buscarIngredienteEnReceta/:idIngrediente',ingredienteEnReceta);
router.get('/allIngredientes/:id', mostrarIngredientes);
router.post('/',
    [
        check('producto', 'El nombre del producto es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , agregarReceta);
router.post('/:id', agregarIngredienteAReceta)
router.patch('/:id',modificarReceta)
router.patch('/eliminarIngredienteEnReceta/:idIngrediente',eliminarIngredienteEnReceta)


export default router;