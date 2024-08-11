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
    icon: "check-all",
    title: "Todo list",
    value: "todo",
    link: "/todo",
  },
];
</script>
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="aryaeifar12@gmail.com"
            title="Ali aryaei"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-tooltip :text="item.tooltip" v-for="(item, i) in sidebar" :key="i">
            <template v-slot:activator="{ props }">
              <v-list-item
                :prepend-icon="'mdi-' + item.icon"
                :title="item.title"
                :value="item.value"
                :to="item.link"
                v-bind="props"
              ></v-list-item>
            </template>
          </v-tooltip>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100%">
        <div class="main-app">
          <slot />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
