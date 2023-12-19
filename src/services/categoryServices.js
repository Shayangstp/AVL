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

export const putCategoryEdit = (values, token) => {
  return http.put(
    `${config.R}/api/v1/devicegroup`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const postAddDeviceToDeviceGroup = (values, token) => {
  return http.post(
    `${config.R}/api/v1/devicegroup/device`,
    values,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const getVehicleManageList = (token) => {
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
export const deleteVehicleManage = (vehicleId, groupId, token) => {
  return http.delete(
    `${config.R}/api/v1/devicegroup/device/${vehicleId}/${groupId}`,

    {
      headers: { Authorization: `Bearer ${token}` },
    },
    {
      timeout: 30000,
    }
  );
};
export const getVehicleAddOptions = (token) => {
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
