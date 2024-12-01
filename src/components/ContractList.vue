<template>
  <div>
    <v-card-actions>
      <h1>Contracts</h1>
      <v-btn @click="showModal = true">Add Contract</v-btn>
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
      :items="items"
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
    <AddContractModal v-model="showModal" />
  </div>
</template>

<script setup>
  import { ContractsPagination } from '@/graphql/pagination';
  import { CONTRACT_KIND_OF } from '@/utils/contract';

  const pagination = new ContractsPagination();

  const items = computed(() =>
    pagination.items.value.map(contract => ({
      ...contract,
      kind: CONTRACT_KIND_OF[contract.__typename],
    })),
  );

  const emit = defineEmits(['selected']);
  function selectItem (event, { item }) {
    emit('selected', item);
  }

  const showModal = ref(false);
  watch(showModal, value => {
    if (!value) {
      pagination.refreshPage();
    }
  });

  const headers = [
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Kind', key: 'kind', sortable: false },
  ];
</script>
