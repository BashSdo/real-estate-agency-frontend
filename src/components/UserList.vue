<template>
  <v-card-actions>
    <h1>Users</h1>
    <v-spacer />
    <v-text-field v-model="pagination.search.value" label="Search by name" />
  </v-card-actions>
  <v-alert v-if="pagination.error.value" dismissible type="error">
    {{ pagination.error.value }}
  </v-alert>
  <v-data-table-server
    v-model:page="pagination.page.value"
    class="elevation-1"
    :headers="headers"
    :items="pagination.items.value"
    :items-length="pagination.totalCount.value"
    :items-per-page="pagination.itemsPerPage.value"
    :loading="pagination.loading.value"
    @click:row="selectItem"
    @update:items-per-page="
      pagination.itemsPerPage.value =
        $event > 0 ? $event : pagination.totalCount.value
    "
    @update:options="pagination.page.value = $event.page"
  />
</template>

<script setup>
  import { UsersPagination } from '@/graphql/pagination';

  const pagination = new UsersPagination();

  const emit = defineEmits(['selected']);
  function selectItem (event, { item }) {
    emit('selected', item);
  }

  const headers = [
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Email', key: 'email', sortable: false },
    { title: 'Phone', key: 'phone', sortable: false },
  ];
</script>
