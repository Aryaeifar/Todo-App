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
const emit = defineEmits(["delete-todo", "done-todo", "counter-update"]);
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
const sec = ref(0);
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");
const isCounting = ref(false);
let interval = null;
function pad(val) {
  return val > 9 ? val : "0" + val;
}

function updateTime() {
  sec.value++;
  seconds.value = pad(sec.value % 60);
  minutes.value = pad(Math.floor(sec.value / 60) % 60);
  hours.value = pad(Math.floor(sec.value / 3600));
  emit("counter-update", sec.value);
  localStorage.setItem(
    `${props.todo.id}-timer`,
    JSON.stringify({ sec: sec.value, isCounting: isCounting.value })
  );
}
function startTimer() {
  if (!isCounting.value) {
    isCounting.value = true;
    interval = setInterval(updateTime, 1000);
    $flashMsg.info({
      text: `The timer started`,
    });
  }
}
function pauseTimer() {
  isCounting.value = false;
  $flashMsg.warning({
    text: `The timer stopped`,
  });

  clearInterval(interval);
  emit("counter-update", sec.value);
  localStorage.setItem(
    `${props.todo.id}-timer`,
    JSON.stringify({ sec: sec.value, isCounting: isCounting.value })
  );
}
onMounted(() => {
  const storedTime = JSON.parse(
    localStorage.getItem(`${props.todo.id}-timer`)
  );
  if (storedTime) {
    sec.value = storedTime.sec || 0;
    isCounting.value = storedTime.isCounting || false;
    seconds.value = pad(sec.value % 60);
    minutes.value = pad(Math.floor(sec.value / 60) % 60);
    hours.value = pad(Math.floor(sec.value / 3600));
    emit("counter-update", sec.value);
    if (isCounting.value) {
      interval = setInterval(updateTime, 1000);
    }
  }
});
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
          <v-btn v-if="!isCounting" flat class="ms-2" @click="startTimer">
            <v-icon icon="mdi-play" color="black" v-bind="props"></v-icon>
          </v-btn>
          <v-btn class="ms-2" flat v-else-if="isCounting" @click="pauseTimer">
            <v-icon icon="mdi-pause" color="black" v-bind="props"></v-icon>
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
