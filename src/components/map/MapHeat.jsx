import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

const Map = ({ height, width }) => {
  const [map, setMap] = useState(null);
  const [routing, setRouting] = useState(null);
  const deviceCordinate = useSelector(selectDeviceCordinate);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  // Define your heatmap data
  const heatmapData = [
    [35.7219, 51.3347, 0.5], // [latitude, longitude, intensity]
    [35.722, 51.335, 0.8],
    [35.7221, 52.336, 1.0],
    [35.7221, 53.336, 1.0],
    [35.7221, 54.336, 1.0],
    [35.7221, 55.336, 1.0],
    [35.7221, 56.336, 1.0],
    // Add more data points as needed
  ];

  useEffect(() => {
    if (map) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng([35.7219, 51.3347, 0.5]), // start coordinates
          L.latLng([35.722, 51.335, 0.8]), // end coordinates
        ],
      }).addTo(map);

      setRouting(routingControl);
    }
  }, [map]);

  return (
    <MapContainer
      center={[35.7219, 51.3347]}
      zoom={5}
      style={{ height: height, width: width }}
      whenCreated={map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={
          deviceCordinate.length !== 0 ? deviceCordinate : [35.7219, 51.3347]
        }
      />
      <HeatmapLayer
        points={heatmapData}
        longitudeExtractor={(point) => point[1]}
        latitudeExtractor={(point) => point[0]}
        intensityExtractor={(point) => point[2]}
      />
    </MapContainer>
  );
};

export default Map;
