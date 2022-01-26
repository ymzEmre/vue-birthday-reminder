<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const logOut = () => {
  router.push({ name: "Login" });
  localStorage.removeItem("access_token");
  store.commit("logOut");
};

const currentUserName = store.getters._getCurrentUser.name;

const accountRoute = () => {
  router.push({ name: "Account" });
};
</script>

<template>
  <Sidebar visible="true" :baseZIndex="1000" position="top" :modal="false" :showCloseIcon="false">
    <div class="p-sidebar-top-content">
      <h3>{{ currentUserName }}</h3>
      <p @click="accountRoute">Account</p>
      <Button label="Logout" icon="pi pi-sign-out" @click="logOut" />
    </div>
  </Sidebar>
</template>

<style lang="scss">
.p-sidebar-top {
  height: 5rem !important;
}

.p-sidebar-top-content {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: -21px;
}

.sidebar-top-header {
  // display: grid;
  // grid-template-columns: 1fr 0fr;
}

.sidebar-top-header-right {
  // display: flex;
  // align-items: center;
  // justify-content: end;
}
</style>
