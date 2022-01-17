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

onMounted(() => {
  appAxios.get("/users/customers").then((res) => {
    userList.value = res?.data || [];
  });
});

const groupFilter = (e) => {
  appAxios.get("/users/customers").then((res) => {
    const categories = res.data?.map((item) => item);

    // userList.value = categories.filter((item) => item === e);

    // console.log((userList.value.group = e));

    // console.log(categories.filter((item) => item.group == e));

    userList.value = categories.filter((item) => item.group == e);
  });
};
</script>

<template>
  <TopSidebar />
  <LeftSidebar @group-change="groupFilter" />

  <div class="link">
    <CustomerAdd />
    <CustomerCard v-for="user in userList" :key="user._id" :user="user" />
  </div>
</template>

<style lang="scss">
.link {
  margin-top: $margin-top;
  margin-left: $margin-left;
}
</style>
