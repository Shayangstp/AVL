import http from "./httpService";
import config from "./config.json";

export const getCategoryList = (token) => {
  return http.get(
    `${config.R}/api/v1/devicegroup`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

