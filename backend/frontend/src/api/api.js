import axios from 'axios';

export const login = (username, password) =>
  axios.post('/api/login', { username, password });

export const getMetrics = (token) =>
  axios.get('/api/metrics', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addMetric = (token, metric) =>
  axios.post('/api/metrics', metric, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const exportExcel = (token) =>
  axios.get('/api/export/excel', {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });

export const exportPDF = (token) =>
  axios.get('/api/export/pdf', {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  }); 