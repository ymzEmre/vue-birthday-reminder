<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";

const appAxios = inject("appAxios");

const groups = ref({});
const allGroup = ref();

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

    allGroup.value = Object.values(groupCount).length;
    groups.value = Object.keys(groupCount).map((key) => ({
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
      <b @click="$emit('group-change', null)">All Groups ({{ allGroup }})</b>
      <p v-for="users in groups" :key="users.id" @click="$emit('group-change', users.name)">{{ users.name }} ({{ users.count }})</p>
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
  display: flex;
}
</style>
