var express = require("express");
var axios = require("axios");
var app = express();
require("dotenv").config();

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

app.get("/currency-pairs", (req, res) => {
  (async () => {
    try {
      const result = await axios.get(pairsUSD);

      res.send(result.data);
    } catch (e) {
      res.send(e);
    }
  })();
});

app.get("/weather", (req, res) => {
  (async () => {
    try {
      const result = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/weather",
        {
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env["API_WEATHER_KEY"],
            useQueryString: true
          },
          params: {
            id: "2172797",
            units: "%22metric%22 or %22imperial%22",
            q: "Moscow"
          }
        }
      );

      res.send(result.data);
    } catch (e) {
      res.send(e);
    }
  })();
});
