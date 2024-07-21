const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        audioNombre: {
            type: String
        },
        idImg: {
            type: String
        },
        imgNombre: {
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
module.exports = mongoose.model('audio', UserScheme)