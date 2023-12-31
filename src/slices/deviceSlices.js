import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDeviceType } from "../services/deviceServices";
import {
  getDeviceLocList,
  postAddDevice,
  postAddVehicle,
  getDeviceList,
  editDeviceList,
} from "../services/deviceServices";
import { RsetFormErrors, RsetLoading } from "./mainSlices";
import { RsetDeviceEditModal } from "../slices/modalSlices";
import { successMessage, errorMessage } from "../utils/msg";

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
  vehicleAdded: [],
  deviceList: [],
  currentDevice: "",
  editTimeStamp: null,
  vehicleId: "",
  vehicleSpeed: "",
  smsReciver: "",
  smsReciverOptions: [],
  emailReciver: "",
  timeToSendSms: "",
  vehicleCondition: "",
  vehicleConditionOptions: [],
  vehicleConditionDescription: "",
  deviceLocList: [],
  deviceCordinate: [],
  deviceApiCordinate: [],

  //filter
  deviceImeiFilter: "",
  deviceNumberFilter: "",
  driverNameFilter: "",
  driverNumberFilter: "",
  vehicleNumberFilter: "",
  deviceCategoryFilter: "",
  vehicleCompanyFilter: "",
  vehicleUsingFilter: "",
};

export const handleVehicleTypeOptions = createAsyncThunk(
  "device/handleVehicleTypeOptions",
  async (obj, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const getDeviceTypeRes = await getDeviceType(token);
      if (getDeviceTypeRes.data.code === 200) {
        const itemsFromApi = getDeviceTypeRes.data.foundedItem;
        const itemsModified = itemsFromApi.map((item, index) => {
          return {
            label: item.name,
            value: index + 1,
          };
        });
        const itemsModifiedDecendingOrder = itemsModified.sort(
          (a, b) => b.value - a.value
        );
        dispatch(RsetVehicleTypeOptions(itemsModifiedDecendingOrder));
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleDeviceLocList = createAsyncThunk(
  "device/handleDeviceLocList",
  async (obj, { dispatch, getState }) => {
    const { currentDevice } = getState().device;
    try {
      const token = localStorage.getItem("token");
      const getDeviceLocListRes = await getDeviceLocList(
        currentDevice._id,
        token
      );
      if (getDeviceLocListRes.data.code === 200) {
        dispatch(RsetDeviceLocList(getDeviceLocListRes.data.foundedItem));
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleAddDevice = createAsyncThunk(
  "device/handleAddDevice",
  async (values, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    dispatch(RsetLoading(true));
    try {
      const postAddDeviceRes = await postAddDevice(values, token);
      console.log(postAddDeviceRes);
      if (postAddDeviceRes.data.code === 201) {
        successMessage("دستگاه مورد نظر با موفقیت اضافه شد");
        dispatch(handleAddDeviceReset());
        dispatch(RsetLoading(false));
      } else {
        errorMessage("خطا!");
        dispatch(RsetLoading(false));
      }
    } catch (ex) {
      console.log(ex);
      dispatch(RsetLoading(false));
    }
  }
);

export const handleAddDeviceReset = createAsyncThunk(
  "device/handleAddDeviceReset",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetDeviceNumber(""));
    dispatch(RsetDeviceImei(""));
    dispatch(RsetDeviceType(""));
    dispatch(RsetVehicleNumber(""));
    dispatch(RsetVehicleType(""));
    dispatch(RsetVehicleCompany(""));
    dispatch(RsetVehicleUsing(""));
    dispatch(RsetDriverName(""));
    dispatch(RsetDriverNumber(""));
    dispatch(RsetVehicleGas(""));
    dispatch(RsetFormErrors(""));
  }
);

export const handleVehicleModlesList = createAsyncThunk(
  "device/handleVehicleModlesList",
  async (obj, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    try {
      const getDeviceTypeRes = await getDeviceType(token);
      console.log(getDeviceTypeRes);
      if (getDeviceTypeRes.data.code === 200) {
        dispatch(RsetVehicleAdded(getDeviceTypeRes.data.foundedItem));
      } else {
        errorMessage("خطا در دریافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleAddVehicleType = createAsyncThunk(
  "device/handleAddVehicleType",
  async (values, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    try {
      const postAddVehicleRes = await postAddVehicle(values, token);
      console.log(postAddVehicleRes);
      if (postAddVehicleRes.data.code === 200) {
        successMessage("مدل دستگاه با موفقیت اضافه شد");
        dispatch(RsetVehicleAddType(""));
        dispatch(handleVehicleModlesList());
      } else if (postAddVehicleRes.data.code === 400) {
        errorMessage("این مدل ثبت شده است!");
      } else {
        errorMessage("خطا!");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const handleDeviceList = createAsyncThunk(
  "device/handleDeviceList",
  async (values, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    try {
      dispatch(RsetLoading(true));
      const getDeviceListRes = await getDeviceList(token);
      console.log(getDeviceListRes);
      if (getDeviceListRes.data.allVehicles !== null) {
        dispatch(RsetDeviceList(getDeviceListRes.data.allVehicles));
        dispatch(RsetLoading(false));
      } else {
        errorMessage("خطا");
        dispatch(RsetLoading(false));
      }
    } catch (ex) {
      console.log(ex);
      dispatch(RsetLoading(false));
    }
  }
);

export const handleDeviceEdit = createAsyncThunk(
  "device/handleDeviceEdit",
  async (values, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    try {
      const editDeviceListRes = await editDeviceList(values, token);
      console.log(editDeviceListRes);
      if (editDeviceListRes.data.code === 200) {
        dispatch(RsetDeviceEditModal(false));
        successMessage("ویرایش با موفقیت انجام شد");
        dispatch(RsetCurrentDevice(""));
      } else {
        errorMessage("خطا");
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
    RsetVehicleAdded: (state, action) => {
      return { ...state, vehicleAdded: action.payload };
    },
    RsetDeviceList: (state, action) => {
      return { ...state, deviceList: action.payload };
    },
    RsetCurrentDevice: (state, action) => {
      return { ...state, currentDevice: action.payload };
    },
    RsetEditTimeStamp: (state, action) => {
      return { ...state, editTimeStamp: action.payload };
    },
    RsetVehicleId: (state, action) => {
      return { ...state, vehicleId: action.payload };
    },
    RsetVehicleSpeed: (state, action) => {
      return { ...state, vehicleSpeed: action.payload };
    },
    RsetSmsReciver: (state, action) => {
      return { ...state, smsReciver: action.payload };
    },
    RsetSmsReciverOptions: (state, action) => {
      return { ...state, smsReciverOptions: action.payload };
    },
    RsetEmailReciver: (state, action) => {
      return { ...state, emailReciver: action.payload };
    },
    RsetTimeToSendSms: (state, action) => {
      return { ...state, timeToSendSms: action.payload };
    },
    RsetVehicleCondition: (state, action) => {
      return { ...state, vehicleCondition: action.payload };
    },
    RsetVehicleConditionOptions: (state, action) => {
      return { ...state, vehicleConditionOptions: action.payload };
    },
    RsetVehicleConditionDescription: (state, action) => {
      return { ...state, vehicleConditionDescription: action.payload };
    },
    RsetDeviceLocList: (state, action) => {
      return { ...state, deviceLocList: action.payload };
    },
    RsetDeviceCordinate: (state, action) => {
      return { ...state, deviceCordinate: action.payload };
    },
    RsetDeviceApiCordinate: (state, action) => {
      return { ...state, deviceApiCordinate: action.payload };
    },

    //filter
    RsetDeviceImeiFilter: (state, action) => {
      return { ...state, deviceImeiFilter: action.payload };
    },
    RsetDeviceNumberFilter: (state, action) => {
      return { ...state, deviceNumberFilter: action.payload };
    },
    RsetDriverNameFilter: (state, action) => {
      return { ...state, driverNameFilter: action.payload };
    },
    RsetDriverNumberFilter: (state, action) => {
      return { ...state, driverNameFilter: action.payload };
    },
    RsetVehicleNumberFilter: (state, action) => {
      return { ...state, vehicleNumberFilter: action.payload };
    },
    RsetDeviceCategoryFilter: (state, action) => {
      return { ...state, deviceCategoryFilter: action.payload };
    },
    RsetVehicleCompanyFilter: (state, action) => {
      return { ...state, vehicleCompanyFilter: action.payload };
    },
    RsetVehicleUsingFilter: (state, action) => {
      return { ...state, vehicleUsingFilter: action.payload };
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
  RsetVehicleAdded,
  RsetDeviceList,
  RsetCurrentDevice,
  RsetEditTimeStamp,
  RsetVehicleId,
  RsetVehicleSpeed,
  RsetSmsReciver,
  RsetSmsReciverOptions,
  RsetEmailReciver,
  RsetTimeToSendSms,
  RsetVehicleCondition,
  RsetVehicleConditionOptions,
  RsetVehicleConditionDescription,
  RsetDeviceLocList,
  RsetDeviceCordinate,
  RsetDeviceApiCordinate,
  //filter
  RsetDeviceImeiFilter,
  RsetDeviceNumberFilter,
  RsetDriverNameFilter,
  RsetDriverNumberFilter,
  RsetVehicleNumberFilter,
  RsetDeviceCategoryFilter,
  RsetVehicleCompanyFilter,
  RsetVehicleUsingFilter,
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
export const selectVehicleAdded = (state) => state.device.vehicleAdded;
export const selectDeviceList = (state) => state.device.deviceList;
export const selectCurrentDevice = (state) => state.device.currentDevice;
export const selectEditTimeStamp = (state) => state.device.editTimeStamp;
export const selectVehicleId = (state) => state.device.vehicleId;
export const selectVehicleSpeed = (state) => state.device.vehicleSpeed;
export const selectSmsReciver = (state) => state.device.smsReciver;
export const selectSmsReciverOptions = (state) =>
  state.device.smsReciverOptions;
export const selectEmailReciver = (state) => state.device.emailReciver;
export const selectTimeToSendSms = (state) => state.device.timeToSendSms;
export const selectVehicleCondition = (state) => state.device.vehicleCondition;
export const selectVehicleConditionOptions = (state) =>
  state.device.vehicleConditionOptions;
export const selectVehicleConditionDescription = (state) =>
  state.device.vehicleConditionDescription;
export const selectDeviceLocList = (state) => state.device.deviceLocList;
export const selectDeviceCordinate = (state) => state.device.deviceCordinate;
export const selectDeviceApiCordinate = (state) =>
  state.device.deviceApiCordinate;

//filter
export const selectDeviceImeiFilter = (state) => state.device.deviceImeiFilter;
export const selectDeviceNumberFilter = (state) =>
  state.device.deviceNumberFilter;
export const selectDriverNameFilter = (state) => state.device.driverNameFilter;
export const selectDriverNumberFilter = (state) =>
  state.device.driverNumberFilter;
export const selectVehicleNumberFilter = (state) =>
  state.device.vehicleNumberFilter;
export const selectDeviceCategoryFilter = (state) =>
  state.device.deviceCategoryFilter;
export const selectVehicleCompanyFilter = (state) =>
  state.device.vehicleCompanyFilter;
export const selectVehicleUsingFilter = (state) =>
  state.device.vehicleUsingFilter;

export default deviceSlices.reducer;
