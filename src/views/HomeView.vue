<template>
  <div class="home-page">
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

    <section class="section">
      <h2>{{ $t('home.about.title') }}</h2>
      <p>{{ $t('home.about.text') }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView"
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