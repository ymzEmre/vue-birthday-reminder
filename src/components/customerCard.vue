<script setup>
import CustomerUpdate from "@/components/CustomerUpdate";
import CustomerDelete from "@/components/CustomerDelete";
import moment from "moment";

import { defineProps } from "vue";
defineProps({
  user: {
    type: Object,
    default: () => {},
  },

  userList: {
    type: Array,
    default: () => [],
  },

  fetchCustomer: Function,
});
</script>

<template>
  <Card class="p-card p-shadow-4">
    <template #title>
      <div>
        <p class="p-m-0">{{ user.name }}</p>
      </div>
      <div>
        <CustomerUpdate :userList="userList" :user="user" @customer-update="fetchCustomer" />
        <CustomerDelete :userList="userList" :user="user" @customer-delete="fetchCustomer" />
      </div>

      <div>
        <Tag class="p-mr-2" severity="warning">{{ user.group }}</Tag>
      </div>
    </template>
    <template #content>
      <p>BIRTHDAY: {{ moment(user.birthday).format("L") }}</p>
      <p>AGE: {{ moment().diff(user.birthday, "years") }}</p>
      <p>REMAINING DAY: {{ moment().diff(user.birthday, "years") }}</p>
    </template>
  </Card>
</template>

<style lang="scss">
.p-card {
  background-color: #ebebeb;
  width: 23rem;
  margin: 0rem 0rem 2rem 2rem;
}
</style>
