<template>
  <v-container v-if="currentPlacement">
    <v-card>
      <v-card-title>
        <span class="mr-4">{{ currentPlacement.realty.address }}</span>
        <v-chip :color="placementKindColor">{{ placementKind }}</v-chip>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-carousel>
            <v-carousel-item
              v-for="url in placementImages"
              :key="url"
              cover
              :src="url"
            />
          </v-carousel>
        </v-row>

        <v-row>
          <v-col v-if="currentPlacement.rentInfo">
            <h3>Rent</h3>
            <p>Price: {{ currentPlacement.rentInfo.price }}</p>
            <p v-if="currentPlacement.rentInfo.deposit">
              Deposit: {{ currentPlacement.rentInfo.deposit }}
            </p>
            <p>
              Manager:
              <v-chip
                variant="text"
                @click="
                  router.push(`/user/${currentPlacement.rentInfo.employer.id}`)
                "
              >
                {{ currentPlacement.rentInfo.employer.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
          </v-col>

          <v-col v-if="currentPlacement.saleInfo">
            <h3>Sale</h3>
            <p>Price: {{ currentPlacement.saleInfo.price }}</p>
            <p v-if="currentPlacement.saleInfo.deposit">
              Deposit: {{ currentPlacement.saleInfo.deposit }}
            </p>
            <p>
              Manager:
              <v-chip
                variant="text"
                @click="
                  router.push(`/user/${currentPlacement.saleInfo.employer.id}`)
                "
              >
                {{ currentPlacement.saleInfo.employer.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="sessionStore.user?.isEmployer">
        <v-btn
          color="primary"
          @click="router.push(`/realty/${currentPlacement.realty.id}`)"
        >
          <v-icon>mdi-open-in-new</v-icon>
          <span>Realty</span>
        </v-btn>
        <v-btn
          v-if="currentPlacement.rentContract"
          color="secondary"
          @click="router.push(`/contract/${currentPlacement.rentContract.id}`)"
        >
          <v-icon>mdi-open-in-new</v-icon>
          <span>Rent contract</span>
        </v-btn>
        <v-btn
          v-if="currentPlacement.saleContract"
          color="accent"
          @click="router.push(`/contract/${currentPlacement.saleContract.id}`)"
        >
          <v-icon>mdi-open-in-new</v-icon>
          <span>Sale contract</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
</template>

<script setup>
  import { PLACEMENT } from '@/graphql/api';
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

  const placementId = computed(() => route.params.id);

  const queryPlacement = useQuery(
    PLACEMENT,
    () => ({
      id: placementId.value,
    }),
    {
      errorPolicy: 'ignore',
    },
  );

  const currentPlacement = computed(
    () => queryPlacement.result.value?.placement.node,
  );
  const placementKind = computed(
    () => REALTY_KIND_OF[currentPlacement.value?.realty.kind],
  );
  const placementKindColor = computed(() => {
    switch (placementKind.value) {
      case REALTY_KIND_ROOM:
        return 'primary';
      case REALTY_KIND_BUILDING:
        return 'secondary';
      case REALTY_KIND_APARTMENT:
    }

    return 'accent';
  });
  const placementImages = computed(
    () =>
      currentPlacement.value?.realty.images || [
        'https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1672082546749-f8b3e92f21d7?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?q=80&w=2345&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
  );
  const errorMessage = computed(() => queryPlacement.error.value?.message);

  const sessionStore = useSessionStore();
</script>
