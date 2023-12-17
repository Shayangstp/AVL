// import React, { useState } from "react";
// // import { Table, ConfigProvider, Empty, Input, Space } from "antd";
// // import "antd/dist/antd.css";
// import { Scrollbars } from "react-custom-scrollbars";
// // import "./YourComponent.css"; // Import your custom CSS file

// const data = [
//   // Your data items
// ];

// const Test = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   const getColumnSearchProps = (dataIndex, placeholder) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           placeholder={placeholder}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => confirm()}
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <button
//             type="button"
//             onClick={() => {
//               clearFilters();
//               setSearchText("");
//             }}
//             style={{ width: 80 }}
//           >
//             Reset
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               confirm();
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//             style={{ width: 80 }}
//           >
//             Search
//           </button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <i
//         className={`fa ${filtered ? "fa-filter" : "fa-filter"}`}
//         style={{ fontSize: "1.2rem", color: filtered ? "#1890ff" : undefined }}
//       />
//     ),
//     onFilter: (value, record) => {
//       const columnValue = record[dataIndex] ? record[dataIndex].toString() : "";
//       return columnValue.toLowerCase().includes(value.toLowerCase());
//     },
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => {
//           const input = document.querySelector(
//             ".ant-table-filter-dropdown input"
//           );
//           if (input) {
//             input.focus();
//           }
//         }, 0);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <span style={{ fontWeight: "bold" }}>{text}</span>
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       ...getColumnSearchProps("name", "Search Name"),
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       ...getColumnSearchProps("age", "Search Age"),
//     },
//     // Add more columns as needed
//   ];

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };

//   return (
//     <div className="position-relative table-responsive">
//       <ConfigProvider locale={faIR}>
//         <Table
//           locale={{
//             emptyText: <Empty description="اطلاعات موجود نیست!" />,
//           }}
//           className="list"
//           bordered
//           dataSource={data}
//           columns={columns}
//           pagination={{
//             position: ["bottomCenter", "bottomCenter"],
//           }}
//           scroll={{ x: "max-content" }}
//         />
//       </ConfigProvider>
//     </div>
//   );
// };

// export default Test;
