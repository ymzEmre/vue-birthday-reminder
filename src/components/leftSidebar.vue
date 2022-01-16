<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";

const appAxios = inject("appAxios");

const categoryList = ref({});
const categoryCount = ref([]);

const getCategory = onMounted(() => {
  appAxios.get("/users/customers").then((res) => {
    const categories = res.data?.map((item) => item.group);
    const groupCount = categories.reduce((acc, cur) => {
      if (acc[cur]) {
        acc[cur] += 1;
      } else {
        acc[cur] = 1;
      }
      return acc;
    }, {});

    console.log(groupCount);

    // const groupList = Object.keys(groupCount);
    // const groupValueCount = Object.values(groupCount);

    // categoryList.value = groupList;

    // categoryCount.value = groupValueCount;

    // categoryList.value = groupCount;

    // categoryCount.value = groupList.length;

    // const groupValueCount = groupList.map((item) => groupCount[item]);

    // const uniqueCategories = [...new Set(categories)];
    // categoryCount.value = uniqueCategories.length;
    // categoryList.value = uniqueCategories || [];
  });
});

getCategory();
</script>

<template>
  <Sidebar class=".p-sidebar-left" :visible="true" :showCloseIcon="false" :dismissable="false" :modal="false">
    <div class="sidebar-content">
      <h2>Groups ({{ categoryCount }})</h2>
      <p>{{ categoryList }}</p>
    </div>
  </Sidebar>
</template>

<style lang="scss">
.p-sidebar-left {
  width: 15rem !important;
  z-index: 0 !important;
}

.sidebar-content {
  margin-top: 80px;
}
</style>
