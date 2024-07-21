const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        correo: {
            type: String
        },
        horarioAM: {
            type: String
        },
        horarioPM: {
            type: String
        },
        idImg: {
            type: String
        },
        imgNombre: {
            type: String
        },
        cargo: {
            type: String
        },
        nombre: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('administrativo', UserScheme)