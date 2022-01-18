<script setup>
import { defineProps } from "vue";
import customerUpdate from "@/composables/customerUpdate";
/* eslint-disable no-unused-vars */

const { displayModal, selectedCity, cities, updatedata, openModal, closeModal, updateUser } = customerUpdate();

defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div>
    <Toast />
    <Button icon="pi pi-user-edit" class="p-button-info p-button-outlined" @click="openModal(user._id, user.name, user.birthday, user.group)"></Button>

    <Dialog header="Header" v-model:visible="displayModal" :style="{ width: '50vw' }" :modal="true">
      <span class="p-float-label">
        <InputText id="username2" type="text" v-model="updatedata.name" />
        <label for="username">Username</label>
      </span>

      <div class="p-field p-col-12 p-md-4">
        <InputMask mask="9999/99/99" v-model="updatedata.birthday" placeholder="____/__/__" slotChar="yyyy/mm/dd" />

        <label for="date">Date</label>
      </div>

      <Listbox v-model="selectedCity" @input="updatedata.group" :options="cities" optionLabel="name" style="width: 15rem" />
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
        <Button
          label="Yes"
          icon="pi pi-check"
          @click="
            updateUser();
            $emit('customer-update');
          "
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>
