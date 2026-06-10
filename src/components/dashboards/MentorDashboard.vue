<!-- eslint-disable vue/block-lang -->
<template>
  <div class="mentor-dashboard">
    <h1>Mentor Dashboard</h1>

    <section class="mentor-header">
  <div>
    <h1>
      {{ user.first_name }} {{ user.last_name }}
    </h1>
    <p class="mentor-specialization">
      {{ mentor.specialization }}
    </p>
  </div>

  <div class="mentor-contact">
    <p>{{ user.email }}</p>
    <p>{{ user.phone }}</p>
  </div>
</section>
<section class="stats-grid">
  <div class="stat-card">
    <h2>{{ assignedTeams.length }}</h2>
    <p>Assigned Teams</p>
  </div>

  <div class="stat-card">
    <h2>{{ applications.length }}</h2>
    <p>Pending Applications</p>
  </div>

  <div class="stat-card">
    <h2>
      {{ assignedTeams.reduce((sum, team) => sum + (team.students?.length || 0), 0) }}
    </h2>
    <p>Total Students</p>
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
    class="team-card"
  >
    <div class="team-header">
      <div>
        <h3>{{ team.name }}</h3>

        <p v-if="team.projects?.length">
  <strong>Project:</strong>
  {{ team.projects[0].title }}
</p>
      </div>

      <span
        v-if="team.project"
        :class="[
          'status',
          getStatusClass(team.project.status)
        ]"
      >
        {{ formatStatus(team.project.status) }}
      </span>
    </div>

    <div
      v-if="team.project"
      class="project-info"
    >
      <p>
        <strong>Project:</strong>
        {{ team.project.title }}
      </p>

      <p>
        <strong>Status:</strong>
        {{ formatStatus(team.project.status) }}
      </p>
    </div>

    <div class="students-section">
      <h4>Students</h4>

      <p
        v-if="
          !team.students ||
          team.students.length === 0
        "
      >
        No students assigned.
      </p>

      <div
        v-for="student in team.students"
        :key="student.id"
        class="student-card"
      >
        <div>
          <strong>
            {{ student.user?.first_name || student.first_name }}
            {{ student.user?.last_name || student.last_name }}
          </strong>

          <p>
            {{ student.user?.email || student.email }}
          </p>
        </div>
        
      </div>
      <button
  class="chat-btn"
  @click="openTeamChat(team.id)"
>
  Team Chat
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
openTeamChat(teamId) {
  this.$router.push(
    `/mentor/teams/${teamId}/chat`
  )
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
.mentor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: white;
  border-radius: 12px;
  border: 1px solid #eee;
}

.mentor-header h1 {
  margin: 0;
}

.mentor-role {
  color: #42b983;
  font-weight: 600;
  margin-top: 6px;
}

.mentor-specialization {
  color: #666;
}

.mentor-contact {
  text-align: right;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #eee;
  text-align: center;
}

.stat-card h2 {
  font-size: 2rem;
  margin: 0;
  color: #42b983;
}

.stat-card p {
  margin-top: 10px;
  color: #666;
}
.team-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.team-header h3 {
  margin: 0;
}

.project-title {
  color: #666;
  margin-top: 4px;
}

.project-info {
  margin-bottom: 20px;
}

.students-section h4 {
  margin-bottom: 15px;
}

.student-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.student-card p {
  margin: 4px 0 0;
  color: #666;
}

.message-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.message-btn:hover {
  background: #369f6e;
}
</style>