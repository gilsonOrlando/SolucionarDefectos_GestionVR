const express = require('express')
const Auth = require('../middlewares');
const controller = require('../controllers/upload')
const router = express.Router()
/**
 * Ruta: /user GET
 */
router.post(
    `/image`,Auth.verifyToken,
    // controller.upload,
    controller.uploadFileImage
)
router.post(
    `/video`,Auth.verifyToken,
    // controller.upload,
    controller.uploadFileVideo
)
router.post(
    `/pdf`,Auth.verifyToken,
    // controller.upload,
    controller.uploadFilePdf
)
router.post(
    `/word`,Auth.verifyToken,
    // controller.upload,
    controller.uploadFileWord
)
router.post(
    `/audio`,Auth.verifyToken,
    // controller.upload,
    controller.uploadFileAudio
)
module.exports = router