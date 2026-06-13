<template>
  <div class="student-dashboard">
    <h1>Student Dashboard</h1>

    <section class="cards">
      <div
  v-if="!myProject && myTeam && isLeader"
  class="card"
>
  <h3>Available Projects</h3>
  <p>{{ availableProjects.length }}</p>
</div>

      <div v-if="!myTeam" class="card">
        <h3>Available Teams</h3>
        <p>{{ availableTeams.length }}</p>
      </div>

      <div class="card">
        <h3>My Team</h3>

        <template v-if="myTeam" >
          <p><strong>{{ myTeam.name }}</strong></p>
          <p>My role: {{ myTeam.my_role || myTeam.pivot?.member_role || 'Member' }}</p>

          <button
          v-if="!isLeader"
          class="leave-btn"
          @click="leaveTeam"
          >
          Leave Team
          </button>

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
      <button
  v-if="!myProject && myTeam && isLeader"
  @click="createProject"
>
  Create Project
</button>
    </section>

    <section v-if="myProject" class="project-section">
      <h2>My Project Application Details</h2>

      <div class="list-item">
        <h3>{{ myProject.title }}</h3>

        <p v-if="myProject.description">
          <strong>Description:</strong> {{ myProject.description }}
        </p>

        <p v-if="myProject.project_application_status">
  <strong>Application Status:</strong>

  <span
    :class="[
      'status',
      getStatusClass(myProject.project_application_status)
    ]"
  >
    {{
      formatStatus(
        myProject.project_application_status
      )
    }}
  </span>
</p>
<p v-if="myProject.deadline">
  <strong>Deadline:</strong>
  {{ formatDate(myProject.deadline) }}
</p>

        <p v-if="myProject.company">
          <strong>Company:</strong>
          {{ myProject.company.company_name || myProject.company.name }}
        </p>

        <p v-if="myProject.mentor">
          <strong>Mentor:</strong>
          {{ myProject.mentor.first_name }} {{ myProject.mentor.last_name }}
        </p>
      </div>
    </section>

    <section v-if="myTeam" class="team-section">
  <h2>My Team Details</h2>

  <div class="list-item">
  <h3>{{ myTeam.name }}</h3>

  <p>
    <strong>Project:</strong>
    {{ myProject?.title || 'No project assigned' }}
  </p>

  <button
    class="chat-btn"
    @click="openTeamChat(myTeam.id)"
  >
    Team Chat
  </button>
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

    <p>Email: {{ member.email || member.user?.email }}</p>

    <p>
      Role in team:
      {{ member.member_role || member.pivot?.member_role || 'Member' }}
    </p>
    <button
  v-if="
    isLeader &&
    (member.pivot?.member_role !== 'leader')
  "
  class="reject-btn"
  @click="removeMember(member.id)"
>
  Remove Member
</button>
    
  </div>

  <div
    v-if="
      pendingTeamRequests.length > 0 &&
      teamMembers.some(
        member =>
          member.user?.email === user.email &&
          (member.pivot?.member_role === 'leader' ||
            member.member_role === 'leader')
      )
    "
    class="pending-requests"
  >
    <h2>Pending Join Requests</h2>

    <div
      v-for="request in pendingTeamRequests"
      :key="request.id"
      class="list-item"
    >
      <h3>
        {{ request.student.user.first_name }}
        {{ request.student.user.last_name }}
      </h3>

      <p>
        {{ request.student.user.email }}
      </p>

      <button
        @click="approveRequest(request.id)"
      >
        Approve
      </button>

      <button
        class="reject-btn"
        @click="rejectRequest(request.id)"
      >
        Reject
      </button>
    </div>
  </div>
</section>
<section v-if="projectApplications.length">
  <h2>My Project Applications</h2>

  <div
    v-for="application in projectApplications"
    :key="application.id"
    class="list-item"
  >
    <h3>{{ application.project.title }}</h3>

    <p>
      Status:
      <span
        :class="[
          'status',
          getStatusClass(application.status)
        ]"
      >
        {{ formatStatus(application.status) }}
      </span>
    </p>
  </div>
</section>

    <section v-if="!myProject && myTeam && isLeader">
      <h2>Available Projects</h2>

      <div
        v-for="project in availableProjects"
        :key="project.id"
        class="list-item"
      >
        <h3>{{ project.title }}</h3>
        <p><Strong>Description: </Strong>{{ project.description }}</p>
        <p><strong>Budget: </strong>{{ project.budget }}</p>
        <p><strong>Deadline:</strong> {{ formatDate(project.deadline) }}</p>


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

        <button @click="joinTeam(team)">
          Join Team
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import api from '@/api/axios'
import axios from 'axios'

interface Team {
  id: number
  name: string
  description?: string
  created_at?: string
  my_role?: string

  project?: {
    id: number
    title: string
  } | null

  pivot?: {
    member_role?: string
  }
}

interface Project {
  id: number
  title: string
  description?: string
  status?: string

  project_application_status?: string

  deadline?: string
  budget?: number;

  company?: {
    company_name?: string
    name?: string
  }
  mentor?: {
    first_name?: string
    last_name?: string
  }
}
interface ProjectApplication {
  id: number
  status: string

  project: {
    id: number
    title: string
  }
}

interface TeamMember {
  id: number
  first_name?: string
  last_name?: string
  email?: string
  member_role?: string

  pivot?: {
    member_role?: string
  }

  user?: {
    first_name?: string
    last_name?: string
    email?: string
  }
}
interface TeamJoinRequest {
  id: number

  student: {
    id: number

    user: {
      first_name: string
      last_name: string
      email: string
    }
  }
}

export default {
  name: 'StudentDashboard',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

data(): {
  myTeam: Team | null
  teamMembers: TeamMember[]
  myProject: Project | null
  availableProjects: Project[]
  availableTeams: Team[]
  pendingTeamRequests: TeamJoinRequest[]
  hasCv: boolean
  projectApplications: ProjectApplication[]
  motivation: string
  note: string
}  {
return {
  myTeam: null,
  teamMembers: [],
  myProject: null,
  availableProjects: [],
  availableTeams: [],
  pendingTeamRequests: [],
  hasCv: false,
  projectApplications: [],
  motivation: '',
  note: '',
}
},

 mounted() {
  this.loadDashboard()
},
computed: {
  isLeader(): boolean {
    if (!this.myTeam) return false

    return (
      this.myTeam.my_role === 'leader' ||
      this.myTeam.pivot?.member_role === 'leader'
    )
  },
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
        this.pendingTeamRequests =
          response.data.pending_team_requests || []
        this.hasCv = response.data.has_cv
        this.projectApplications =
  response.data.project_applications || []

if (this.myProject) {
  this.myProject.project_application_status =
    response.data.project_application_status
}

        if (
  !this.myProject &&
  this.myTeam &&
  (
    this.myTeam.my_role === 'leader' ||
    this.myTeam.pivot?.member_role === 'leader'
  )
) {
  await this.loadAvailableProjects()
}

        if (!this.myTeam) {
          await this.loadAvailableTeams()
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || 'Failed to load dashboard.')
        } else {
          alert('Unexpected error occurred.')
        }
      }
    },
openTeamChat(teamId: number) {
  this.$router.push(
    `/team-chat/${teamId}`
  )
},
formatDate(dateString?: string) {
    if (!dateString) return '-';

    return new Date(dateString).toLocaleDateString('sk-SK');
  },

    async loadAvailableProjects() {
      try {
        const response = await api.get('/student/available-projects')
        this.availableProjects = response.data.projects || response.data
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || 'Failed to load available projects.')
        } else {
          alert('Unexpected error occurred.')
        }
      }
    },
    async removeMember(memberId: number) {
  const accept = confirm(
    'Are you sure you want to remove this member from the team?'
  )

  if (!accept) return

  try {
    await api.delete(
      `/leader/teams/${this.myTeam?.id}/members/${memberId}`
    )

    alert('Member removed successfully.')

    await this.loadDashboard()
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    }
  }
},

    async loadAvailableTeams() {
      try {
        const response = await api.get('/student/available-teams')
        this.availableTeams = response.data.teams || response.data
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || 'Failed to load available teams.')
        } else {
          alert('Unexpected error occurred.')
        }
      }
    },

    async joinProject(projectId: number) {
  const accept = confirm(
    'To join this project, you must upload your CV first. Do you want to continue?'
  )

  if (!accept) {
    return
  }

  try {
    const response = await api.post(`/student/projects/${projectId}/join`)

    const projectApplicationId =
      response.data.project_application_id ||
      response.data.project_application?.id

    if (!projectApplicationId) {
      alert('Project application ID was not returned.')
      return
    }

    this.$router.push(
      `/student/project-applications/${projectApplicationId}/upload-cv`
    )
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Failed to join project.')
    } else {
      alert('Unexpected error occurred.')
    }
  }
},

    joinTeam(team: Team) {
  if (team.project) {
    const accept = confirm(
      `This team already has a project: "${team.project.title}". To join this team, you must upload your CV first. Do you want to continue?`
    )

    if (!accept) {
      alert('You declined joining the team.')
      return
    }

    this.$router.push(`/student/teams/${team.id}/projects/${team.project.id}/upload-cv`)
    return
  }

  this.joinTeamWithoutCv(team.id)
},

async joinTeamWithoutCv(teamId: number) {
  const accept = confirm('Do you want to join this team?')

  if (!accept) {
    alert('You declined joining the team.')
    return
  }

  try {
    await api.post(`/student/teams/${teamId}/join`)

    alert('You sent a request to the team leader.')

    this.availableTeams = []
    await this.loadDashboard()
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Failed to join team.')
    } else {
      alert('Unexpected error occurred.')
    }
  }
},
async leaveTeam() {
  if (!this.myTeam) return

  const accept = confirm(
    'Are you sure you want to leave this team?'
  )

  if (!accept) return

  try {
    await api.post(`/student/teams/${this.myTeam.id}/leave`)

    alert('You left the team successfully.')

    this.myTeam = null
    this.teamMembers = []

    await this.loadDashboard()
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Failed to leave team.')
    } else {
      alert('Unexpected error occurred.')
    }
  }
},
async approveRequest(requestId: number) {
  try {
    await api.post(
      `/leader/team-requests/${requestId}/approve`
    )

    alert('Request approved.')

    await this.loadDashboard()
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    }
  }
},

async rejectRequest(requestId: number) {
  try {
    await api.post(
      `/leader/team-requests/${requestId}/reject`
    )

    alert('Request rejected.')

    await this.loadDashboard()
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    }
  }
},

    createProject() {
      this.$router.push('/student/projects/create')
    },

    createTeam() {
      this.$router.push('/student/teams/create')
    },

    formatStatus(status?: string) {
      if (!status) return 'No status'

      const statuses: Record<string, string> = {
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

    getStatusClass(status?: string) {
      const classes: Record<string, string> = {
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

      return classes[status || ''] || 'status-gray'
    },
  },
}
</script>

<style scoped>

.success-message {
  background: #d5f5e3;
  color: #1e8449;
  border: 1px solid #82e0aa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
}

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