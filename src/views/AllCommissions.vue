<script setup lang="ts">
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import api from '@/api/axios'

const { t } = useI18n()

interface User {
  id: number
  first_name: string
  last_name: string
  email?: string
  phone?: string
  role?: string
}

interface CommissionMember {
  id: number
  user_id: number
  commission_id: number
  user: User
}

interface Commission {
  id: number
  name: string
  description?: string
  created_at?: string
  members?: CommissionMember[]
}

const commissions = ref<Commission[]>([])
const users = ref<User[]>([])

const loading = ref(false)
const search = ref('')
const total = ref(0)
const editingCommission = ref<Commission | null>(null)

async function loadCommissions() {
  loading.value = true

  try {
    const response = await api.get('/admin/commissions', {
      params: {
        search: search.value,
      },
    })

    console.log('COMMISSIONS API:', response.data)

    commissions.value = response.data.commissions ?? response.data.data ?? []
    total.value = commissions.value.length

    await loadMembersForCommissions()
  } catch (error) {
    console.error('Failed to load commissions:', error)
  } finally {
    loading.value = false
  }
}

async function loadMembersForCommissions() {
  for (const commission of commissions.value) {
    try {
      const response = await api.get(`/admin/commissions/${commission.id}/members`)

      commission.members = response.data.members ?? []
    } catch (error) {
      console.error(`Failed to load members for commission ${commission.id}:`, error)
      commission.members = []
    }
  }
}

async function loadUsers() {
  try {
    const response = await api.get('/admin/users')

    console.log('USERS API:', response.data)

    users.value = response.data.users ?? []
  } catch (error) {
    console.error('Failed to load users:', error)
  }
}

watch(search, () => {
  loadCommissions()
})

onMounted(async () => {
  await loadCommissions()
  await loadUsers()
})

function editCommission(commission: Commission) {
  editingCommission.value = { ...commission }
}

async function saveCommission() {
  if (!editingCommission.value) return

  try {
    await api.put(`/admin/commissions/${editingCommission.value.id}`, {
      name: editingCommission.value.name,
      description: editingCommission.value.description,
    })

    await loadCommissions()
    editingCommission.value = null

    alert('Commission updated successfully')
  } catch (error) {
    console.error('Failed to update commission:', error)
  }
}

async function deleteCommission(id: number) {
  if (!confirm(t('dashboard.messages.sureDelete'))) return

  try {
    await api.delete(`/admin/commissions/${id}`)

    await loadCommissions()
  } catch (error) {
    console.error('Failed to delete commission:', error)
  }
}

function onMemberSelect(commissionId: number, event: Event) {
  const target = event.target as HTMLSelectElement | null

  if (!target || !target.value) {
    return
  }

  addMember(commissionId, Number(target.value))

  target.value = ''
}

async function addMember(commissionId: number, userId: number) {
  try {
    await api.post(`/admin/commissions/${commissionId}/members`, {
      user_id: userId,
    })

    await loadCommissions()
  } catch (error) {
    console.error('Failed to add member:', error)
  }
}

async function removeMember(commissionId: number, userId: number) {
  if (!confirm('Remove this member from commission?')) return

  try {
    await api.delete(`/admin/commissions/${commissionId}/members/${userId}`)

    await loadCommissions()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      console.error('Headers:', error.response?.headers)
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
</script>

<template>
  <div class="users-page">
    <div class="users-card">

      <div class="users-header">
        <div>
          <h1 class="users-title">All Commissions</h1>
          <p class="users-subtitle">Manage all commissions</p>
          <p>Total: {{ total }}</p>
        </div>

        <input
          v-model="search"
          type="text"
          placeholder="Search by name..."
          class="search-input"
        >
      </div>

      <div class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Members</th>
              <th>Add Member</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="commission in commissions"
              :key="commission.id"
            >
              <td>{{ commission.id }}</td>
              <td>{{ commission.name }}</td>
              <td>{{ commission.description }}</td>
              <td>{{ commission.created_at }}</td>

              <td>
                <div v-if="commission.members && commission.members.length">
                  <div
                    v-for="member in commission.members"
                    :key="member.id"
                    class="member-item"
                  >
                    <span>
                      {{ member.user.first_name }}
                      {{ member.user.last_name }}
                    </span>

                    <button
  class="small-delete-btn"
  @click="removeMember(commission.id, member.user_id)"
>
  Remove
</button>
                  </div>
                </div>

                <span
                  v-else
                  class="empty-text"
                >
                  No members
                </span>
              </td>

              <td>
                <select
                  class="member-select"
                  @change="onMemberSelect(commission.id, $event)"
                >
                  <option value="">
                    Select member
                  </option>

                  <option
                    v-for="user in users"
                    :key="user.id"
                    :value="user.id"
                  >
                    {{ user.first_name }}
                    {{ user.last_name }}
                    {{ user.role ? `(${user.role})` : '' }}
                  </option>
                </select>
              </td>

              <td>
                <button
                  class="edit-btn"
                  @click="editCommission(commission)"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  @click="deleteCommission(commission.id)"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="!loading && commissions.length === 0">
              <td
                colspan="7"
                class="empty-state"
              >
                No commissions found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div
    v-if="editingCommission"
    class="modal-overlay"
    @click.self="editingCommission = null"
  >
    <div class="modal">
      <h2>Edit Commission</h2>

      <label>Name</label>
      <input
        v-model="editingCommission.name"
        placeholder="Name"
      />

      <label>Description</label>
      <textarea
        v-model="editingCommission.description"
        placeholder="Description"
      ></textarea>

      <div class="modal-actions">
        <button
          class="edit-btn"
          @click="saveCommission"
        >
          Save
        </button>

        <button
          class="delete-btn"
          @click="editingCommission = null"
        >
          Cancel
        </button>
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
  vertical-align: top;
}

.users-table tbody tr:hover {
  background: #f9fafb;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 40px;
}

.empty-text {
  color: #9ca3af;
  font-size: 13px;
}

.member-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.member-select {
  width: 100%;
  min-width: 180px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
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
  width: 420px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal input,
.modal textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.modal textarea {
  min-height: 90px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.delete-btn {
  border: none;
  background: #dc3545;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 6px;
}

.delete-btn:hover {
  background: #bb2d3b;
}

.small-delete-btn {
  border: none;
  background: #dc3545;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.small-delete-btn:hover {
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