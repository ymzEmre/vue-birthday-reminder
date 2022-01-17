<script setup>
import CustomerUpdate from "@/components/CustomerUpdate";
import CustomerDelete from "@/components/CustomerDelete";
import moment from "moment";

import { defineProps } from "vue";
defineProps({ user: Object });
</script>

<template>
  <div class="p-grid">
    <Card class="p-card p-shadow-4">
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
