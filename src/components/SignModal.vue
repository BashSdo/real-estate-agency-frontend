<template>
  <v-dialog v-model="model" max-width="400">
    <v-card>
      <v-card-title>
        <span class="headline">{{ mode ? "Sign Up" : "Sign In" }}</span>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-form v-model="valid">
          <v-text-field
            v-if="mode"
            v-model="name"
            label="Name"
            :rules="nameRules"
          />
          <v-text-field v-model="login" label="Login" :rules="loginRules" />
          <v-text-field
            v-model="password"
            label="Password"
            :rules="passwordRules"
            type="password"
          />
          <v-text-field
            v-if="mode"
            v-model="passwordConfirmation"
            label="Password Confirmation"
            :rules="passwordConfirmRules"
            type="password"
          />
          <v-text-field
            v-if="mode"
            v-model="email"
            label="Email"
            :rules="emailRules"
          />
          <v-text-field
            v-if="mode"
            v-model="phone"
            label="Phone"
            :rules="phoneRules"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="mode = !mode">{{
          mode ? "Sign In" : "Sign Up"
        }}</v-btn>
        <v-btn text @click="model = false">Close</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="submit">{{
          mode ? "Sign Up" : "Sign In"
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';
  import {
    emailRules,
    loginRules,
    nameRules,
    passwordRules,
    phoneRules,
  } from '@/utils/validation';

  const sessionStore = useSessionStore();

  const model = defineModel();

  const mode = ref(false); // `false` - sign in, `true` - sign up
  const valid = ref(false);
  const name = ref('');
  const login = ref('');
  const password = ref('');
  const passwordConfirmation = ref('');
  const email = ref('');
  const phone = ref('');
  const errorMessage = ref(null);

  const passwordConfirmRules = [
    v => !!v || 'Required',
    v => v === password.value || 'Passwords do not match',
  ];

  async function submit () {
    try {
      if (mode.value) {
        await sessionStore.signUp(
          name.value,
          login.value,
          password.value,
          email.value,
          phone.value,
        );
      } else {
        await sessionStore.signIn(login.value, password.value);
      }
    } catch (err) {
      errorMessage.value = err.message;
      return;
    }
    model.value = false;
  }

  function reset () {
    valid.value = false;
    name.value = '';
    login.value = '';
    password.value = '';
    passwordConfirmation.value = '';
    email.value = '';
    phone.value = '';
    errorMessage.value = null;
  }

  watch(model, () => {
    reset();
    mode.value = false;
  });
  watch(mode, reset);
</script>
