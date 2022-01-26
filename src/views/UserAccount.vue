<script setup>
import { reactive, ref } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import TopSidebar from "@/components/TopSidebar";

const store = useStore();
const appAxios = inject("appAxios");

const checked = ref();

const selectedCity = ref();
const cities = reactive([
  { name: "Hour", code: "Hour" },
  { name: "Day", code: "Day" },
  { name: "Month", code: "Month" },
]);

onMounted(() => {
  selectedCity.value = store.getters._getCurrentUser.reminder_type;
  checked.value = store.getters._getCurrentUser.reminder_status;
});

const reminderSettings = reactive({
  reminderType: null,
  reminderValue: store.getters._getCurrentUser.reminder_day,
});

const listboxChange = () => {
  if (selectedCity.value == "Hour") return (max.value = "24");
  if (selectedCity.value == "Day") return (max.value = "30");
  if (selectedCity.value == "Month") return (max.value = "12");
};

const max = ref();

const updateUserState = reactive({
  name: store.getters._getCurrentUser.name,
  email: store.getters._getCurrentUser.email,
  password: null,
});

const reminderSave = () => {
  appAxios
    .patch("/users/reminder-settings", {
      reminder_type: selectedCity.value,
      reminder_day: reminderSettings.reminderValue,
    })
    .then(() => {
      store.commit("setUser", {
        ...store.getters._getCurrentUser,
        reminder_type: selectedCity.value,
        reminder_day: reminderSettings.reminderValue,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
const updateUser = async () => {
  const { name, email } = updateUserState;
  await appAxios
    .patch("/users", { name, email })
    .then(() => {})
    .catch(() => {});

  if (updateUserState.password) {
    const { password } = updateUserState;
    await appAxios
      .post("/users/change-password", { password })
      .then(() => {})
      .catch(() => {});
  }
};

const reminderStatus = async () => {
  await appAxios
    .patch("/users/reminder-settings", { reminder_status: checked.value })
    .then(() => {
      store.commit("setUser", {
        ...store.getters._getCurrentUser,
        reminder_status: checked.value,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <TopSidebar />

  <div class="link">
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
      <InputSwitch v-model="checked" @change="reminderStatus" />
      <div class="field col-12 md:col-3">
        <label for="minmax-buttons">Min-Max Boundaries</label>
        <InputNumber id="minmax-buttons" v-model="reminderSettings.reminderValue" mode="decimal" showButtons min="0" :max="max" :disabled="!checked" />
      </div>
      <Dropdown
        v-model="selectedCity"
        @input="reminderSettings.reminderType"
        :options="cities"
        optionLabel="name"
        dataKey="code"
        optionValue="code"
        placeholder="Select a City"
        @change="listboxChange"
        :disabled="!checked"
      />

      <Button label="Save" icon="pi pi-check" autofocus @click="reminderSave" :disabled="!checked" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  margin-top: $margin-top;
}
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
