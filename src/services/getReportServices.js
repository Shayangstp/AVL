import http from "./httpService";
import config from "./config.json";

export const postAlarmsReport = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/report/alarms`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
