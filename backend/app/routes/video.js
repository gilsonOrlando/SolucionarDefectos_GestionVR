const express = require('express')
const Auth = require('../middlewares');
const controller = require('../controllers/video')
const router = express.Router()
/**
 * Ruta: /user GET
 */
router.get(
    `/`,
    controller.getData
)
/**
 * Ruta: /user GET
 */
router.get(
    `/:id`,
    controller.getSingle
)
/**
 * Ruta: /user GET
 */
router.post(
    `/`,Auth.verifyToken,
    controller.insertData
)
/**
 * Ruta: /user GET
 */
router.put(
    `/:id`,Auth.verifyToken,
    controller.updateSingle
)
/**
 * Ruta: /user GET
 */
router.delete(
    `/:id`,Auth.verifyToken,
    controller.deleteSingle
)
module.exports = router