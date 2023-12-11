<script setup>
import { ref } from "vue"
import Spinner from "../reusable/Spinner.vue"
import populationStore from "../../stores/population/index"
const getPopulationStore = populationStore();

const name = ref('')
const country_id = ref('')

const cityError = ref("")
const countryError = ref("")


getPopulationStore.getCountries()

const addCity = () => {
    if (name.value && country_id.value) {
        getPopulationStore.createCity({ name: name.value, country_id: country_id.value }).then(res => {
            alert("City created successfully!")
            name.value = ""
            countryError.value = ""
            cityError.value = ""
            country_id.value = ""
            
        }).catch(error => {
            console.log("Error creating!!", error);
        })
    } else {
        if (!name.value) cityError.value ="City name is required."
        if (!country_id.value) countryError.value ="Contry name is required."
    }
   
}

</script>
<template>
    <div class="mt-5">
        <h2>Country Name : </h2>
        <select :class="['p-2 border border-green-600 outline-none',countryError?'border-red-600':'']" v-model="country_id">
            <option disabled value="">Select Country</option>
            <option v-for="(country,idx) in getPopulationStore.countries" :key="country.id" :value="country.id">{{country.name}}</option>
        </select>
        <h2 class="mt-2">City/State : </h2>

        <div class="space-x-3">
            <input type="text"  v-model="name" :class="['p-2 border border-green-600 outline-none',cityError?'border-red-600':'']">
            <button class="bg-green-600 text-white p-2 " @click="addCity">

                <Spinner v-if="getPopulationStore.loading"/>
                <h6 v-else>Add City</h6>
                
            </button>
        </div>
    </div>
</template>

<style></style>