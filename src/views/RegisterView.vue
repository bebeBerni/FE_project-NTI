<template>
  <p v-if="errors.general" class="error">
    {{ errors.general }}
  </p>

  <div class="auth-page">
    <h1>Register</h1>

    <select v-model="form.role" :class="{ 'error-border': errors.role }">
      <option disabled value="">Select role</option>
      <option value="student">Student</option>
      <option value="company">Company</option>
      <option value="mentor">Mentor</option>
    </select>

    <p v-if="errors.role" class="error">{{ errors.role }}</p>

    <p v-if="successMessage" class="success">
      {{ successMessage }}
    </p>

    <form v-if="form.role" class="auth-form" @submit.prevent="submitForm">
      <div class="name-row">
        <input v-model="form.name" type="text" placeholder="First Name" />
        <input v-model="form.surname" type="text" placeholder="Last Name" />
      </div>

      <input v-model="form.email" type="email" placeholder="Email" />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>

      <input v-model="form.phone" type="text" placeholder="Phone" />

      <input v-model="form.password" type="password" placeholder="Password" />
      <input
        v-model="form.password_confirmation"
        type="password"
        placeholder="Confirm Password"
      />

      <p v-if="errors.password" class="error">{{ errors.password }}</p>
      <p v-if="errors.password_confirmation" class="error">
        {{ errors.password_confirmation }}
      </p>

      <div v-if="form.role === 'student'">
        <input v-model="form.faculty" type="text" placeholder="Faculty" />
        <input v-model="form.department" type="text" placeholder="Department" />
        <input
          v-model="form.study_program"
          type="text"
          placeholder="Study Program"
        />
        <input
          v-model.number="form.year_of_study"
          type="number"
          min="1"
          placeholder="Year of Study"
        />
      </div>

      <div v-if="form.role === 'mentor'">
        <input
          v-model="form.specialization"
          type="text"
          placeholder="Specialization"
        />
        <textarea v-model="form.bio" placeholder="Bio"></textarea>
      </div>

      <div v-if="form.role === 'company'">
        <input
          v-model="form.company_name"
          type="text"
          placeholder="Company Name"
        />
        <input v-model="form.ico" type="text" placeholder="ICO" />
        <input v-model="form.website" type="text" placeholder="Website" />
        <input v-model="form.address" type="text" placeholder="Address" />
        <textarea v-model="form.description" placeholder="Description"></textarea>
      </div>

      <button type="submit">Register</button>
    </form>

    <p class="auth-switch">
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import axios from "axios"
import { useAuthStore } from "@/stores/auth"

type Role = "" | "student" | "company" | "mentor"

type Form = {
  role: Role
  name: string
  surname: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  faculty: string
  department: string
  study_program: string
  year_of_study: number
  specialization: string
  bio: string
  company_name: string
  ico: string
  description: string
  website: string
  address: string
}

type Errors = {
  role?: string
  email?: string
  password?: string
  password_confirmation?: string
  phone?: string
  first_name?: string
  last_name?: string
  faculty?: string
  department?: string
  study_program?: string
  year_of_study?: string
  company_name?: string
  ico?: string
  description?: string
  website?: string
  address?: string
  specialization?: string
  bio?: string
  general?: string
}

export default {
  name: "RegisterView",

  data() {
    return {
      form: {
        role: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        faculty: "",
        department: "",
        study_program: "",
        year_of_study: 1,
        specialization: "",
        bio: "",
        company_name: "",
        ico: "",
        description: "",
        website: "",
        address: ""
      } as Form,

      errors: {} as Errors,
      successMessage: ""
    }
  },

  watch: {
    "form.role"() {
      this.resetRoleFields()
    }
  },

  methods: {
    resetRoleFields() {
      this.form.name = ""
      this.form.surname = ""
      this.form.faculty = ""
      this.form.department = ""
      this.form.study_program = ""
      this.form.year_of_study = 1
      this.form.specialization = ""
      this.form.bio = ""
      this.form.company_name = ""
      this.form.ico = ""
      this.form.description = ""
      this.form.website = ""
      this.form.address = ""
      this.errors = {}
      this.successMessage = ""
    },

    validate(): boolean {
      this.errors = {}

      if (!this.form.role) {
        this.errors.role = "Please select a role"
      }

      if (!this.form.name) {
        this.errors.first_name = "First name is required"
      }

      if (!this.form.surname) {
        this.errors.last_name = "Last name is required"
      }

      if (!this.form.email) {
        this.errors.email = "Email is required"
      }

      if (!this.form.password) {
        this.errors.password = "Password is required"
      } else if (this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters"
      }

      if (this.form.password !== this.form.password_confirmation) {
        this.errors.password_confirmation = "Passwords do not match"
      }

      return Object.keys(this.errors).length === 0
    },

    async registerByRole() {
      const authStore = useAuthStore()

      switch (this.form.role) {
        case "student":
          await authStore.register_student({
            first_name: this.form.name,
            last_name: this.form.surname,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            phone: this.form.phone,
            faculty: this.form.faculty,
            department: this.form.department,
            study_program: this.form.study_program,
            year_of_study: this.form.year_of_study
          })
          break

        case "mentor":
          await authStore.register_mentor({
            first_name: this.form.name,
            last_name: this.form.surname,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            phone: this.form.phone,
            specialization: this.form.specialization,
            bio: this.form.bio
          })
          break

        case "company":
          await authStore.register_company({
            first_name: this.form.name,
            last_name: this.form.surname,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            phone: this.form.phone,
            company_name: this.form.company_name,
            ico: this.form.ico,
            description: this.form.description,
            website: this.form.website,
            address: this.form.address
          })
          break
      }
    },

    handleSuccess() {
      this.successMessage = "Registration successful! You can now log in."

      setTimeout(() => {
        this.$router.push("/login")
      }, 2000)
    },

    handleApiError(error: unknown) {
      if (!axios.isAxiosError(error)) {
        this.errors.general = "Unexpected error occurred"
        return
      }

      const status = error.response?.status
      const data = error.response?.data

      if (data?.message) {
        this.errors.general = data.message
      }

      if (data?.errors && typeof data.errors === "object") {
        for (const key in data.errors) {
          const field = data.errors[key]

          if (Array.isArray(field)) {
            this.errors[key as keyof Errors] = field[0]
          }
        }
      }

      if (!data?.message) {
        switch (status) {
          case 404:
            this.errors.general =
              "Endpoint not found. Check your Laravel route and axios baseURL."
            break
          case 500:
            this.errors.general = "Server error"
            break
          case 401:
            this.errors.general = "Unauthorized"
            break
          case 422:
            this.errors.general = "Validation failed"
            break
          default:
            this.errors.general = "Request failed"
        }
      }
    },

    async submitForm() {
      if (!this.validate()) return

      this.errors = {}
      this.successMessage = ""

      try {
        await this.registerByRole()
        this.handleSuccess()
      } catch (error) {
        this.handleApiError(error)
      }
    }
  }
}
</script>

<style scoped>
select.error-border {
  border-color: red;
}

.auth-page {
  max-width: 450px;
  margin: 60px auto;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.name-row {
  display: flex;
  gap: 12px;
}

.name-row input {
  width: 100%;
}

input,
select,
textarea {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
}

textarea {
  min-height: 90px;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
}

button:hover {
  background-color: #369f6e;
}

.error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-top: -8px;
}

.success {
  color: green;
  font-weight: 600;
  margin: 10px 0;
}

.auth-switch {
  margin-top: 20px;
  color: #555;
}

.auth-switch a {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
}

.auth-switch a:hover {
  text-decoration: underline;
}
</style>