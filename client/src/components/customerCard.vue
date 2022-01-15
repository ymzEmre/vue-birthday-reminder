<script setup>
import { ref, reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import moment from "moment";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const displayModal = ref(false);
const selectedCity = ref();
const cities = reactive([{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }]);
const appAxios = inject("appAxios");

const userList = ref([]);

const data = ref({
  name: null,
  group: null,
  birthday: null,
});

const updatedata = ref({
  ...data.value,
  _id: null,
});

const getUsers = onMounted(() => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
});
const updateUser = () => {
  const payload = {
    name: updatedata.value.name,
    group: selectedCity.value.name,
    birthday: updatedata.value.birthday,
  };

  appAxios
    .patch(`/customers/${updatedata.value._id}`, payload)
    .then(() => {
      displayModal.value = false;
      toast.add({ severity: "success", summary: "Confirmed", detail: "Record deleted", life: 3000 });
      getUsers();
    })
    .catch((error) => {
      console.log(error);
      toast.add({ severity: "error", summary: "Confirmed", detail: "Record deleted", life: 3000 });
    });
};

const closeModal = () => {
  displayModal.value = false;
};
const deleteUser = (id) => {
  appAxios.delete(`/customers/${id}`).then(() => {
    userList.value = userList.value.filter((item) => item.id != id);
    getUsers();
  });
};

const openModal = (userId, userName, userBirhday, userGroup) => {
  displayModal.value = true;
  updatedata.value = {
    name: userName,
    group: userGroup,
    birthday: moment(userBirhday).format("L"),
    _id: userId,
  };
  selectedCity.value = { name: userGroup };
  return userId;
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
</script>

<template>
  <div class="p-grid">
    <Card class="p-card p-shadow-4" v-for="user in userList" :key="user._id">
      <template #title>
        <div class="card-header">
          <div>
            <p class="p-m-0">{{ user.name }}</p>
          </div>
          <div>
            <Button icon="pi pi-user-edit" class="p-button-info p-button-outlined" @click="openModal(user._id, user.name, user.birthday, user.group)"></Button>
            <Button @click="confirm2($event, user._id)" icon="pi pi-times" class="p-button-danger p-button-outlined p-ml-2"></Button>
            <ConfirmPopup></ConfirmPopup>
          </div>

          <div>
            <Tag class="p-mr-2" severity="warning">{{ user.group }}</Tag>
          </div>
        </div>
      </template>
      <template #content>
        <p>BIRTHDAY: {{ moment(user.birthday).format("L") }}</p>
        <p>AGE: {{ moment().diff(user.birthday, "years") }}</p>
        <p>REMAINING DAY:</p>
      </template>
    </Card>
  </div>

  <Dialog header="Header" v-model:visible="displayModal" :style="{ width: '50vw' }" :modal="true">
    <span class="p-float-label">
      <InputText id="username2" type="text" v-model="updatedata.name" />
      <label for="username">Username</label>
    </span>

    <div class="p-field p-col-12 p-md-4">
      <InputMask mask="99/99/9999" v-model="updatedata.birthday" placeholder="__/__/____" slotChar="mm/dd/yyyy" />
      <label for="date">Date</label>
    </div>

    <Listbox v-model="selectedCity" @input="updatedata.group" :options="cities" optionLabel="name" style="width: 15rem" />
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="updateUser" autofocus />
    </template>
  </Dialog>
</template>

<style lang="scss">
.p-card {
  background-color: #ebebeb;
  width: 23rem;
  margin: 0rem 0rem 2rem 2rem;
}

.card-header {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-auto-rows: 70px;
}
</style>
