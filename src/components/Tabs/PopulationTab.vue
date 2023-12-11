<script setup>
import { ref, watchEffect, watch } from "vue"
import Spinner from "../reusable/Spinner.vue"

import populationStore from "../../stores/population/index"
const getPopulationStore = populationStore();

const city_id = ref('')
const country_id = ref('')
const young_male = ref('')
const young_female = ref('')
const old_male = ref('')
const old_female = ref('')
const child_male = ref('')
const child_female = ref('')
const errors = ref({})

getPopulationStore.getCountries()

watchEffect(async () => {
    await getPopulationStore.getCities({ country: country_id.value });
});

const hasError = (key) => {
    if (errors.value[key]) {
        return errors.value[key][0];
    }
    return null;
};

const addPopulation = () => {
    getPopulationStore.createPopulation({
        city_id: city_id.value,
        old_male: old_male.value,
        old_female: old_female.value,
        young_female: young_female.value,
        young_male: young_male.value,
        child_female: child_female.value,
        child_male: child_male.value

    }).then(res => {

        errors.value = null;
        city_id.value = "";
        old_male.value = "";
        old_female.value = "";
        young_female.value = "";
        young_male.value = "";
        child_female.value = "";
        child_male.value = "";

        alert("Population created successfully");

    }).catch(err => {
        if (err.response.status === 422) errors.value = err.response.data.errors

    });
}

</script>
<template>

    <div class="flex space-x-3 mt-3">
        <div class="">
            <h2>Country Name : </h2>
            <select :class="['p-2 border border-green-600 outline-none', hasError('country_id') ? 'border-red-600' : '']"
                v-model="country_id">
                <option disabled value="">Select Country</option>
                <option v-for="(country, idx) in getPopulationStore.countries" :key="country.id" :value="country.id">{{
                    country.name }}</option>

            </select>
        </div>
        <div class="">
            <h2>City/State : </h2>
            <select :class="['p-2 border border-green-600 outline-none', hasError('city_id') ? 'border-red-600' : '']"
                v-model="city_id">
                <option disabled value="">Select City</option>
                <option v-for="(city, idx) in getPopulationStore.cities" :key="city.id" :value="city.id">{{ city.name }}
                </option>

            </select>
        </div>


    </div>

    <div class="mt-2 space-y-3">
        <div>
            <fieldset class="border border-green-600 px-2 py-3 space-x-1">
                <legend>Young:</legend>
                <label for="young_male">Male:</label>
                <input type="text" v-model="young_male"
                    :class="['p-2 w-1/4 border border-green-600 outline-none', hasError('young_male') ? 'border-red-600' : '']">
                <label for="young_female">Female:</label>
                <input type="text" v-model="young_female"
                    :class="['p-2 w-1/4 border border-green-600 outline-none', hasError('young_female') ? 'border-red-600' : '']">
            </fieldset>
        </div>

        <div>
            <fieldset class="border border-green-600 px-2 py-3 space-x-1">
                <legend>Old:</legend>
                <label for="old_male">Male:</label>
                <input type="text" v-model="old_male"
                    :class="['p-2 w-1/4 border border-green-600 outline-none', hasError('old_male') ? 'border-red-600' : '']">
                <label for="old_female">Female:</label>
                <input type="text" v-model="old_female"
                    :class="['p-2 w-1/4 border border-green-600 outline-none', hasError('old_female') ? 'border-red-600' : '']">
            </fieldset>
        </div>

        <div>
            <fieldset class="border border-green-600 px-2  py-3 space-x-1">
                <legend>Child:</legend>
                <label for="child_male">Male:</label>
                <input type="text" v-model="child_male"
                    :class="['p-2 w-1/4 border border-green-600 outline-none', hasError('child_male') ? 'border-red-600' : '']">
                <label for="child_female">Female:</label>
                <input type="text" v-model="child_female"
                    :class="['p-2 w-1/4 border border-green-600 outline-none', hasError('child_female') ? 'border-red-600' : '']">
            </fieldset>
        </div>
        <button class="bg-green-600 px-3 py-2 text-white shadow-lg" @click="addPopulation">
         <Spinner v-if="getPopulationStore.loading" />
                    <h6 v-else>Add Population</h6>
        </button>
    </div>
</template>

<style></style>