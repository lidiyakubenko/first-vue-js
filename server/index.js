var express = require("express");
var axios = require("axios");
var app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const pairsUSD =
  "https://www.freeforexapi.com/api/live?pairs=EURUSD,USDJPY,EURGBP,GBPUSD,AUDUSD,USDCHF,NZDUSD,USDCAD,USDZAR";

app.get("/test", (req, res) => {
  (async () => {
    try {
      const result = await axios.get(pairsUSD);

      res.send(result.data);
    } catch (e) {
      res.send(e);
    }
  })();
});
