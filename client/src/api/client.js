import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const ADMIN_PATHS = [
  '/admin-panel', '/clients', '/airplanes', '/flight-status',
  '/gates', '/airports', '/reviews', '/schedules', '/flights', '/tickets', '/bookings',
];
const AUTH_ENDPOINTS = ['/auth/me', '/auth/login', '/auth/customerlogin'];

apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      const url = err.config?.url || '';
      const isAuthEndpoint = AUTH_ENDPOINTS.some(e => url.includes(e));
      if (!isAuthEndpoint) {
        const isAdminPath = ADMIN_PATHS.some(p => window.location.pathname.startsWith(p));
        window.location.href = isAdminPath ? '/signin' : '/customer-signin';
      }
    }
    return Promise.reject(err);
  }
);

export default apiClient;
