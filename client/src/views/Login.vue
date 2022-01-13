<script setup>
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import UserRegister from "@/components/userRegister";

const appAxios = inject("appAxios");
const store = useStore();
const router = useRouter();
const toast = useToast();

const user = ref({
  email: null,
  password: null,
});

const login = async () => {
  await appAxios
    .post("/users/login", user.value)
    .then((res) => {
      store.commit("setUser", res.data.name);
      toast.add({ severity: "success", summary: `${res.data.name} Welcome`, detail: "Logined", life: 3000 });

      localStorage.setItem("access_token", res.data.tokens.access_token);
      router.push({ name: "Home" });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Login Failed", detail: "Record deleted", life: 3000 });
    });
};

const registeredUserEmail = (val) => {
  user.value.email = val;
};
</script>

<template>
  <Toast />

  <div class="p-field p-col-12 p-md-4 wrapper">
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
  </div>

  <Button label="Submit" icon="pi pi-sign-in" @click="login" />

  <UserRegister @user-email="registeredUserEmail" />

  <p>ymzemreyilmaz@gmail.com</p>
  <p>12345678</p>
  <p>44504450</p>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 30px;
}

::v-deep(.p-password input) {
  width: 15rem;
}
</style>
