
<template>

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

</template>
