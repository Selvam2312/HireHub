import { create } from 'zustand'
import api from '../api/axios'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post('/auth/login/', { email, password })
      localStorage.setItem('access_token', data.tokens.access)
      localStorage.setItem('refresh_token', data.tokens.refresh)
      localStorage.setItem('user', JSON.stringify(data.user))
      set({ user: data.user, loading: false })
      return data.user
    } catch (err) {
      set({ error: err.response?.data?.error || 'Login failed', loading: false })
      throw err
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post('/auth/register/', payload)
      localStorage.setItem('access_token', data.tokens.access)
      localStorage.setItem('refresh_token', data.tokens.refresh)
      localStorage.setItem('user', JSON.stringify(data.user))
      set({ user: data.user, loading: false })
      return data.user
    } catch (err) {
      set({ error: err.response?.data || 'Registration failed', loading: false })
      throw err
    }
  },

  logout: () => {
    localStorage.clear()
    set({ user: null })
  },
}))

export default useAuthStore