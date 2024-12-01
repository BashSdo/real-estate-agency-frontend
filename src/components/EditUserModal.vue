<template>
  <v-dialog v-model="model" max-width="500px">
    <v-card>
      <v-card-title>Edit Profile</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-form v-model="valid">
          <v-text-field v-model="name" label="Name" :rules="nameRules" />
          <v-text-field v-model="email" label="Email" :rules="emailRules" />
          <v-text-field v-model="phone" label="Phone" :rules="phoneRules" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="model = false">Cancel</v-btn>
        <v-btn :disabled="!valid" @click="persist">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';
  import { emailRules, nameRules, phoneRules } from '@/utils/validation';

  const sessionStore = useSessionStore();

  const model = defineModel();

  const valid = ref(false);
  const name = ref(sessionStore.user?.name);
  const email = ref(sessionStore.user?.email);
  const phone = ref(sessionStore.user?.phone);
  const errorMessage = ref(null);

  async function persist () {
    const namePromise =
      name.value !== sessionStore.user?.name &&
      sessionStore.updateUserName(name.value);
    const emailPromise =
      email.value !== sessionStore.user?.email &&
      sessionStore.updateUserEmail(email.value);
    const phonePromise =
      phone.value !== sessionStore.user?.phone &&
      sessionStore.updateUserPhone(phone.value);
    try {
      await Promise.all([namePromise, emailPromise, phonePromise]);
      model.value = false;
    } catch (err) {
      errorMessage.value = err.message;
    }
  }

  function reset () {
    name.value = sessionStore.user?.name;
    email.value = sessionStore.user?.email;
    phone.value = sessionStore.user?.phone;
    errorMessage.value = null;
  }

  watch(model, reset);
</script>
