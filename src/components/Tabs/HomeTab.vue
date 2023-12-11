<script setup>
import { ref ,watchEffect,watch} from "vue"
import populationStore from "../../stores/population/index"
import Loader from "../reusable/Loader.vue"

const getPopulationStore = populationStore();

const country_id = ref('');
const city_id = ref('');
const gender = ref('');

getPopulationStore.getCountries()

watchEffect(async () => {
    await getPopulationStore.getCities({ country: country_id.value });
});

watchEffect(async () => {
     getPopulationStore.report({
        country: country_id.value,
        city: city_id.value,
        gender: gender.value
    })
 });

watch(country_id, async (newCountryId) => {
        city_id.value = ''
})

</script>
<template>
    <Loader v-if="getPopulationStore.loading"/>
    <div class="flex space-x-3 border-[1px]  mt-4 px-4 py-3">
        <select class="px-5 py-1 border border-green-600 outline-none" v-model="country_id">
            <option  value="">All Country</option>
           <option v-for="(country, idx) in getPopulationStore.countries" :key="country.id" :value="country.id">{{
               country.name }}</option>
        </select>
        <select class="px-5 py-1 border border-green-600 outline-none" v-model="city_id">
            <option  value="">All City/State</option>
            <option v-for="(city, idx) in getPopulationStore.cities" :key="city.id" :value="city.id">{{ city.name }}
                    </option>
        </select>
        <select class="px-5 py-1 border border-green-600 outline-none" v-model="gender">
            <option value="">All ({{ getPopulationStore.reportSummary?.male + getPopulationStore.reportSummary?.female }})</option>
            <option value="male">Male ({{ getPopulationStore.reportSummary?.male }})</option>
            <option value="female" >Female ({{ getPopulationStore.reportSummary?.female }})</option>
        </select>
    </div>
    <div class=" border-[1px]  mt-4 px-4 py-3">


        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Population type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Number
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Old
                            </th>
                            <td class="px-6 py-4">
                                {{ getPopulationStore.reportSummary?.old }}
                            </td>

                        </tr>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Young
                        </th>
                        <td class="px-6 py-4">
                            {{ getPopulationStore.reportSummary?.young }}
                        </td>

                    </tr>
                    <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Child
                            </th>
                            <td class="px-6 py-4">
                                {{ getPopulationStore.reportSummary?.child }}
                            </td>

                        </tr>
                  

                </tbody>
            </table>
        </div>


    </div>
</template>

<style></style>