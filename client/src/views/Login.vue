<script setup>
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { useToast } from 'primevue/usetoast';

const toast = useToast();

const appAxios = inject('appAxios');
const router = useRouter();
const store = useStore();

const user = ref({
  email: null,
  password: null,
});

const registerUserState = ref({
  name: null,
  email: null,
  password: null,
});

const registerUser = () => {
  appAxios.post('users', registerUserState.value).then(() => {
    // router.push('/login');
  });
};

const displayModal = ref(false);

const openModal = () => {
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};

const login = () => {
  appAxios
    .post('/users/login', user.value)
    .then((res) => {
      store.commit('setUser', res.data.name);
      localStorage.setItem('access_token', res.data.tokens.access_token);
      router.push({ name: 'Home' });
    })
    .catch((error) => {
      toast.add({ severity: 'error', summary: 'Login Failed', detail: 'Record deleted', life: 3000 });
      console.log(error);
    });
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

  <Button label="Show" icon="pi pi-external-link" @click="openModal" />
  <Dialog header="Header" v-model:visible="displayModal" :style="{ width: '50vw' }" :modal="true">
    <div class="p-field p-col-12 p-md-4 wrapper">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <span class="p-float-label">
          <InputText id="inputgroup" type="text" v-model="registerUserState.name" />
          <label for="inputgroup">name</label>
        </span>
      </div>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <span class="p-float-label">
          <InputText id="inputgroup" type="text" v-model="registerUserState.email" />
          <label for="inputgroup">E-Mail</label>
        </span>
      </div>

      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-lock"></i>
        </span>
        <span class="p-float-label">
          <Password v-model="registerUserState.password" toggleMask :feedback="false"></Password>
          <label for="inputgroup">Password</label>
        </span>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="registerUser" autofocus />
    </template>
  </Dialog>

  <p>ymzemreyilmaz@gmail.com</p>
  <p>12345678</p>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 30px;
}

::v-deep(.p-password input) {
  width: 15rem;
}
</style>
