<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <router-link to="/">MyProject</router-link>
      </div>

      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/teams">Teams</router-link></li>
      </ul>

      <div class="auth-buttons">
        <router-link to="/login" class="login-btn">Login</router-link>
        <router-link to="/register" class="register-btn">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 15px 30px;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: white;
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a:hover,
.router-link-active {
  color: #42b983;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.login-btn {
  padding: 8px 16px;
  border: 2px solid #42b983;
  color: #42b983;
  background-color: transparent;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}

.login-btn:hover {
  background-color: #42b983;
  color: white;
}

.register-btn {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}

.register-btn:hover {
  background-color: #369f6e;
}
</style>