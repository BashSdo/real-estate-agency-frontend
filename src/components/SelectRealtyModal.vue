<template>
  <v-dialog v-model="model">
    <v-card>
      <div class="list-container">
        <RealtyList @selected="selected" />
      </div>
      <v-btn color="primary" @click="model = false">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
  const model = defineModel();
  const emit = defineEmits(['selected']);

  function selected (realty) {
    model.value = false;
    emit('selected', realty);
  }
</script>

<style scoped>
.list-container {
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
