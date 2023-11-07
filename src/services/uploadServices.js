import http from "./httpService";
import config from "./config.json";

export const postProfilePicFile = (file) => {
  return http.post(
    `${config.R}/api/v1/user/upload-Prof-pic`,
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Length": "",
      },
    }
    // {
    //   responseType: "blob",
    // }
  );
};
