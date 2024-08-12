<script setup>
const totalSec = ref(0);
const totalMinute = ref("00");
const totalHour = ref("00");
const totalSecond = ref("00");

function pad(val) {
  return val > 9 ? val : "0" + val;
}

const calcTime = () => {
  const storageTodo = JSON.parse(localStorage.getItem("todo")) || [];
  totalSec.value = storageTodo.reduce((acc, task) => acc + (task.sec || 0), 0);
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
    <h1>Project list</h1>
    <h2>Organize your work and life, finally.</h2>
    <div class="mt-6">
      <v-row>
        <v-col cols="12" lg="4">
          <v-card class="pa-3">
            <v-card-title>Total time spent:</v-card-title>
            <v-card-text>
              {{ totalHour }}:{{ totalMinute }}:{{ totalSecond }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
