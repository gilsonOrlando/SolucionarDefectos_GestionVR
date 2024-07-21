const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        idImg: {
            type: String
        },
        imgNombre: {
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
module.exports = mongoose.model('patio', UserScheme)