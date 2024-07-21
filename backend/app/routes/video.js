const mongoose = require('mongoose');
const model = require('../models/video');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res) => (err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    } else {
        res.send({ items: docs });
    }
};

// Función auxiliar para manejar operaciones comunes
const handleOperation = (operation, req, res) => {
    operation(req, res, handleResponse(res));
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    handleOperation((req, res, callback) => model.find({}, callback), req, res);
};

/**
 * Obtener un solo usuario
 */
exports.getSingle = (req, res) => {
    handleOperation((req, res, callback) => model.findOne({ _id: parseId(req.params.id) }, callback), req, res);
};

/**
 * Actualizar DATA de USUARIOS
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    handleOperation((req, res, callback) => model.updateOne({ _id: parseId(id) }, body, callback), req, res);
};

/**
 * Guardar datos del video en la base de datos
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
 * Eliminar un usuario
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    handleOperation((req, res, callback) => model.deleteOne({ _id: parseId(id) }, callback), req, res);
};
