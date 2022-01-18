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

const remaingDayCalc = (birth) => {
  const today = moment();
  const birtday = moment(birth);
  const age = today.diff(birtday, "years");
  const remaingDays = birtday.add(age + 1, "years").diff(today, "days");

  return `Remaining Days: ${remaingDays}`;
};
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
      <p>Birthday: {{ moment(user.birthday).format("YYYY-MM-DD") }}</p>
      <p>Age: {{ moment().diff(user.birthday, "years") }}</p>
      <p v-text="remaingDayCalc(user.birthday)"></p>
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
