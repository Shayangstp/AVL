import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingBtn = () => {
  return (
    <div className=" d-flex justify-content-center">
      <ThreeDots
        height="23"
        width="40"
        radius="9"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default LoadingBtn;
