<template>
  <div class="auth-page">
    <h1>Register</h1>

    <form class="auth-form" @submit.prevent="submitForm">

      <!-- ROLE -->
      <select v-model="form.role">
        <option disabled value="">Select role</option>
        <option value="student">Student</option>
        <option value="company">Company</option>
        <option value="mentor">Mentor</option>
      </select>

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

      <!-- ERRORS -->
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

      <button type="submit">Register</button>
    </form>

    <p class="auth-switch">
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script>
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
      },
      errors: {}
    }
  },
  methods: {
    validate() {
      this.errors = {}

      if (this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters"
      }

      if (this.form.password !== this.form.password_confirmation) {
        this.errors.password_confirmation = "Passwords do not match"
      }

      return Object.keys(this.errors).length === 0
    },

    submitForm() {
      if (!this.validate()) return

      console.log("Form OK:", this.form)
    }
  }
}
</script>

<style scoped>
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