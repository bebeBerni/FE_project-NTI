<template>
  <div>
    <h1>Student Dashboard</h1>
    <p>Welcome, {{ user.name }}</p>
  </div>
</template>

<script>
export default {
  name: "StudentDashboard",

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>