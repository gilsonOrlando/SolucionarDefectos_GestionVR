const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const UserScheme = new mongoose.Schema(
    {
        correo: {
            type: String
        },
        nombre: {
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
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('personal', UserScheme)