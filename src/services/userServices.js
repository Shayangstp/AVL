import http from "./httpService";
import config from "./config.json";

export const getUsersList = (token) => {
  return http.get(
    `${config.R}/api/v1/user`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postAddUser = (values, token) => {
  return http.post(
    `${config.R}/api/v1/user/signup`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
