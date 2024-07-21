const mongoose = require('mongoose');
const model = require('../models/televisor');

// Función para convertir ID
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res, isError = false) => (err, docs) => {
    if (err) {
        res.status(isError ? 422 : 500).send({ error: 'Internal Server Error' });
    } else {
        res.send({ items: docs });
    }
};

// Función auxiliar para realizar operaciones en la base de datos
const performDbOperation = (operation, req, res) => {
    operation(handleResponse(res));
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    performDbOperation(() => model.find({}), req, res);
};

/**
 * Obtener un único USUARIO
 */
exports.getSingle = (req, res) => {
    performDbOperation(() => model.findOne({ _id: parseId(req.params.id) }), req, res);
};

/**
 * Actualizar un televisor
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    performDbOperation(() => model.updateOne({ _id: parseId(id) }, body), req, res);
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
 * Eliminar un USUARIO
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    performDbOperation(() => model.deleteOne({ _id: parseId(id) }), req, res);
};
