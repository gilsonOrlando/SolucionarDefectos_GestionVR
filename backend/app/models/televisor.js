const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        idVid: {
            type: String
        },
        vidNombre: {
            type: String
        },
        estado: {
            type: String
        },
        nombreVideo: {
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
module.exports = mongoose.model('televisor', UserScheme)