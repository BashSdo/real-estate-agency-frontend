<template>
  <div>
    <v-card-actions>
      <h1>Placements</h1>
      <v-spacer />
      <v-checkbox label="For rent" :model-value="pagination.includeRent" />
      <v-checkbox label="For sale" :model-value="pagination.includeSale" />
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
  </div>
</template>

<script setup>
  import { PlacementsPagination } from '@/graphql/pagination';

  const pagination = new PlacementsPagination();

  const items = computed(() =>
    pagination.items.value.map(placement => ({
      ...placement,
      id: placement.realty.id,
      address: placement.realty.address,
      kind: placement.realty.kind,
      rentPrice: placement.rentInfo ? placement.rentInfo.price : null,
      salePrice: placement.saleInfo ? placement.saleInfo.price : null,
    })),
  );

  const emit = defineEmits(['selected']);
  function selectItem (event, { item }) {
    emit('selected', item);
  }

  const headers = [
    { title: 'Address', key: 'address', sortable: false },
    { title: 'Kind', key: 'kind', sortable: false },
    { title: 'Rent price', key: 'rentPrice', sortable: false },
    { title: 'Sale price', key: 'salePrice', sortable: false },
  ];
</script>
