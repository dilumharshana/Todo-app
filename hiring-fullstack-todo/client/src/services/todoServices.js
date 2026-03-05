import apiClient from '../api/api';

export const todoService = {
    getAll: () => apiClient.get('/todos'),
};