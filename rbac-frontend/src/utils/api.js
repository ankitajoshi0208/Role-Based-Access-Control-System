import axios from "axios";

const API_URL = "http://localhost:7001/api";

export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
// Posts
export const getPosts = (token) =>
  axios.get(`${API_URL}/posts`, { headers: { Authorization: `Bearer ${token}` } });

export const createPost = (data, token) =>
  axios.post(`${API_URL}/posts`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deletePost = (id, token) =>
  axios.delete(`${API_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
