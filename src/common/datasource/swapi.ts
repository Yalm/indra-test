import axios from "axios";
import configuration from "../config/configuration";

export function connectToSwapi() {
  return axios.create({ baseURL: configuration.client.swapi.baseURL });
}
