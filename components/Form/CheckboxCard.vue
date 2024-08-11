<script setup>
const { $flashMsg } = useNuxtApp();

const props = defineProps({
  todo: {
    type: Object,
  },
});
const emit = defineEmits(["delete-todo", "done-todo"]);
// const checkbox = ref(props.todo.done);

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
</script>

<template>
  <div
    class="todo-card rounded border pa-1 mb-3 d-flex justify-space-between align-center"
  >
    <v-checkbox v-model="props.todo.done" @change="doneTodo">
      <template v-slot:label>
        <div :class="props.todo.done ? 'text-decoration-line-through' : ''">
          {{ todo.text }}
        </div>
      </template>
    </v-checkbox>
    <div>
      <v-btn flat @click="deleteTodo">
        <v-tooltip text="Delete" location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon icon="mdi-delete-empty" color="red" v-bind="props"></v-icon>
          </template>
        </v-tooltip>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
