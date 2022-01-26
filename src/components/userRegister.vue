<script setup>
import { inject } from "@vue/runtime-core";
import { ref, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();

const user = reactive({
  email: null,
  password: null,
});

const displayModal = ref(false);

const openModal = () => {
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};

const registerUser = async () => {
  await appAxios
    .post("users", user)
    .then(() => {
      login();
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Register Failed", detail: "Registered", life: 3000 });
    });
};

const login = async () => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  await appAxios
    .post("/users/login", payload)
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
</script>

<template>
  <Toast />
  <Button label="Register" icon="pi pi-user-plus" @click="openModal" />
  <Dialog header="Header" v-model:visible="displayModal" :style="{ width: '50vw' }" :modal="true">
    <div class="p-field p-col-12 p-md-4 wrapper">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <span class="p-float-label">
          <InputText id="inputgroup" type="text" v-model="user.name" />
          <label for="inputgroup">name</label>
        </span>
      </div>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <span class="p-float-label">
          <InputText id="inputgroup2" type="text" v-model="user.email" />
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
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="registerUser" autofocus />
    </template>
  </Dialog>
</template>
