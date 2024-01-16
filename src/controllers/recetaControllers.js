import Receta from '../models/recetaModel.js';
import moment from 'moment';

//Obtener todas las recetas
export const getRecetas = async (req, res) => {
    try {
        // Obtener todos los recetas de la base de datos
        const recetas = await Receta.find();

        // Enviar una respuesta al cliente
        res.status(200).json(recetas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las recetas' });
    }
};

//Obtener la receta a traves del id
export const getRecetaById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un receta por su ID en la base de datos
        const receta = await Receta.findById(id);
        if (!receta) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(receta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la receta' });
    }
};

// Controlador en el backend para visualizar 
// todos los ingredientes de un id de receta
export const mostrarIngredientes = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un receta por su ID en la base de datos
        const receta = await Receta.findById(id);
        if (!receta) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(receta.ingredientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la receta' });
    }
};

// Controlador en el backend para manejar la solicitud POST de agregar una receta
export const agregarReceta = async (req, res) => {
    try {
        const { producto, ingredientes, produccion, estado } = req.body; // Obtén los datos de la solicitud

        // Crea una nueva instancia del modelo Receta con los datos recibidos
        const nuevaReceta = new Receta({
            producto,
            ingredientes, // Aquí, ingredientes debe ser un array de IDs de ingredientes
            produccion,
            estado
        });

        // Guarda la nueva receta en la base de datos
        const recetaGuardada = await nuevaReceta.save();

        // Envía una respuesta al cliente confirmando la creación de la receta
        res.status(201).json({ message: 'Receta creada con éxito', receta: recetaGuardada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al agregar la receta', error });
    }
};

// Controlador en el backend para manejar la solicitud POST de agregar 
// un ingrediente existen a la receta
export const agregarIngredienteAReceta = async (req, res) => {
    try {
        const { id } = req.params;
        const { idIngrediente } = req.body;

        // Buscar la receta por su ID en la base de datos
        const receta = await Receta.findById(id);

        if (!receta) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Verificar si el ingrediente ya está en la receta por su ID
        const existeIngrediente = receta.ingredientes.find(ingredienteId => ingredienteId.toString() === idIngrediente);

        if (existeIngrediente) {
            return res.status(404).json({ message: 'Ingrediente existente en receta' });
        }

        receta.ingredientes.push(idIngrediente);
        receta.estado = 'modificado'

        await receta.save();

        // Envía una respuesta al cliente confirmando la creación de la receta
        res.status(201).json({ message: 'Ingrediente agregado con éxito', receta: receta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al agregar el ingrediente en la receta', error });
    }
};


