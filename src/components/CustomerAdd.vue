<script setup>
import { inject, reactive, ref } from "@vue/runtime-core";
import { defineEmits } from "vue";

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();

const emit = defineEmits(["customer-add"]);

const selectedGroup = ref();

const state = reactive({
  customer: {
    name: null,
    group: null,
    birthday: null,
  },
  groups: [{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }],
});

const onSave = () => {
  appAxios
    .post("/customers", { ...state.customer, group: selectedGroup.value.name })
    .then(() => {
      emit("customer-add");
      toast.add({ severity: "success", summary: "New add", detail: "successful", life: 3000 });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "New add", detail: "failed", life: 3000 });
    });
};
</script>

<template>
  <Toast />
  <div class="p-grid add-new-section">
    <Accordion class="p-shadow-4 add-new-accordion">
      <AccordionTab header="Add New">
        <span class="p-float-label p-mt-3">
          <InputText id="username" class="customer-name" type="text" v-model="state.customer.name" />
          <label for="username">Username</label>
        </span>

        <div class="p-field p-col-12 customer-birthday">
          <label for="date">Date</label>
          <InputMask mask="9999/99/99" v-model="state.customer.birthday" placeholder="____/__/__" slotChar="yyyy/mm/dd" />
        </div>

        <label for="date">Group</label>
        <Listbox class="p-mt-2" v-model="selectedGroup" @input="state.customer.group" :options="state.groups" optionLabel="name" />
        <div class="save-button">
          <Button class="p-button-success form-button-save" icon="pi pi-check" label="Save" @click="onSave"></Button>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style lang="scss">
.add-new-section {
  margin-left: 1.5rem;
  margin-bottom: 2rem;
}

.add-new-accordion {
  width: 18rem;
}

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

.p-accordion-header-link {
  background: $background-transparent;
  box-shadow: $box-shadow;
  border: none !important;
  color: $color-white;
}

.p-accordion .p-accordion-tab:last-child .p-accordion-content {
  background: transparent;
  box-shadow: $box-shadow-inset;
  backdrop-filter: $background-blur;
  border: none;
}
</style>
