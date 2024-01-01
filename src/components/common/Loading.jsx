import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = ({ height, width }) => {
  return (
    <div>
      <RotatingLines
        visible={true}
        height={height}
        width={width}
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
