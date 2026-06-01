<template>
  <nav class="navbar">
    <div class="navbar-container">

      <!-- LOGO -->
      <div class="logo">
        <router-link to="/">MyProject</router-link>
      </div>

      <!-- NAV LINKS -->
      <ul class="nav-links">
  <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
  <li><router-link to="/o-nti">{{ $t('nav.about') }}</router-link></li>
  <li><router-link to="/projects">{{ $t('nav.projects') }}</router-link></li>
  <li><router-link to="/teams">{{ $t('nav.teams') }}</router-link></li>
  <li><router-link to="/partneri-mentori">{{ $t('nav.partners') }}</router-link></li>
  <li><router-link to="/vyzvy-a-terminy">{{ $t('nav.challenges') }}</router-link></li>
  <li><router-link to="/novinky">{{ $t('nav.news') }}</router-link></li>
  <li><router-link to="/kontakt">{{ $t('nav.contact') }}</router-link></li>

  <li v-if="authStore.isAuthenticated">
  <router-link to="/dashboard">
    {{ $t('nav.dashboard') }}
  </router-link>
  </li>
</ul>

      <!-- RIGHT SIDE -->
      <div class="right-section">

        <!-- LANGUAGE SWITCH -->
        <select v-model="$i18n.locale" class="lang-select">
          <option value="en">EN</option>
          <option value="sk">SK</option>
        </select>

        <!-- AUTH -->
<template v-if="authStore.isAuthenticated">

  <span class="user-name">
    {{ authStore.user?.first_name }}
  </span>

  <button
    @click="authStore.logout()"
    class="logout-btn"
  >
    Logout
  </button>

</template>

<template v-else>

  <router-link to="/login" class="login-btn">
    {{ $t('nav.login') }}
  </router-link>
    <router-link to="/register" class="register-btn">
          {{ $t('nav.register') }}
        </router-link>
</template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, watch } from 'vue'

const authStore = useAuthStore()

watch(
  () => authStore.user,
  (val) => {
    console.log('USER CHANGED:', val)
  }
)

onMounted(() => {
  const savedLang = localStorage.getItem('lang')
  if (savedLang) {
    // $i18n itt külön kezelendő ha kell
  }
})
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

/* LOGO */
.logo a {
  color: white;
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;
}

/* LINKS */
.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover,
.router-link-active {
  color: #42b983;
}

/* RIGHT SIDE */
.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* LANGUAGE */
.lang-select {
  padding: 6px 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

/* LOGIN (outlined) */
.login-btn {
  padding: 8px 14px;
  border: 2px solid #42b983;
  color: #42b983;
  background: transparent;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}

.login-btn:hover {
  background-color: #42b983;
  color: white;
}

/* REGISTER (filled) */
.register-btn {
  padding: 8px 14px;
  background-color: #42b983;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}

.register-btn:hover {
  background-color: #369f6e;
}

.user-name {
  color: white;
  font-weight: 600;
}

.logout-btn {
  padding: 8px 14px;
  border: none;
  background-color: #e74c3c;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
