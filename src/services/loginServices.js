import http from "./httpService";
import config from "./config.json";

export const postUserAuth = (userAuthValus) => {
  return http.post(`${config.R}/api/v1/user/signin`, userAuthValus, {
    timeout: 30000,
  });
};

export const postForgetPassword = (username) => {
  return http.post(`${config.R}/api/v1/user/passwordrecovery`, username, {
    timeout: 30000,
  });
};
