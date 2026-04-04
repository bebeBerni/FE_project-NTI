<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('home.hero.title') }}</h1>
        <p>{{ $t('home.hero.description') }}</p>

        <div class="hero-buttons">
          <router-link to="/projects" class="primary-btn">
            {{ $t('home.hero.projectsButton') }}
          </router-link>
          <router-link to="/teams" class="secondary-btn">
            {{ $t('home.hero.teamsButton') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="section">
      <h2>{{ $t('home.about.title') }}</h2>
      <p>{{ $t('home.about.text') }}</p>
    </section>

    <!-- MISSION -->
    <section class="section alt-section">
      <h2>{{ $t('home.mission.title') }}</h2>
      <p>{{ $t('home.mission.text') }}</p>
    </section>

    <!-- PILLARS -->
    <section class="section">
      <h2>{{ $t('home.pillars.title') }}</h2>
      <div class="card-grid three-columns">
        <div class="info-card">
          <h3>{{ $t('home.pillars.items.education.title') }}</h3>
          <p>{{ $t('home.pillars.items.education.text') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('home.pillars.items.innovation.title') }}</h3>
          <p>{{ $t('home.pillars.items.innovation.text') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('home.pillars.items.collaboration.title') }}</h3>
          <p>{{ $t('home.pillars.items.collaboration.text') }}</p>
        </div>
      </div>
    </section>

    <!-- ECOSYSTEM -->
    <section class="section alt-section">
      <h2>{{ $t('home.ecosystem.title') }}</h2>
      <div class="card-grid four-columns">
        <div class="info-card">
          <h3>{{ $t('home.ecosystem.items.students.title') }}</h3>
          <p>{{ $t('home.ecosystem.items.students.text') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('home.ecosystem.items.companies.title') }}</h3>
          <p>{{ $t('home.ecosystem.items.companies.text') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('home.ecosystem.items.mentors.title') }}</h3>
          <p>{{ $t('home.ecosystem.items.mentors.text') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('home.ecosystem.items.administration.title') }}</h3>
          <p>{{ $t('home.ecosystem.items.administration.text') }}</p>
        </div>
      </div>
    </section>

    <!-- PARTNERS -->
    <section class="section">
      <h2>{{ $t('home.partners.title') }}</h2>
      <div class="card-grid four-columns">
        <div class="info-card" v-for="partner in partners" :key="partner.id">
          <h3>{{ $t(partner.nameKey) }}</h3>
          <p>{{ $t(partner.descriptionKey) }}</p>
        </div>
      </div>
    </section>

    <!-- MENTORS -->
    <section class="section alt-section">
      <h2>{{ $t('home.mentors.title') }}</h2>
      <div class="card-grid three-columns">
        <div class="info-card" v-for="mentor in mentors" :key="mentor.id">
          <h3>{{ mentor.name }}</h3>
          <p>{{ $t(mentor.specializationKey) }}</p>
        </div>
      </div>
    </section>

    <!-- REFERENCES -->
    <section class="section">
      <h2>{{ $t('home.references.title') }}</h2>
      <div class="card-grid three-columns">
        <div class="info-card" v-for="reference in references" :key="reference.id">
          <p>"{{ $t(reference.textKey) }}"</p>
          <h4>- {{ $t(reference.authorKey) }}</h4>
        </div>
      </div>
    </section>

    <!-- SUCCESSFUL PROJECTS -->
    <section class="section alt-section">
      <h2>{{ $t('home.successfulProjects.title') }}</h2>
      <div class="card-grid three-columns">
        <div class="info-card" v-for="project in successfulProjects" :key="project.id">
          <h3>{{ $t(project.titleKey) }}</h3>
          <p>{{ $t(project.descriptionKey) }}</p>
          <span class="badge">{{ $t(project.statusKey) }}</span>
        </div>
      </div>
    </section>

    <!-- NEWS -->
    <section class="section">
      <h2>{{ $t('home.news.title') }}</h2>
      <div class="card-grid three-columns">
        <div class="info-card" v-for="newsItem in news" :key="newsItem.id">
          <h3>{{ $t(newsItem.titleKey) }}</h3>
          <p>{{ $t(newsItem.summaryKey) }}</p>
          <small>{{ $t(newsItem.dateKey) }}</small>
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

    <!-- LANGUAGE SUPPORT -->
    <section class="section alt-section">
      <h2>{{ $t('home.language.title') }}</h2>
      <p>{{ $t('home.language.text') }}</p>
      <div class="language-box">
        <span class="language-tag">SK</span>
        <span class="language-tag">EN</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      partners: [
        {
          id: 1,
          nameKey: 'home.partners.items.partner1.name',
          descriptionKey: 'home.partners.items.partner1.text'
        },
        {
          id: 2,
          nameKey: 'home.partners.items.partner2.name',
          descriptionKey: 'home.partners.items.partner2.text'
        },
        {
          id: 3,
          nameKey: 'home.partners.items.partner3.name',
          descriptionKey: 'home.partners.items.partner3.text'
        },
        {
          id: 4,
          nameKey: 'home.partners.items.partner4.name',
          descriptionKey: 'home.partners.items.partner4.text'
        }
      ],
      mentors: [
        {
          id: 1,
          name: 'Dr. Anna Smith',
          specializationKey: 'home.mentors.items.mentor1'
        },
        {
          id: 2,
          name: 'John Miller',
          specializationKey: 'home.mentors.items.mentor2'
        },
        {
          id: 3,
          name: 'Emma Brown',
          specializationKey: 'home.mentors.items.mentor3'
        }
      ],
      references: [
        {
          id: 1,
          textKey: 'home.references.items.reference1.text',
          authorKey: 'home.references.items.reference1.author'
        },
        {
          id: 2,
          textKey: 'home.references.items.reference2.text',
          authorKey: 'home.references.items.reference2.author'
        },
        {
          id: 3,
          textKey: 'home.references.items.reference3.text',
          authorKey: 'home.references.items.reference3.author'
        }
      ],
      successfulProjects: [
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
      news: [
        {
          id: 1,
          titleKey: 'home.news.items.news1.title',
          summaryKey: 'home.news.items.news1.text',
          dateKey: 'home.news.items.news1.date'
        },
        {
          id: 2,
          titleKey: 'home.news.items.news2.title',
          summaryKey: 'home.news.items.news2.text',
          dateKey: 'home.news.items.news2.date'
        },
        {
          id: 3,
          titleKey: 'home.news.items.news3.title',
          summaryKey: 'home.news.items.news3.text',
          dateKey: 'home.news.items.news3.date'
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
        },
        {
          id: 3,
          dateKey: 'home.keyDates.items.date3.date',
          titleKey: 'home.keyDates.items.date3.title',
          descriptionKey: 'home.keyDates.items.date3.text'
        },
        {
          id: 4,
          dateKey: 'home.keyDates.items.date4.date',
          titleKey: 'home.keyDates.items.date4.title',
          descriptionKey: 'home.keyDates.items.date4.text'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
  color: #2c3e50;
}

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
}

.primary-btn {
  background-color: white;
  color: #2c3e50;
}

.secondary-btn {
  border: 2px solid white;
  color: white;
}

.secondary-btn:hover,
.primary-btn:hover {
  opacity: 0.9;
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
}

.section > p {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.7;
  color: #555;
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
}

.info-card h3 {
  margin-bottom: 12px;
  color: #2c3e50;
}

.info-card h4 {
  margin-top: 16px;
  color: #42b983;
}

.info-card p {
  color: #555;
  line-height: 1.6;
}

.badge {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border-radius: 20px;
  font-size: 13px;
}

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

.faq-item h3 {
  margin-bottom: 10px;
}

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

.timeline-content h3 {
  margin-bottom: 8px;
}

.timeline-content p {
  color: #555;
}

.language-box {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.language-tag {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #42b983;
  border-radius: 20px;
  color: #42b983;
  font-weight: 600;
}

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

  .timeline-date {
    min-width: auto;
  }
}
</style>