const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        idImg: {
            type: String
        },
        idPdf: {
            type: String
        },
        imgNombre: {
            type: String
        },
        pdfNombre: {
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
module.exports = mongoose.model('docente', UserScheme)