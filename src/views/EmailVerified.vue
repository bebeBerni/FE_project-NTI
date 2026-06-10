<template>
  <div>
    <h1>Email verified successfully</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

auth.token = null
auth.user = null

localStorage.removeItem('token')
</script>