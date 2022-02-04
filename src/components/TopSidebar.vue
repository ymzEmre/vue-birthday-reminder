<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const currentUserName = store.getters._getCurrentUser.name;

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
    <div>
      <!-- <img src="../assets/icons/birthday.png" alt="" /> -->
      <span @click="goHome">BirthDay</span>
    </div>
    <div class="p-sidebar-top-content">
      <h3>{{ currentUserName }}</h3>
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

.p-sidebar-top-content {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: -21px;
}

.p-sidebar-content {
  overflow: hidden;
}
</style>
