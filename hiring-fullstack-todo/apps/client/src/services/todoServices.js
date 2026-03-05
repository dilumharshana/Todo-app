import apiClient from '../api/api';

export const todoService = {
    getAll: () => apiClient.get('/todos'),
    create: (data) => apiClient.post('/todos', data),
    update: (id, data) => apiClient.put(`/todos/${id}`, data),
    toggleDone: (id) => apiClient.patch(`/todos/${id}/done`),
    delete: (id) => apiClient.delete(`/todos/${id}`),
};