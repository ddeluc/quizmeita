import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getModules = () => API.get('/api/modules');
export const getModule = (id) => API.get(`/api/modules/${id}`);
export const createModule = (newModule) => API.post('/api/modules', newModule);