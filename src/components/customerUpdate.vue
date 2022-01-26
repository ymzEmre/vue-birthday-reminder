<script setup>
import { defineProps } from "vue";
import customerUpdate from "@/composables/customerUpdate";

defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const { displayModal, selectedCity, cities, updatedata, openModal, closeModal, updateUser } = customerUpdate();
</script>

<template>
  <div>
    <Button icon="pi pi-user-edit" class="p-button-info p-button-outlined" @click="openModal(user._id, user.name, user.birthday, user.group)"></Button>

    <Dialog header="Update" v-model:visible="displayModal" :style="{ width: '20vw' }" :modal="true">
      <span class="p-float-label p-mt-2">
        <InputText id="username2" class="customer-name" type="text" v-model="updatedata.name" />
        <label for="username">Username</label>
      </span>

      <div class="p-field p-col-12 customer-birthday">
        <label for="date">Date</label>
        <InputMask mask="9999/99/99" v-model="updatedata.birthday" placeholder="____/__/__" slotChar="yyyy/mm/dd" />
      </div>

      <label for="date">Group</label>
      <Listbox class="p-mt-2" v-model="selectedCity" @input="updatedata.group" :options="cities" optionLabel="name" style="width: 21rem" />
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
        <Button
          class="p-button-success"
          label="Ok"
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

<style lang="scss">
.customer-name {
  width: 100%;
}

.customer-birthday {
  padding: 0;
  margin-top: 1rem;
}

.p-button-success {
  margin-top: 1rem;
}

.p-inputmask {
  width: 100%;
}
</style>
