import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { selectDeviceCordinate } from "../../slices/deviceSlices";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js";

const Map = ({ height, width }) => {
  const [map, setMap] = useState(null);
  const [routing, setRouting] = useState(null);
  const deviceCordinate = useSelector(selectDeviceCordinate);
  const mapRef = useRef(null);

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

  // const heatmapData = [
  //   [35.722, 51.335, 0.8],
  //   [35.7221, 53.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   [35.7221, 56.336, 1.0],
  //   // Add more data points as needed
  // ];

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
  // useEffect(() => {
  //   if (map) {
  //     const routingControl = L.Routing.control({
  //       waypoints: [
  //         L.latLng([35.7219, 51.3347, 0.5]), // start coordinates
  //         L.latLng([35.722, 51.335, 0.8]), // end coordinates
  //       ],
  //     }).addTo(map);

  //     setRouting(routingControl);
  //   }
  // }, [map]);

  const HeatmapLayer = L.heatLayer(heatmapData);

  // useEffect(() => {
  //   const map = mapRef.current.leafletElement;

  //   const heatLayer = L.heatLayer(heatmapData).addTo(map);

  //   return () => {
  //     heatLayer.remove(); // Clean up the heatmap layer
  //   };
  // }, []);

  const MapWrapper = () => {
    const map = useMap();

    useEffect(() => {
      HeatmapLayer.addTo(map);

      // return () => {
      //   map.removeLayer(HeatmapLayer); // Clean up the heatmap layer
      // };
    }, [map]);

    return null;
  };

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
      <MapWrapper />
      {paths.map((path, index) => (
        <Polyline key={index} positions={path} />
      ))}
    </MapContainer>
    // <MapContainer
    //   center={[35.722, 51.335]}
    //   zoom={13}
    //   style={{ height: "400px", width: "100%" }}
    //   ref={mapRef}
    // >
    //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    // </MapContainer>
  );
};

export default Map;
