const mongoose = require('mongoose');
const model = require('../models/links');

// Función para convertir el ID
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res, successMessage = 'Success', errorMessage = 'Internal Server Error', statusCode = 500) => (err, docs) => {
    if (err) {
        res.status(statusCode).send({ error: errorMessage });
    } else {
        res.send({ message: successMessage, items: docs });
    }
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    model.find({}, handleResponse(res, 'Data retrieved successfully'));
};

/**
 * Obtener DATA de un USUARIO específico
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, handleResponse(res, 'User retrieved successfully'));
};

/**
 * Actualizar DATA de un USUARIO específico
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, handleResponse(res, 'User updated successfully', 'Error updating user', 422));
};

/**
 * Insertar DATA de USUARIOS
 */
exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, handleResponse(res, 'User created successfully', 'Error creating user', 422));
};

/**
 * Eliminar DATA de un USUARIO específico
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    model.deleteOne({ _id: parseId(id) }, handleResponse(res, 'User deleted successfully'));
};
