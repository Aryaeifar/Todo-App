<script setup>
const emit = defineEmits([["add-todo"]]);
const addInput = ref("");
const emitAddTodo = () => {
  if (addInput.value.trim()) {
    emit("add-todo", addInput.value);
    addInput.value = "";
  } 
};
</script>
<template>
  <div class="d-flex gap-3 align-center">
    <v-text-field
      label="Add task"
      variant="outlined"
      density="compact"
      v-model="addInput"
      @keyup.enter="emitAddTodo"
    ></v-text-field>
    <v-btn variant="outlined" @click="emitAddTodo"  :disabled="!addInput" >Add</v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
