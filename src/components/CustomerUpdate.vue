<script setup>
import { defineProps } from "@vue/runtime-core";
import customerUpdate from "@/composables/customerUpdate";

defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const { displayModal, selectedCity, cities, updatedata, openModal, closeModal, submitted, v$, handleSubmit } = customerUpdate();
</script>

<template>
  <div>
    <Button
      icon="pi pi-user-edit"
      class="p-button-info p-button-outlined"
      @click="openModal(user._id, user.name, user.birthday, user.group)"
    ></Button>
    <Dialog header="Update" v-model:visible="displayModal" :style="{ width: '20vw' }" :modal="true">
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <span class="p-float-label p-mt-4">
          <InputText id="name" v-model="v$.name.$model" class="customer-name" :class="{ 'p-invalid': v$.name.$invalid && submitted }" />
          <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }">Name</label>
        </span>
        <span v-if="v$.name.$error && submitted">
          <span id="email-error" v-for="(error, index) of v$.name.$errors" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{
          v$.name.required.$message.replace("Value", "Name")
        }}</small>
        <div class="p-field p-col-12 customer-birthday">
          <label for="birthday" :class="{ 'p-error': v$.birthday.$invalid && submitted }">Birthday</label>
          <InputMask id="birthday" mask="9999/99/99" v-model="v$.birthday.$model" placeholder="____/__/__" slotChar="yyyy/mm/dd" />
          <small v-if="(v$.birthday.$invalid && submitted) || v$.birthday.$pending.$response" class="p-error">{{
            v$.birthday.required.$message.replace("Value", "Birthday")
          }}</small>
        </div>
        <label for="group">Group</label>
        <Listbox class="p-mt-2" v-model="selectedCity" @input="updatedata.group" :options="cities" optionLabel="name" />
        <div class="p-mt-5 modal-footer">
          <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text button-cancel" />
          <Button type="submit" class="p-button-success" label="Update" icon="pi pi-check" />
        </div>
      </form>
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

.button-cancel {
  margin-top: 15px;
}
.modal-footer {
  display: flex;
  justify-content: end;
  margin-bottom: -1em;
}
</style>
