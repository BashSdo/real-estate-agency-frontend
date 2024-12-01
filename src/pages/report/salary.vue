<template>
  <v-card-actions>
    <h1>Salary</h1>
    <v-spacer />
    <p>From:</p>
    <SelectDateTimeButton v-model="startAt" />
    <p>To:</p>
    <SelectDateTimeButton v-model="endAt" />
  </v-card-actions>
  <v-alert v-if="errorMessage" dismissible type="error">
    {{ errorMessage }}
  </v-alert>
  <v-data-table :headers="headers" :items="items">
    <template #item.user.name="{ item }">
      <v-chip variant="text" @click="router.push(`/user/${item.user.id}`)">
        {{ item.user.name }}
        <v-icon>mdi-open-in-new</v-icon>
      </v-chip>
    </template>
    <template #item.contractsCount="{ item }">
      {{ item.contractsCount }}
    </template>
    <template #item.salary="{ item }">
      {{ item.salary }}
    </template>
  </v-data-table>
</template>

<script setup>
  import { SALARY_REPORT } from '@/graphql/api';
  import { useSessionStore } from '@/stores/session';

  import { useQuery } from '@vue/apollo-composable';

  const router = useRouter();

  const endAt = ref(new Date());
  const startAt = ref(
    (() => {
      const dt = new Date();
      dt.setDate(1);
      return dt;
    })(),
  );

  const querySalaryReport = useQuery(SALARY_REPORT, () => ({
    startAt: startAt.value?.toISOString(),
    endAt: endAt.value?.toISOString(),
  }));
  const items = computed(() => querySalaryReport.result.value?.salaryReport.rows);
  const errorMessage = computed(() => querySalaryReport.error.value?.message);

  const headers = [
    { title: 'Employer', key: 'user.name', sortable: false },
    { title: 'Contracts count', key: 'contractsCount', sortable: false },
    { title: 'Salary', key: 'salary', sortable: false },
  ];

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, { user }) => {
    if (!user || !user.isEmployer) {
      router.push('/');
    }
  });
</script>
