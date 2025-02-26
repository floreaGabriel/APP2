import axios from 'axios';

// cream instanta axios de baza
export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true, // important pentru cookie-uri cross-origin
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
});


// Interceptor pentru a adăuga token la request-uri dacă există
api.interceptors.request.use(
    (config) => {
      // Verifică dacă există un token în localStorage ca backup
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Interceptor pentru erori
api.interceptors.response.use(
    (response) => response,
    (error) => {
     // Doar logăm eroarea, fără redirectare automată
    if (error.response && error.response.status === 401) {
        console.log('Eroare de autentificare: Token invalid sau expirat');
        // Putem curăța localStorage, dar fără redirectare
        localStorage.removeItem('authToken');
      }
      return Promise.reject(error);
    }
  );

// export funcții helper pentru API
export const apiService = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getUser: () => api.get('/auth/me'),
  
  // alte funcții API ..... to add.. 
};