<template>
  <header>
    <v-app-bar app>
      <template #title>
        <v-btn class="no-highlight" :ripple="false" to="/" variant="plain">
          <img height="40" src="@/assets/logo.svg">
        </v-btn>

        <template v-if="sessionStore.user">
          <v-btn text to="/placements">Placements</v-btn>

          <template v-if="sessionStore.user.isEmployer">
            <v-btn text to="/contracts">Contracts</v-btn>
            <v-btn text to="/realties">Realties</v-btn>
            <v-btn text to="/users">Users</v-btn>
            <v-btn text to="/reports">Reports</v-btn>
          </template>
        </template>
      </template>

      <template #append>
        <v-btn
          v-if="sessionStore.user"
          class="no-highlight"
          text
          to="/user"
          variant="plain"
        >
          <template #prepend>
            <v-avatar color="orange" round size="small">
              <span class="text-h5">{{
                sessionStore.user.name.substring(0, 1)
              }}</span>
            </v-avatar>
          </template>
          <span class="profile-name"> {{ sessionStore.user.name }} </span>
        </v-btn>
        <v-btn
          v-if="!sessionStore.user"
          text
          @click="showModal = true"
        >Sign In/Sign Up</v-btn>
      </template>
    </v-app-bar>
    <SignModal v-model="showModal" />
  </header>
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';

  const showModal = ref(false);

  const sessionStore = useSessionStore();
</script>

<style scoped>
.profile-name {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-btn.no-highlight {
  opacity: 1 !important;
}
</style>
