<script setup>
import { inject, reactive, ref } from "@vue/runtime-core";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();

const state = reactive({
  email: null,
});

const submitted = ref(false);
const showMessage = ref(false);

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, state.email, { $stopPropagation: true });

const handleSubmit = (isFormValid) => {
  console.log(isFormValid);
  submitted.value = true;

  if (!isFormValid) return;
  forgotPassword();
};

const displayModal = ref(false);

const openModal = () => {
  displayModal.value = true;
};

const closeModal = () => {
  displayModal.value = false;
};

const forgotPassword = async () => {
  showMessage.value = !showMessage.value;

  await appAxios
    .post("users/reset-password", state.email)
    .then(() => {
      toast.add({ severity: "success", summary: "New password sent", detail: "Check your email", life: 10000 });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "New password send", detail: "Failed", life: 3000 });
    });
};
</script>

<template>
  <Button type="submit" class="p-button-success p-mr-3 sign-in" label="Sign In" icon="pi pi-sign-in" />
  <p class="p-ml-2" @click="openModal">Forgot password?</p>
  <Dialog header="Forgot Password?" v-model:visible="displayModal" :style="{ width: '25vw' }" :modal="true">
    <div class="p-field p-col-12 p-md-4 wrapper">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }">Email</label>
            <InputText id="email" v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" aria-describedby="email-error" />
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
        <div class="p-mt-6 modal-footer">
          <Button class="p-button-text" label="Cancel" icon="pi pi-times" @click="closeModal" />
          <Button type="submit" class="p-button-success" label="Ok" icon="pi pi-check" />
        </div>
      </form>
    </div>
  </Dialog>
</template>
