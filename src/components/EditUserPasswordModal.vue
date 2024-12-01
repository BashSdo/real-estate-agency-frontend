<template>
  <v-dialog v-model="model" max-width="500px">
    <v-card>
      <v-card-title>Edit Password</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-form v-model="valid">
          <v-text-field
            v-model="oldPassword"
            label="Old Password"
            :rules="passwordRules"
            type="password"
          />
          <v-text-field
            v-model="newPassword"
            label="New Password"
            :rules="passwordRules"
            type="password"
          />
          <v-text-field
            v-model="newPasswordConfirmation"
            label="New Password Confirmation"
            :rules="passwordConfirmRules"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="model = false">Cancel</v-btn>
        <v-btn :disabled="!valid" @click="editPassword">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';

  const sessionStore = useSessionStore();

  const model = defineModel();

  const valid = ref(false);
  const oldPassword = ref('');
  const newPassword = ref('');
  const newPasswordConfirmation = ref('');
  const errorMessage = ref(null);

  const passwordConfirmRules = [
    v => !!v || 'Required',
    v => v === newPassword.value || 'Passwords do not match',
  ];

  async function editPassword () {
    if (oldPassword.value === newPassword.value) {
      model.value = false;
      return;
    }

    try {
      await sessionStore.updateUserPassword(newPassword.value, oldPassword.value);
      model.value = false;
    } catch (err) {
      errorMessage.value = err.message;
    }
  }

  function reset () {
    oldPassword.value = '';
    newPassword.value = '';
    newPasswordConfirmation.value = '';
    errorMessage.value = null;
  }

  watch(model, reset);
</script>
