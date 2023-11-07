import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  RsetChangeProfilePicModal,
  selectChangeProfilePicModal,
} from "../../../slices/modalSlices";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FileUploader from "../file/FileUploader";
import { RsetUploadFile, selectUploadFile } from "../../../slices/mainSlices";

const ChangeProfilePicModal = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(true);
  };

  const uploadedFile = useSelector(selectUploadFile);

  const handleLeave = () => {
    setIsHovered(false);
  };

  const dispatch = useDispatch();
  const profilePicModal = useSelector(selectChangeProfilePicModal);

  // console.log(uploadedFile);


  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetChangeProfilePicModal(false));
      }}
      show={profilePicModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-dark text-white">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
          عکس پروفایل
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary">
        <div className="d-flex justify-content-center position-relative">
          <img
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="image-fluid  w-75 h-100 border border-2 border-dashed borderRadius-15 changeProfilePic shadow cursor-pointer position-relative"
            src="../../images/avl-login-bg.png"
            onClick={() => console.log("hi")}
          />
          {isHovered ? (
            <span
              className=" text-white position-absolute w-75 h-100 changeProfilePic"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <FontAwesomeIcon
                icon={faUpload}
                className="position-absolute top-50 end-50 fs-2 "
              />
              <FileUploader />
            </span>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <div className="d-flex justify-content-between w-100">
          <li className="text-start text-white mt-2">
            برای آپلود و یا تغییر بروی عکس پروفایل کلیک کنید
          </li>
          <Button
            onClick={() => {
              dispatch(RsetChangeProfilePicModal(false));
              dispatch(RsetUploadFile(""));
            }}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeProfilePicModal;
