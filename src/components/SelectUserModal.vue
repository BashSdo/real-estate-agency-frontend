<template>
  <v-dialog v-model="model">
    <v-card>
      <div class="list-container">
        <UserList @selected="selected" />
      </div>
      <v-btn color="primary" @click="model = false">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
  const model = defineModel();
  const emit = defineEmits(['selected']);

  function selected (user) {
    model.value = false;
    emit('selected', user);
  }
</script>

<style scoped>
.list-container {
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
