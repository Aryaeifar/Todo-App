<script setup>
const totalSec = ref(0);
const totalMinute = ref("00");
const totalHour = ref("00");
const totalSecond = ref("00");
const totalTasks = ref([]);
const allFinishedTasks = ref([]);
function pad(val) {
  return val > 9 ? val : "0" + val;
}

const calcTime = () => {
  const storageTodo = JSON.parse(localStorage.getItem("todo")) || [];
  const finishedTasks = ref([]);
  totalTasks.value = storageTodo.length;
  totalSec.value = storageTodo.reduce((acc, task) => acc + (task.sec || 0), 0);
  finishedTasks.value = storageTodo.filter((task) => task.done);
  allFinishedTasks.value = finishedTasks.value.length;
  totalHour.value = pad(Math.floor(totalSec.value / 3600));
  totalMinute.value = pad(Math.floor(totalSec.value / 60) % 60);
  totalSecond.value = pad(totalSec.value % 60);
};

onMounted(() => {
  calcTime();
});
</script>
<template>
  <div>
    <h1>To-do App</h1>
    <h2 class="mb-3">Organize your work and life, finally.</h2>
    <h3 class="text-subtitle-1">
      Type just about anything into the task field and To-do App one-of-its-kind
      natural language recognition will instantly fill your to-do list.
    </h3>
    <div class="mt-6">
      <h1 class="mb-3">the way you came</h1>
      <v-row>
        <v-col cols="12" lg="4">
          <v-card class="pa-3 rounded-lg" variant="outlined">
            <v-card-title>Total time spent</v-card-title>
            <v-card-text class="mt-4">
              <div class="text-h3">
                {{ totalHour }}:{{ totalMinute }}:{{ totalSecond }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card class="pa-3 rounded-lg" variant="outlined">
            <v-card-title>Total tasks</v-card-title>
            <v-card-text class="mt-4">
              <div class="text-h3">{{ totalTasks }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card class="pa-3 rounded-lg" variant="outlined">
            <v-card-title>Finished tasks</v-card-title>
            <v-card-text class="mt-4">
              <div class="text-h3">{{ allFinishedTasks }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
