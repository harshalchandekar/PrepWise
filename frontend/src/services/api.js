import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const TransactionsAPI = {
  list: () => apiClient.get('/transactions').then(r => r.data),
  get: (id) => apiClient.get(`/transactions/${id}`).then(r => r.data),
  create: (payload) => apiClient.post('/transactions', payload).then(r => r.data),
  update: (id, payload) => apiClient.put(`/transactions/${id}`, payload).then(r => r.data),
  remove: (id) => apiClient.delete(`/transactions/${id}`).then(r => r.status === 204),
};

