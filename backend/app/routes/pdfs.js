const mongoose = require('mongoose');
const model = require('../models/pdfs');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res) => (err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    } else {
        res.send({ items: docs });
    }
};

// Función auxiliar para manejar errores específicos
const handleError = (res, statusCode, message) => {
    res.status(statusCode).send({ error: message });
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    model.find({}, handleResponse(res));
};

/**
 * Obtener un solo USUARIO
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, handleResponse(res));
};

/**
 * Actualizar datos del administrativo
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, handleResponse(res));
};

/**
 * Insertar DATA de USUARIOS
 */
exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, (err, docs) => {
        if (err) {
            handleError(res, 422, 'Error al insertar datos');
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
    model.deleteOne({ _id: parseId(id) }, handleResponse(res));
};
