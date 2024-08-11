<template>
  <div>
    <h1 class="mb-3">Todo App</h1>
    <div class="mb-6">
      <h2 class="mb-3">Add your task</h2>
      <div class="d-flex gap-3 align-center">
        <v-text-field
          label="Add task"
          variant="outlined"
          density="compact"
        ></v-text-field>
        <v-btn variant="outlined">Add</v-btn>
      </div>
    </div>
    <div class="mb-6">
      <h2 class="mb-3">To do</h2>
      <div class="d-flex justify-center align-center border rounded pa-4">
        There is no task yet
      </div>
    </div>
    <div>
      <h2 class="mb-3">Done</h2>
      <div class="d-flex justify-center align-center border rounded pa-4">
        There is no finished task yet
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
