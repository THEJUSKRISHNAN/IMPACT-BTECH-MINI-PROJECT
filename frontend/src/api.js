import axios from "axios";

// Set base URL of your Flask backend
const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Change this if your backend URL is different
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictLandslide = async (inputData) => {
  try {
    const response = await API.post("/predict", inputData);
    return response.data; // Returns risk level and description
  } catch (error) {
    console.error("Error in prediction:", error);
    return { error: "Prediction failed" };
  }
};

export default API;
