<script setup>
import { inject, onMounted, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

const useToast = inject("useToast");
const toast = useToast();

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

const listboxChange = () => {
  if (selectedCity.value == "Hour") return (max.value = "24");
  if (selectedCity.value == "Day") return (max.value = "30");
  if (selectedCity.value == "Month") return (max.value = "12");
};
const reminderSettings = reactive({
  reminderType: null,
  reminderValue: store.getters._getCurrentUser.reminder_day,
});

const max = ref();

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
      toast.add({ severity: "success", summary: "Reminder settings save", life: 3000 });
    })
    .catch((error) => {
      console.log(error);
      toast.add({ severity: "error", summary: "Reminder settings save failed", life: 3000 });
    });
};

const reminder = () => (checked.value ? "Reminder On" : "Reminder Off");

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
  <h4>Reminder Settings</h4>
  <div class="reminder-status p-mt-5">
    <InputSwitch v-model="checked" @change="reminderStatus" />
    <span class="p-ml-3" v-text="reminder()"></span>
  </div>
  <div class="reminder-settings p-mt-3">
    <div class="field col-12 md:col-3">
      <InputNumber
        class="p-mr-3"
        id="minmax-buttons"
        v-model="reminderSettings.reminderValue"
        mode="decimal"
        showButtons
        min="0"
        :max="max"
        :disabled="!checked"
      />
    </div>
    <Dropdown
      class="p-mr-3"
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
</template>

<style lang="scss">
.button {
  display: block;
}

.reminder-settings {
  display: flex;
  align-items: center;
}

.reminder-status {
  display: flex;
  align-items: center;
}
</style>
