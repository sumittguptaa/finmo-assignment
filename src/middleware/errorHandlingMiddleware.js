
const handleErrors = (err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
};

module.exports = { handleErrors };
