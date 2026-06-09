import { defineStore } from 'pinia'
import api from '../api/axios'
import router from '@/router'
import axios from 'axios'

type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  roles: {
    id: number
    name: 'admin' | 'student' | 'mentor' | 'company'
  }[]
}

type AuthState = {
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
}

type RegisterStudentData = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  faculty: string
  department: string
  study_program: string
  year_of_study: number
}

type RegisterMentorData = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  specialization: string
  bio: string
}

type RegisterCompanyData = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  company_name: string
  ico: string
  description: string
  website: string
  address: string
}

function getErrorMessage(error: unknown, fallback = 'Something went wrong') {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message
    }

    if (error.response?.data?.errors) {
      return Object.values(error.response.data.errors)
        .flat()
        .join(' ')
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
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
        const response = await api.post('/login', { email, password })

        this.token = response.data.token
        localStorage.setItem('token', response.data.token)

        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        await this.fetchUser()

        return response.data
      } catch (error: unknown) {
        this.error = getErrorMessage(error, 'Incorrect email or password.')
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.error('Logout failed', error)
      } finally {
        this.token = null
        this.user = null

        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem('token')

        router.push('/')
      }
    },

    async register_student(data: RegisterStudentData) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/register/student', data)
        return response.data
      } catch (error: unknown) {
        this.error = getErrorMessage(error, 'Student registration failed.')
        throw error
      } finally {
        this.loading = false
      }
    },

    async register_mentor(data: RegisterMentorData) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/register/mentor', data)
        return response.data
      } catch (error: unknown) {
        this.error = getErrorMessage(error, 'Mentor registration failed.')
        throw error
      } finally {
        this.loading = false
      }
    },

    async register_company(data: RegisterCompanyData) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/register/company', data)
        return response.data
      } catch (error: unknown) {
        this.error = getErrorMessage(error, 'Company registration failed.')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return

      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

      try {
        const response = await api.get('/me')
        this.user = response.data.user
      } catch (error) {
        console.log('ME ERROR:', error)

        this.token = null
        this.user = null

        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem('token')
      }
    },
  },
})