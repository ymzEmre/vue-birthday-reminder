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
  background: url("../assets/images/login-bg.jpg") center no-repeat;
  background-size: cover;
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
  border-radius: 20px;
  backdrop-filter: blur(15px);
  box-shadow: 0px 0px 6px 1px #fff;
}
</style>
