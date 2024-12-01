<template>
  <PlacementList @selected="router.push(`/placement/${$event.id}`)" />
</template>

<script setup>
  import { useSessionStore } from '@/stores/session';

  const router = useRouter();

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, { user }) => {
    if (!user) {
      router.push('/');
    }
  });
</script>
