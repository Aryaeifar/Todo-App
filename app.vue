<template>
  <NuxtLayout>
    <v-app>
       <NuxtLoadingIndicator color="black" />
      <NuxtPage />
    </v-app>
  </NuxtLayout>
   <Teleport to="body">
    <FlashMessage position="right bottom" />
  </Teleport>
</template>
<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>