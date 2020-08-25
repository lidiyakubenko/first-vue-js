var CITIES = require("../src/constants/cities");
var express = require("express");
var axios = require("axios");
var app = express();
require("dotenv").config();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// constants start
const pairsUSD =
  "https://www.freeforexapi.com/api/live?pairs=EURUSD,USDJPY,EURGBP,GBPUSD,AUDUSD,USDCHF,NZDUSD,USDCAD,USDZAR";

const rapidHeaders = {
  "content-type": "application/octet-stream",
  "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  "x-rapidapi-key": process.env["API_WEATHER_KEY"],
  useQueryString: true
};

// constants end

// at 5 days every 3 hours
let forecast = {};

const fetchForecast = city =>
  axios.get("https://community-open-weather-map.p.rapidapi.com/forecast", {
    headers: rapidHeaders,
    params: {
      q: city
    }
  });

const getForecast = async city => {
  let result;
  try {
    result = await fetchForecast(city);
  } catch (e) {
    result = { data: { list: null } };
  }

  const ddd = result.data.list;
  return { [city]: ddd };
};

const getData = async () => {
  return Promise.all(CITIES.map(city => getForecast(city)));
};

getData().then(data => {
  forecast = data.reduce((accum, item) => ({ ...accum, ...item }), {});
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/weather/:city", (req, res) => {
  const { city } = req.params;

  if (!forecast[city]) {
    res.status(500).send("No such city");
  } else {
    (async () => {
      try {
        const result = await axios.get(
          "https://community-open-weather-map.p.rapidapi.com/weather",
          {
            headers: rapidHeaders,
            params: {
              id: "2172797",
              units: "%22metric%22 or %22imperial%22",
              q: city
            }
          }
        );

        const { data } = result;

        res.send({ ...data, forecast: forecast[city] });
      } catch (e) {
        res.status(500).send(e);
      }
    })();
  }
});

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
