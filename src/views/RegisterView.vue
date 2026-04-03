<template>
  <div class="auth-page">
    <h1>Register</h1>

    <form class="auth-form">
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Surname" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <select>
        <option value="">Select role</option>
        <option value="student">Student</option>
        <option value="company">Company</option>
      </select>

      <button type="submit">Register</button>
    </form>

    <p class="auth-switch">
      Already have an account?
      <router-link to="/login">login</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "RegisterView"
}
</script>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
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