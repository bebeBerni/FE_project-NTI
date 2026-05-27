<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const authStore = useAuthStore()

onMounted(async () => {
  console.log('APP START')

  if (authStore.token) {
    console.log('TOKEN EXISTS → FETCH USER')
    await authStore.fetchUser()
  } else {
    console.log('NO TOKEN')
  }
})
</script>


<template>
  <div id="app">
    <AppNavbar />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 30px;
}
</style>
