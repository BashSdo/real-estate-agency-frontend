<template>
  <v-text-field
    v-model="name"
    :label="prop.label"
    readonly
    :rules="requiredRules"
  >
    <template #append-inner>
      <v-btn size="large" variant="text" @click="showModal = true">
        <v-icon>mdi-contacts</v-icon>
      </v-btn>
    </template>
  </v-text-field>
  <SelectUserModal v-model="showModal" @selected="model = $event" />
</template>

<script setup>
  const model = defineModel();
  const prop = defineProps(['required', 'label']);

  const showModal = ref(false);

  const name = computed(() => model.value?.name || '');

  const requiredRules = [v => !!v || !prop.required || 'Required'];
</script>
