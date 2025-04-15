import axios from "axios";

const API_URL = "http://localhost:5000/api/taxgrids";

export const getTaxGrids = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tax grids:", error);
    return [];
  }
};

export const importTaxGrids = async () => {
  try {
    const response = await axios.post(`${API_URL}/import`);
    return response.data;
  } catch (error) {
    console.error("Error importing tax grids:", error);
    throw error;
  }
};
