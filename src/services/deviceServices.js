import http from "./httpService";
import config from "./config.json";
import { headerConfig } from "../utils/headerConfig";

export const getDeviceType = (token) => {
  return http.get(
    `${config.R}/api/v1/device/models/get`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

export const postAddDevice = (values) => {
  return http.post(`${config.R}/api/v1/device/add`, values, headerConfig, {
    timeout: 30000,
  });
};

export const postAddVehicle = (value) => {
  return http.post(
    `${config.R}/api/v1/device/models/add`,
    value,
    headerConfig,
    {
      timeout: 30000,
    }
  );
};

export const getDeviceList = (token) => {
  return http.get(
    `${config.R}/api/v1/device`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

export const editDeviceList = (values, token) => {
  return http.put(
    `${config.R}/api/v1/device/edit`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};