import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-phi-red.vercel.app/api'
});

export default api;
