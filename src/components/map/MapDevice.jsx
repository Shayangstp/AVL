import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";

const MapDevice = ({ height, width }) => {
  const deviceCordinate = useSelector(selectDeviceCordinate);
  console.log(deviceCordinate);

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
      {deviceCordinate?.map((marker) => (
        // console.log(marker)
        <Marker key={marker.key} position={marker}></Marker>
      ))}
    </MapContainer>
  );
};

export default MapDevice;
