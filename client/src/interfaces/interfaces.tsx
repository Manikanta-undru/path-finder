export interface City {
  name: string;
  state: string;
  lat: string;
  lon: string;
}

export interface GetPathsResponse {
  allPaths: string[][];
  shortestPath: string[];
}
