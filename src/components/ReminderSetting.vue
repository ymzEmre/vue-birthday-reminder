<script setup>
import { inject, onMounted, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();
const appAxios = inject("appAxios");

const useToast = inject("useToast");
const toast = useToast();

const reminderChecked = ref();
const reminderType = ref();
const reminderValueMax = ref();

const reminderTypes = reactive([
  { name: "Hour", code: "Hour" },
  { name: "Day", code: "Day" },
  { name: "Month", code: "Month" },
]);

const reminderSettings = reactive({
  reminderType: store.getters._getCurrentUser.reminder_type,
  reminderValue: store.getters._getCurrentUser.reminder_value,
});

onMounted(() => {
  reminderType.value = store.getters._getCurrentUser.reminder_type;
  reminderChecked.value = store.getters._getCurrentUser.reminder_status;
});

const listboxChange = () => {
  if (reminderType.value == "Hour") return (reminderValueMax.value = "24");
  if (reminderType.value == "Day") return (reminderValueMax.value = "30");
  if (reminderType.value == "Month") return (reminderValueMax.value = "12");
};

const reminderSave = () => {
  if (reminderType.value != reminderSettings.reminderType || reminderSettings.reminderValue != store.getters._getCurrentUser.reminder_day) {
    appAxios
      .patch("/users/reminder-settings", {
        reminder_type: reminderType.value,
        reminder_day: reminderSettings.reminderValue,
      })
      .then(() => {
        store.commit("setUser", {
          ...store.getters._getCurrentUser,
          reminder_type: reminderType.value,
          reminder_day: reminderSettings.reminderValue,
        });
        toast.add({ severity: "success", summary: "Reminder settings save", detail: "successful", life: 3000 });
      })
      .catch(() => {
        toast.add({ severity: "error", summary: "Reminder settings save", detail: "failed", life: 3000 });
      });
  }
};

const reminder = () => (reminderChecked.value ? "Reminder On" : "Reminder Off");

const reminderStatus = async () => {
  await appAxios
    .patch("/users/reminder-settings", { reminder_status: reminderChecked.value })
    .then(() => {
      toast.add({ severity: "success", summary: "Reminder settings save", detail: "successful", life: 3000 });

      store.commit("setUser", {
        ...store.getters._getCurrentUser,
        reminder_status: reminderChecked.value,
      });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Reminder settings save", detail: "failed", life: 3000 });
    });
};
</script>

<template>
  <div class="p-field p-col-12 p-md-4 form-section">
    <h4 class="title">Reminder Settings</h4>
    <div class="reminder-status p-mt-6">
      <InputSwitch v-model="reminderChecked" @change="reminderStatus" />
      <span class="p-ml-3 title" v-text="reminder()"></span>
    </div>
    <div class="reminder-settings p-mt-2">
      <div class="field col-12 md:col-3 p-mt-6">
        <Dropdown
          class=""
          v-model="reminderType"
          @input="reminderSettings.reminderType"
          :options="reminderTypes"
          optionLabel="name"
          dataKey="code"
          optionValue="code"
          placeholder="Select a City"
          @change="listboxChange"
          :disabled="!reminderChecked"
        />
      </div>
      <InputNumber
        class="p-mt-6"
        id="minmax-buttons"
        v-model="reminderSettings.reminderValue"
        mode="decimal"
        showButtons
        :min="0"
        :max="reminderValueMax"
        :disabled="!reminderChecked"
      />
    </div>
    <div class="save-button">
      <Button class="p-button-success p-mt-5" label="Save" icon="pi pi-check" autofocus @click="reminderSave" :disabled="!reminderChecked" />
    </div>
  </div>
</template>

<style lang="scss">
.title {
  color: #fff;
}
.button {
  display: block;
}

.reminder-settings {
  display: flex;
  justify-content: space-between;
}

.reminder-status {
  display: flex;
  align-items: center;
}
</style>
