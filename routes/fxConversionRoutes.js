const express = require("express");
const fxConversionController = require("../src/controllers/fxConversionController");
const { validateConversion } = require("../src/middleware/validationConversion");

const router = express.Router();

router.post("/",validateConversion ,  (req, res) => fxConversionController.performFXConversion(req, res));

module.exports = router;
