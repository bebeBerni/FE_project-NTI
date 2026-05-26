import { defineStore } from 'pinia'
import api from '../api/axios'

type User = {
  id: number
  email: string
  name?: string
}

type AuthState = {
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/auth/login', { email, password })

        this.token = response.data.token
        this.user = response.data.user

        localStorage.setItem('token', response.data.token)
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message
        } else {
          this.error = 'Login failed'
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
      } catch (error) {
        console.error('Logout failed', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      }
    },
  },
})
