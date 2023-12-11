<script setup>
import { ref } from "vue"
import Spinner from "../reusable/Spinner.vue"

import populationStore from "../../stores/population/index"
const getPopulationStore = populationStore();

const name = ref('')

const error = ref("")

const addCountry = () => {
    if (error.value) {
        error.value = "country field is required."
    } else {
        getPopulationStore.createCountry({ name: name.value }).then(res => {
            alert("Country created successfully!")

            name.value = ""
            error.value = ""
        }).catch(error => {
            console.log("Error creating!!", error);
        })
    }
}

</script>   
<template>
    <div class="mt-5">
        <h2>Country Name :</h2>
        <div class="space-x-3">
            <input type="text" v-model="name"
                :class="['p-2 border border-green-600 outline-none', error ? 'border-red-600' : '']">
            <button class="bg-green-600 text-white p-2 " @click="addCountry">
                <Spinner v-if="getPopulationStore.loading" />
                <h6 v-else>Add Country</h6>
            </button>
        </div>
    </div>
</template>

<style></style>