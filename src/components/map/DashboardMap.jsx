import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";

import { selectAllGpses } from "../../slices/mainSlices";
import { Button } from "react-bootstrap";
import { AwesomeMarkers } from "leaflet.awesome-markers";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.js";

const DashboardMap = ({ height, width }) => {
  const allGpses = useSelector(selectAllGpses);

  console.log(allGpses);

  const allCordinates = allGpses.map((item, i) => {
    return item.lastLocation;
  });

  console.log(allCordinates);

  // const colorIcons = allGpses.map((marker) => {
  //   return marker.group?.color;
  // });
  const markerIconStyle = `
  .custom-marker-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #000;
  }
`;

  const colorpicker = (color) => {
    const hexToRgb = (hex) => {
      // Remove the '#' character if present
      console.log(hex);
      hex = hex === undefined ? "fff" : hex.replace("#", "");
      console.log(hex);
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgb(${r}, ${g}, ${b})`;
    };

    return L.divIcon({
      className: "custom-marker-icon",
      iconSize: [30, 30],
      html: `<i class="fa fa-map-marker" style="color:${hexToRgb(
        color
      )}; 
      display: flex;
      width:100px;
      height:100%;
      justify-content: center;
      align-items: center;
      background-color:${hexToRgb(color)};
      border-radius: 50%;"></i>`,
    });
  };

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <>
      <style>{markerIconStyle}</style>
      <MapContainer
        center={[35.7219, 51.3347]}
        zoom={5}
        style={{ height: height, width: width }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {allGpses.map((marker, idx) => (
          <Marker
            key={idx}
            position={marker.lastLocation}
            icon={colorpicker(marker.group.color)}
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
