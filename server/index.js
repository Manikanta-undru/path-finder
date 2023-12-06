const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { createCityGraphMap, findAllPaths } = require("./utils");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const citiesURL =
  "https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json";

let citiesData = [];

// Fetch city data on server startup
axios
  .get(citiesURL)
  .then((response) => {
    citiesData = response.data;
    console.log("City data loaded successfully");
  })
  .catch((error) => {
    console.error("Error fetching city data:", error.message);
  });

app.get("/api/cities", (req, res) => {
  console.log("api triggered");
  if (citiesData.length === 0) {
    return res.status(404).json({ error: "Data not found" });
  }

  res.json({ citiesData });
});

app.post("/api/getPaths", (req, res) => {
  const { selectedCities } = req.body;
  if (selectedCities?.length <= 1) {
    return res
      .status(400)
      .json({ error: "Source and destination are required" });
  }

  const map = createCityGraphMap(selectedCities);

  const results = findAllPaths(map);
  console.log(map);
  console.log(results, "shorted");
  res.json({
    allPaths: results.paths,
    shortestPath: results.shortestPath,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
