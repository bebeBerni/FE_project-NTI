<template>
  <footer class="footer">
    <div class="footer-container">
      <p>&copy; 2026 MyProject. All rights reserved.</p>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: "AppFooter"
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}

.footer-container p {
  margin: 0;
  font-size: 14px;
}
</style>
