import { defineStore } from 'pinia'
import api from '../api/axios'

type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'student' | 'mentor' | 'company'
}

type AuthState = {
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
}
//STUDENT
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
//ADMIN
type RegisterAdminData = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
}
//MENTOR
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
//COMPANY
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
// lOGOUT
    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.error('Logout failed', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      }
    },
//REGISTER

  //STUDENT
async register_student(data: RegisterStudentData) {
  this.loading = true
  this.error = null

  try {
    const response = await api.post(
      '/register/student',
      data
    )

    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      this.error = error.message
    } else {
      this.error = 'Student registration failed'
    }

    throw error
  } finally {
    this.loading = false
  }
},

//ADMIN
async register_admin(data: RegisterAdminData) {
  this.loading = true
  this.error = null

  try {
    const response = await api.post(
      '/register/admin',
      data
    )

    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      this.error = error.message
    } else {
      this.error = 'Admin registration failed'
    }

    throw error
  } finally {
    this.loading = false
  }
},

//MENTOR
async register_mentor(data: RegisterMentorData) {
  this.loading = true
  this.error = null

  try {
    const response = await api.post(
      '/register/mentor',
      data
    )

    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      this.error = error.message
    } else {
      this.error = 'Mentor registration failed'
    }

    throw error
  } finally {
    this.loading = false
  }
},
async register_company(data: RegisterCompanyData) {
  this.loading = true
  this.error = null

  try {
    const response = await api.post(
      '/register/company',
      data
    )
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      this.error = error.message
    } else {
      this.error = 'Company registration failed'
    }
    throw error
  } finally {
    this.loading = false
  }
}
  },
})
