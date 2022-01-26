<script setup>
import { reactive, ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import UserRegister from "@/components/UserRegister";

const store = useStore();
const router = useRouter();

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();

const user = reactive({
  email: null,
  password: null,
});

const login = async () => {
  await appAxios
    .post("/users/login", user)
    .then((res) => {
      store.commit("setUser", res.data);
      toast.add({ severity: "success", summary: `${res.data.name} Welcome`, detail: "Logined", life: 3000 });

      localStorage.setItem("access_token", res.data.tokens.access_token);
      setTimeout(() => {
        router.push({ name: "Home" });
      }, 1000);
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Login Failed", detail: "Record deleted", life: 3000 });
    });
};

const displayModal = ref(false);

const openModal = () => () => (displayModal.value = true);

const closeModal = () => () => (displayModal.value = false);

const userEmail = ref({
  email: null,
});

const forgettenPassword = async () => {
  await appAxios
    .post("users/reset-password", userEmail.value)
    .then(() => {
      toast.add({ severity: "success", summary: "Password Sent", detail: "Check your email", life: 3000 });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Password Sent Failed", detail: "Record deleted", life: 3000 });
    });
};
</script>

<template>
  <Toast />

  <div class="p-d-flex wrapper" style="height: 100vh">
    <div class="p-mr-2 p-as-center">
      <div class="p-grid wrapper">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <InputText id="inputgroup" type="text" v-model="user.email" />
            <label for="inputgroup">E-Mail</label>
          </span>
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <span class="p-float-label">
            <Password v-model="user.password" toggleMask :feedback="false"></Password>
            <label for="inputgroup">Password</label>
          </span>
        </div>
        <Button label="Login" icon="pi pi-sign-in" @click="login" />
        <UserRegister />
        <p @click="openModal">Forgetten Password</p>
      </div>
    </div>
  </div>

  <Dialog header="Header" v-model:visible="displayModal" :style="{ width: '50vw' }" :modal="true">
    <div class="p-field p-col-12 p-md-4 wrapper">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <span class="p-float-label">
          <InputText id="inputgroup" type="text" v-model="userEmail.email" />
          <label for="inputgroup">E-Mail</label>
        </span>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" autofocus @click="forgettenPassword" />
    </template>
  </Dialog>
</template>

<style lang="scss">
.wrapper {
  margin-top: 30px;
}

::v-deep(.p-password input) {
  width: 15rem;
}
</style>
