<template>
  <div class="student-dashboard">
    <h1>Student Dashboard</h1>

    <section class="cards">
      <div v-if="!myProject" class="card">
        <h3>Available Projects</h3>
        <p>{{ availableProjects.length }}</p>
      </div>

      <div v-if="!myTeam" class="card">
        <h3>Available Teams</h3>
        <p>{{ availableTeams.length }}</p>
      </div>

      <div class="card">
        <h3>My Team</h3>

        <template v-if="myTeam">
          <p><strong>{{ myTeam.name }}</strong></p>
          <p>My role: {{ myTeam.my_role || myTeam.pivot?.member_role || 'Member' }}</p>
        </template>

        <p v-else>You are not in a team yet.</p>
      </div>

      <div class="card">
        <h3>My Project</h3>

        <template v-if="myProject">
          <p><strong>{{ myProject.title }}</strong></p>
          <p>
            Status:
            <span :class="['status', getStatusClass(myProject.status)]">
              {{ formatStatus(myProject.status) }}
            </span>
          </p>
        </template>

        <p v-else>You do not have a project yet.</p>
      </div>
    </section>

    <section class="actions">
      <button v-if="!myTeam" @click="createTeam">Create Team</button>
      <button v-if="!myProject" @click="createProject">Create Project</button>
    </section>

    <section v-if="myProject" class="project-section">
      <h2>My Project Details</h2>

      <div class="list-item">
        <h3>{{ myProject.title }}</h3>

        <p v-if="myProject.description">
          <strong>Description:</strong> {{ myProject.description }}
        </p>

        <p>
          <strong>Status:</strong>
          <span :class="['status', getStatusClass(myProject.status)]">
            {{ formatStatus(myProject.status) }}
          </span>
        </p>

        <p v-if="myProject.company">
          <strong>Company:</strong>
          {{ myProject.company.company_name || myProject.company.name }}
        </p>

        <p v-if="myProject.mentor">
          <strong>Mentor:</strong>
          {{ myProject.mentor.first_name }} {{ myProject.mentor.last_name }}
        </p>

        <p v-if="myProject.created_at">
          <strong>Created at:</strong> {{ formatDate(myProject.created_at) }}
        </p>

        <p v-if="myProject.updated_at">
          <strong>Updated at:</strong> {{ formatDate(myProject.updated_at) }}
        </p>
      </div>
    </section>

    <section v-if="myTeam" class="team-section">
      <h2>My Team Details</h2>

      <div class="list-item">
        <h3>{{ myTeam.name }}</h3>

        <p v-if="myTeam.description">
          <strong>Description:</strong> {{ myTeam.description }}
        </p>

        <p v-if="myTeam.created_at">
          <strong>Created at:</strong> {{ formatDate(myTeam.created_at) }}
        </p>
      </div>

      <h2>Team Members</h2>

      <div
        v-for="member in teamMembers"
        :key="member.id"
        class="list-item"
      >
        <h3>
          {{ member.first_name || member.user?.first_name }}
          {{ member.last_name || member.user?.last_name }}
        </h3>

        <p>
          Email:
          {{ member.email || member.user?.email }}
        </p>

        <p>
          Role in team:
          {{ member.member_role || member.pivot?.member_role || 'Member' }}
        </p>
      </div>
    </section>

    <section v-if="!myProject">
      <h2>Available Projects</h2>

      <div
        v-for="project in availableProjects"
        :key="project.id"
        class="list-item"
      >
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>

        <p>
          <strong>Status:</strong>
          <span :class="['status', getStatusClass(project.status)]">
            {{ formatStatus(project.status) }}
          </span>
        </p>

        <button @click="joinProject(project.id)">
          Join Project
        </button>
      </div>
    </section>

    <section v-if="!myTeam">
      <h2>Available Teams</h2>

      <div
        v-for="team in availableTeams"
        :key="team.id"
        class="list-item"
      >
        <h3>{{ team.name }}</h3>

        <button @click="joinTeam(team.id)">
          Join Team
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/api/axios'

export default {
  name: 'StudentDashboard',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      myTeam: null,
      teamMembers: [],
      myProject: null,
      availableProjects: [],
      availableTeams: [],
    }
  },

  mounted() {
    this.loadDashboard()
  },

  methods: {
    async loadDashboard() {
      try {
        const response = await api.get('/student/dashboard')

        this.myTeam = response.data.team || null
        this.teamMembers =
          response.data.team_members || response.data.members || []
        this.myProject =
          response.data.project || response.data.my_project || null

        if (!this.myProject) {
          this.loadAvailableProjects()
        }

        if (!this.myTeam) {
          this.loadAvailableTeams()
        }
      } catch (error) {
        console.error(error)
        alert('Failed to load dashboard.')
      }
    },

    async loadAvailableProjects() {
      try {
        const response = await api.get('/student/available-projects')
        this.availableProjects = response.data.projects || response.data
      } catch (error) {
        console.error(error)
        alert('Failed to load available projects.')
      }
    },

    async loadAvailableTeams() {
      try {
        const response = await api.get('/student/available-teams')
        this.availableTeams = response.data.teams || response.data
      } catch (error) {
        console.error(error)
        alert('Failed to load available teams.')
      }
    },

    async joinProject(projectId) {
      try {
        await api.post(`/student/projects/${projectId}/join`)

        alert('You joined the project.')

        this.availableProjects = []
        this.loadDashboard()
      } catch (error) {
        console.error(error)
        alert(error.response?.data?.message || 'Failed to join project.')
      }
    },

    async joinTeam(teamId) {
      try {
        await api.post(`/student/teams/${teamId}/join`)

        alert('You joined the team.')

        this.availableTeams = []
        this.loadDashboard()
      } catch (error) {
        console.error(error)
        alert(error.response?.data?.message || 'Failed to join team.')
      }
    },

    createProject() {
      this.$router.push('/student/projects/create')
    },

    createTeam() {
      this.$router.push('/student/teams/create')
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString()
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
.student-dashboard {
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
  width: 220px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.team-section,
.project-section {
  margin-bottom: 30px;
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

.list-item {
  margin-bottom: 15px;
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