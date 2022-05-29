<script setup>
import AccountSetting from "@/components/AccountSetting.vue";
import ReminderSetting from "@/components/ReminderSetting.vue";
import TopSidebar from "@/components/TopSidebar";
</script>

<template>
  <TopSidebar />
  <Toast />
  <div class="link user-account">
    <AccountSetting />
    <ReminderSetting />
  </div>
</template>

<style lang="scss">
body {
  background: $background-image;
  background-position: $background-position;
}
.link {
  margin-top: $margin-top;
  margin-left: $margin-left;
}

.user-account {
  display: flex;
  justify-content: space-evenly;
  margin-left: unset !important;
}

.form-section {
  padding: 2em 3em;
  border-radius: $border-radius-lg;
  backdrop-filter: blur(15px);
  box-shadow: $box-shadow;
  max-width: 600px;
}

@media screen and (max-width: 1200px) {
  .user-account {
    flex-direction: column;
  }
}
</style>
