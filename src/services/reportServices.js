import http from "./httpService";
import config from "./config.json";

export const getGroupList = (token) => {
  return http.get(
    `${config.R}/api/v1/deviceGroup`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

export const postReportLastLocation = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/lastlocationsinp`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
