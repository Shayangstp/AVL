import http from "./httpService";
import config from "./config.json";

export const getAllGpses = (token) => {
  return http.get(
    `${config.R}/api/v1/gpsdata`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
