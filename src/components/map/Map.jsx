import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ markers, height, width }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: height, width: width }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers
        ? markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))
        : null}
    </MapContainer>
  );
};

export default Map;
