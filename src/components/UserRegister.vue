<script setup>
import { computed, inject, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { email, required, minLength } from "@vuelidate/validators";

const store = useStore();
const router = useRouter();

const useVuelidate = inject("useVuelidate");

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();

const user = reactive({
  name: null,
  email: null,
  password: null,
});

const submitted = ref(false);
const showMessage = ref(false);

const rules = computed(() => ({
  name: { required, minLengthValue: minLength(3) },
  email: { required, email },
  password: {
    required,
    minLengthValue: minLength(8),
  },
}));

const v$ = useVuelidate(rules, user, { $stopPropagation: true });

const handleSubmit = (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) return;

  registerUser();
};

const registerUser = async () => {
  showMessage.value = !showMessage.value;

  await appAxios
    .post("users", user)
    .then(() => {
      login();
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Sign Up", detail: "failed", life: 3000 });
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
      toast.add({ severity: "success", summary: `${res.data.name} Welcome`, detail: "Login successful", life: 1000 });
      localStorage.setItem("access_token", res.data.tokens.access_token);
      setTimeout(() => {
        router.push({ name: "Home" });
      }, 1000);
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Login", detail: "failed", life: 3000 });
    });
};

const displayModal = ref(false);

const openModal = () => {
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};
</script>

<template>
  <Toast />
  <Button class="p-button-secondary" label="Sign Up" icon="pi pi-user-plus" @click="openModal" />
  <Dialog header="Sign Up" v-model:visible="displayModal" :style="{ width: '25vw' }" :modal="true">
    <div class="p-field p-col-12 p-md-4 wrapper">
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <InputText id="name" v-model="v$.name.$model" class="customer-name" :class="{ 'p-invalid': v$.name.$invalid && submitted }" />
            <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }">Name</label>
          </span>
        </div>
        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{
          v$.name.required.$message.replace("Value", "Name")
        }}</small>
        <div class="p-inputgroup p-mt-4">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <InputText id="email" v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" aria-describedby="email-error" />
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
        <div class="p-inputgroup p-mt-4">
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
        <div class="p-mt-6 modal-footer">
          <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
          <Button type="submit" class="p-button-success" label="Ok" icon="pi pi-check" />
        </div>
      </form>
    </div>
  </Dialog>
</template>

<style lang="scss">
.modal-footer {
  display: flex;
  justify-content: end;
  margin-bottom: -1em;
}
</style>
