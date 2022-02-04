<script setup>
import { inject, onMounted, provide, ref } from "@vue/runtime-core";
import LeftSidebar from "@/components/LeftSidebar";
import TopSidebar from "@/components/TopSidebar";
import CustomerCard from "@/components/CustomerCard";
import CustomerAdd from "@/components/CustomerAdd";

const appAxios = inject("appAxios");

const userList = ref([]);

const fetchCustomers = () => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
};

onMounted(() => {
  fetchCustomers();
});

provide("fetchCustomers", fetchCustomers);

const groupFilter = (customerGroupName) => {
  if (customerGroupName != null) {
    appAxios.get("/users/customers").then((res) => {
      const categories = res.data?.map((item) => item);
      userList.value = categories.filter((item) => item.group == customerGroupName);
    });
    return;
  }
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
};
</script>

<template>
  <TopSidebar />
  <LeftSidebar @group-change="groupFilter" />

  <div class="link">
    <CustomerAdd @customer-add="fetchCustomers" />
    <div class="card-header">
      <CustomerCard v-for="user in userList" :key="user._id" :user="user" />
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: $background-image;
  background-size: $background-size;
  background-position: $background-position;
  height: 100%;
}
.link {
  margin-top: $margin-top;
  margin-left: $margin-left;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
}
</style>
