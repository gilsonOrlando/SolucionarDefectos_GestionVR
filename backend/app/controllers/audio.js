const mongoose = require('mongoose');
const model = require('../models/audio');

// Función para parsear ID
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res, successMessage) => (err, docs) => {
    if (err) {
        res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
    } else {
        res.send(successMessage ? { message: successMessage, items: docs } : { items: docs });
    }
};

// Función auxiliar para manejar la creación de documentos
const handleCreationResponse = (res) => handleResponse(res, 'Document created successfully');

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    model.find({}, handleResponse(res));
};

/**
 * Obtener un solo usuario
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, handleResponse(res));
};

/**
 * Actualizar datos del audio
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, handleResponse(res, 'Audio updated successfully'));
};

/**
 * Insertar datos del audio en la base de datos
 */
exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, handleCreationResponse(res));
};

/**
 * Eliminar datos del audio
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    model.deleteOne({ _id: parseId(id) }, handleResponse(res, 'Audio deleted successfully'));
};
