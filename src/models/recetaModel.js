import mongoose from 'mongoose';


const recetaSchema = new mongoose.Schema({
    producto: { type: String, required: true, unique: true },
    ingredientes: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingrediente',
            required: false
        },
        nombre: { type: String, required: false },
        produccion: {
            cantidad: { type: Number, required: false },
            unidadMedida: { type: String, required: false }
        }

    }],
    produccion: {
        cantidad: { type: Number, required: true },
        unidadMedida: { type: String, required: true }
    },
    estado: {
        type: String,
        required: true,
        enum: ['creado', 'modificado', 'restaurado', 'eliminado']
    },
});

const Receta = mongoose.model('Receta', recetaSchema);


export default Receta;