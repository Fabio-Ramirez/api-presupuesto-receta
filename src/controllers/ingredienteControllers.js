import Ingrediente from '../models/ingredienteModel.js';
import moment from 'moment';
import { agregarRegistro } from '../meddlewares/actividadLog.js';

//Obtener todos los ingredientes
export const getIngredientes = async (req, res) => {
    try {
        // Obtener todos los ingredientes de la base de datos
        const ingredientes = await Ingrediente.find();

        // Enviar una respuesta al cliente
        res.status(200).json(ingredientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los ingredientes' });
    }
};

//Obtener todos el ingrediente por el nombre
export const getIngredienteNombre = async (req, res) => {
    try {
        const term = req.params.term; // Cambiado a req.body para obtener el término desde el cuerpo de la solicitud

        // Obtener todos los ingredientes
        const todosIngredientes = await Ingrediente.find({});

        //console.log("ingredientes: ", todosIngredientes)
        // Filtrar los ingredientes basados en el término
        const ingredientesFiltrados = [];
        if (term) {
            todosIngredientes.forEach(ingrediente => {
                if (ingrediente.nombre.toLowerCase().includes(term.toLowerCase())) {
                    ingredientesFiltrados.push(ingrediente);
                }
            });
        }
        // Enviar una respuesta al cliente con los resultados de la búsqueda
        res.status(200).json(ingredientesFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los ingredientes' });
    }
};

//Obtener todos los ingredientes eliminados
export const getIngredientesEliminados = async (req, res) => {
    try {
        const ingredientesEliminados = await Ingrediente.find({ estado: 'eliminado' });
        res.status(200).json(ingredientesEliminados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los ingredientes' });
    }
};

//Obtener el ingrediente solicitado
export const getIngredienteById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar un ingrediente por su ID en la base de datos
        const ingrediente = await Ingrediente.findById(id);
        if (!ingrediente) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(ingrediente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el ingrediente' });
    }
};

// Obtener el o los ingredientes solicitados dinamicamente desde el front
//a medida que se tipee el term. 
export const buscarIngredientes = async (req, res) => {
    try {
        const queryIngrediente = Ingrediente.find({});
        const { term } = req.body;  // Cambiado a req.query para obtener el término desde la consulta

        // Realiza una búsqueda basada en el término
        const ingredientes = await Ingrediente.find({ nombre: { $regex: new RegExp(term, 'i') } });

        // Enviar una respuesta al cliente con los resultados de la búsqueda
        res.status(200).json(ingredientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los ingredientes' });
    }
};

//Registrar un ingrediente  
export const registerIngrediente = async (req, res) => {
    try {
        const estado = 'creado';
        const { nombre, cantidad, unidadMedida, precio, comentario } = req.body;

        // Crear un nuevo ingrediente
        const momentFecha = moment();
        const newComentario = {
            fecha: momentFecha.format('DD-MM-YYYY'),
            mensaje: comentario ? comentario : ''
        };

        const historial = {
            fecha: momentFecha.format('DD-MM-YYYY HH:mm:ss'),
            mensaje: 'Se crea el ingrediente'
        }
        const newIngrediente = new Ingrediente({ nombre, cantidad, unidadMedida, precio, newComentario, estado, historial });

        const existeIngrediente = await Ingrediente.findOne({ nombre: nombre })
        if (existeIngrediente) {
            return res.status(400).json({ message: 'Ya existe ese ingrediente', existeIngrediente });
        }
        // Registrar la actividad en el archivo de registro
        agregarRegistro(`Se creó el ingrediente ${nombre}`);

        await newIngrediente.save();

        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro de ingrediente: ', newIngrediente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el ingrediente' });
    }
};

//Actualizar un ingrediente
export const updateIngrediente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cantidad, unidadMedida, precio, comentario } = req.body;
        const estado = 'modificado';

        // Preparar los datos para actualizar
        const momentFecha = moment();
        const historial = {
            fecha: momentFecha.format('DD-MM-YYYY HH:mm:ss'),
            mensaje: 'Se modifica el ingrediente'
        }

        const datosActualizados = {
            nombre,
            cantidad,
            unidadMedida,
            precio,
            estado,
            historial
        };

        // Agregar el comentario si está presente en el req.body
        if (comentario) {
            const newComentario = {
                fecha: momentFecha.format('DD-MM-YYYY'),
                mensaje: comentario
            };
            datosActualizados.comentario = newComentario;
        }
        // Actualizar el ingrediente
        const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true }
        );

        if (!ingredienteActualizado) {
            agregarRegistro(`El ingrediente ${nombre}, no se encontró`);
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
        // Enviar una respuesta al cliente
        agregarRegistro(`El ingrediente ${nombre}, se actualizó correctamente`);
        res.status(200).json({ message: 'Ingrediente actualizado', ingrediente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el ingrediente' });
    }
};

//Eliminar un ingrediente por el nombre como ingreso de params.
export const deleteIngrediente = async (req, res) => {
    try {
        const { nombre } = req.params;
        const estado = 'eliminado';

        // Buscar el ingrediente por su ID
        const ingredienteEliminar = await Ingrediente.findOne({ nombre: nombre });

        if (!ingredienteEliminar) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
        // Buscar y eliminar el ingrediente por su ID
        ingredienteEliminar.estado = estado;

        await ingredienteEliminar.save();

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Ingrediente', ingredienteEliminar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el ingrediente' });
    }
};

export const modificarPrecio = async (req, res) => {
    try {
        const { id } = req.params;
        const { precio } = req.body;

        // Buscar y actualizar el ingrediente por su ID
        const ingrediente = await Ingrediente.findByIdAndUpdate(
            id,
            {
                precio
            },
            { new: true } // Devuelve el precio actualizado
        );

        if (!ingrediente) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Ingrediente con precio actualizado', nombre: ingrediente.nombre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el ingrediente' });
    }
}

//Se restaura el ingrediente eliminado, el nombre ingresa como params.
export const restaurarIngrediente = async (req, res) => {
    try {
        const { nombre } = req.params;
        const estado = 'restaurado';

        // Buscar el ingrediente por su ID
        const ingredienteRestaurar = await Ingrediente.findOne({ nombre: nombre });

        if (!ingredienteRestaurar) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
        // Buscar y eliminar el ingrediente por su ID
        ingredienteRestaurar.estado = estado;

        await ingredienteRestaurar.save();
        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Ingrediente restaurado', ingredienteRestaurar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al resturar el ingrediente' });
    }
}





