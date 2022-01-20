<template>
  <div class="link">
    <ConfirmPopup>w</ConfirmPopup>

    <Button @click="confirm2($event)" icon="pi pi-times" label="Delete" class="p-button-danger p-button-outlined"></Button>

    <Toast />
    <Button label="Success" class="p-button-success" @click="showSuccess" />
  </div>
</template>

<script setup>
// import { defineComponent } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const confirm2 = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      toast.add({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 });
    },
    reject: () => {},
  });
};

const showSuccess = () => {
  toast.add({ severity: "success", summary: "Success Message", detail: "Message Content", life: 3000 });
};
</script>

<style lang="scss" scoped>
button {
  min-width: 10rem;
  margin-right: 0.5rem;
}

@media screen and (max-width: 960px) {
  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
