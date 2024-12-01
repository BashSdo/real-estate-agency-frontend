<template>
  <ContractList @selected="router.push(`/contract/${$event.id}`)" />
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';

  const router = useRouter();

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, { user }) => {
    if (!user || !user.isEmployer) {
      router.push('/');
    }
  });
</script>
