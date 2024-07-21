//función para eliminar archivos por su nombre
const fs = require("fs");
const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";
  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
    res.status(200).send({
      message: "File is deleted.",
    });
  });
};
//Este método bloquea el bucle de eventos de Node.js hasta que finaliza la acción.
const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";
  try {
    fs.unlinkSync(directoryPath + fileName);
    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};
module.exports = {
  remove,
  removeSync,
};