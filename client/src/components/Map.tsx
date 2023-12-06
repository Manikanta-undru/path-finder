// Map.tsx

import "leaflet/dist/leaflet.css";

import React, { useEffect } from "react";

import { COLORS } from "../constants/common";
import L from "leaflet";

interface Location {
  name: string;
  state: string;
  lat: string;
  lon: string;
}

interface MapProps {
  data: Location[];
  shortestPath?: string[];
  allPaths?: string[][];
}

const Map: React.FC<MapProps> = ({ data, allPaths, shortestPath }) => {
  useEffect(() => {
    const map = L.map("map").setView([20, 80], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    data.forEach((location) => {
      const marker = L.marker([
        parseFloat(location.lat),
        parseFloat(location.lon),
      ]).addTo(map);

      marker.bindPopup(`<b>${location.name}</b><br>${location.state}`);
    });
    if (allPaths && allPaths.length > 0) {
      allPaths.forEach((path, index) => {
        const coordinates: [number, number][] = [];

        path.forEach((locationName) => {
          const location = data.find((loc) => loc.name === locationName);
          if (location) {
            coordinates.push([
              parseFloat(location.lat),
              parseFloat(location.lon),
            ]);
          }
        });

        if (coordinates.length > 1) {
          L.polyline(coordinates, { color: COLORS[index] }).addTo(map);
        }
      });
    }
    if (shortestPath && shortestPath.length > 1) {
      const coordinates: [number, number][] = [];

      shortestPath.forEach((locationName) => {
        const location = data.find((loc) => loc.name === locationName);
        if (location) {
          coordinates.push([
            parseFloat(location.lat),
            parseFloat(location.lon),
          ]);
        }
      });

      if (coordinates.length > 1) {
        L.polyline(coordinates, { color: "black", weight: 5 }).addTo(map);
      }
    }

    return () => {
      map.remove();
    };
  }, [data, shortestPath, allPaths]);

  return <div id="map" className="w-full h-full"></div>;
};

export default Map;
