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
    tooltip: "Log",
    icon: "information-outline",
    title: "Log",
    value: "log",
    link: "/log",
  },
];
const drawer = ref(false);
</script>
<template>
  <v-card>
    <v-layout>
      <WidgetsBaseSidebar :items="sidebar" />
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item
            v-for="item in sidebar"
            :key="item.value"
            :to="item.link"
            router
            :title="item.title"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100%">
        <div class="main-app">
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
            class="toggle-sidebar"
            type="button"
          ></v-app-bar-nav-icon>
          <slot />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
