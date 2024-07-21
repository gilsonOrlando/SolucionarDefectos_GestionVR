const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        idPdf: {
            type: String
        },
        pdfNombre: {
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
module.exports = mongoose.model('documento', UserScheme)