<script setup>
import { inject, onMounted, reactive, ref } from "@vue/runtime-core";

const appAxios = inject("appAxios");

let state = reactive({
  groups: {},
});
const groupsCount = ref();

onMounted(() => {
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

    groupsCount.value = Object.values(groupCount).length;

    state.groups = Object.keys(groupCount).map((key) => ({
      id: new Date().getTime(),
      name: key,
      count: groupCount[key],
    }));
  });
});
</script>

<template>
  <Sidebar class=".p-sidebar-left" :visible="true" :showCloseIcon="false" :dismissable="false" :modal="false">
    <div class="sidebar-content">
      <b @click="$emit('group-change', null)">All Groups ({{ groupsCount }})</b>
      <p v-for="customerGroups in state.groups" :key="customerGroups.id" @click="$emit('group-change', customerGroups.name)">
        <Tag class="p-mr-2" severity="warning">{{ customerGroups.name }}</Tag> ({{ customerGroups.count }})
      </p>
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
