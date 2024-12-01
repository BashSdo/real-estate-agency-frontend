<template>
  <v-text-field
    v-model="address"
    :label="prop.label"
    readonly
    :rules="requiredRules"
  >
    <template #append-inner>
      <v-btn size="large" variant="text" @click="showModal = true">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </template>
  </v-text-field>
  <SelectRealtyModal v-model="showModal" @selected="model = $event" />
</template>

<script setup>
  const model = defineModel();
  const prop = defineProps(['required', 'label']);

  const showModal = ref(false);

  const address = computed(() => model.value?.address || '');

  const requiredRules = [v => !!v || !prop.required || 'Required'];
</script>
