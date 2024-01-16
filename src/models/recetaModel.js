import mongoose from 'mongoose';


const recetaSchema = new mongoose.Schema({
    producto: { type: String, required: true, unique: true },
    ingredientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingrediente'
    }], // Array de IDs de ingredientes
    produccion: {
        cantidad: { type: Number, required: false },
        unidadMedida: { type: String, required: false }
    },
    estado: {
        type: String,
        required: true,
        enum: ['creado', 'modificado', 'restaurado', 'eliminado']
    },
});

const Receta = mongoose.model('Receta', recetaSchema);


export default Receta;