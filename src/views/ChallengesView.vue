<template>
  <div>
    <!-- SUCCESSFUL PROJECTS -->
    <section class="section">
      <h2>{{ $t('home.successfulProjects.title') }}</h2>
      <div class="card-grid three-columns">
        <div class="info-card" v-for="project in projects" :key="project.id">
          <h3>{{ $t(project.titleKey) }}</h3>
          <p>{{ $t(project.descriptionKey) }}</p>
          <span class="badge">{{ $t(project.statusKey) }}</span>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section alt-section">
      <h2>{{ $t('home.faq.title') }}</h2>
      <div class="faq-list">
        <div class="faq-item" v-for="item in faq" :key="item.id">
          <h3>{{ $t(item.questionKey) }}</h3>
          <p>{{ $t(item.answerKey) }}</p>
        </div>
      </div>
    </section>

    <!-- KEY DATES -->
    <section class="section">
      <h2>{{ $t('home.keyDates.title') }}</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="event in keyDates" :key="event.id">
          <div class="timeline-date">{{ $t(event.dateKey) }}</div>
          <div class="timeline-content">
            <h3>{{ $t(event.titleKey) }}</h3>
            <p>{{ $t(event.descriptionKey) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ChallengesView",
  data() {
    return {
      projects: [
        {
          id: 1,
          titleKey: 'home.successfulProjects.items.project1.title',
          descriptionKey: 'home.successfulProjects.items.project1.text',
          statusKey: 'home.successfulProjects.items.project1.status'
        },
        {
          id: 2,
          titleKey: 'home.successfulProjects.items.project2.title',
          descriptionKey: 'home.successfulProjects.items.project2.text',
          statusKey: 'home.successfulProjects.items.project2.status'
        },
        {
          id: 3,
          titleKey: 'home.successfulProjects.items.project3.title',
          descriptionKey: 'home.successfulProjects.items.project3.text',
          statusKey: 'home.successfulProjects.items.project3.status'
        }
      ],
      faq: [
        {
          id: 1,
          questionKey: 'home.faq.items.faq1.question',
          answerKey: 'home.faq.items.faq1.answer'
        },
        {
          id: 2,
          questionKey: 'home.faq.items.faq2.question',
          answerKey: 'home.faq.items.faq2.answer'
        },
        {
          id: 3,
          questionKey: 'home.faq.items.faq3.question',
          answerKey: 'home.faq.items.faq3.answer'
        }
      ],
      keyDates: [
        {
          id: 1,
          dateKey: 'home.keyDates.items.date1.date',
          titleKey: 'home.keyDates.items.date1.title',
          descriptionKey: 'home.keyDates.items.date1.text'
        },
        {
          id: 2,
          dateKey: 'home.keyDates.items.date2.date',
          titleKey: 'home.keyDates.items.date2.title',
          descriptionKey: 'home.keyDates.items.date2.text'
        }
      ]
    }
  }
}
</script>

<style scoped>

/* RESET + BASE */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #2c3e50;
  background-color: #ffffff;
}

/* HERO */
.hero {
  background: linear-gradient(135deg, #2c3e50, #42b983);
  color: white;
  padding: 90px 20px;
  text-align: center;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 30px;
}

/* BUTTONS */
.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s;
}

.primary-btn {
  background-color: white;
  color: #2c3e50;
}

.secondary-btn {
  border: 2px solid white;
  color: white;
}

.primary-btn:hover,
.secondary-btn:hover {
  opacity: 0.9;
}

/* SECTIONS */
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
}

.section > p {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.7;
  color: #555;
}

/* GRID */
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

/* CARDS */
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
}

.info-card h4 {
  margin-top: 16px;
  color: #42b983;
}

.info-card p {
  color: #555;
  line-height: 1.6;
}

/* BADGE */
.badge {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border-radius: 20px;
  font-size: 13px;
}

/* FAQ */
.faq-list {
  max-width: 900px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
}

/* TIMELINE */
.timeline {
  max-width: 900px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.timeline-item {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
}

.timeline-date {
  min-width: 140px;
  font-weight: 700;
  color: #42b983;
}

/* LANGUAGE */
.language-box {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.language-tag {
  padding: 8px 16px;
  border: 1px solid #42b983;
  border-radius: 20px;
  color: #42b983;
  font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 36px;
  }

  .hero p {
    font-size: 18px;
  }

  .timeline-item {
    flex-direction: column;
  }
}

</style>