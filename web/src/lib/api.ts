import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://posts-app-server.onrender.com'
});
