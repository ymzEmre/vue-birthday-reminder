<script setup>
import { inject, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();
const appAxios = inject("appAxios");

const useToast = inject("useToast");
const toast = useToast();

const user = reactive({
  name: store.getters._getCurrentUser.name,
  email: store.getters._getCurrentUser.email,
  password: null,
});

const update = async () => {
  if (user.name != store.getters._getCurrentUser.name || user.email != store.getters._getCurrentUser.email) {
    const { name, email } = user;
    await appAxios
      .patch("/users", { name, email })
      .then(() => {
        store.commit("setUser", {
          ...store.getters._getCurrentUser,
          name,
          email,
        });
        toast.add({ severity: "success", summary: "User update", detail: "successful", life: 3000 });
      })
      .catch(() => {
        toast.add({ severity: "error", summary: "User update", detail: "failed", life: 3000 });
      });
  }

  if (user.password != null) {
    const { password } = user;
    await appAxios
      .post("/users/change-password", { password })
      .then(() => {
        user.password = null;
        toast.add({ severity: "success", summary: "Password change", detail: "successful", life: 3000 });
      })
      .catch(() => {
        toast.add({ severity: "error", summary: "Password change", detail: "failed", life: 3000 });
      });
  }
};
</script>

<template>
  <div class="p-field p-col-12 p-md-4 form-section">
    <h4 class="title">Account Settings</h4>
    <div class="p-inputgroup p-mt-6">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup" type="text" v-model="user.name" />
        <label for="inputgroup">name</label>
      </span>
    </div>
    <div class="p-inputgroup p-mt-6">
      <span class="p-inputgroup-addon">
        <i class="pi pi-envelope"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup2" type="text" v-model="user.email" />
        <label for="inputgroup">E-Mail</label>
      </span>
    </div>
    <div class="p-inputgroup p-mt-6">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock"></i>
      </span>
      <span class="p-float-label">
        <Password toggleMask v-model="user.password"></Password>
        <label for="inputgroup">New password</label>
      </span>
    </div>
    <div class="save-button">
      <Button class="p-button-success p-mt-5 p-mb-3" label="Save" icon="pi pi-check" autofocus @click="update" />
    </div>
  </div>
</template>

<style lang="scss">
.title {
  color: $color-white;
}
</style>
