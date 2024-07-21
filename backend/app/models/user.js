const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        tipo: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('user', UserScheme)
