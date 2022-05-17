<script setup>
import { inject, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import UserRegister from "@/components/UserRegister";
import UserForgotPassword from "@/components/UserForgotPassword";

const store = useStore();
const router = useRouter();

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();

const state = reactive({
  user: {
    email: null,
    password: null,
  },

  userEmail: null,
});

const submitted = ref(false);
const showMessage = ref(false);

const rules = {
  email: { required, email },
  password: {
    required,
    minLengthValue: minLength(8),
  },
};

const v$ = useVuelidate(rules, state.user);

const login = async () => {
  showMessage.value = !showMessage.value;

  await appAxios
    .post("/users/login", state.user)
    .then((res) => {
      store.commit("setUser", res.data);
      toast.add({ severity: "success", summary: `${res.data.name} Welcome`, detail: "Login successful", life: 3000 });

      localStorage.setItem("access_token", res.data.tokens.access_token);
      setTimeout(() => {
        router.push({ name: "Home" });
      }, 1000);
    })
    .catch((e) => {
      if (e.response.status == 404)
        return toast.add({ severity: "error", summary: "Login", detail: "Email address or password is incorrect", life: 3000 });
    });
};
const handleSubmit = (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) return;
  login();
};
</script>

<template>
  <Toast />

  <div class="p-d-flex wrapper">
    <div class="p-mr-2 p-as-center form-wrapper">
      <div class="p-grid form-login">
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="p-inputgroup p-mt-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }">Email</label>
            </span>
          </div>
          <span v-if="v$.email.$error && submitted">
            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{
            v$.email.required.$message.replace("Value", "Email")
          }}</small>
          <div class="p-inputgroup p-mt-5">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <span class="p-float-label">
              <Password
                id="password"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                v-model="v$.password.$model"
                toggleMask
                :feedback="false"
              ></Password>
              <label for="password" :class="{ 'p-error': v$.password.$invalid && submitted }">Password</label>
            </span>
          </div>
          <span v-if="v$.password.$error && submitted">
            <span id="password-error" v-for="(error, index) of v$.password.$errors" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{
            v$.password.required.$message.replace("Value", "Password")
          }}</small>

          <div class="p-mt-5 form-footer">
            <UserForgotPassword />
            <div>
              <UserRegister />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: $background-image;
  background-size: $background-size;
}
.form-login {
  padding: 2em;
  border-radius: $border-radius-lg;
  backdrop-filter: $background-blur;
  box-shadow: $box-shadow;
  color: $color-white;
}

.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 90vh;
}

.form-footer {
  display: grid;
  justify-content: flex-start;
  width: 100%;
  grid-template-columns: 0.4fr 1.4fr 0.4fr;
  align-items: center;
  width: 700px;
}

.sign-in {
  max-height: 40px;
}

::v-deep(.p-password input) {
  width: 15rem;
}
</style>
