<template>
  <v-dialog v-model="model" max-width="500px">
    <v-card>
      <v-card-title>Add Realty</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-form v-model="valid">
          <v-text-field
            v-model="country"
            label="Country"
            :rules="requiredAddressRules"
          />
          <v-text-field v-model="state" label="State" :rules="addressRules" />
          <v-text-field
            v-model="city"
            label="City"
            :rules="requiredAddressRules"
          />
          <v-text-field
            v-model="street"
            label="Street"
            :rules="requiredAddressRules"
          />
          <v-text-field
            v-model="zipCode"
            label="Zip Code"
            :rules="addressRules"
          />
          <v-text-field
            v-model="buildingName"
            label="Building Name"
            :rules="requiredAddressRules"
          />
          <v-text-field
            v-model="numFloors"
            label="Number of Floors"
            :rules="requiredNumbersOnlyRules"
          />
          <v-text-field
            v-model="floor"
            label="Floor"
            :rules="numbersOnlyRules"
          />
          <v-text-field
            v-model="apartmentNum"
            label="Apartment Number"
            :rules="addressRules"
          />
          <v-text-field
            v-model="roomNum"
            label="Room Number"
            :rules="addressRules"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="model = false">Cancel</v-btn>
        <v-btn :disabled="!valid" @click="persist">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { CREATE_REALTY } from '@/graphql/api';
  import {
    addressRules,
    numbersOnlyRules,
    requiredAddressRules,
    requiredNumbersOnlyRules,
  } from '@/utils/validation';

  import { useMutation } from '@vue/apollo-composable';

  const mutationCreateRealty = useMutation(CREATE_REALTY, () => ({
    variables: {
      country: country.value,
      state: state.value || null,
      city: city.value,
      street: street.value,
      zipCode: zipCode.value || null,
      buildingName: buildingName.value,
      numFloors: Number(numFloors.value),
      floor: Number(floor.value) || null,
      apartmentNum: apartmentNum.value || null,
      roomNum: roomNum.value || null,
    },
  }));

  const model = defineModel();

  const valid = ref(false);
  const country = ref('');
  const state = ref('');
  const city = ref('');
  const street = ref('');
  const zipCode = ref('');
  const buildingName = ref('');
  const numFloors = ref('');
  const floor = ref('');
  const apartmentNum = ref('');
  const roomNum = ref('');
  const errorMessage = ref(null);

  async function persist () {
    try {
      await mutationCreateRealty.mutate();
      model.value = false;
    } catch (err) {
      errorMessage.value = err.message;
    }
  }

  function reset () {
    country.value = '';
    state.value = '';
    city.value = '';
    street.value = '';
    zipCode.value = '';
    buildingName.value = '';
    numFloors.value = '';
    floor.value = '';
    apartmentNum.value = '';
    roomNum.value = '';
    errorMessage.value = null;
  }

  watch(model, reset);
</script>
