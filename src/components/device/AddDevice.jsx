import React from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Select from "react-select";

const AddDevice = () => {
  return (
    <Container fluid className="mt-4 mb-5">
      {/* <section className="lightGray2-bg p-3 shadow borderRadius-15 border border-white border-2"> */}
      {/* <div className="shadow p-4 mb-5 borderRadius-15 lightGray-bg  border border-white font16"> */}
      <div className="mb-5 mt-5">افزودن دستگاه ﺟﺪﯾﺪ</div>
      <Form>
        {/* GPS info */}
        <div className="mb-4">اﻃﻼﻋﺎﺕ ردیاب</div>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">
              شماره تلفن سیم کارت
            </Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">IMEI دستگاه</Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">نوع GPS</Form.Label>
            <Select
              // value={softwareReqItemName}
              name="softwareReqItemName"
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqItemName(e));
              // }}
              placeholder="انتخاب..."
              // options={softwareNamesOption}
              isSearchable={true}
              isMulti
            />
            {/* {!softwareNameIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqItemName}
                  </p>
                )} */}
          </Form.Group>
        </Row>
        {/* VEHICLE INFO */}
        <div className="mt-4 mb-4">اﻃﻼﻋﺎﺕ خودرو</div>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">پلاک</Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">مدل</Form.Label>
            <Select
              // value={softwareReqItemName}
              name="softwareReqItemName"
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqItemName(e));
              // }}
              placeholder="انتخاب..."
              // options={softwareNamesOption}
              isSearchable={true}
              isMulti
            />
            {/* {!softwareNameIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqItemName}
                  </p>
                )} */}
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">شرکت سازنده</Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">کاربری</Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
        </Row>
        <div className="mt-4 mb-4">اﻃﻼﻋﺎﺕ راننده</div>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">نام راننده</Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">تلفن راننده</Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
        </Row>
        {/* sokhtGiri */}
        <div className="mt-4 mb-4">اﻃﻼﻋﺎﺕ سوخت‌گیری</div>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">
              میزان سوخت مصرفی در هر ۱۰۰ کیلومتر
            </Form.Label>
            <Form.Control
              type="text"
              name="softwareReqRequireParts"
              // value={softwareReqRequireParts}
              // onChange={(e) => {
              //   dispatch(RsetSoftwareReqRequireParts(e.target.value));
              // }}
            />
            {/* {!requirePartsIsValid && (
                  <p className="font12 text-danger mb-0 mt-1">
                    {formErrors.softwareReqRequireParts}
                  </p>
                )} */}
          </Form.Group>
        </Row>

        <Row>
          <Col
            md="5"
            xl="4"
            className="mx-auto d-flex justify-content-between mt-4"
          >
            <Button
              variant="success"
              className="w-45 mb-3"
              // disabled={
              //   softwareToggleHandler === false &&
              //   softwareReqItems.length === 0
              //     ? true
              //     : false
              // }
              // onClick={(e) => {
              //   if (user.Supervisor.FirstName !== "نامشخص") {
              //     submitHandler(e);
              //     dispatch(RsetSoftwareReqItems(""));
              //   } else {
              //     errorMessage("سرپرست انتخاب نشده!");
              //   }
              // }}
            >
              ثبت درخواست
            </Button>
            <Button
              variant="secondary"
              type="reset"
              className="w-45 mb-3"
              // onClick={() => {
              //   dispatch(handleSoftwareReset());
              //   dispatch(RsetSoftwareReqItems(""));
              //   if (softwareToggleHandler) {
              //     dispatch(RsetSoftwareToggleHandler(false));
              //   }
              //   dispatch(RsetRadioCheck(true));
              //   dispatch(RsetSoftwareReqDescription(""));
              // }}
            >
              انصراف
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </section> */}
    </Container>
  );
};

export default AddDevice;
