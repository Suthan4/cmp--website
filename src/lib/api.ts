import axios from 'axios';

const API_BASE_URL =
  // process.env.NEXT_PUBLIC_API_URL;
  "http://localhost:5005/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  available: boolean;
}

export const menuAPI = {
  // Get all menu items with filters
  getAll: async (params?: {
    category?: string;
    available?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/menu', { params });
    return response.data;
  },

  // Get single menu item
  getById: async (id: string) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  // Create new menu item
  create: async (data: Omit<MenuItem, '_id'>) => {
    const response = await api.post('/menu', data);
    return response.data;
  },

  // Update menu item
  update: async (id: string, data: Partial<Omit<MenuItem, 'id'>>) => {
    const response = await api.put(`/menu/${id}`, data);
    return response.data;
  },

  // Delete menu item
  delete: async (id: string) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },

  // Toggle availability
  toggleAvailability: async (id: string) => {
    const response = await api.patch(`/menu/${id}/toggle`);
    return response.data;
  },

  // Bulk update availability
  bulkUpdateAvailability: async (ids: string[], available: boolean) => {
    const response = await api.patch('/menu/bulk/availability', { ids, available });
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get('/menu/stats/overview');
    return response.data;
  },
};

export default api;