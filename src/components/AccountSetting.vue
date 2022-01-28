<script setup>
import { inject, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";

const useToast = inject("useToast");
const toast = useToast();

const store = useStore();
const appAxios = inject("appAxios");

const updateUserState = reactive({
  name: store.getters._getCurrentUser.name,
  email: store.getters._getCurrentUser.email,
  password: null,
});

const updateUser = async () => {
  const { name, email } = updateUserState;
  await appAxios
    .patch("/users", { name, email })
    .then(() => {
      store.commit("setUser", {
        ...store.getters._getCurrentUser,
        name,
        email,
      });
      toast.add({ severity: "success", summary: "User update successful", life: 3000 });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "User update failed", life: 3000 });
    });

  if (updateUserState.password) {
    const { password } = updateUserState;
    await appAxios
      .post("/users/change-password", { password })
      .then(() => {
        toast.add({ severity: "success", summary: "Password change successful", life: 3000 });
      })
      .catch(() => {
        toast.add({ severity: "error", summary: "Password change failed", life: 3000 });
      });
  }
};
</script>

<template>
  <h4>Account Settings</h4>
  <div class="p-field p-col-12 p-md-4 wrapper">
    <div class="p-inputgroup p-mt-3">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup" type="text" v-model="updateUserState.name" />
        <label for="inputgroup">name</label>
      </span>
    </div>
    <div class="p-inputgroup p-mt-6">
      <span class="p-inputgroup-addon">
        <i class="pi pi-envelope"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup2" type="text" v-model="updateUserState.email" />
        <label for="inputgroup">E-Mail</label>
      </span>
    </div>
    <div class="p-inputgroup p-mt-6">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock"></i>
      </span>
      <span class="p-float-label">
        <Password toggleMask v-model="updateUserState.password"></Password>
        <label for="inputgroup">New password</label>
      </span>
    </div>
    <Button class="p-mt-3" label="Save" icon="pi pi-check" autofocus @click="updateUser" />
  </div>
</template>

<style lang="scss">
.p-dropdown {
  width: 14rem;
}

.country-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
</style>
