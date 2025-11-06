import axios from "axios";

const API_URL = "http://localhost:7001/api";

// Create axios instance with token interceptor
const API = axios.create({
  baseURL: API_URL,
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export API functions
export const loginUser = (data) => API.post(`/auth/login`, data);
export const registerUser = (data) => API.post(`/auth/register`, data);
export const getPosts = () => API.get(`/posts`);
export const createPost = (data) => API.post(`/posts`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data); // use interceptor
