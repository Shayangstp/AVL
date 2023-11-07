import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RsetUploadFile, selectUploadFile } from "../../../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import { postProfilePicFile } from "../../../services/uploadServices";

const FileUploader = () => {
  const dispatch = useDispatch();
  const uploadedFile = useSelector(selectUploadFile);

  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    handleFileUpload(files);
  };

  const handleFile = async () => {
    console.log("hi");
    let file = [];
    const data = new FormData();
    for (let x = 0; x < uploadedFile.length; x++) {
      data.append("file", uploadedFile[x]);
    }
    file = data;
    const uploadProfilePicFileRes = await postProfilePicFile(file);
    console.log(uploadProfilePicFileRes);
    console.log("bye");
  };

  const handleFileUpload = async (files) => {
    dispatch(RsetUploadFile(files));
    handleFile();
  };

  return (
    <div
      className={`text-center d-flex flex-column lightGray-bg borderRadius p-3 w-75 h-100 mh-100 mx-auto position-relative`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleFileClick}
    >
      <div>
        <input
          type="file"
          ref={fileInputRef}
          id="file-upload"
          className="d-none"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
