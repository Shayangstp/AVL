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
export const getUserLocked = (userId, token) => {
  return http.get(
    `${config.R}/api/v1/user/lock/${userId}`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const getUserUnLocked = (userId, token) => {
  return http.get(
    `${config.R}/api/v1/user/unlock/${userId}`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postNewPassword = (values, token) => {
  return http.post(
    `${config.R}/api/v1/user/change-password-other`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const putEditUser = (values, token) => {
  return http.put(
    `${config.R}/api/v1/user`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

export const postAddPhoneNumber = (values, token) => {
  return http.post(
    `${config.R}/api/v1/user/phoneNumbers/add`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const getAllUserPhoneNumbers = (token) => {
  return http.get(
    `${config.R}/api/v1/user/phoneNumbers/show`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postAddRoleToUser = (values, token) => {
  return http.post(
    `${config.R}/api/v1/user/addRoleToUser`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const getCommonUser = (token) => {
  return http.get(
    `${config.R}/api/v1/user/berif`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
