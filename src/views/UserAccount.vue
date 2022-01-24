<script setup>
import { reactive, ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore();

const appAxios = inject("appAxios");

const selectedCity = ref();
const cities = ref([
  { name: "Hour", code: "Hour" },
  { name: "Day", code: "Day" },
  { name: "Month", code: "Month" },
]);

const listboxChange = () => {
  if (selectedCity.value == "Hour") return (max.value = "24");
  if (selectedCity.value == "Day") return (max.value = "30");
  if (selectedCity.value == "Month") return (max.value = "12");
};

const value4 = ref(0);
const max = ref(0);

const updateUserState = reactive({
  name: store.getters._getCurrentUser.name,
  email: store.getters._getCurrentUser.email,
  password: null,
});

// watch(
//   () => JSON.parse(JSON.stringify(updateUserState)),
//   (newPersonal, oldPersonal) => {
//     console.log("newPersonal", newPersonal);
//     console.log("oldPersonal", oldPersonal);
//   }
// );
const updateUser = async () => {
  const { name, email } = updateUserState;
  await appAxios
    .patch("/users", { name, email })
    .then(() => {
      store.commit("setUser", { name, email });
    })
    .catch(() => {});

  if (updateUserState.password) {
    const { password } = updateUserState;
    await appAxios
      .post("/users/change-password", { password })
      .then(() => {})
      .catch(() => {});
  }
};
</script>

<template>
  <h3>account</h3>
  <div class="p-field p-col-12 p-md-4 wrapper">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup" type="text" v-model="updateUserState.name" />
        <label for="inputgroup">name</label>
      </span>
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText id="inputgroup2" type="text" v-model="updateUserState.email" />
        <label for="inputgroup">E-Mail</label>
      </span>
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock"></i>
      </span>
      <span class="p-float-label">
        <Password toggleMask v-model="updateUserState.password"></Password>
        <label for="inputgroup">New password</label>
      </span>
    </div>
    <Button label="Save" icon="pi pi-check" autofocus @click="updateUser" />
    <div class="field col-12 md:col-3">
      <label for="minmax-buttons">Min-Max Boundaries</label>
      <InputNumber id="minmax-buttons" v-model="value4" mode="decimal" showButtons min="0" :max="max" />
    </div>
    <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" optionValue="code" placeholder="Select a City" @change="listboxChange" />
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
