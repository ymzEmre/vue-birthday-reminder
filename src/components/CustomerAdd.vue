<script setup>
import { inject, reactive, ref } from "@vue/runtime-core";
import { defineEmits } from "vue";
import { required } from "@vuelidate/validators";

const emit = defineEmits(["customer-add"]);

const appAxios = inject("appAxios");
const useVuelidate = inject("useVuelidate");

const useToast = inject("useToast");
const toast = useToast();

const state = reactive({
  customer: {
    name: null,
    birthday: null,
    group: null,
  },
  groups: [{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }],
});

const submitted = ref(false);
const showMessage = ref(false);

const rules = {
  name: { required },
  birthday: { required },
  group: { required },
};

const v$ = useVuelidate(rules, state.customer);

const handleOnSave = (isFormValid) => {
  console.log("isFormValid", isFormValid);
  submitted.value = true;

  if (!isFormValid) return;

  save();
};

const save = () => {
  showMessage.value = !showMessage.value;

  appAxios
    .post("/customers", { ...state.customer, group: state.customer.group.name })
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
        <form @submit.prevent="handleOnSave(!v$.$invalid)">
          <span class="p-float-label p-mt-3">
            <InputText id="name" v-model="v$.name.$model" class="customer-name" :class="{ 'p-invalid': v$.name.$invalid && submitted }" />
            <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }">Name</label>
          </span>
          <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{
            v$.name.required.$message.replace("Value", "Name")
          }}</small>
          <div class="p-field p-col-12 customer-birthday">
            <label for="date">Birthday</label>
            <InputMask
              id="birthday"
              mask="9999/99/99"
              v-model="v$.birthday.$model"
              :class="{ 'p-invalid': v$.name.$invalid && submitted }"
              placeholder="____/__/__"
              slotChar="yyyy/mm/dd"
            />
            <small v-if="(v$.birthday.$invalid && submitted) || v$.birthday.$pending.$response" class="p-error">{{
              v$.birthday.required.$message.replace("Value", "Birthday")
            }}</small>
          </div>
          <label for="date">Group</label>
          <Listbox
            id="group"
            :class="{ 'p-invalid p-mt-2': v$.name.$invalid && submitted }"
            v-model="v$.group.$model"
            @input="state.customer.group"
            :options="state.groups"
            optionLabel="name"
          />
          <small v-if="(v$.group.$invalid && submitted) || v$.group.$pending.$response" class="p-error">{{
            v$.group.required.$message.replace("Value", "Group")
          }}</small>
          <div class="save-button">
            <Button type="sumbit" class="p-button-success form-button-save" icon="pi pi-check" label="Save"></Button>
          </div>
        </form>
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
