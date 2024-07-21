const mongoose = require('mongoose');
const model = require('../models/directivo');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res, successMessage, errorMessage) => (err, docs) => {
    if (err) {
        res.status(500).send({ error: errorMessage || 'Internal Server Error' });
    } else {
        res.send({ items: docs || successMessage });
    }
};

// Función auxiliar para manejar la creación de documentos
const handleCreateResponse = (res) => (err, docs) => {
    if (err) {
        res.status(422).send({ error: 'Error al crear el documento' });
    } else {
        res.send({ data: docs });
    }
};

exports.getData = (req, res) => {
    model.find({}, handleResponse(res));
};

exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, handleResponse(res));
};

exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, handleResponse(res));
};

exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, handleCreateResponse(res));
};

exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    model.deleteOne({ _id: parseId(id) }, handleResponse(res));
};
