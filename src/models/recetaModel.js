import mongoose from 'mongoose';


const recetaSchema = new mongoose.Schema({
    producto: { type: String, required: true, unique: true },
    ingredientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingrediente'
    }], // Array de IDs de ingredientes
    produccion: { type: Number, required: false }
});

const Receta = mongoose.model('Receta', recetaSchema);


export default Receta;