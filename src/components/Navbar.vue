<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <a href="#">MyProject</a>
      </div>

      <ul class="nav-links">
        <li><a href="/profile">Profile</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/teams">Teams</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
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
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links li a:hover {
  color: #42b983;
}
</style>