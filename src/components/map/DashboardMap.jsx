import React from "react";
import { ReactDOM } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
// import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { selectAllGpses } from "../../slices/mainSlices";
import { Button } from "react-bootstrap";
import { AwesomeMarkers } from "leaflet.awesome-markers";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.js";

const allGpses = [
  {
    lastLocation: {
      IMEI: "imei",
      lat: 31,
      lng: 51,
    },
    group: { color: "#f70505" },
    deviceInfo: {
      vehicleName: "vehicleName",
      driverName: "driverName",
      driverPhoneNumber: "driverPhoneNumber",
      plate: "plate",
      model: { name: "modelName" },
      simNumber: "simNumber",
    },
  },
  {
    lastLocation: {
      IMEI: "imei",
      lat: 32.5,
      lng: 51,
    },
    group: { color: "#f7a705" },
    deviceInfo: {
      vehicleName: "vehicleName",
      driverName: "driverName",
      driverPhoneNumber: "driverPhoneNumber",
      plate: "plate",
      model: { name: "modelName" },
      simNumber: "simNumber",
    },
  },
  {
    lastLocation: {
      IMEI: "imei",
      lat: 33.5,
      lng: 51,
    },
    group: { color: "#1105f7" },
    deviceInfo: {
      vehicleName: "vehicleName",
      driverName: "driverName",
      driverPhoneNumber: "driverPhoneNumber",
      plate: "plate",
      model: { name: "modelName" },
      simNumber: "simNumber",
    },
  },
];

const DashboardMap = ({ height, width }) => {
  // const allGpses = useSelector(selectAllGpses);

  // console.log(allGpses);

  const allCordinates = allGpses.map((item, i) => {
    return item.lastLocation;
  });

  console.log(allCordinates);

  const colorPicker = (color) => {
    const icon = L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<i class="fa-solid fa-location-dot fa-2x" style="color: ${color};"></i>`,
    });

    return icon;
  };

  return (
    <>
      <MapContainer
        center={[35.7219, 51.3347]}
        zoom={5}
        style={{ height: height, width: width }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {allGpses.map((marker, idx) => (
          <Marker
            className="inner-circle"
            key={idx}
            position={marker.lastLocation}
            icon={colorPicker(marker.group.color)}
          >
            <Popup>
              <Button size="sm" className="font10">
                مشاهده
              </Button>
              <ul className="list-group list-group-flush list-group-numbered">
                <li className="mt-2 list-group-item text-start">
                  IMEI دستگاه :{" "}
                  <div className="mt-1">{marker.lastLocation.IMEI}</div>
                </li>
                <li className="list-group-item list-group-item-secondary text-start">
                  نام دستگاه:{" "}
                  <div className="mt-1">{marker.deviceInfo.vehicleName}</div>
                </li>
                <li className="list-group-item text-start">
                  نام راننده :{" "}
                  <div className="mt-1">{marker.deviceInfo.driverName}</div>
                </li>
                <li className="list-group-item list-group-item-secondary text-start">
                  شماره راننده :{" "}
                  <div className="mt-1">
                    {marker.deviceInfo.driverPhoneNumber}
                  </div>
                </li>
                <li className="list-group-item text-start">
                  پلاک : <div className="mt-1">{marker.deviceInfo.plate}</div>
                </li>
                <li className="list-group-item text-start list-group-item-secondary">
                  مدل :{" "}
                  <div className="mt-1">{marker.deviceInfo.model.name}</div>
                </li>
                <li className="list-group-item text-start">
                  شماره سیم کارت دستگاه :{" "}
                  <div className="mt-1">{marker.deviceInfo.simNumber}</div>
                </li>
                <li className="list-group-item text-start list-group-item-secondary ">
                  عرض جغرافیایی :{" "}
                  <div className="mt-1">{marker.lastLocation.lat}</div>
                </li>
                <li className="list-group-item text-start">
                  طول جغرافیایی :{" "}
                  <div className="mt-1">{marker.lastLocation.lng}</div>
                </li>
              </ul>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default DashboardMap;
