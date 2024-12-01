<template>
  <div>
    <v-card-actions>
      <h1>Realties</h1>
      <v-btn @click="showModal = true">Add Realty</v-btn>
      <v-spacer />
      <v-text-field
        v-model="pagination.search.value"
        label="Search by address"
      />
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
    <AddRealtyModal v-model="showModal" />
  </div>
</template>

<script setup>
  import { RealtiesPagination } from '@/graphql/pagination';
  import { REALTY_KIND_OF } from '@/utils/realty';

  const pagination = new RealtiesPagination();

  const items = computed(() =>
    pagination.items.value.map(item => ({
      ...item,
      kind: REALTY_KIND_OF[item.kind],
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
    { title: 'Address', key: 'address', sortable: false },
    { title: 'Kind', key: 'kind', sortable: false },
  ];
</script>
