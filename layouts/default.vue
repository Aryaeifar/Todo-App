<script setup>
const sidebar = [
  {
    tooltip: "Home",
    icon: "home-account",
    title: "Home",
    value: "home",
    link: "/",
  },
  {
    tooltip: "To do",
    icon: "square-rounded-badge",
    title: "Todo list",
    value: "todo",
    link: "/todo",
  },
  {
    tooltip: "Done",
    icon: "check-all",
    title: "Done",
    value: "done",
    link: "/done",
  },
];
</script>
<template>
  <v-card>
    <v-layout>
      <WidgetsBaseSidebar :items="sidebar" />

      <v-main style="height: 100%">
        <div class="main-app">
          <slot />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
