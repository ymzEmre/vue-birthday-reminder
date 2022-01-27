<script setup>
import { defineProps, defineEmits } from "vue";
import { inject } from "@vue/runtime-core";
import { useConfirm } from "primevue/useconfirm";

defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();
const confirm = useConfirm();

const emit = defineEmits(["customer-update-delete"]);

const deleteUser = (id) => {
  appAxios.delete(`/customers/${id}`).then(() => {
    emit("customer-update-delete");
  });
};

const deleteUserPopup = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteUser(id);
      toast.add({ severity: "success", summary: "Delete succesfull", life: 3000 });
    },
  });
};
</script>

<template>
  <div>
    <Button @click="deleteUserPopup($event, user._id)" icon="pi pi-times" class="p-button-danger p-button-outlined p-ml-2"></Button>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>
