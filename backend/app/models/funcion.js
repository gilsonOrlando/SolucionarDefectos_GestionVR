const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        texto: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('funcion', UserScheme)