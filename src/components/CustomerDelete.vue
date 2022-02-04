<script setup>
import { useConfirm } from "primevue/useconfirm";
import { inject, defineProps } from "@vue/runtime-core";

defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const fetchCustomers = inject("fetchCustomers");

const appAxios = inject("appAxios");
const useToast = inject("useToast");
const toast = useToast();
const confirm = useConfirm();

const deleteCustomer = (id) => {
  appAxios.delete(`/customers/${id}`).then(() => {
    fetchCustomers();
  });
};

const deleteCustomerPopup = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteCustomer(id);
      toast.add({ severity: "success", summary: "Delete", detail: "successful", life: 3000 });
    },
  });
};
</script>

<template>
  <div>
    <Button @click="deleteCustomerPopup($event, user._id)" icon="pi pi-times" class="p-button-danger p-button-outlined p-ml-2"></Button>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>
