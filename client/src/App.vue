<script setup></script>

<template>
  <!-- <router-link class="sidebar-link" to="/">Home</router-link>
      <router-link class="sidebar-link" to="/about">Add Expense</router-link> -->
  <Sidebar class=".p-sidebar-left" :visible="true" :showCloseIcon="false" :dismissable="false" :modal="false">
    <div class="sidebar-content">
      <h2>Groups (0)</h2>
      <p>All (0)</p>
      <p>Family (0)</p>
      <p>Friends (0)</p>
      <p>Work (0)</p>
      <p>Other (0)</p>
    </div>
  </Sidebar>
  <router-view />
</template>

<style lang="scss">
.p-sidebar-left {
  width: 15rem !important;
}

.p-sidebar-top {
  height: 5rem !important;
}

.sidebar-content {
  margin-top: 80px;
}
</style>
