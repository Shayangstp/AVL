import http from "./httpService";
import config from "./config.json";

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

export const postAddDevice = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/add`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

export const postAddVehicle = (value, token) => {
  return http.post(
    `${config.R}/api/v1/device/models/add`,
    value,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
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
    `${config.R}/api/v1/device`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};

export const getPhoneNumbers = (token) => {
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

export const postSpeedLimitation = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/alarmsettings`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const putGpsEdit = (values, token) => {
  return http.put(
    `${config.R}/api/v1/device`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postVehicleCondition = (values, token) => {
  return http.post(
    `${config.R}/api/v1/device/status`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const getDeviceLocList = (deviceId, token) => {
  return http.get(
    `${config.R}/api/v1/gpsdata/${deviceId}/0/10`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postGpsLimit = (token, values) => {
  return http.post(
    `${config.R}/api/v1/device/addpolygon`,
    values,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const deleteGeoLimit = (deviceId, token) => {
  return http.delete(
    `${config.R}/api/v1/device/polygon/${deviceId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
