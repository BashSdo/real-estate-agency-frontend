<template>
  <v-container v-if="currentRealty">
    <v-card>
      <v-card-title>
        <span class="mr-4">{{ currentRealty.address }}</span>
        <v-chip :color="realtyKindColor">{{ realtyKind }}</v-chip>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-carousel>
            <v-carousel-item
              v-for="url in realtyImages"
              :key="url"
              cover
              :src="url"
            />
          </v-carousel>
        </v-row>

        <v-row>
          <v-col>
            <h3>Information</h3>
            <p>Created: {{ currentRealty.createdAt }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
</template>

<script setup>
  import { REALTY } from '@/graphql/api';
  import { useSessionStore } from '@/stores/session';
  import {
    REALTY_KIND_APARTMENT,
    REALTY_KIND_BUILDING,
    REALTY_KIND_OF,
    REALTY_KIND_ROOM,
  } from '@/utils/realty';

  import { useQuery } from '@vue/apollo-composable';

  const route = useRoute();
  const router = useRouter();

  const realtyId = computed(() => route.params.id);

  const queryRealty = useQuery(REALTY, () => ({
    id: realtyId.value,
  }));

  const currentRealty = computed(() => queryRealty.result.value?.realty.node);
  const realtyKind = computed(() => REALTY_KIND_OF[currentRealty.value?.kind]);
  const realtyKindColor = computed(() => {
    switch (realtyKind.value) {
      case REALTY_KIND_ROOM:
        return 'primary';
      case REALTY_KIND_BUILDING:
        return 'secondary';
      case REALTY_KIND_APARTMENT:
    }

    return 'accent';
  });
  const realtyImages = computed(
    () =>
      currentRealty.value?.images || [
        'https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1672082546749-f8b3e92f21d7?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?q=80&w=2345&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
  );
  const errorMessage = computed(() => queryRealty.error.value?.message);

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, { user }) => {
    if (!user || !user.isEmployer) {
      router.push('/');
    }
  });
</script>
