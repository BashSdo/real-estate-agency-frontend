<template>
  <v-data-table :headers="headers" :items="items" @click:row="selectItem" />
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';

  const router = useRouter();

  const headers = [{ title: 'Name', key: 'name', sortable: false }];

  const items = [{ name: 'Salary', url: '/report/salary' }];

  function selectItem (event, { item }) {
    router.push(item.url);
  }

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, { user }) => {
    if (!user || !user.isEmployer) {
      router.push('/');
    }
  });
</script>
