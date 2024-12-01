<template>
  <v-text-field v-model="dateTime" :label="prop.label" readonly required>
    <template #append-inner>
      <v-btn size="large" variant="text" @click="showModal = true">
        <v-icon>mdi-calendar-clock</v-icon>
      </v-btn>
    </template>
  </v-text-field>
  <SelectDateTimeModal
    v-model="showModal"
    :date-time="model"
    @selected="model = $event"
  />
</template>

<script setup>
  const model = defineModel();
  const prop = defineProps(['label']);

  const showModal = ref(false);

  const dateTime = computed(() => model.value?.toLocaleString() || '');
</script>
