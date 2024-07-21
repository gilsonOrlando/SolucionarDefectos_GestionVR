const express = require("express");
const router = express.Router();
const controller = require("../controllers/delete");

router.delete(
    `/:name`,
    controller.remove
)

module.exports = router