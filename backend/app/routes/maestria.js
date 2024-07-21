const mongoose = require('mongoose');
const model = require('../models/maestria');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    } else {
        res.send({ items: docs });
    }
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    model.find({}, (err, docs) => handleResponse(res, err, docs));
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, (err, docs) => handleResponse(res, err, docs));
};

/**
 * Actualizar datos del usuario
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, (err, docs) => handleResponse(res, err, docs));
};

/**
 * Insertar DATA de USUARIOS
 */
exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, (err, docs) => {
        if (err) {
            res.status(422).send({ error: 'Error' });
        } else {
            res.send({ data: docs });
        }
    });
};

/**
 * Eliminar DATA de USUARIOS
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    model.deleteOne({ _id: parseId(id) }, (err, docs) => handleResponse(res, err, docs));
}
