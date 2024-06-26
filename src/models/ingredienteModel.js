import mongoose from 'mongoose';


const ingredienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    precio: { type: Number, required: false },
    comentario: [{
        fecha: { type: Object, required: false },
        mensaje: { type: String, required: false }
    }],
    estado: {
        type: String,
        required: true,
        enum: ['creado', 'modificado', 'restaurado', 'eliminado']
    },
    enReceta: { type: Boolean, required: true},
    historial: [{
        fecha: { type: Object, required: false },
        mensaje: { type: String, required: false }
    }]
});

const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);


export default Ingrediente;