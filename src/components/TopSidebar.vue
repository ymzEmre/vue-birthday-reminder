<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const username = store.getters._getCurrentUser.name;

const logOut = () => {
  router.push({ name: "Login" });
  localStorage.removeItem("access_token");
  store.commit("logOut");
};

const accountRoute = () => {
  router.push({ name: "Account" });
};

const goHome = () => {
  router.push({ name: "Home" });
};
</script>

<template>
  <Sidebar :visible="true" :baseZIndex="1000" position="top" :modal="false" :showCloseIcon="false">
    <div class="p-sidebar-top-content">
      <img @click="goHome" src="../assets/icons/logo.png" alt="" />
      <span @click="goHome">BIRTHDAY</span>
      <h3 class="sidebar-username">{{ username }}</h3>
      <p class="p-ml-4" @click="accountRoute">Account</p>
      <Button class="button-default p-ml-4" label="Logout" icon="pi pi-sign-out" @click="logOut" />
    </div>
  </Sidebar>
</template>

<style lang="scss">
.p-sidebar-top {
  height: 5rem !important;
  background: transparent;
  color: #fff;
  box-shadow: $box-shadow;
  backdrop-filter: blur(10px);
}

img {
  width: 80%;
}

.sidebar-username {
  white-space: nowrap;
}

.p-sidebar-top-content {
  display: grid;
  align-items: center;
  grid-template-columns: 0.1fr 2fr 0fr 0fr 0.3fr;
}

.p-sidebar-top .p-sidebar-header {
  padding: 0;
  margin-top: 1em;
}

.p-sidebar-content {
  overflow: hidden;
}
</style>
