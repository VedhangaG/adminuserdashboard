import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = (payload) => api.post('/api/register', payload)
export const loginUser = (payload) => api.post('/api/login', payload)
export const getUsers = () => api.get('/api/users')
export const createUser = (payload) => api.post('/api/users', payload)
export const updateUser = (id, payload) => api.put(`/api/users/${id}`, payload)
export const deleteUser = (id) => api.delete(`/api/users/${id}`)
export const getProfile = (userId) => api.get(`/api/profile/${userId}`)
export const updateProfile = (userId, payload) => api.put(`/api/profile/${userId}`, payload)
export const getAnalytics = () => api.get('/api/analytics')

export default api
