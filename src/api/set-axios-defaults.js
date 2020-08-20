import axios from "axios";

const setAxiosDefaults = () => {
  axios.defaults.baseURL = "http://localhost:3000";
};

export default setAxiosDefaults;
