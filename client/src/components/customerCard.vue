<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";

import CustomerUpdate from "@/components/customerUpdate";
import CustomerDelete from "@/components/customerDelete";
import moment from "moment";

const appAxios = inject("appAxios");

const userList = ref([]);

const getUsers = onMounted(() => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
});
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
            <CustomerUpdate :userList="userList" :user="user" @customer-update="getUsers" />
            <CustomerDelete :userList="userList" :user="user" @customer-delete="getUsers" />
          </div>

          <div>
            <Tag class="p-mr-2" severity="warning">{{ user.group }}</Tag>
          </div>
        </div>
      </template>
      <template #content>
        <p>BIRTHDAY: {{ moment(user.birthday).format("L") }}</p>
        <p>AGE: {{ moment().diff(user.birthday, "years") }}</p>
        <p>REMAINING DAY: {{ moment().diff(user.birthday, "years") }}</p>
      </template>
    </Card>
  </div>
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
