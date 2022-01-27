<script setup>
import { inject } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import LeftSidebar from "@/components/LeftSidebar";
import TopSidebar from "@/components/TopSidebar";
import CustomerCard from "@/components/CustomerCard";
import CustomerAdd from "@/components/CustomerAdd";

const appAxios = inject("appAxios");

const userList = ref([]);

const fetchCustomer = () => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
};

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

fetchCustomer();
</script>

<template>
  <TopSidebar />
  <LeftSidebar @group-change="groupFilter" />

  <div class="link">
    <CustomerAdd @customer-add="fetchCustomer" />
    <div class="card-header">
      <CustomerCard
        v-for="user in userList"
        :key="user._id"
        :user="user"
        class="p-grid"
        @customer-update-delete="
          fetchCustomer();
          groupFilter();
        "
      />
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
