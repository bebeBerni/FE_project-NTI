<template>
 <div>
    <h1>Admin Dashboard</h1>
  </div>
  <!-- all users for admin's dashboard -->

  <h2> Only official admins can access this</h2>
  <router-link to="/all_users">
    {{ $t('all_users') }}
  </router-link>

  <br>

<!-- all mentor for admin/mentor's dashboard -->


  <h2> Only official admins can access this</h2>
<router-link to="/all_mentors">
    {{ $t('all_mentors') }}
  </router-link>
  <hr>

<h2>Assign Mentor To Team</h2>

<h2>Assign Mentor To Team</h2>

<table class="mentor-table">
  <thead>
    <tr>
      <th>Team</th>
      <th>Current Mentors</th>
      <th>Assign Mentor</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="team in teams" :key="team.id">
      <td class="team-name">
        {{ team.name }}
      </td>

      <td>
        <div
          v-for="mentor in team.mentors"
          :key="mentor.id"
          class="mentor-item"
        >
          <span>
            {{ mentor.user?.first_name }}
            {{ mentor.user?.last_name }}
          </span>

          <button
            class="remove-btn"
            @click="removeMentor(team.id, mentor.id)"
          >
            Remove
          </button>
        </div>
      </td>

      <td>
        <select
          class="mentor-select"
          @change="onMentorSelect(team.id, $event)"
        >
          <option value="">
            Select Mentor
          </option>

          <option
            v-for="mentor in mentors"
            :key="mentor.id"
            :value="mentor.id"
          >
            {{ mentor.first_name }}
            {{ mentor.last_name }}
          </option>
        </select>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script lang="ts">
import api from '@/api/axios'
interface TeamMentor {
  id: number;
  user?: {
    first_name: string;
    last_name: string;
  };
}

interface MentorOption {
  id: number;
  first_name: string;
  last_name: string;
}

interface Team {
  id: number;
  name: string;
  mentors: TeamMentor[];
}


export default {
  name: "AdminDashboard",

  data() {
  return {
    teams: [] as Team[],
    mentors: [] as MentorOption[],
  }
},

  async mounted() {
    await this.loadTeams();
    await this.loadMentors();
  },

  methods: {
    async loadTeams() {
      const response = await api.get('/teams');

    console.log("TEAMS RESPONSE:");
    console.log(response.data);

    this.teams = response.data.teams;
    },
    onMentorSelect(teamId: number, event: Event) {
  const target = event.target as HTMLSelectElement | null;

  if (!target || !target.value) {
    return;
  }

  this.assignMentor(teamId, Number(target.value));
},
async loadMentors() {
  const response = await api.get('/mentors');

    console.log("MENTORS RESPONSE:");
    console.log(response.data);

    this.mentors = response.data.mentors;
},
async removeMentor(teamId: number, mentorId: number) {
    try {
        const response = await api.delete(
  `/teams/${teamId}/mentors/${mentorId}`
);

        console.log(response.data);

        await this.loadTeams();
    } catch (error) {
        console.error(error);
    }
},

async assignMentor(teamId: number, mentorId: number) {
    try {
        const response = await api.post(`/teams/${teamId}/assign-mentor`,
  {
    mentor_id: mentorId
  }
);
        await this.loadTeams();
    } catch (error) {
        console.error(error);
    }
},
  }
}
</script>
<style scoped>
.mentor-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.mentor-table th,
.mentor-table td {
  border: 1px solid #ddd;
  padding: 12px;
  vertical-align: top;
}

.mentor-table th {
  background: #f5f5f5;
  text-align: left;
}

.team-name {
  font-weight: bold;
}

.mentor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  gap: 10px;
}

.mentor-select {
  width: 220px;
  padding: 6px;
}

.remove-btn {
  border: none;
  background: #dc3545;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #bb2d3b;
}
</style>
