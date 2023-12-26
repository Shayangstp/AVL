import http from "./httpService";
import config from "./config.json";

export const postVehicleLocation = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/report/locations`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

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
export const postGpsReport = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/report/status`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postVehiclesChanges = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/report/vehicles`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postDriversChanges = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/report/changes`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postAlarmsReportPdf = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/report/alarms/pdf`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
   
  );
};
