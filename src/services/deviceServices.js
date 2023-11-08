import http from "./httpService";
import config from "./config.json";
import { headerConfig } from "../utils/headerConfig";

export const getDeviceType = () => {
  return http.get(`${config.R}/api/v1/device/models/get`, headerConfig, {
    timeout: 30000,
  });
};
