const jwt = require('jsonwebtoken')
const User = require('../models/user')
//Solicitar Token para autorizar la petición
exports.verifyToken = async (req, res, next) => {
    try {
        const token=req.headers["x-access-token"];
        if(!token)return res.status(403).json({message:"no token provided"})
        const decoded=jwt.verify(token,_tokenSecret)
        req.userId=decoded.data._id
        var user=await User.findOne({ _id: decoded.data._id },
            (err, docs) => {
                return docs
            })
        if(!user)return res.status(401).json({message:"no user found"})
        next()
    } catch (error) {
        return res.status(409).json({message:"No autorizado"})
    }
}
//Verificar si el tipo de usuarios es administrador
exports.isAdmin = async (req, res, next) => {
    var user2=await User.findOne({ _id: req.userId},
        (err, docs) => {
            return docs
        })
    if(user2.tipo==undefined)return res.status(404).json({message:"user no autorizado"})
    if(!user2.tipo=="admin")return res.status(404).json({message:"user no autorizado"})
    next()
    }
//Chequear si el correo ya esta registrado
exports.checkDuplicateEmail = async (req, res, next) => {
    var user=await User.findOne({ email: req.body.email},
        (err, docs) => {
            return docs
        })
    console.log(user)  
    if(user)return res.status(400).json({message:"el correo ya esta registrado"})
    next()
}