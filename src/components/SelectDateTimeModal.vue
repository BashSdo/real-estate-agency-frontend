<template>
  <v-dialog v-model="model" max-width="380">
    <v-card>
      <v-card-text>
        <v-date-picker v-model="dateTime" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="model = false">Cancel</v-btn>
        <v-btn color="primary" @click="selected">Select</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  const model = defineModel();
  const props = defineProps(['dateTime']);
  const emit = defineEmits(['selected']);

  const dateTime = ref(props.dateTime);

  function selected () {
    model.value = false;
    emit('selected', dateTime.value);
  }

  function reset () {
    dateTime.value = props.dateTime;
  }

  watch(model, reset);
</script>
