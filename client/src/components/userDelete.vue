<script setup>
// import { useConfirm } from 'primevue/useconfirm';
// import { useToast } from 'primevue/usetoast';

// const confirm = useConfirm();
// const toast = useToast();

// const confirm2 = () => {
//   confirm.require({
//     target: event.currentTarget,
//     message: 'Do you want to delete this record?',
//     icon: 'pi pi-info-circle',
//     acceptClass: 'p-button-danger',
//     accept: () => {
//       // deleteUser(id);
//       toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
//     },
//     reject: () => {},
//   });
// };
</script>

<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <Button
    @click="$emit('delete-user', 'emre')"
    label="Delete"
    icon="pi pi-times"
    class="p-button-danger p-button-outlined"
  ></Button>
</template>
