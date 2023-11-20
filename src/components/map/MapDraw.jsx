import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polyline,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetDeviceCordinate,
  selectCurrentDevice,
} from "../../slices/deviceSlices";

const MapDraw = ({ height, width }) => {
  const dispatch = useDispatch();

  const featureGroupRef = useRef();
  const mapRef = useRef(null);

  const currentDevice = useSelector(selectCurrentDevice);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  });

  const apiCordinates = currentDevice.permissibleZone
    ? currentDevice.permissibleZone.coordinates
    : [];

  const handleCreated = (e) => {
    const { layerType, layer } = e;
    let coordinates = [];

    if (layerType === "polyline") {
      const latLngs = layer.getLatLngs();
      coordinates = latLngs.map((latLng) => [latLng.lat, latLng.lng]);
    } else if (layerType === "polygon") {
      const latLngs = layer.getLatLngs()[0];
      coordinates = latLngs.map((latLng) => [latLng.lat, latLng.lng]);
    } else if (layerType === "rectangle") {
      const bounds = layer.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      coordinates = [
        [northEast.lat, northEast.lng],
        [southWest.lat, southWest.lng],
      ];
    } else if (layerType === "circle") {
      const latLng = layer.getLatLng();
      const radius = layer.getRadius();
      coordinates = [[latLng.lat, latLng.lng, radius]];
    }

    console.log("Coordinates:", coordinates);
    dispatch(RsetDeviceCordinate(coordinates));
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
      zoom={8}
      ref={mapRef}
      style={{ height: height, width: width }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {apiCordinates && apiCordinates.length > 0 && (
        <Polygon positions={apiCordinates} color="blue" />
      )}
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          featureGroup={featureGroupRef.current}
          draw={{
            polyline: true,
            polygon: true,
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
