const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const accountRoutes = require("../routes/accountRoutes");
const fxConversionRoutes = require("../routes/fxConversionRoutes");
const fxRatesRoutes = require("../routes/fxRatesRoutes");

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use("/accounts", accountRoutes);
app.use("/fx-conversion", fxRatesRoutes);
app.use("/fx-rates", fxConversionRoutes);
const { handleErrors } = require("./middleware/errorHandlingMiddleware");
app.use(handleErrors);


module.exports = app;
