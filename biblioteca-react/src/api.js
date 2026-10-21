import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://biblioteca-backend-p6ug.onrender.com';

export const api = axios.create({
  baseURL: API_URL
});