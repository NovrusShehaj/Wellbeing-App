import axios from "axios";

const API_URL = "http://localhost:5000/api/neighborhoods";

export const getNeighborhoods = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching neighborhoods:", error);
    return [];
  }
};

export const getNeighborhoodsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching neighborhoods by name ${name}:`, error);
    return [];
  }
};

export const getNeighborhoodsWithin = async (lng, lat, radius) => {
  try {
    const response = await axios.get(
      `${API_URL}/within?lng=${lng}&lat=${lat}&radius=${radius}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching neighborhoods within area:", error);
    return [];
  }
};

export const importSustainableNeighborhoods = async () => {
  try {
    const response = await axios.post(`${API_URL}/import-sustainable`);
    return response.data;
  } catch (error) {
    console.error("Error importing sustainable neighborhoods:", error);
    throw error;
  }
};
