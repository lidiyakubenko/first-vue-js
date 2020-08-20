import axios from "axios";

const getPairs = async () => {
  let pairs = {};

  try {
    const result = await axios.get("/test");
    pairs = result.data.rates;
  } catch (e) {
    console.log(e);
  }

  return pairs;
};

export default getPairs;
