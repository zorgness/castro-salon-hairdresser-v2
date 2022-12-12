import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const MyMap = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(5.450954);
  const [lat, setLat] = useState(43.5253999);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="map-container">
      <div ref={mapContainer} />
    </div>
  );
};
export default MyMap;
