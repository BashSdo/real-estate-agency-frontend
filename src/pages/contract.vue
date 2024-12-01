<template>
  <v-container v-if="currentContract">
    <v-card>
      <v-card-title>
        <span class="mr-4">{{ currentContract.name }}</span>
        <v-chip :color="contractKindColor">{{ contractKind }}</v-chip>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <h3>Description</h3>
            <p>{{ currentContract.description }}</p>
          </v-col>
          <v-col>
            <h3>Information</h3>
            <p>Created: {{ currentContract.createdAt }}</p>
            <p v-if="currentContract.expiresAt">
              Expires: {{ currentContract.expiresAt }}
            </p>
            <p v-if="currentContract.terminatedAt">
              Terminated: {{ currentContract.terminatedAt }}
            </p>
          </v-col>
        </v-row>

        <v-row v-if="contractKind == CONTRACT_KIND_EMPLOYMENT">
          <v-col>
            <h3>Objects and Subjects</h3>
            <p>
              Employer:
              <v-chip
                variant="text"
                @click="router.push(`/user/${currentContract.employer.id}`)"
              >
                {{ currentContract.employer.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
          </v-col>
          <v-col>
            <p>Salary: {{ currentContract.baseSalary }}</p>
          </v-col>
        </v-row>

        <v-row
          v-if="
            contractKind == CONTRACT_KIND_MANAGEMENT_FOR_RENT ||
              contractKind == CONTRACT_KIND_MANAGEMENT_FOR_SALE
          "
        >
          <v-col>
            <h3>Objects and Subjects</h3>
            <p>
              Realty:
              <v-chip
                variant="text"
                @click="router.push(`/realty/${currentContract.realty.id}`)"
              >
                {{ currentContract.realty.address }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
            <p>
              Landlord:
              <v-chip
                variant="text"
                @click="router.push(`/user/${currentContract.landlord.id}`)"
              >
                {{ currentContract.landlord.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
            <p>
              Manager:
              <v-chip
                variant="text"
                @click="router.push(`/user/${currentContract.employer.id}`)"
              >
                {{ currentContract.employer.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
          </v-col>
          <v-col>
            <p>Expected Price: {{ currentContract.expectedPrice }}</p>
            <p v-if="currentContract.expectedDeposit">
              Expected Deposit: {{ currentContract.expectedDeposit }}
            </p>
            <p v-if="currentContract.oneTimeFee">
              One Time Fee: {{ currentContract.oneTimeFee }}
            </p>
            <p v-if="currentContract.monthlyFee">
              Monthly Fee: {{ currentContract.monthlyFee }}
            </p>
            <p v-if="currentContract.percentFee">
              Percent Fee: {{ currentContract.percentFee }}
            </p>
          </v-col>
        </v-row>

        <v-row
          v-if="
            contractKind == CONTRACT_KIND_RENT ||
              contractKind == CONTRACT_KIND_SALE
          "
        >
          <v-col>
            <h3>Objects and Subjects</h3>
            <p>
              Realty:
              <v-chip
                variant="text"
                @click="router.push(`/realty/${currentContract.realty.id}`)"
              >
                {{ currentContract.realty.address }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
            <p>
              Landlord:
              <v-chip
                variant="text"
                @click="router.push(`/user/${currentContract.landlord.id}`)"
              >
                {{ currentContract.landlord.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
            <p>
              Manager:
              <v-chip
                variant="text"
                @click="router.push(`/user/${currentContract.employer.id}`)"
              >
                {{ currentContract.employer.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
            <p>
              Purchaser:
              <v-chip
                variant="text"
                @click="router.push(`/user/${currentContract.purchaser.id}`)"
              >
                {{ currentContract.purchaser.name }}
                <v-icon>mdi-open-in-new</v-icon>
              </v-chip>
            </p>
          </v-col>
          <v-col>
            <p>Price: {{ currentContract.price }}</p>
            <p v-if="currentContract.deposit">
              Deposit: {{ currentContract.deposit }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="!currentContract.terminatedAt">
        <v-btn
          v-if="currentContract.isPlaced"
          color="primary"
          @click="router.push(`/placement/${currentContract.realty.id}`)"
        >
          <v-icon>mdi-open-in-new</v-icon>
          <span>Placement</span>
        </v-btn>
        <v-btn
          v-if="
            contractKind == CONTRACT_KIND_MANAGEMENT_FOR_RENT ||
              contractKind == CONTRACT_KIND_MANAGEMENT_FOR_SALE
          "
          color="primary"
          @click="toggleContractPlacement"
        >
          <v-icon>mdi-account-arrow-right</v-icon>
          <span>{{ (currentContract.isPlaced && "Deplace") || "Place" }}</span>
        </v-btn>
        <v-btn color="error" @click="terminateContract">
          <v-icon>mdi-delete</v-icon>
          <span>Terminate</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
</template>

<script setup>
  import {
    CONTRACT,
    TERMINATE_CONTRACT,
    TOGGLE_CONTRACT_PLACEMENT,
  } from '@/graphql/api';
  import { useSessionStore } from '@/stores/session';
  import {
    CONTRACT_KIND_EMPLOYMENT,
    CONTRACT_KIND_MANAGEMENT_FOR_RENT,
    CONTRACT_KIND_MANAGEMENT_FOR_SALE,
    CONTRACT_KIND_OF,
    CONTRACT_KIND_RENT,
    CONTRACT_KIND_SALE,
  } from '@/utils/contract';

  import { useMutation, useQuery } from '@vue/apollo-composable';

  const route = useRoute();
  const router = useRouter();

  const contractId = computed(() => route.params.id);

  const queryContract = useQuery(CONTRACT, () => ({
    id: contractId.value,
  }));

  const mutationToggleContractPlacement = useMutation(
    TOGGLE_CONTRACT_PLACEMENT,
    () => ({
      variables: {
        id: contractId.value,
        isPlaced: !currentContract.value.isPlaced,
      },
    }),
  );

  const mutationTerminateContract = useMutation(TERMINATE_CONTRACT, () => ({
    variables: {
      id: contractId.value,
    },
  }));

  const currentContract = computed(
    () => queryContract.result.value?.contract.node,
  );
  const contractKind = computed(
    () => CONTRACT_KIND_OF[currentContract.value?.__typename],
  );
  const contractKindColor = computed(() => {
    if (
      currentContract.value.terminatedAt ||
      (currentContract.value.expiresAt &&
        new Date(currentContract.value.expiresAt) < new Date())
    ) {
      return 'error';
    }
    return 'primary';
  });
  const errorMessage = computed(() => queryContract.error.value?.message);

  async function toggleContractPlacement () {
    await mutationToggleContractPlacement.mutate();
    queryContract.refetch();
  }

  async function terminateContract () {
    await mutationTerminateContract.mutate();
    queryContract.refetch();
  }

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, { user }) => {
    if (!user || !user.isEmployer) {
      router.push('/');
    }
  });
</script>
