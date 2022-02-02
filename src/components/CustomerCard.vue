<script setup>
import { defineProps } from "vue";
import CustomerUpdate from "@/components/CustomerUpdate";
import CustomerDelete from "@/components/CustomerDelete";
import moment from "moment";

defineProps({
  user: {
    type: Object,
    default: () => {},
  },

  userList: {
    type: Array,
    default: () => [],
  },
});

const remainingDay = (birth) => {
  const today = moment();
  const birtday = moment(birth);
  const age = today.diff(birtday, "years");
  const remainingDays = birtday.add(age + 1, "years").diff(today, "days");
  return remainingDays;
};
</script>

<template>
  <Card class="p-card">
    <template #title>
      <div class="customer-header">
        <p class="p-m-0">{{ user.name }}</p>
        <CustomerUpdate :userList="userList" :user="user" />
        <CustomerDelete :userList="userList" :user="user" />
      </div>

      <div>
        <Tag class="p-mr-2" severity="warning">{{ user.group }}</Tag>
      </div>
    </template>
    <template #content>
      <p>Birthday: {{ moment(user.birthday).format("YYYY-MM-DD") }}</p>
      <p>Age: {{ moment().diff(user.birthday, "years") }}</p>
      <p v-text="'Remaining day: ' + remainingDay(user.birthday)"></p>
    </template>
  </Card>
</template>

<style lang="scss">
.p-card {
  width: 18rem;
  margin: 0rem 0rem 2rem 1.5rem;
  height: 15rem;
  color: $color-white;
  backdrop-filter: $background-blur;
  background: unset;
  box-shadow: $box-shadow;
  border-radius: $border-radius-sm;
}

.customer-header {
  display: grid;
  grid-template-columns: 6fr 0fr 0fr;
  grid-template-rows: 0px 30px;
}
</style>
