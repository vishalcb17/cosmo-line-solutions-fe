import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services
export const getServices = (category = null) => {
  const url = category ? `/services?category=${category}` : '/services';
  return api.get(url);
};

export const getServiceById = (id) => {
  return api.get(`/services/${id}`);
};

// Bookings
export const createBooking = (bookingData) => {
  return api.post('/bookings', bookingData);
};

export const getBooking = (id) => {
  return api.get(`/bookings/${id}`);
};

export const createCheckoutSession = (bookingId) => {
  return api.post(`/bookings/${bookingId}/checkout`);
};

// Contact
export const submitContactForm = (contactData) => {
  return api.post('/contact', contactData);
};

// Admin - Auth
export const adminLogin = (credentials) => {
  return api.post('/auth/login', credentials);
};

// Admin - Services
export const adminGetAllServices = () => {
  return api.get('/admin/services');
};

export const adminCreateService = (serviceData) => {
  return api.post('/admin/services', serviceData);
};

export const adminUpdateService = (id, serviceData) => {
  return api.put(`/admin/services/${id}`, serviceData);
};

export const adminDeleteService = (id) => {
  return api.delete(`/admin/services/${id}`);
};

// Admin - Bookings
export const adminGetAllBookings = () => {
  return api.get('/admin/bookings');
};

export const adminUpdateBookingStatus = (id, status) => {
  return api.put(`/admin/bookings/${id}/status`, { status });
};

// Admin - Contact Messages
export const adminGetContactMessages = () => {
  return api.get('/admin/contacts');
};

export default api;
