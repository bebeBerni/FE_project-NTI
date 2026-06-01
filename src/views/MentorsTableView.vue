<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import api from '@/api/axios'


interface Mentor {
  user_id: number
  first_name: string
  last_name: string
  email: string
  specialization: string
  phone: string
}

const mentors = ref<Mentor[]>([])
const loading = ref(false)
const search = ref('')
const total = ref(0)

async function loadMentors() {
  loading.value = true

  try {
    const response = await api.get('/mentors', {
      params: {
        search: search.value,
      },
    })

    mentors.value = response.data.mentors ?? []
    total.value = response.data.mentors?.length ?? 0

  } catch (error) {
    console.error('Failed to load mentors:', error)
  } finally {
    loading.value = false
  }
}



watch(search, () => {
  loadMentors() // vagy useDe
})

onMounted(() => {
  loadMentors()
})

</script>


<template>
  <div class="mentors-page">
    <div class="mentors-card">
      <div class="mentors-header">
        <div>
          <h1 class="mentors-title">Mentors</h1>
          <p class="mentors-subtitle">Manage registered mentors</p>
          <p>Total mentors: {{ total }}</p>
        </div>

        <!-- Search input -->

        <input
          v-model="search"
          type="text"
          placeholder="Search by name, specialization or phone..."
          class="search-input"
        >
      </div>

      <div class="table-wrapper">
        <table class="mentors-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="mentor in mentors"
              :key="mentor.user_id"
            >
              <td>{{ mentor.user_id }}</td>
              <td>{{ mentor.first_name }}</td>
              <td>{{ mentor.last_name }}</td>
              <td>{{ mentor.email }}</td>
              <td>{{ mentor.specialization }}</td>
              <td>{{ mentor.phone }}</td>

            </tr>

            <tr v-if="!loading && mentors.length === 0">
              <td
                colspan="6"
                class="empty-state"
              >
                No mentors found
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  </div>
</template>

<style scoped>
.mentors-page {
  padding: 24px;
}

.mentors-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.mentors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.mentors-title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.mentors-subtitle {
  margin-top: 4px;
  color: #6b7280;
}

.search-input {
  width: 320px;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
}

.search-input:focus {
  border-color: #2563eb;
}

.table-wrapper {
  overflow-x: auto;
}

.mentors-table {
  width: 100%;
  border-collapse: collapse;
}

.mentors-table th {
  background: #f9fafb;
  text-align: left;
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.mentors-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.mentors-table tbody tr:hover {
  background: #f9fafb;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
}

.badge-danger {
  background: #fee2e2;
  color: #dc2626;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 40px;
}

.mentors-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}


</style>

