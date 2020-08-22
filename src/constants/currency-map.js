import audJpg from "../assets/currencies/AUD.jpg";
import cadJpg from "../assets/currencies/CAD.jpg";
import chfJpg from "../assets/currencies/CHF.jpg";
import eurJpg from "../assets/currencies/EUR.jpg";
import gbpPng from "../assets/currencies/GBP.png";
import nzdJpg from "../assets/currencies/NZD.jpg";
import usdJpg from "../assets/currencies/USD.jpg";
import jpyJpg from "../assets/currencies/JPY.jpg";
import zarJpg from "../assets/currencies/ZAR.jpg";

const CURRENCY_MAP = {
  JPY: { name: "Yen", image: jpyJpg },
  EUR: { name: "Euro", image: eurJpg },
  CHF: { name: "Franc", image: chfJpg },
  GBP: { name: "Pound sterling", image: gbpPng },
  CAD: { name: "Canadian dollar", image: cadJpg },
  AUD: { name: "Australian dollar", image: audJpg },
  NZD: { name: "New Zealand dollar", image: nzdJpg },
  ZAR: { name: "South African rand", image: zarJpg },
  USD: { name: "United States dollar", image: usdJpg }
};

export default CURRENCY_MAP;
