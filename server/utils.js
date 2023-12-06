const findAllPaths = (graph) => {
  const cities = Object.keys(graph);
  const permutations = getPermutations(cities.slice(1));

  const allPaths = [];
  let minDistance = Infinity;
  let shortestPath;

  for (const permutation of permutations) {
    const path = [cities[0], ...permutation];
    const distance = calculateTotalDistance(graph, path);

    allPaths.push(path);

    if (distance < minDistance) {
      minDistance = distance;
      shortestPath = path;
    }
  }

  return { paths: allPaths, shortestPath, shortestDistance: minDistance };
};

const getPermutations = (arr) => {
  if (arr.length === 0) return [[]];

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const restPermutations = getPermutations(rest);
    const permutationsWithCurrent = restPermutations.map((p) => [arr[i], ...p]);
    result.push(...permutationsWithCurrent);
  }

  return result;
};

const calculateTotalDistance = (graph, path) => {
  let totalDistance = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const currentCity = path[i];
    const nextCity = path[i + 1];
    totalDistance += graph[currentCity][nextCity];
  }

  return totalDistance;
};

const createCityGraphMap = (data) => {
  const cityMap = {};

  data.forEach((city) => {
    const cityName = city.name;
    const cityDetails = {
      state: city.state,
      lat: parseFloat(city.lat.trim()),
      lon: parseFloat(city.lon.trim()),
    };

    cityMap[cityName] = cityDetails;
  });

  const graphMap = {};

  data.forEach((city) => {
    const cityName = city.name;
    const adjacentNodes = {};
    data.forEach((otherCity) => {
      if (otherCity.name !== cityName) {
        const otherCityName = otherCity.name;
        const distance = calculateDistance(
          cityMap[cityName],
          cityMap[otherCityName]
        );
        adjacentNodes[otherCityName] = distance;
      }
    });

    graphMap[cityName] = adjacentNodes;
  });

  return graphMap;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const calculateDistance = (city1, city2) => {
  const lat1 = city1.lat;
  const lon1 = city1.lon;
  const lat2 = city2.lat;
  const lon2 = city2.lon;
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};
module.exports = { findAllPaths, createCityGraphMap };
