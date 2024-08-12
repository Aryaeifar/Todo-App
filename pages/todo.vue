<script setup>
const todo = ref([]);
const totalSec = ref(0);
const totalMinute = ref("00");
const totalHour = ref("00");
const totalCounterSec = ref("00");
onMounted(() => {
  const storageTodo = JSON.parse(localStorage.getItem("todo")) || [];
    console.log(storageTodo)

  todo.value = storageTodo;
  calcTime();
});
const addTodo = (newTask) => {
  const taskId = Date.now()
  todo.value.push({
    id:taskId,
    text: newTask,
    done: false,
    date: null,
    sec: 0,
  });
  updateStorage();
  calcTime()
};
function pad(val) {
  return val > 9 ? val : "0" + val;
}
const onUpdateCounter = (i, sec) => {
  todo.value[i].sec = sec;
  updateStorage();
  calcTime();
};

const onDeleteTodo = (i) => {
  todo.value.splice(i, 1);
  updateStorage();
  calcTime();
};
const toggleDone = (i) => {
  todo.value[i].done = !todo.value[i].done;
  if (todo.value[i].done) {
    let currentdate = new Date();
    let datetime =
      "Task is done in " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " | " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    todo.value[i].date = datetime;
    console.log(datetime);
  } else {
    todo.value[i].null;
  }
  updateStorage();
};

const updateStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo.value));
};

watch(todo, (newVal) => {
  localStorage.setItem("todo", JSON.stringify(newVal));
});
const calcTime = () => {
  totalSec.value = todo.value.reduce((acc, task) => acc + task.sec, 0);
  totalHour.value = pad(Math.floor(totalSec.value / 3600));
  totalMinute.value = pad(Math.floor(totalSec.value / 60) % 60);
  totalCounterSec.value = pad(totalSec.value % 60);
};
</script>

<template>
  <div>
    <h1 class="mb-3">Todo App</h1>
    <div class="mb-6">
      <h2 class="mb-3">Add your task</h2>
            Total Time: {{ totalHour }}:{{ totalMinute }}:{{ totalCounterSec }}

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
          @counter-update="onUpdateCounter(i, $event)"
          :isTodo="false"
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
