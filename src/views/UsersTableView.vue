<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core' // hasznalatara majd kell:  npm install @vueuse/core

import api from '@/api/axios'

interface User {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  email_verified_at: string | null
}

const users = ref<User[]>([])
const loading = ref(false)

const search = ref('')

const page = ref(1)
const perPage = ref(10)

const total = ref(0)
const totalPages = ref(1)


// LOAD USERS FUNCTION
async function loadUsers() {
  loading.value = true

  try {
    const response = await api.get('/admin/users', {
      params: {
        page: page.value,
        per_page: perPage.value,
        search: search.value,
      },
    })

    console.log('API:', response.data.users)

    users.value = response.data.users ?? []
    total.value = response.data.users?.length ?? 0
    totalPages.value = response.data.users.last_page ?? 1

  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    loading.value = false
  }
}

const debouncedLoad = useDebounceFn(() => {
  page.value = 1
  loadUsers()
}, 500)

watch(search, () => {
  page.value = 1
  debouncedLoad()
})

watch(page, () => {
  loadUsers()
})

onMounted(() => {
  loadUsers()
})

</script>


<template>
  <div class="users-page">
    <div class="users-card">
      <div class="users-header">
        <div>
          <h1 class="users-title">Users</h1>
          <p class="users-subtitle">Manage registered users</p>
          <p>Total users: {{ total }}</p>
        </div>

        <!-- Search input -->

        <input
          v-model="search"
          type="text"
          placeholder="Search by name, email or phone..."
          class="search-input"
        >
      </div>

      <div class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Verified</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span
                  v-if="user.email_verified_at"
                  class="badge badge-success"
                >
                  Verified
                </span>

                <span
                  v-else
                  class="badge badge-danger"
                >
                  Not verified
                </span>
              </td>
            </tr>

            <tr v-if="!loading && users.length === 0">
              <td
                colspan="6"
                class="empty-state"
              >
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  </div>
</template>

<style scoped>
.users-page {
  padding: 24px;
}

.users-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.users-title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.users-subtitle {
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

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  background: #f9fafb;
  text-align: left;
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.users-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.users-table tbody tr:hover {
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

.users-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 14px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  cursor: pointer;
}

.pagination button:hover:not(:disabled) {
  background: #f9fafb;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

