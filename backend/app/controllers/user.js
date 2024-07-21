const mongoose = require('mongoose')
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
}
//Acceso al software
exports.login = async (req, res) => {
    const body = req.body;
    const user = await findUser(body.email)
    if(!user)return res.send({ data: 'Correo Incorrecto' })
    bcrypt.compare(body.password, user.password, function (err, result) { 
        if (result) {
            res.send({accesstoken:(generateToken(user._id)),tipo:user.tipo,id:user._id})
        } else {
            res.send({ data: 'Clave Incorrecta' })
        }
    });
}
/**
 * Obtener DATA de USUARIOS
 */
const findUser = (email) => {
    return model.findOne({ email })
}
//Guardar usuario en la base de datos
exports.register = async (req, res) => {
    const body = req.body;
    const newUser = await model.create(body)
    newUser.password = body.password
    hashPass(newUser)
    res.send({
        mensaje: 'Ok' 
    })
}
/**
 * Obtener DATA de USUARIOS
 */
 exports.getData = (req, res) => {
    model.find({}, (err, docs) => {
        res.send({
            items: docs
        })
    })
}
/**
 * Obtener DATA de USUARIOS
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) },
        (err, docs) => {
            res.send({
                items: docs
            })
        })
}
//Actualizar usuario
exports.update = (req, res) => {
    const { id } = req.params
    const body = req.body
    bcrypt.hash(body.password, 5, (error, newHash) => {
        if (error) {
            console.log(error);
            return error
        }
        body.password = newHash
        model.updateOne({ _id: parseId(id) },
        body,
        (err, docs) => {
            res.send({
                mensaje: 'Ok' 
            })
        })
    })
}
//Actualizar contraseña
const hashPass = (user) => {
    bcrypt.hash(user.password, 5, (error, newHash) => {
        if (error) {
            console.log(error);
            return error
        }
        user.password = newHash
        user.save()
        return user
    })
}
/**
 * Obtener DATA de USUARIOS
 */
const generateToken = (user) => {
    // Gets expiration time
    // const expiration =Math.floor(Date.now() / 1000) + 60 * 10
    const nowTime = Math.floor(Date.now() / 1000)
    // const expiration =86400
    // returns signed and encrypted token
    return jwt.sign(
        {
            data: {
                _id: user
            },
            iat: nowTime,
            exp: (_tokenExpira*3600) + nowTime
        },
        _tokenSecret
    )
}
/**
 * Obtener DATA de USUARIOS
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params
    model.deleteOne(
        { _id: parseId(id) },
        (err, docs) => {
            res.send({
                items: docs
            })
        })
}
