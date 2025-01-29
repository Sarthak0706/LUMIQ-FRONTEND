import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // FastAPI backend URL

export const createClaim = async (claimData) => {
  return axios.post(`${API_BASE_URL}/claims`, claimData);
};

export const getClaims = async () => {
  return axios.get(`${API_BASE_URL}/claims`);
};

export const createUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/users`, userData);
};
