
const userBalances = {
  USD: 1000,
  EUR: 500,
  GBP: 300,
};

const topUpAccount = (req, res) => {
  const { currency, amount } = req.body;
  if (!currency  || amount <= 0) {
    return res.status(400).json({ error: "Invalid currency or amount" });
  }
  if(!userBalances[currency]){

   userBalances[currency] = 0;
  }
  userBalances[currency] += amount;

  res.json({ message: "Account topped up successfully" });
};

const accountsBalance = (req,res)=>{
    if(!userBalances){
        return res.status(400).json({error: "There is no balance"});
    }

   return res.status(200).json(userBalances);
}

module.exports = { topUpAccount, accountsBalance };
