<template>
  <div>
    <!-- PARTNERS -->
    <section class="section">
      <h2>{{ $t('home.partners.title') }}</h2>

      <div class="card-grid four-columns">
        <div class="info-card" v-for="partner in partners" :key="partner.id">
          <h3>{{ partner.name }}</h3>
          <p>{{ partner.description }}</p>
        </div>
      </div>
    </section>

    <!-- MENTORS -->
    <section class="section alt-section">
      <h2>{{ $t('home.mentors.title') }}</h2>

      <div v-if="loading" class="loading">
        Loading mentors...
      </div>

      <div v-else class="card-grid three-columns">
        <div class="info-card" v-for="mentor in mentors" :key="mentor.id">
          <h3>{{ getMentorName(mentor) }}</h3>

          <p>
            <strong>Specialization:</strong>
            {{ mentor.specialization || '—' }}
          </p>

          <p v-if="mentor.user?.email">
            <strong>Email:</strong>
            {{ mentor.user.email }}
          </p>

          <p v-if="mentor.bio">
            {{ mentor.bio }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import axios from "axios"

export default {
  name: "PartnersView",

  data() {
    return {
      loading: true,

      partners: [
        {
          id: 1,
          name: "UKF",
          description: "Univerzita Konštantína Filozofa v Nitre"
        },
        {
          id: 2,
          name: "Fakulta prírodných vied a informatiky",
          description: "Partner pre študentské projekty a odborné vedenie."
        },
        {
          id: 3,
          name: "Univerzitné centrum",
          description: "Podpora spolupráce medzi študentmi, mentormi a firmami."
        },
        {
          id: 4,
          name: "Študentské projekty UKF",
          description: "Priestor pre rozvoj praktických projektov a tímovej práce."
        }
      ],

      mentors: [] as any[]
    }
  },

  mounted() {
    this.getMentors()
  },

  methods: {
    async getMentors() {
      try {
        const token = localStorage.getItem("token")

        const response = await axios.get(
          "http://127.0.0.1:8000/api/mentors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        )

        this.mentors = response.data.mentors || response.data
      } catch (error) {
        console.error("Error loading mentors:", error)
        this.mentors = []
      } finally {
        this.loading = false
      }
    },

    getMentorName(mentor: any) {
      if (mentor.user) {
        return `${mentor.user.first_name || ""} ${mentor.user.last_name || ""}`.trim()
      }

      return `${mentor.first_name || ""} ${mentor.last_name || ""}`.trim() || "—"
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 20px;
}

.alt-section {
  background-color: #f8fafc;
  border-radius: 18px;
}

.section h2 {
  font-size: 34px;
  margin-bottom: 20px;
  text-align: center;
  color: #2c3e50;
}

.card-grid {
  display: grid;
  gap: 20px;
  margin-top: 35px;
}

.three-columns {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.four-columns {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.info-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  transition: 0.2s;
}

.info-card:hover {
  transform: translateY(-4px);
}

.info-card h3 {
  margin-bottom: 12px;
  color: #2c3e50;
}

.info-card p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 8px;
}

.loading {
  text-align: center;
  margin-top: 30px;
  color: #666;
  font-size: 18px;
}

@media (max-width: 768px) {
  .section h2 {
    font-size: 28px;
  }
}
</style>