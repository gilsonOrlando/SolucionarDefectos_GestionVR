const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        idPdf: {
            type: String
        },
        pdfNombre: {
            type: String
        },
        link: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('maestria', UserScheme)