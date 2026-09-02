import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

// Attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('vjg_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('vjg_token');
            localStorage.removeItem('vjg_user');
            if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(err);
    }
);

// Tests
export const testsApi = {
    getAll: (params) => api.get('/tests', { params }),
    getBySlug: (slug) => api.get(`/tests/slug/${slug}`),
    getAllAdmin: () => api.get('/tests/admin/all'),
    create: (data) => api.post('/tests', data),
    update: (id, data) => api.put(`/tests/${id}`, data),
    delete: (id) => api.delete(`/tests/${id}`),
};

// Categories
export const categoriesApi = {
    getAll: () => api.get('/categories'),
    getAllAdmin: () => api.get('/categories/admin/all'),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
};

// Packages
export const packagesApi = {
    getAll: () => api.get('/packages'),
    getBySlug: (slug) => api.get(`/packages/slug/${slug}`),
    getAllAdmin: () => api.get('/packages/admin/all'),
    create: (data) => api.post('/packages', data),
    update: (id, data) => api.put(`/packages/${id}`, data),
    delete: (id) => api.delete(`/packages/${id}`),
};

// Enquiries
export const enquiriesApi = {
    create: (data) => api.post('/enquiries', data),
    getAll: (params) => api.get('/enquiries', { params }),
    update: (id, data) => api.put(`/enquiries/${id}`, data),
    delete: (id) => api.delete(`/enquiries/${id}`),
};

// Testimonials
export const testimonialsApi = {
    getApproved: () => api.get('/testimonials'),
    getAllAdmin: () => api.get('/testimonials/admin/all'),
    create: (data) => api.post('/testimonials', data),
    update: (id, data) => api.put(`/testimonials/${id}`, data),
    delete: (id) => api.delete(`/testimonials/${id}`),
};

// FAQs
export const faqsApi = {
    getActive: () => api.get('/faqs'),
    getAllAdmin: () => api.get('/faqs/admin/all'),
    create: (data) => api.post('/faqs', data),
    update: (id, data) => api.put(`/faqs/${id}`, data),
    delete: (id) => api.delete(`/faqs/${id}`),
};

// Messages
export const messagesApi = {
    create: (data) => api.post('/messages', data),
    getAll: (params) => api.get('/messages', { params }),
    update: (id, data) => api.put(`/messages/${id}`, data),
    delete: (id) => api.delete(`/messages/${id}`),
};

// Settings
export const settingsApi = {
    getPublic: () => api.get('/settings'),
    update: (data) => api.put('/settings', data),
    getStats: () => api.get('/settings/stats'),
};

// Auth
export const authApi = {
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    changePassword: (data) => api.put('/auth/change-password', data),
};

export default api;
