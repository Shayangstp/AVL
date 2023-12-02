import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";

const Map = ({ height, width }) => {
  const deviceCordinate = useSelector(selectDeviceCordinate);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  // Define your paths
  const paths = [
    [
      [31.8319, 51.547],
      [31.942, 51.655],
      [31.521, 51.766],
    ], // Path 1
    [
      [35.723, 51.337],
      [35.724, 51.338],
      [35.725, 51.339],
    ], // Path 2
    // Add more paths as needed
  ];

  return (
    <MapContainer
      center={[35.7219, 51.3347]}
      zoom={5}
      style={{ height: height, width: width }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={
          deviceCordinate.length !== 0 ? deviceCordinate : [35.7219, 51.3347]
        }
      />
      {paths.map((path, index) => (
        <Polyline key={index} positions={path} />
      ))}
    </MapContainer>
  );
};

export default Map;
