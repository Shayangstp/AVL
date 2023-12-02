import React, { useEffect, useState, Fragment } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useTable, useSortBy, usePagination } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import VehicleList from "../vehicleList/VehicleList";
import { selectShowVehicleList } from "../../../slices/getReportSlices";
import { useDispatch, useSelector } from "react-redux";

const ViewLastLocationTable = ({
  columns,
  data,
  onSort,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  requests,
}) => {
  // const dispatch = useDispatch();
  const showVehicleList = useSelector(selectShowVehicleList);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  );

  const [openRowId, setOpenRowId] = useState(null);

  useEffect(() => {
    gotoPage(0);
  }, [requests]);

  useEffect(() => {
    fetchData({ pageIndex, pageSize, requests });
    onSort({ sortBy, pageIndex, pageSize, requests });
  }, [onSort, sortBy, fetchData, pageIndex, pageSize, requests]);

  return (
    <section>
      <Table bordered hover responsive size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="bg-secondary text-white fw-normal"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  title="" /*title={`مرتب سازی براساس ${column.render("Header")}`} */
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment>
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        onClick={() => {
                          setOpenRowId(row.id);
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {openRowId === row.id && (
                  <tr>
                    <td colSpan={columns.length}>
                      <div>{showVehicleList && <VehicleList />}</div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
          <tr>
            {loading ? (
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000" className="font10">
                نمایش {page.length} از ~{controlledPageCount * pageSize} نتیجه
              </td>
            )}
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col lg="12" xl="12">
          <div className="row pagination justify-content-center align-items-center">
            <div className="col-12 col-md-3">
              <select
                className="form-control font10"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    نمایش {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center font10">
              <span className="font10">برو به صفحه:</span>
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                className="form-control font10"
              />{" "}
            </div>
            <div className="col-12 col-md-3 font10">
              صفحه{" "}
              <strong className="font10">
                {pageIndex + 1} از {pageOptions.length}
              </strong>{" "}
            </div>
            <div className="col-12 col-md-4 mt-2 d-flex gap-1">
              <Button
                size="sm"
                variant="outline-secondary"
                className="fw-bold py-0"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Button>{" "}
              <Button
                size="sm"
                variant="outline-secondary"
                className="fw-bold py-0"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>{" "}
              <Button
                size="sm"
                variant="outline-secondary"
                className="fw-bold py-0"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>{" "}
              <Button
                size="sm"
                variant="outline-secondary"
                className="fw-bold py-0"
                onClick={() => gotoPage(controlledPageCount - 1)}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </Button>{" "}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ViewLastLocationTable;
