// src/api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const shortenURL = (long_url) =>
  axios.post(`${BASE_URL}/encode/`, { long_url });

export const decodeURL = (short_url) =>
  axios.post(`${BASE_URL}/decode/`, { short_url });

export const fetchStats = (url_path) =>
  axios.get(`${BASE_URL}/stats/${url_path}/`);

export const listAllURLs = () =>
  axios.get(`${BASE_URL}/list/`);
