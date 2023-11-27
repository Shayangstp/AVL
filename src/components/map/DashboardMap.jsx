import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";

const DashboardMap = ({ height, width }) => {
  const deviceCordinate = useSelector(selectDeviceCordinate);

  const markers = [
    {
      position: [38.7219, 55.3347],
      key: "marker1",
      content: "shayan",
      color: "blue",
    },
    {
      position: [34.7219, 52.3347],
      key: "marker2",
      content: "amir",
      color: "red",
    },
    {
      position: [39.7219, 55.3347],
      key: "marker3",
      content: "mahmod",
      color: "yellow",
    },
  ];

  const colorIcons = markers.map((marker) => {
    return marker.color;
  });

  console.log(colorIcons);

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

      {markers.map((marker) => (
        <Marker
          key={marker.key}
          position={marker.position}
          icon={colorpicker(marker.color)}
        >
          <Popup>{marker.content}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DashboardMap;
