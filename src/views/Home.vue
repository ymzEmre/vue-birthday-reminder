<script setup>
import LeftSidebar from "@/components/leftSidebar";
import TopSidebar from "@/components/topSidebar";
import CustomerCard from "@/components/customerCard";
import CustomerAdd from "@/components/customerAdd";
</script>

<template>
  <TopSidebar />
  <LeftSidebar />

  <div class="link">
    <CustomerAdd />
    <CustomerCard />
  </div>
</template>

<style lang="scss">
.link {
  margin-top: $margin-top;
  margin-left: $margin-left;
}
</style>
