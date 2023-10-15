const { currency_mapping } = require("./fxRatesController");

const performFXConversion = (req, res) => {
  const { quoteId, fromCurrency, toCurrency, amount } = req.body;
  if (!quoteId || !fromCurrency || !toCurrency || !amount) {
    res.status(400).json({ message: "Invalid request" });
  }
    const quote = currency_mapping.find((quote) => quote.quoteId === quoteId);
    if (!quote) {
     return res.status(404).json({ error: "Quote not found" });
    }
    if (quote.expiryAt < Date.now()) {
      return res.status(400).json({ error: "Quote expired" });
    }
    if (quote.fromCurrency !== fromCurrency || quote.toCurrency !== toCurrency) {
      return res.status(400).json({ error: "Invalid currency for the Quote ID" });
    }
    const convertedAmount = amount * quote.exchangeRate;
   return  res.json({ convertedAmount, currency: toCurrency });
};

module.exports = {  performFXConversion };
