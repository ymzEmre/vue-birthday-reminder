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
.link {
  margin-top: $margin-top;
}

.user-account {
  display: flex;
  justify-content: space-evenly;
  margin-left: unset !important;
}
</style>
