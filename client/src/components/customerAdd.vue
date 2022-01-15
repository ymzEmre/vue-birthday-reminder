<script setup>
import { reactive } from "@vue/reactivity";
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const appAxios = inject("appAxios");

const data = ref({
  name: null,
  group: null,
  birthday: null,
});

const selectedCity = ref();
const cities = reactive([{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }]);

const onSave = () => {
  const selectedGroup = selectedCity.value.name;
  appAxios
    .post("/customers", { ...data.value, group: selectedGroup })
    .then(() => {
      toast.add({ severity: "success", summary: "save added", detail: "Logined", life: 3000 });
    })
    .catch((error) => {
      toast.add({ severity: "error", summary: "Save failed", detail: "Logined", life: 3000 });
      console.log(error);
    });
};
</script>

<template>
  <Toast />

  <div class="p-grid add-new">
    <Accordion class="p-shadow-4 content">
      <AccordionTab header="Add New">
        <span class="p-float-label p-mt-2">
          <InputText id="username" class="form-customer-username" type="text" v-model="data.name" />
          <label for="username">Username</label>
        </span>
        <div class="p-field p-col-12 form-customer-birthday">
          <label for="date">Date</label>
          <InputMask mask="99/99/9999" v-model="data.birthday" placeholder="__/__/____" slotChar="mm/dd/yyyy" />
        </div>
        <label for="date">Group</label>
        <Listbox class="p-mt-2" v-model="selectedCity" @input="data.group" :options="cities" optionLabel="name" />
        <Button class="p-button-success form-button-save" icon="pi pi-check" label="Save" @click="onSave"></Button>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style lang="scss">
.add-new {
  margin-left: 1.5rem;
  margin-bottom: 2rem;
}

.content {
  width: 23rem;
}

.form-customer-username {
  width: 100%;
}

.form-customer-birthday {
  padding: 0;
  margin-top: 1rem;
}

.p-inputmask {
  width: 100%;
}

.form-button-save {
  margin-top: 1rem;
}

.p-accordion-header-link {
  background: #ebebeb !important;
}
</style>
