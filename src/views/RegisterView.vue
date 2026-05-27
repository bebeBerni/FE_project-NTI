<template>
  <div class="auth-page">
    <h1>Register</h1>

    <form class="auth-form" @submit.prevent="submitForm">

      <!-- ROLE -->
      <select v-model="form.role" :class="{ 'error-border': errors.role }">
        <option disabled value="">Select role</option>
        <option value="student">Student</option>
        <option value="company">Company</option>
        <option value="mentor">Mentor</option>
      </select>

      <p v-if="errors.role" class="error">{{ errors.role }}</p>

      <!-- NAME -->
      <div v-if="form.role === 'student' || form.role === 'mentor'" class="name-row">
        <input v-model="form.name" type="text" placeholder="Name" />
        <input v-model="form.surname" type="text" placeholder="Surname" />
      </div>

      <!-- COMPANY -->
      <div v-if="form.role === 'company'">
        <input v-model="form.company_name" type="text" placeholder="Company Name" />
        <input v-model="form.ico" type="text" placeholder="ICO" />
      </div>

      <!-- COMMON -->
      <input v-model="form.email" type="email" placeholder="Email" />

      <!-- PASSWORD -->
      <input v-model="form.password" type="password" placeholder="Password" />
      <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" />

      <p v-if="errors.password" class="error">{{ errors.password }}</p>
      <p v-if="errors.password_confirmation" class="error">{{ errors.password_confirmation }}</p>

      <!-- STUDENT -->
      <div v-if="form.role === 'student'">
        <input v-model="form.faculty" type="text" placeholder="Faculty" />
        <input v-model="form.department" type="text" placeholder="Department" />
      </div>

      <!-- MENTOR -->
      <div v-if="form.role === 'mentor'">
        <input v-model="form.faculty" type="text" placeholder="Faculty" />
        <input v-model="form.department" type="text" placeholder="Department" />
        <input v-model="form.specialization" type="text" placeholder="Specialization" />
      </div>

      <button type="submit" :disabled="!form.role">
        Register
      </button>
    </form>

    <p class="auth-switch">
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth"
type Role = "" | "student" | "company" | "mentor"

type Form = {
  role: Role
  name: string
  surname: string
  company_name: string
  ico: string
  email: string
  password: string
  password_confirmation: string
  faculty: string
  department: string
  specialization: string
}

type Errors = {
  role?: string
  password?: string
  password_confirmation?: string
}

export default {
  name: "RegisterView",

  data() {
    return {
      form: {
        role: "",
        name: "",
        surname: "",
        company_name: "",
        ico: "",
        email: "",
        password: "",
        password_confirmation: "",
        faculty: "",
        department: "",
        specialization: ""
      } as Form,

      errors: {} as Errors
    }
  },

  methods: {
    validate(): boolean {
      this.errors = {}

      if (!this.form.role) {
        this.errors.role = "Please select a role"
      }

      if (this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters"
      }

      if (this.form.password !== this.form.password_confirmation) {
        this.errors.password_confirmation = "Passwords do not match"
      }

      return Object.keys(this.errors).length === 0
    },

  async submitForm() {
     console.log("1. SUBMIT")
  if (!this.validate()){
  console.log("2. VALIDATION FAILED")
  return}
  console.log("3. VALIDATION OK")

  const authStore = useAuthStore()
console.log("4. ROLE:", this.form.role)
  try {
 console.log("5. BEFORE API")

    // STUDENT
    if (this.form.role === "student") {
      await authStore.register_student({
        first_name: this.form.name,
        last_name: this.form.surname,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
        phone: "",
        faculty: this.form.faculty,
        department: this.form.department,
        study_program: "",
        year_of_study: 1
      })
    }

    // MENTOR
    if (this.form.role === "mentor") {
      await authStore.register_mentor({
        first_name: this.form.name,
        last_name: this.form.surname,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
        phone: "",
        specialization: this.form.specialization,
        bio: ""
      })
    }

    // COMPANY
    if (this.form.role === "company") {
      await authStore.register_company({
        first_name: "",
        last_name: "",
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
        phone: "",
        company_name: this.form.company_name,
        ico: this.form.ico,
        description: "",
        website: "",
        address: ""
      })
    }

    console.log("Registration successful")

    this.$router.push("/login")

  } catch (error) {
    console.error(error)
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

/* NAME row */
.name-row {
  display: flex;
  gap: 12px;
}

.name-row input {
  width: 100%;
}

/* INPUTS */
input,
select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
}

/* FOCUS */
input:focus,
select:focus {
  outline: none;
  border-color: #42b983;
}

/* BUTTON */
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

/* ERROR */
.error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-top: -8px;
}

/* LOGIN LINK */
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
