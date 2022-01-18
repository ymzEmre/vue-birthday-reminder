<script setup>
import { ref } from "@vue/reactivity";

const selectedCity1 = ref();
const cities = ref([
  { name: "Hour", code: "NY" },
  { name: "Day", code: "RM" },
  { name: "Month", code: "LDN" },
]);

const value4 = ref(5);
</script>

<template>
  <h3>account</h3>
  <div class="p-field p-col-12 p-md-4 wrapper">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup" type="text" />
        <label for="inputgroup">name</label>
      </span>
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup" type="text" />
        <label for="inputgroup">E-Mail</label>
      </span>
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock"></i>
      </span>
      <span class="p-float-label">
        <Password toggleMask></Password>
        <label for="inputgroup">Password</label>
      </span>
    </div>
    <Button label="Save" icon="pi pi-check" autofocus />
    <div class="field col-12 md:col-3">
      <label for="minmax-buttons">Min-Max Boundaries</label>
      <InputNumber id="minmax-buttons" v-model="value4" mode="decimal" showButtons :min="0" :max="100" />
    </div>
    <Dropdown v-model="selectedCity1" :options="cities" optionLabel="name" optionValue="code" placeholder="Select a City" />
  </div>
</template>

<style lang="scss" scoped>
.p-dropdown {
  width: 14rem;
}

.country-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
</style>
