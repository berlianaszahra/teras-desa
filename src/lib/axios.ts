import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;

//user
export async function getCurrentUser() {
  const res = await api.get('/api/users/current')
  return res.data.data
}

//projects
export async function getProjects(params?: {
  search?: string
  tahun?: string
  page?: number
  limit?: number
}) {
  const res = await api.get('/api/projects', { params })
  return res.data.data
}

export async function getProjectById(id: string) {
  const res = await api.get(`/api/projects/${id}`)
  return res.data.data
}