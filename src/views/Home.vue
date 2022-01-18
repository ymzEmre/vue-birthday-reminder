<script setup>
import LeftSidebar from "@/components/LeftSidebar";
import TopSidebar from "@/components/TopSidebar";
import CustomerCard from "@/components/CustomerCard";
import CustomerAdd from "@/components/CustomerAdd";
import { inject } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const appAxios = inject("appAxios");

const userList = ref([]);

const fetchCustomer = onMounted(() => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
});

const groupFilter = (e) => {
  if (e != null) {
    appAxios.get("/users/customers").then((res) => {
      const categories = res.data?.map((item) => item);
      userList.value = categories.filter((item) => item.group == e);
    });
    return;
  }
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
};

fetchCustomer();
</script>

<template>
  <TopSidebar />
  <LeftSidebar @group-change="groupFilter" />

  <div class="link">
    <CustomerAdd @customer-add="fetchCustomer" />
    <div class="card-header">
      <CustomerCard v-for="user in userList" :key="user._id" :user="user" class="p-grid" :fetchCustomer="fetchCustomer" />
    </div>
  </div>
</template>

<style lang="scss">
.link {
  margin-top: $margin-top;
  margin-left: $margin-left;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
}
</style>
