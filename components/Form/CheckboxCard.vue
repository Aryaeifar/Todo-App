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
const emit = defineEmits([
  "delete-todo",
  "done-todo",
  "counter-update",
  "color-update",
]);

// delete todo

const deleteTodo = () => {
  $flashMsg.error({
    text: `${props.todo.text} task has been removed`,
  });
  emit("delete-todo");
};

// Update done

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

// Update time

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
  const storedTime = JSON.parse(localStorage.getItem(`${props.todo.id}-timer`));
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

// Update color

const inputColor = ref(props.todo.color || "#000000");
const updateColor = () => {
  emit("color-update", inputColor.value);
};
watch(inputColor, (newColor) => {
  inputColor.value = newColor;
});
</script>

<template>
  <v-card
    variant="outlined"
    class="todo-card rounded-lg h-100 d-flex flex-column justify-space-between"
    :style="{
      borderColor: inputColor,
      borderWidth: '3px',
      borderStyle: 'solid',
    }"
  >
    <v-card-title>
      <div v-if="!isTodo" class="d-flex justify-space-between align-center">
        <v-checkbox v-model="props.todo.done" @change="doneTodo">
          <template v-slot:label>
            <div :class="props.todo.done ? 'text-decoration-line-through' : ''">
              {{ todo.text }}
            </div>
          </template>
        </v-checkbox>
        <v-icon icon="mdi-drag-horizontal" class="drag-icon"></v-icon>
      </div>
      <div v-else>
        {{ todo.text }}
      </div>
    </v-card-title>

    <v-card-item>
      <div class="d-flex align-center justify-space-between" v-if="!isTodo">
        <div class="ms-3">
          <span>{{ hours }}</span
          >:<span>{{ minutes }}</span
          >:<span>{{ seconds }}</span>
        </div>
        <div class="d-flex align-center gap-3">
          <div class="d-flex align-center justify-center">
            <v-tooltip text="play" location="bottom" v-if="!isCounting">
              <template v-slot:activator="{ props }">
                <v-icon
                  v-if="!isCounting"
                  icon="mdi-play"
                  color="black"
                  v-bind="props"
                  class="mx-1"
                  @click="startTimer"
                  size="small"
                ></v-icon>
              </template>
            </v-tooltip>

            <v-tooltip text="Pause" location="bottom" v-else-if="isCounting">
              <template v-slot:activator="{ props }">
                <v-icon
                  icon="mdi-pause"
                  color="black"
                  class="mx-1"
                  @click="pauseTimer"
                  size="small"
                  v-bind="props"
                ></v-icon>
              </template>
            </v-tooltip>
          </div>
          <input
            type="color"
            id="favcolor"
            name="favcolor"
            class="color-picker mr-1"
            @change="updateColor"
            v-model="inputColor"
          />
          <v-tooltip text="Delete" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon
                icon="mdi-delete-empty"
                color="red"
                v-bind="props"
                size="small"
                @click="deleteTodo"
              ></v-icon>
            </template>
          </v-tooltip>
        </div>
      </div>
      <div v-else>
        {{ todo.date }}
      </div>
    </v-card-item>
  </v-card>
</template>

<style lang="scss" scoped></style>
