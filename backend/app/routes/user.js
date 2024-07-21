const express = require('express')
const Auth = require('../middlewares');
const controller = require('../controllers/user')
const router = express.Router()
/**
 * Ruta: /user GET
 */
router.get(
    `/`,Auth.verifyToken,Auth.isAdmin,
    controller.getData
)
/**
 * Ruta: /user GET
 */
router.get(
    `/:id`,Auth.verifyToken,
    controller.getSingle
)
/**
 * Ruta: /user GET
 */
router.post(
    `/login`,
    controller.login
)
/**
 * Ruta: /user GET
 */
router.post(
    `/register`,Auth.checkDuplicateEmail,Auth.verifyToken,Auth.isAdmin,
    controller.register
)
/**
 * Ruta: /user GET
 */
router.put(
    `/:id`,Auth.verifyToken,
    controller.update
)
/**
 * Ruta: /user GET
 */
router.delete(
    `/:id`,Auth.verifyToken,Auth.isAdmin,
    controller.deleteSingle
)
module.exports = router