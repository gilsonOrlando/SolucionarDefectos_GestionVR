const mongoose = require('mongoose');
const model = require('../models/words');

const options = {
    page: 1,
    limit: 3
};

const parseId = (id) => {
    return mongoose.Types.ObjectId(id);
};

const handleResponse = (res, data) => {
    res.send({ items: data });
};

const handleError = (res, error) => {
    res.status(422).send({ error: 'Error', details: error });
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    model.find({}, (err, docs) => {
        if (err) {
            return handleError(res, err);
        }
        handleResponse(res, docs);
    });
};

/**
 * Obtener un solo USUARIO
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, (err, doc) => {
        if (err) {
            return handleError(res, err);
        }
        handleResponse(res, doc);
    });
};

/**
 * Actualizar un solo USUARIO
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, (err, result) => {
        if (err) {
            return handleError(res, err);
        }
        handleResponse(res, result);
    });
};

/**
 * Insertar DATA de USUARIOS
 */
exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, (err, doc) => {
        if (err) {
            return handleError(res, err);
        }
        res.send({ data: doc });
    });
};

/**
 * Eliminar un solo USUARIO
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    model.deleteOne({ _id: parseId(id) }, (err, result) => {
        if (err) {
            return handleError(res, err);
        }
        handleResponse(res, result);
    });
};
