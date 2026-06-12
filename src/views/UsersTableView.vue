<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'


import api from '@/api/axios'

interface User {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  email_verified_at: string | null
  role: string
}

const users = ref<User[]>([])
const loading = ref(false)
const search = ref('')
const total = ref(0)
const editingUser = ref<User | null>(null)



// LOAD USERS FUNCTION
async function loadUsers() {
  loading.value = true

  try {
    const response = await api.get('/admin/users', {
      params: {
        search: search.value,
      },
    })

    console.log('API:', response.data.users)

    users.value = response.data.users ?? []
    total.value = response.data.users?.length ?? 0


  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    loading.value = false
  }
}


watch(search, () => {
  loadUsers()
})



onMounted(() => {
  loadUsers()
})


function editUser(user: User) {
  editingUser.value = { ...user }
}

async function saveUser() {
  if (!editingUser.value) return

  try {
    await api.put(
      `/admin/users/${editingUser.value.id}`,
      {
        first_name: editingUser.value.first_name,
        last_name: editingUser.value.last_name,
        phone: editingUser.value.phone,
        email: editingUser.value.email,
         role: editingUser.value.role,
      }
    )

    await loadUsers()
        // SUCCESS után
    editingUser.value = null
      alert('User updated successfully')

    editingUser.value = null
  } catch (error) {
    console.error(error)
  }
}

async function deleteUser(id: number) {
  if (!confirm('Delete this user?')) return

  try {
    await api.delete(`/admin/users/${id}`)

    await loadUsers()
  } catch (error) {
    console.error(error)
  }
}


</script>


<template>
  <div class="users-page">
    <div class="users-card">

      <!-- HEADER -->
      <div class="users-header">
        <div>
          <h1 class="users-title">Users</h1>
          <p class="users-subtitle">Manage registered users</p>
          <p>Total users: {{ total }}</p>
        </div>

        <input
          v-model="search"
          type="text"
          placeholder="Search by name, email or phone..."
          class="search-input"
        >
      </div>

      <!-- TABLE -->
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
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id">
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

              <td>{{ user.role }}</td>

              <td>
                <button
                  class="edit-btn"
                  @click="editUser(user)"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  @click="deleteUser(user.id)"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="!loading && users.length === 0">
              <td colspan="8" class="empty-state">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <!-- EDIT USER MODAL -->
  <div
    v-if="editingUser"
    class="modal-overlay"
    @click.self="editingUser = null"
  >
    <div class="modal">

      <h2>Edit User</h2>

      <input
        v-model="editingUser.first_name"
        placeholder="First name"
      />

      <input
        v-model="editingUser.last_name"
        placeholder="Last name"
      />

      <input
        v-model="editingUser.phone"
        placeholder="Phone"
      />

      <input
        v-model="editingUser.email"
        placeholder="Email"
      />

      <div class="modal-actions">
        <button @click="saveUser">Save</button>
        <button @click="editingUser = null">Cancel</button>
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


.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.role-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-height: 120px;
  overflow-y: auto;
}

.delete-btn {
  border: none;
  background: #dc3545;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #bb2d3b;
}
.edit-btn {
  border: none;
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.edit-btn:hover {
  background: #1d4ed8;
}
</style>

