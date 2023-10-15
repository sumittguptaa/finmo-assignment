const axios = require("axios");
const uuid = require("uuid");
const generateQuoteId = () => {
  return uuid.v4();
};
const alphaVantageApiKey = "UNVZ6IMBWUI7D267";
let currency_mapping = [
];
const getFXRates = async (req, res) => {
  const { fromCurrency, toCurrency } = req.query;
  if (!fromCurrency || !toCurrency) {
    return res.status(400).json({ error: "Invalid currency pair" });
  }
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${alphaVantageApiKey}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const quoteId = generateQuoteId();
    let expiryAt = Date.now() + 60000
    currency_mapping.push({
      quoteId: quoteId,
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      exchangeRate:
        response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
      expiryAt: expiryAt,
    });
    res.json({ quoteId, expiryAt: expiryAt});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FX rates" });
  }
};

module.exports = { getFXRates, currency_mapping };
