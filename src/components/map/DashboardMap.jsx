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

  const colorpicker = (color) => {
    var greenIcon = new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    return greenIcon;
  };

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
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
          icon={colorpicker(marker.group?.color)}
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
                مدل : <div className="mt-1">{marker.deviceInfo.model.name}</div>
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
  );
};

export default DashboardMap;
