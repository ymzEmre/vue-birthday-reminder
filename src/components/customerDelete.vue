<script setup>
import { defineProps, defineEmits } from "vue";

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { inject } from "@vue/runtime-core";
const appAxios = inject("appAxios");
const confirm = useConfirm();
const toast = useToast();
const emit = defineEmits(["customer-delete"]);

const deleteUser = (id) => {
  appAxios.delete(`/customers/${id}`).then(() => {
    emit("customer-delete");
  });
};

const confirm2 = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteUser(id);
      toast.add({ severity: "success", summary: "Confirmed", detail: "Logout", life: 3000 });
    },
  });
};

defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div>
    <Button @click="confirm2($event, user._id)" icon="pi pi-times" class="p-button-danger p-button-outlined p-ml-2"></Button>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>
