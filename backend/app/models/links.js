const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        nombre: {
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
module.exports = mongoose.model('links', UserScheme)