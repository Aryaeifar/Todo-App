<script setup>
import draggable from "vuedraggable";
const todo = ref([]);
const totalSec = ref(0);
const totalMinute = ref("00");
const totalHour = ref("00");
const totalCounterSec = ref("00");

onMounted(() => {
  const storageTodo = JSON.parse(localStorage.getItem("todo")) || [];
  todo.value = storageTodo;
  calcTime();
});
// Add todo

const addTodo = (newTask) => {
  const taskId = Date.now();
  todo.value.push({
    id: taskId,
    text: newTask,
    done: false,
    date: null,
    sec: 0,
    color: "#000000",
  });
  updateStorage();
  calcTime();
};

// update timer
function pad(val) {
  return val > 9 ? val : "0" + val;
}
const onUpdateCounter = (element, sec) => {
  element.sec = sec;
  updateStorage();
  calcTime();
};
const calcTime = () => {
  totalSec.value = todo.value.reduce((acc, task) => acc + task.sec, 0);
  totalHour.value = pad(Math.floor(totalSec.value / 3600));
  totalMinute.value = pad(Math.floor(totalSec.value / 60) % 60);
  totalCounterSec.value = pad(totalSec.value % 60);
};

// delete to do
const onDeleteTodo = (element) => {
  todo.value = todo.value.filter((task) => task.id !== element.id);
  updateStorage();
  calcTime();
};

// update color
const onUpdateColor = (element, color) => {
   element.color = color;
  updateStorage();
};

// update done
const toggleDone = (element) => {
  element.done = !element.done;
  if (element.done) {
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

    element.date  = datetime;
  } else {
    element.date = null;
  }
  updateStorage();
};

const updateStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo.value));
};
watch(todo, (newVal) => {
  localStorage.setItem("todo", JSON.stringify(newVal));
});
const dragging = ref(false);
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
      <v-row>
        <draggable
          v-model="todo"
          item-key="id"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element }">
            <v-col cols="12" sm="6" md="4" lg="3">
              <FormCheckboxCard
                :todo="element"
                @delete-todo="onDeleteTodo(element)"
                @done-todo="toggleDone(element)"
                @counter-update="onUpdateCounter(element, $event)"
                @color-update="onUpdateColor(element, $event)"
                :isTodo="false"
              />
            </v-col>
          </template>
        </draggable>
      </v-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.ghost {
  opacity: 0.5;
}
</style>
