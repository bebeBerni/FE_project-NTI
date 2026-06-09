<!-- eslint-disable vue/block-lang -->
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

     <CommissionDashboard
      v-else-if="role === 'commission'"
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
import CommissionDashboard from '../components/dashboards/CommissionDashboard.vue'

export default {
  name: 'DashboardView',

  components: {
  StudentDashboard,
  MentorDashboard,
  CompanyDashboard,
  CommissionDashboard,
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
  const roles = this.user?.roles?.map(r => r.name.toLowerCase()) || []

  if (roles.includes('admin')) return 'admin'
  if (roles.includes('commission')) return 'commission'
  if (roles.includes('mentor')) return 'mentor'
  if (roles.includes('company')) return 'company'
  if (roles.includes('student')) return 'student'

  return ''
}
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
