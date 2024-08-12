<script setup>
const todo = ref([]);
const log = ref([]);
onMounted(() => {
  const storageTodo = JSON.parse(localStorage.getItem("todo")) || [];
  log.value = storageTodo.filter((task) => task.done);
});

</script>
<template>
  <div>
    <h1>Done</h1>
    <div class="mt-6">
      <div
        class="d-flex justify-center align-center border rounded pa-4"
        style="height: 100px"
        v-if="log.length === 0"
      >
        <h2>There is no log yet</h2>
      </div>
      <transition-group name="list" tag="div">
        <FormCheckboxCard
          v-for="(item, i) in log"
          :key="i"
          :todo="item"
          @delete-todo="onDeleteTodo(i)"
          class="mb-3"
        />
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
