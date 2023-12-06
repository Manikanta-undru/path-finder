import React, { useState } from "react";

import { City } from "../interfaces/interfaces";

interface MapProps {
  cities: City[];
  setSelectedCities: React.Dispatch<React.SetStateAction<City[]>>;
}

const CitySelection: React.FC<MapProps> = ({ cities, setSelectedCities }) => {
  const [waypoints, setWaypoints] = useState<number[]>([]);

  const handleWaypointSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWaypoint = Number(e.target.value);
    setWaypoints((prevWaypoints) =>
      prevWaypoints.includes(selectedWaypoint)
        ? prevWaypoints.filter((wp) => wp !== selectedWaypoint)
        : [...prevWaypoints, selectedWaypoint]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setSelectedCities && waypoints.length > 1) {
      const selectedCityObjects = [...waypoints].map((index) => cities[index]);
      console.log(selectedCityObjects);
      setSelectedCities(selectedCityObjects);
    } else {
      alert("Select at least 2 cities");
    }
  };

  return (
    <section className="p-4">
      <label htmlFor="waypoints" className="block mt-4 mb-2">
        Waypoint Cities:
      </label>
      <select
        id="waypoints"
        multiple
        value={waypoints.map(String)}
        onChange={handleWaypointSelection}
        className="w-full p-2 border border-gray-300 rounded-md h-1/2"
      >
        {cities.map((city, index) => (
          <option key={index} value={index}>
            {city.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        className=" border px-2 p-1 rounded-md hover:bg-gray-800 hover:text-white mt-5"
        onClick={handleSubmit}
      >
        Get Routes
      </button>
      <p className=" mt-4 text-xs text-gray-200 font-bold">
        Black is the Shortest Path
      </p>
    </section>
  );
};

export default CitySelection;
