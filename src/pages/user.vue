<template>
  <v-container v-if="currentUser">
    <v-card>
      <v-row>
        <v-col md="2">
          <v-avatar class="ma-4" color="orange" round size="128">
            <span class="text-h1">{{ currentUser.name.substring(0, 1) }}</span>
          </v-avatar>
        </v-col>
        <v-col>
          <v-card-title>
            <span class="mr-4">{{ currentUser.name }}</span>
            <v-chip v-if="currentUser.login">@{{ currentUser.login }}</v-chip>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <p v-if="currentUser.email">Email: {{ currentUser.email }}</p>
            <p v-if="currentUser.phone">Phone: {{ currentUser.phone }}</p>
            <p>Created: {{ currentUser.createdAt }}</p>
          </v-card-text>
          <v-card-actions v-if="isCurrentUser">
            <v-btn color="primary" @click="isEditing = true">
              <v-icon>mdi-pencil</v-icon>
              <span>Edit</span>
            </v-btn>
            <v-btn color="primary" @click="isChangingPassword = true">
              <v-icon>mdi-lock</v-icon>
              <span>Change password</span>
            </v-btn>
            <v-btn color="error" @click="sessionStore.signOut">
              <v-icon>mdi-logout</v-icon>
              <span>Sign out</span>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <EditUserModal v-model="isEditing" />
    <EditUserPasswordModal v-model="isChangingPassword" />
  </v-container>
  <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
</template>

<script setup>
  import { USER } from '@/graphql/api';
  import { useSessionStore } from '@/stores/session';

  import { useQuery } from '@vue/apollo-composable';

  const route = useRoute();
  const router = useRouter();

  const sessionStore = useSessionStore();

  const userId = ref(null);
  async function updateUserId () {
    userId.value = route.params.id || sessionStore.user?.id;
    if (!userId.value) {
      router.push('/');
      throw new Error('Logged out');
    }
  }

  watch(route, () => updateUserId(), { immediate: true });
  sessionStore.$subscribe(() => updateUserId());

  const queryUser = useQuery(USER, () => ({ id: userId.value }));

  const currentUser = computed(() => queryUser.result.value?.user.node);
  const isCurrentUser = computed(
    () => currentUser.value?.id === sessionStore.user?.id,
  );
  const errorMessage = computed(() => queryUser.error.value?.message);

  const isEditing = ref(false);
  const isChangingPassword = ref(false);
</script>
