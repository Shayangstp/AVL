import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MapDraw = ({ height, width }) => {
  const featureGroupRef = useRef();

  const handleCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polyline") {
      const latLngs = layer.getLatLngs();
      const coordinates = latLngs.map((latLng) => [latLng.lat, latLng.lng]);
      console.log("Coordinates:", coordinates);
    }
  };

  useEffect(() => {
    if (featureGroupRef.current) {
      const { current: featureGroup } = featureGroupRef;
      L.DomEvent.off(featureGroup, "click"); // Prevent click event from triggering map zoom
    }
  }, []);

  return (
    <MapContainer
      center={[35.7219, 51.3347]}
      zoom={13}
      style={{ height: height, width: width }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          featureGroup={featureGroupRef.current}
          draw={{
            polyline: true,
            polygon: false,
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapDraw;
