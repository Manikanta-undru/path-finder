// App.tsx

import "./App.css";

import { getCities, getPaths } from "./services/http.service";
import { useEffect, useState } from "react";

import { City } from "./interfaces/interfaces";
import CitySelection from "./components/CitySelection";
import Map from "./components/Map";

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCities, setSelectedCities] = useState<City[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [paths, setPaths] = useState<string[][]>();
  const [shortestPath, setShortestPath] = useState<string[]>();

  useEffect(() => {
    if (selectedCities && selectedCities?.length > 1) {
      const fetchShortestPath = async () => {
        setLoading(true);
        try {
          const resp = await getPaths(selectedCities);
          setPaths(resp.allPaths);
          setShortestPath(resp.shortestPath);

          setLoading(false);
        } catch (error) {
          console.log("error fetching shortest path");
          setLoading(false);
        }
      };
      fetchShortestPath();
    }
  }, [selectedCities]);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const resp = await getCities();
        setCities(resp);
        setLoading(false);
      } catch (error) {
        console.log("error fetching cities");
        setLoading(false);
      }
    };
    fetchCities();
  }, []);
  return (
    <>
      {loading && (
        <div className="absolute flex left-0 right-0 bottom-0 top-0 bg-['#eeeeee'] backdrop-blur-sm z-[1000]">
          <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      )}
      <main className="flex h-screen">
        <CitySelection cities={cities} setSelectedCities={setSelectedCities} />
        <section className="flex-grow">
          <Map data={cities} allPaths={paths} shortestPath={shortestPath} />
        </section>
      </main>
    </>
  );
}

export default App;
