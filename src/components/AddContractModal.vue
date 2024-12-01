<template>
  <v-dialog v-model="model" max-width="500px">
    <v-card>
      <v-card-title>Add Contract</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-form v-model="valid">
          <v-combobox
            v-model="contractType"
            :items="CONTRACT_KINDS"
            label="Contract Type"
          />

          <v-text-field
            v-model="name"
            label="Name"
            :rules="contractTextRules"
          />
          <v-text-field
            v-model="description"
            label="Description"
            :rules="contractTextRules"
          />

          <template v-if="contractType === CONTRACT_KIND_EMPLOYMENT">
            <SelectUserButton
              v-model="employer"
              label="Employer"
              :required="true"
            />
            <v-text-field
              v-model="price"
              label="Salary"
              :rules="requiredMoneyRules"
            />
          </template>

          <template v-if="contractType === CONTRACT_KIND_MANAGEMENT_FOR_RENT">
            <SelectRealtyButton
              v-model="realty"
              label="Realty"
              :required="true"
            />
            <SelectUserButton
              v-model="landlord"
              label="Landlord"
              :required="true"
            />
            <v-text-field
              v-model="price"
              label="Price"
              :rules="requiredMoneyRules"
            />
            <v-text-field
              v-model="deposit"
              label="Deposit"
              :rules="moneyRules"
            />
            <v-text-field
              v-model="oneTimeFee"
              label="One Time Fee"
              :rules="moneyRules"
            />
            <v-text-field
              v-model="monthlyFee"
              label="Monthly Fee"
              :rules="moneyRules"
            />
            <v-text-field
              v-model="percentFee"
              label="Percent Fee"
              :rules="numbersOnlyRules"
            />
            <v-checkbox v-model="makePlacement" label="Make Placement" />
          </template>

          <template v-if="contractType === CONTRACT_KIND_MANAGEMENT_FOR_SALE">
            <SelectRealtyButton
              v-model="realty"
              label="Realty"
              :required="true"
            />
            <SelectUserButton
              v-model="landlord"
              label="Landlord"
              :required="true"
            />
            <v-text-field
              v-model="price"
              label="Price"
              :rules="requiredMoneyRules"
            />
            <v-text-field
              v-model="deposit"
              label="Deposit"
              :rules="moneyRules"
            />
            <v-text-field
              v-model="oneTimeFee"
              label="One Time Fee"
              :rules="moneyRules"
            />
            <v-text-field
              v-model="monthlyFee"
              label="Monthly Fee"
              :rules="moneyRules"
            />
            <v-text-field
              v-model="percentFee"
              label="Percent Fee"
              :rules="numbersOnlyRules"
            />
            <v-checkbox v-model="makePlacement" label="Make Placement" />
          </template>

          <template v-if="contractType === CONTRACT_KIND_RENT">
            <SelectRealtyButton
              v-model="realty"
              label="Realty"
              :required="true"
            />
            <SelectUserButton
              v-model="purchaser"
              label="Purchaser"
              :required="true"
            />
            <v-text-field
              v-model="price"
              label="Price"
              :rules="requiredMoneyRules"
            />
            <v-text-field
              v-model="deposit"
              label="Deposit"
              :rules="moneyRules"
            />
          </template>

          <template v-if="contractType === CONTRACT_KIND_SALE">
            <SelectRealtyButton
              v-model="realty"
              label="Realty"
              :required="true"
            />
            <SelectUserButton
              v-model="purchaser"
              label="Purchaser"
              :required="true"
            />
            <v-text-field
              v-model="price"
              label="Price"
              :rules="requiredMoneyRules"
            />
            <v-text-field
              v-model="deposit"
              label="Deposit"
              :rules="moneyRules"
            />
          </template>
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
  import {
    CREATE_EMPLOYMENT_CONTRACT,
    CREATE_MANAGEMENT_FOR_RENT_CONTRACT,
    CREATE_MANAGEMENT_FOR_SALE_CONTRACT,
    CREATE_RENT_CONTRACT,
    CREATE_SALE_CONTRACT,
  } from '@/graphql/api';
  import {
    CONTRACT_KIND_EMPLOYMENT,
    CONTRACT_KIND_MANAGEMENT_FOR_RENT,
    CONTRACT_KIND_MANAGEMENT_FOR_SALE,
    CONTRACT_KIND_RENT,
    CONTRACT_KIND_SALE,
    CONTRACT_KINDS,
  } from '@/utils/contract';
  import {
    contractTextRules,
    moneyRules,
    numbersOnlyRules,
    requiredMoneyRules,
  } from '@/utils/validation';

  import { useMutation } from '@vue/apollo-composable';

  const model = defineModel();

  const valid = ref(false);
  const contractType = ref(CONTRACT_KIND_EMPLOYMENT);
  const name = ref('');
  const description = ref('');
  const realty = ref(null);
  const landlord = ref(null);
  const employer = ref(null);
  const purchaser = ref(null);
  const price = ref('');
  const deposit = ref('');
  const oneTimeFee = ref('');
  const monthlyFee = ref('');
  const percentFee = ref('');
  const makePlacement = ref('');
  const errorMessage = ref(null);

  const mutationCreateEmploymentContract = useMutation(
    CREATE_EMPLOYMENT_CONTRACT,
    () => ({
      variables: {
        name: name.value,
        description: description.value,
        userId: employer.value.id,
        baseSalary: price.value,
      },
    }),
  );
  const mutationCreateManagementForRentContract = useMutation(
    CREATE_MANAGEMENT_FOR_RENT_CONTRACT,
    () => ({
      variables: {
        name: name.value,
        description: description.value,
        realtyId: realty.value.id,
        landlordId: landlord.value.id,
        expectedPrice: price.value,
        expectedDeposit: deposit.value || null,
        oneTimeFee: oneTimeFee.value || null,
        monthlyFee: monthlyFee.value || null,
        percentFee: percentFee.value || null,
        makePlacement: makePlacement.value,
      },
    }),
  );
  const mutationCreateManagementForSaleContract = useMutation(
    CREATE_MANAGEMENT_FOR_SALE_CONTRACT,
    () => ({
      variables: {
        name: name.value,
        description: description.value,
        realtyId: realty.value.id,
        landlordId: landlord.value.id,
        expectedPrice: price.value,
        expectedDeposit: deposit.value || null,
        oneTimeFee: oneTimeFee.value || null,
        monthlyFee: monthlyFee.value || null,
        percentFee: percentFee.value || null,
        makePlacement: makePlacement.value,
      },
    }),
  );
  const mutationCreateRentContract = useMutation(CREATE_RENT_CONTRACT, () => ({
    variables: {
      name: name.value,
      description: description.value,
      realtyId: realty.value.id,
      purchaserId: purchaser.value.id,
      price: price.value,
      deposit: deposit.value || null,
    },
  }));
  const mutationCreateSaleContract = useMutation(CREATE_SALE_CONTRACT, () => ({
    variables: {
      name: name.value,
      description: description.value,
      realtyId: realty.value.id,
      purchaserId: purchaser.value.id,
      price: price.value,
      deposit: deposit.value || null,
    },
  }));

  async function persist () {
    try {
      switch (contractType.value) {
        case CONTRACT_KIND_EMPLOYMENT:
          await mutationCreateEmploymentContract.mutate();
          break;
        case CONTRACT_KIND_MANAGEMENT_FOR_RENT:
          await mutationCreateManagementForRentContract.mutate();
          break;
        case CONTRACT_KIND_MANAGEMENT_FOR_SALE:
          await mutationCreateManagementForSaleContract.mutate();
          break;
        case CONTRACT_KIND_RENT:
          await mutationCreateRentContract.mutate();
          break;
        case CONTRACT_KIND_SALE:
          await mutationCreateSaleContract.mutate();
          break;
      }
      model.value = false;
    } catch (err) {
      errorMessage.value = err.message;
    }
  }

  function reset () {
    valid.value = false;
    name.value = '';
    description.value = '';
    realty.value = null;
    landlord.value = null;
    employer.value = null;
    purchaser.value = null;
    price.value = '';
    deposit.value = '';
    oneTimeFee.value = '';
    monthlyFee.value = '';
    percentFee.value = '';
    makePlacement.value = false;
    errorMessage.value = null;
  }

  watch(model, () => {
    reset();
    contractType.value = CONTRACT_KIND_EMPLOYMENT;
  });
  watch(contractType, reset);
</script>
