const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        idWord: {
            type: String
        },
        wordNombre: {
            type: String
        },
        descripcion: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('solicitud', UserScheme)