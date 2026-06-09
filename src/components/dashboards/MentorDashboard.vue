<!-- eslint-disable vue/block-lang -->
<template>
  <div class="mentor-dashboard">
    <h1>Mentor Dashboard</h1>

    <section class="cards">
      <div class="card">
        <h3>Mentor</h3>
        <p>{{ user.first_name }} {{ user.last_name }}</p>
      </div>

      <div class="card">
        <h3>Email</h3>
        <p>{{ user.email }}</p>
      </div>

      <div class="card">
        <h3>Specialization</h3>
        <p>{{ mentor.specialization }}</p>
      </div>

      <div class="card">
        <h3>Assigned Teams</h3>
        <p>{{ assignedTeams.length }}</p>
      </div>
    </section>

    <section class="profile-section">
      <h2>Mentor Profile</h2>

      <div class="list-item">
        <h3>{{ user.first_name }} {{ user.last_name }}</h3>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Specialization:</strong> {{ mentor.specialization }}</p>
        <p><strong>Bio:</strong> {{ mentor.bio }}</p>
      </div>
    </section>

    <section class="teams-section">
      <h2>Assigned Teams</h2>

      <p v-if="assignedTeams.length === 0">
        You do not have any assigned teams yet.
      </p>

      <div
        v-for="team in assignedTeams"
        :key="team.id"
        class="list-item"
      >
        <h3>{{ team.name }}</h3>

        <p v-if="team.project">
          <strong>Project:</strong> {{ team.project.title }}
        </p>

        <p v-if="team.project">
          <strong>Project status:</strong>
          <span :class="['status', getStatusClass(team.project.status)]">
            {{ formatStatus(team.project.status) }}
          </span>
        </p>

        <h4>Students</h4>

        <p v-if="!team.students || team.students.length === 0">
          No students in this team yet.
        </p>

        <div
          v-for="student in team.students"
          :key="student.id"
          class="student-row"
        >
          <span>
            {{ student.user?.first_name || student.first_name }}
            {{ student.user?.last_name || student.last_name }}
            -
            {{ student.user?.email || student.email }}
          </span>

          <button
            class="danger"
            @click="removeStudentFromTeam(team.id, student.id)"
          >
            Remove
          </button>
        </div>

        <div class="add-student">
          <input
            v-model="studentInputs[team.id]"
            type="number"
            placeholder="Student ID"
          />

          <button @click="addStudentToTeam(team.id)">
            Add Student
          </button>
        </div>
      </div>
    </section>
    <section v-if="isCommissionMember">
  <h2>Commission Applications</h2>

  <div
    v-for="application in applications"
    :key="application.id"
  >
    <h3>{{ application.project.title }}</h3>

    <p>Team: {{ application.team.name }}</p>

    <button
      @click="approveApplication(application.id)"
    >
      Approve
    </button>

    <button
      @click="rejectApplication(application.id)"
    >
      Reject
    </button>
  </div>
</section>
<section
  v-if="applications && applications.length > 0"
  class="commission-section"
>
  <h2>Project Applications Waiting for Decision</h2>

  <div
    v-for="application in applications"
    :key="application.id"
    class="list-item"
  >
    <h3>{{ application.project.title }}</h3>

    <p>
      <strong>Team:</strong>
      {{ application.team.name }}
    </p>

    <p>
      <strong>Category:</strong>
      {{ application.category.name }}
    </p>

    <p>
      <strong>Status:</strong>
      {{ application.status }}
    </p>

    <button
      @click="approveApplication(application.id)"
    >
      Approve
    </button>

    <button
      class="danger"
      @click="rejectApplication(application.id)"
    >
      Reject
    </button>
  </div>
</section>
  </div>
</template>

<!-- eslint-disable vue/block-lang -->
<script>
import api from '@/api/axios'

export default {
  name: 'MentorDashboard',

  data() {
    return {
      user: {},
      mentor: {},
      assignedTeams: [],
      studentInputs: {},
      applications: [],
    }
  },

  mounted() {
    this.loadDashboard()
    this.loadAssignedTeams()
  },

  methods: {
    async loadDashboard() {
  try {
    const response = await api.get('/mentor/dashboard')

    this.user = response.data.user || {}
    this.mentor =
      response.data.mentor ||
      response.data.user?.mentor ||
      {}

    try {
      const applicationsResponse = await api.get(
        '/commission/applications'
      )

      this.applications =
        applicationsResponse.data.applications || []
    } catch {
      this.applications = []
    }
  } catch (error) {
    console.error(error)
    alert('Failed to load mentor dashboard.')
  }
},
async approveApplication(applicationId) {
  try {
    await api.post(
      `/commission/applications/${applicationId}/approve`
    )

    await this.loadDashboard()

    alert('Application approved.')
  } catch (error) {
    console.error(error)
    alert('Failed to approve.')
  }
},
async rejectApplication(applicationId) {
  try {
    await api.post(
      `/commission/applications/${applicationId}/reject`
    )

    await this.loadDashboard()

    alert('Application rejected.')
  } catch (error) {
    console.error(error)
    alert('Failed to reject.')
  }
},

    async loadAssignedTeams() {
      try {
        const response = await api.get('/mentor/teams')

        this.assignedTeams = response.data.teams || response.data || []
      } catch (error) {
        console.error(error)
        alert('Failed to load assigned teams.')
      }
    },

    async assignTeam(teamId) {
      try {
        await api.post(`/mentor/teams/${teamId}/assign`)

        alert('Team assigned successfully.')
        this.loadAssignedTeams()
      } catch (error) {
        console.error(error)
        alert(error.response?.data?.message || 'Failed to assign team.')
      }
    },

    async addStudentToTeam(teamId) {
      const studentId = this.studentInputs[teamId]

      if (!studentId) {
        alert('Please enter student ID.')
        return
      }

      try {
        await api.post(`/mentor/teams/${teamId}/students/${studentId}/add`)

        alert('Student added to team.')
        this.studentInputs[teamId] = ''
        this.loadAssignedTeams()
      } catch (error) {
        console.error(error)
        alert(error.response?.data?.message || 'Failed to add student.')
      }
    },

    async removeStudentFromTeam(teamId, studentId) {
      if (!confirm('Are you sure you want to remove this student?')) return

      try {
        await api.delete(`/mentor/teams/${teamId}/students/${studentId}/remove`)

        alert('Student removed from team.')
        this.loadAssignedTeams()
      } catch (error) {
        console.error(error)
        alert(error.response?.data?.message || 'Failed to remove student.')
      }
    },

    formatStatus(status) {
      if (!status) return 'No status'

      const statuses = {
        draft: 'Draft',
        open: 'Open',
        available: 'Available',
        pending: 'Pending',
        in_progress: 'In Progress',
        active: 'Active',
        submitted: 'Submitted',
        approved: 'Approved',
        rejected: 'Rejected',
        completed: 'Completed',
        cancelled: 'Cancelled',
      }

      return statuses[status] || status
    },

    getStatusClass(status) {
      const classes = {
        draft: 'status-gray',
        open: 'status-green',
        available: 'status-green',
        pending: 'status-orange',
        in_progress: 'status-blue',
        active: 'status-blue',
        submitted: 'status-purple',
        approved: 'status-green',
        rejected: 'status-red',
        completed: 'status-dark',
        cancelled: 'status-red',
      }

      return classes[status] || 'status-gray'
    },
  },
}
</script>

<style scoped>
.mentor-dashboard {
  padding: 30px;
}

.cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.card,
.list-item {
  border: 1px solid #ddd;
  padding: 18px;
  border-radius: 8px;
  background: white;
}

.card {
  width: 230px;
}

.profile-section,
.teams-section {
  margin-bottom: 30px;
}

.list-item {
  margin-bottom: 15px;
}

.student-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.add-student {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 8px 14px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #369f6e;
}

button.danger {
  background: #e74c3c;
}

button.danger:hover {
  background: #c0392b;
}

.status {
  display: inline-block;
  padding: 4px 9px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.status-gray {
  background: #ecf0f1;
  color: #2c3e50;
}

.status-green {
  background: #d5f5e3;
  color: #1e8449;
}

.status-orange {
  background: #fdebd0;
  color: #b9770e;
}

.status-blue {
  background: #d6eaf8;
  color: #21618c;
}

.status-purple {
  background: #eadcf8;
  color: #6c3483;
}

.status-red {
  background: #fadbd8;
  color: #922b21;
}

.status-dark {
  background: #d5d8dc;
  color: #1c2833;
}
</style>