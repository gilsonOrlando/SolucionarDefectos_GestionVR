const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        imgNombre: {
            type: String
        },
        nombre: {
            type: String
        },
        uso: {
            type: Number
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('imagen', UserScheme)