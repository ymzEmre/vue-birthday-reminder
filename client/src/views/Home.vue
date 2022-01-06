<script setup>
import { inject, onMounted, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

import moment from "moment";

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const appAxios = inject("appAxios");
const userList = ref([]);

const displayModal = ref(false);

const data = ref({
  name: null,
  group: null,
  birthday: null,
});

const updatedata = ref({
  ...data.value,
  _id: null,
});

const currentUser = store.getters._getCurrentUser;
onMounted(() => {
  toast.add({ severity: "success", summary: `${currentUser} Welcome`, detail: "Logined", life: 3000 });
});

const selectedCity = ref();
const cities = reactive([{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }]);

const onSave = () => {
  const selectedGroup = selectedCity.value.name;
  appAxios
    .post("/customers", { ...data.value, group: selectedGroup })
    .then(() => {
      toast.add({ severity: "success", summary: "save added", detail: "Logined", life: 3000 });
      getUsers();
    })
    .catch((error) => {
      toast.add({ severity: "error", summary: "Save failed", detail: "Logined", life: 3000 });
      console.log(error);
    });
};

const getUsers = onMounted(() => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
});

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
};

const updateUser = () => {
  const payload = {
    name: updatedata.value.name,
    group: selectedCity.value.name,
    birthday: updatedata.value.birthday,
  };

  appAxios
    .patch(`/customers/${updatedata.value._id}`, payload)
    .then(() => {
      getUsers();
      displayModal.value = false;
      toast.add({ severity: "success", summary: "Confirmed", detail: "Record deleted", life: 3000 });
    })
    .catch((error) => {
      console.log(error);
      toast.add({ severity: "error", summary: "Confirmed", detail: "Record deleted", life: 3000 });
    });
};

const closeModal = () => {
  displayModal.value = false;
};

const logOut = () => {
  store.commit("logoutUser");
  router.push({ name: "Login" });
  localStorage.removeItem("access_token");
};

const confirm2 = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteUser(id);
      toast.add({ severity: "success", summary: "Confirmed", detail: "Record deleted", life: 3000 });
    },
  });
};
</script>

<template>
  <Sidebar visible="true" :baseZIndex="1000" position="top" :modal="false" :showCloseIcon="false">
    <h3>{{ currentUser }}</h3>
    <br />
    <Button label="Logout" icon="pi pi-sign-out" @click="logOut" />
  </Sidebar>
  <div class="link">
    <Toast />

    <span class="p-float-label">
      <InputText id="username" type="text" v-model="data.name" />
      <label for="username">Username</label>
    </span>

    <div class="p-field p-col-12 p-md-4">
      <InputMask mask="99/99/9999" v-model="data.birthday" placeholder="__/__/____" slotChar="mm/dd/yyyy" />
      <label for="date">Date</label>
    </div>

    <Listbox v-model="selectedCity" @input="data.group" :options="cities" optionLabel="name" style="width: 15rem" />

    <Button label="Gonder" @click="onSave"></Button>

    <Card style="width: 25rem; margin-bottom: 2em" v-for="user in userList" :key="user._id">
      <template #title>
        <p>{{ user.name }}</p>
      </template>
      <template #content>
        <p>{{ user.group }}</p>
        <p>
          {{ user.birthday }}
        </p>

        <ConfirmPopup></ConfirmPopup>
        <Button @click="confirm2($event, user._id)" icon="pi pi-times" class="p-button-danger p-button-outlined"></Button>

        <Button
          icon="pi pi-user-edit"
          class="p-button-info p-button-outlined"
          @click="openModal(user._id, user.name, user.birthday, user.group)"
        ></Button>
      </template>
    </Card>

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
  </div>
</template>

<style lang="scss" scoped>
.link {
  margin-top: $margin-top;
}
</style>
