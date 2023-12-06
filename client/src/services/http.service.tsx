import { City, GetPathsResponse } from "../interfaces/interfaces";
import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

export const getCities = async (): Promise<City[]> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}api/cities`);
    return response.data.citiesData;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const getPaths = async (
  selectedCities: City[]
): Promise<GetPathsResponse> => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}api/getPaths`, {
      selectedCities,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shortest path:", error);
    throw error;
  }
};
