<script setup>
const todo = ref([]);
onMounted(() => {
  const storageTodo = JSON.parse(localStorage.getItem("todo")) || [];
  todo.value = storageTodo;
});

const addTodo = (newTask) => {
  todo.value.push({
    text: newTask,
    done: false,
  });
  updateStorage();
};
const onDeleteTodo = (i) => {
  todo.value.splice(i, 1);
  updateStorage();
};
const toggleDone = (i) => {
  todo.value[i].done = !todo.value[i].done;
  updateStorage();
};

const updateStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo.value));
};

watch(todo, (newVal) => {
  localStorage.setItem("todo", JSON.stringify(newVal));
});
</script>

<template>
  <div>
    <h1 class="mb-3">Todo App</h1>
    <div class="mb-6">
      <h2 class="mb-3">Add your task</h2>
      <FormAddInput @add-todo="addTodo" />
    </div>
    <div class="mb-6">
      <h2 class="mb-3">To do</h2>
      <div
        class="d-flex justify-center align-center border rounded pa-4"
        style="height: 100px"
        v-if="todo.length === 0"
      >
        <h2>There is no task yet</h2>
      </div>
      <transition-group name="list" tag="div">
        <FormCheckboxCard
          v-for="(item, i) in todo"
          :key="i"
          :todo="item"
          @delete-todo="onDeleteTodo(i)"
          @done-todo="toggleDone(i)"
        />
      </transition-group>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
