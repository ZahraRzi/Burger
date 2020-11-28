import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-app-32b5d.firebaseio.com/",
});

export default instance;