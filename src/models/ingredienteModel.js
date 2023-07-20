import mongoose from 'mongoose';


const ingredienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    precio: { type: Number, required: true },
    comentario: { type: String, required: false },
    estado: {
        type: String,
        required: true,
        enum: ['creado', 'modificado', 'eliminado']
    },
});

const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);


export default Ingrediente;