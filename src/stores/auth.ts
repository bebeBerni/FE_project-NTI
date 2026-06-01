import { defineStore } from 'pinia'
import api from '../api/axios'
import router from '@/router'

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
        localStorage.setItem('token', response.data.token)

        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        await this.fetchUser()

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
//delete :Pinia state,localStorage tokent,axios Bearer tokent,+ after refresh user not be logged in
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
      '/register',
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

//COMPANY
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
},
async fetchUser() {
  console.log('FETCH USER CALLED')

  if (!this.token) {
    console.log('NO TOKEN IN STORE')
    return
  }

  api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

  try {
    const response = await api.get('/me')

    console.log('ME RESPONSE:', response.data)

    this.user = response.data.user

    console.log('USER SET:', this.user)
    console.log('USER ROLE:', this.user?.roles?.[0]?.name)

  } catch (error) {
    console.log('ME ERROR:', error)
    await this.logout()
  }
}
},
})
