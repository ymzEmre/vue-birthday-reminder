<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const logOut = () => {
  store.commit("logoutUser");
  router.push({ name: "Login" });
  localStorage.removeItem("access_token");
};

const currentUser = store.getters._getCurrentUser;
</script>

<template>
  <Sidebar visible="true" :baseZIndex="1000" position="top" :modal="false" :showCloseIcon="false">
    <div class="sidebar-top-header">
      <div>LOGO</div>
      <div>
        <h3>{{ currentUser }}</h3>
        <Button label="Logout" icon="pi pi-sign-out" @click="logOut" />
      </div>
    </div>
  </Sidebar>
</template>

<style lang="scss">
.p-sidebar-top {
  height: 5rem !important;
}

.sidebar-top-header {
  display: grid !important;
  grid-template-columns: 1fr 0fr !important;
}
</style>
