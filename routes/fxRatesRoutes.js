const express = require("express");
const fxRatesController = require("../src/controllers/fxRatesController");
const { validateRates } = require("../src/middleware/validationRates");
const router = express.Router();

router.get("/", validateRates, async (req, res) => {
  try {
    const result = await fxRatesController.getFXRates(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
