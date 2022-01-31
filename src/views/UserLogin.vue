<script setup>
import { inject, reactive, ref } from "@vue/runtime-core";
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

const openModal = () => {
  displayModal.value = true;
};

const closeModal = () => {
  displayModal.value = false;
};

const userEmail = ref({
  email: null,
});

const forgottenPassword = async () => {
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

  <div class="p-d-flex wrapper">
    <div class="p-mr-2 p-as-center form-wrapper">
      <div class="p-grid form-section">
        <div class="p-inputgroup p-mt-3">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <InputText id="inputgroup" type="text" v-model="user.email" />
            <label for="inputgroup">E-Mail</label>
          </span>
        </div>

        <div class="p-inputgroup p-mt-5">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <span class="p-float-label">
            <Password v-model="user.password" toggleMask :feedback="false"></Password>
            <label for="inputgroup">Password</label>
          </span>
        </div>
        <div class="p-mt-5 form-footer">
          <Button class="p-button-success p-mr-3 sign-in" label="Sign In" icon="pi pi-sign-in" @click="login" />
          <div>
            <UserRegister />
            <p @click="openModal">Forgot password?</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog header="Forgot Password?" v-model:visible="displayModal" :style="{ width: '25vw' }" :modal="true">
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
      <Button class="p-button-text" label="Cancel" icon="pi pi-times" @click="closeModal" />
      <Button class="p-button-success" label="Ok" icon="pi pi-check" autofocus @click="forgottenPassword" />
    </template>
  </Dialog>
</template>

<style lang="scss">
body {
  background: url("../assets/images/login-bg.jpg") center no-repeat;
  background-size: cover;
}
.form-section {
  padding: 2em;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 8px 1px #fff;
}
.wrapper {
  height: 100vh;
}

.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.sign-in {
  max-height: 40px;
}

::v-deep(.p-password input) {
  width: 15rem;
}
</style>
