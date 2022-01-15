<template>
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
</template>

<style lang="scss">
.p-sidebar-left {
  width: 15rem !important;
  z-index: 0 !important;
}

.sidebar-content {
  margin-top: 80px;
}
</style>
