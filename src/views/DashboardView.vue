<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-card">

      <!-- LOADING -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>

      <!-- ROLE DASHBOARDS -->
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

      <!-- ERROR -->
      <p v-else class="error-text">
        Unknown role: {{ role }}
      </p>

    </div>
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
<style scoped>

.dashboard-wrapper {
  min-height: 100vh;
  padding: 40px 16px;
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #f6f7fb, #eef2ff);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

.dashboard-card {
  width: 100%;
  max-width: 1200px;
  background: #fff;
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* HEADER */
.dashboard-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.subtitle {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
}

/* LOADING */
.loading-state {
  text-align: center;
  padding: 60px 0;
  color: #6b7280;
}

.spinner {
  width: 38px;
  height: 38px;
  margin: 0 auto 12px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ERROR */
.error-text {
  text-align: center;
  color: #dc2626;
  font-weight: 500;
  padding: 30px 0;
}

/* 🔥 GLOBAL BUTTON STYLE (nagyon fontos rész) */
button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
}

button:active {
  transform: translateY(0px);
  box-shadow: none;
}

/* secondary button (ha van ilyen class később) */
button.secondary {
  background: #e5e7eb;
  color: #111827;
}

button.secondary:hover {
  background: #d1d5db;
}
</style>
