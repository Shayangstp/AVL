import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDeviceType } from "../services/deviceServices";

const initialState = {
  deviceNumber: "",
  deviceImei: "",
  deviceType: "",
  deviceTypeOptions: [],
  vehicleNumber: "",
  vehicleType: "",
  vehicleTypeOptions: [],
  vehicleCompany: "",
  vehicleUsing: "",
  driverName: "",
  driverNumber: "",
  vehicleGas: "",
  vehicleAddType: "",
};

export const handleVehicleTypeOptions = createAsyncThunk(
  "device/handleVehicleTypeOptions",
  async (obj, { dispatch, getState }) => {
    try {
      const getDeviceTypeRes = await getDeviceType();
      console.log(getDeviceTypeRes);
      if (getDeviceTypeRes.data.code === 200) {
        const itemsFromApi = getDeviceTypeRes.data.foundedItem;
        const itemsModified = itemsFromApi.map((item, index) => {
          return {
            label: item.name,
            value: index + 1,
          };
        });
        dispatch(RsetVehicleTypeOptions(itemsModified));
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

const deviceSlices = createSlice({
  name: "device",
  initialState,
  reducers: {
    RsetDeviceNumber: (state, action) => {
      return { ...state, deviceNumber: action.payload };
    },
    RsetDeviceImei: (state, action) => {
      return { ...state, deviceImei: action.payload };
    },
    RsetDeviceType: (state, action) => {
      return { ...state, deviceType: action.payload };
    },
    RsetDeviceTypeOptions: (state, action) => {
      return { ...state, deviceTypeOptions: action.payload };
    },
    RsetVehicleNumber: (state, action) => {
      return { ...state, vehicleNumber: action.payload };
    },
    RsetVehicleType: (state, action) => {
      return { ...state, vehicleType: action.payload };
    },
    RsetVehicleTypeOptions: (state, action) => {
      return { ...state, vehicleTypeOptions: action.payload };
    },
    RsetVehicleCompany: (state, action) => {
      return { ...state, vehicleCompany: action.payload };
    },
    RsetVehicleUsing: (state, action) => {
      return { ...state, vehicleUsing: action.payload };
    },
    RsetDriverName: (state, action) => {
      return { ...state, driverName: action.payload };
    },
    RsetDriverNumber: (state, action) => {
      return { ...state, driverNumber: action.payload };
    },
    RsetVehicleGas: (state, action) => {
      return { ...state, vehicleGas: action.payload };
    },
    RsetVehicleAddType: (state, action) => {
      return { ...state, vehicleAddType: action.payload };
    },
  },
});

export const {
  RsetDeviceNumber,
  RsetDeviceImei,
  RsetDeviceType,
  RsetDeviceTypeOptions,
  RsetVehicleNumber,
  RsetVehicleType,
  RsetVehicleTypeOptions,
  RsetVehicleCompany,
  RsetVehicleUsing,
  RsetDriverName,
  RsetDriverNumber,
  RsetVehicleGas,
  RsetVehicleAddType,
} = deviceSlices.actions;

export const selectDeviceNumber = (state) => state.device.deviceNumber;
export const selectDeviceImei = (state) => state.device.deviceImei;
export const selectDeviceType = (state) => state.device.deviceType;
export const selectDeviceTypeOptions = (state) =>
  state.device.deviceTypeOptions;
export const selectVehicleNumber = (state) => state.device.vehicleNumber;
export const selectVehicleType = (state) => state.device.vehicleType;
export const selectVehicleTypeOptions = (state) =>
  state.device.vehicleTypeOptions;
export const selectVehicleCompany = (state) => state.device.vehicleCompany;
export const selectVehicleUsing = (state) => state.device.vehicleUsing;
export const selectDriverName = (state) => state.device.driverName;
export const selectDriverNumber = (state) => state.device.driverNumber;
export const selectVehicleGas = (state) => state.device.vehicleGas;
export const selectVehicleAddType = (state) => state.device.vehicleAddType;

export default deviceSlices.reducer;
