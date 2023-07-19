import Ingrediente from '../models/ingredienteModel.js';

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

//Registrar un ingrediente  
export const registerIngrediente = async (req, res) => {
    try {
        const { nombre, cantidad, unidadMedida, precio, comentario, categoria } = req.body;

        // Crear un nuevo ingrediente
        const newIngrediente = new Ingrediente({ nombre, cantidad, unidadMedida, precio, comentario, categoria });

        const existeIngrediente = await Ingrediente.findOne({ nombre: nombre })
        if (existeIngrediente) {
            return res.status(400).json({ message: 'Ya existe ese ingrediente' });
        }

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
        const { nombre, cantidad, unidadMedida, precio, comentario, categoria } = req.body;
        console.log("id: ", id, req.body);

        // Buscar y actualizar el ingrediente por su ID
        const ingrediente = await Ingrediente.findByIdAndUpdate(
            id,
            {
                nombre,
                cantidad,
                unidadMedida,
                precio,
                comentario,
                categoria
            },
            { new: true } // Devuelve el ingrediente actualizado
        );

        if (!ingrediente) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }

        // Enviar una respuesta al cliente
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

        // Buscar el ingrediente por su ID
        const ingredienteEliminar = await Ingrediente.findOne({ nombre: nombre });

        if (!ingredienteEliminar) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
        // Buscar y eliminar el ingrediente por su ID
        const result = await Ingrediente.deleteOne({ nombre: nombre });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Ingrediente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el ingrediente' });
    }
};

export const modificarPrecio = async (req, res) => {
    try {
        const { id } = req.params;
        const { precio } = req.body;
        console.log("id: ", id, req.body);

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
        res.status(200).json({ message: 'Ingrediente con precio actualizado', ingrediente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el ingrediente' });
    }
}



