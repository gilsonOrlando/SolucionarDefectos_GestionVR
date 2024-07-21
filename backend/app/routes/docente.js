const mongoose = require('mongoose');
const model = require('../models/docente');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res) => (err, docs) => {
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
    model.find({}, handleResponse(res));
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, handleResponse(res));
};

/**
 * Actualizar datos del docente
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, handleResponse(res));
};

// Guardar datos del docente en la base de datos
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
 * Eliminar datos del docente
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    model.deleteOne({ _id: parseId(id) }, handleResponse(res));
};
