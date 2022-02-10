<script setup>
import { inject, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { email, required } from "@vuelidate/validators";

const store = useStore();

const appAxios = inject("appAxios");
const useVuelidate = inject("useVuelidate");

const useToast = inject("useToast");
const toast = useToast();

const user = reactive({
  name: store.getters._getCurrentUser.name,
  email: store.getters._getCurrentUser.email,
  password: null,
});

const submitted = ref(false);
const showMessage = ref(false);

const rules = {
  name: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, user);

const handleSubmit = (isFormValid) => {
  console.log("isFormValid", isFormValid);
  submitted.value = true;

  if (!isFormValid) return;

  update();
};

const update = async () => {
  showMessage.value = !showMessage.value;
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
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="p-inputgroup p-mt-6">
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
      <div class="p-inputgroup p-mt-6">
        <span class="p-inputgroup-addon">
          <i class="pi pi-envelope"></i>
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
        <Button type="submit" class="p-button-success p-mt-5 p-mb-3" label="Save" icon="pi pi-check" />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.title {
  color: $color-white;
}
</style>
