const express = require("express");
const accountController = require("../src/controllers/accountController");
const { validateTopUp } = require("../src/middleware/validationMiddleware");
const router = express.Router();

router.post("/topup",validateTopUp, (req, res) => accountController.topUpAccount(req, res));
router.get("/balance", (req, res) => accountController.accountsBalance(req,res));

module.exports = router;
