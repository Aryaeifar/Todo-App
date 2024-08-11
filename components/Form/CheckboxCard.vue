<script setup>
const { $flashMsg } = useNuxtApp();
const props = defineProps({
  todo: {
    type: Object,
  },
  isTodo: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["delete-todo", "done-todo"]);
const deleteTodo = () => {
  $flashMsg.error({
    text: `${props.todo.text} task has been removed`,
  });
  emit("delete-todo");
};
const doneTodo = () => {
  if (props.todo.done) {
    $flashMsg.success({
      text: `${props.todo.text} task has been completed`,
    });
  } else {
    $flashMsg.error({
      text: `${props.todo.text} task has not been completed`,
    });
  }
  props.todo.done = !props.todo.done;
  emit("done-todo", props.todo.done);
};
const sec = ref(-1);
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");
const isRunning = ref(false);
let intervalId = null;
function pad(val) {
  return val > 9 ? val : "0" + val;
}

function updateTime() {
  sec.value++;
  seconds.value = pad(sec.value % 60);
  minutes.value = pad(Math.floor(sec.value / 60) % 60);
  hours.value = pad(Math.floor(sec.value / 3600));
}
function startTimer() {
  if (!isRunning.value) {
    isRunning.value = true;
    intervalId = setInterval(updateTime, 1000);
  }
}
function pauseTimer() {
  isRunning.value = false;
  clearInterval(intervalId);
}
</script>

<template>
  <div
    class="todo-card rounded border pa-1 mb-3 d-flex justify-space-between align-center"
  >
    <div class="d-flex align-center ms-3">
      <v-checkbox v-model="props.todo.done" @change="doneTodo" v-if="!isTodo">
        <template v-slot:label>
          <div :class="props.todo.done ? 'text-decoration-line-through' : ''">
            {{ todo.text }}
          </div>
        </template>
      </v-checkbox>
      <div v-else>
        {{ todo.text }}
      </div>
    </div>
    <div>
      <div class="d-flex align-center" v-if="!isTodo">
        <div class="d-flex align-center">
          <div>
            <span>{{ hours }}</span
            >:<span>{{ minutes }}</span
            >:<span>{{ seconds }}</span>
          </div>
          <v-btn flat class="ms-2">
            <v-icon
              icon="mdi-play"
              color="black"
              v-bind="props"
              @click="startTimer"
              v-if="!isRunning"
            ></v-icon>
            <v-icon
              icon="mdi-pause"
              color="black"
              v-bind="props"
              @click="pauseTimer"
              v-else-if="isRunning"
            ></v-icon>
          </v-btn>
        </div>
        <v-btn flat @click="deleteTodo">
          <v-tooltip text="Delete" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon
                icon="mdi-delete-empty"
                color="red"
                v-bind="props"
              ></v-icon>
            </template>
          </v-tooltip>
        </v-btn>
      </div>

      <div v-else>
        {{ todo.date }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
