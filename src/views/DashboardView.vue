<template>
  <div>
    <p v-if="loading">Loading...</p>

    <StudentDashboard
      v-else-if="role === 'student'"
      :user="user"
    />

    <MentorDashboard
      v-else-if="role === 'mentor'"
      :user="user"
    />

    <CompanyDashboard
      v-else-if="role === 'company'"
      :user="user"
    />

    <AdminDashboard
      v-else-if="role === 'admin'"
      :user="user"
    />

    <p v-else>Unknown role: {{ role }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

import StudentDashboard from '../components/dashboards/StudentDashboard.vue'
import MentorDashboard from '../components/dashboards/MentorDashboard.vue'
import CompanyDashboard from '../components/dashboards/CompanyDashboard.vue'
import AdminDashboard from '../components/dashboards/AdminDashboard.vue'

export default {
  name: 'DashboardView',

  components: {
    StudentDashboard,
    MentorDashboard,
    CompanyDashboard,
    AdminDashboard,
  },

  data() {
    return {
      authStore: useAuthStore(),
      loading: true,
    }
  },

  computed: {
    user() {
      return this.authStore.user
    },

    role() {
      return this.user?.roles?.[0]?.name?.toLowerCase() || ''
    },
  },

  async mounted() {
    if (!this.authStore.token) {
      this.$router.push('/login')
      return
    }

    if (!this.authStore.user) {
      await this.authStore.fetchUser()
    }

    this.loading = false

    console.log('DASHBOARD USER:', this.user)
    console.log('DASHBOARD ROLE:', this.role)
  },
}
</script>