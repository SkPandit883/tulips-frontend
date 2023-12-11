<script setup>
import { ref } from "vue"

import CityTab from "./components/Tabs/CityTab.vue"
import CountryTab from "./components/Tabs/CountryTab.vue"
import HomeTab from "./components/Tabs/HomeTab.vue"
import PopulationTab from "./components/Tabs/PopulationTab.vue"
import populationStore from "../src/stores/population/index"
import Login from "./components/Login.vue"
import authStore from "../src/stores/auth/index"
import Spinner from "../src/components/reusable/Spinner.vue"


const getPopulationStore = populationStore();
const getAuthStore = authStore();

const currentTab = ref('Home')

const tabs = {
  Home: HomeTab,
  Country: CountryTab,
  City: CityTab,
  Population: PopulationTab
}

const logout = () => {
  getAuthStore.logout().then(res => {
    alert("Logged out Successfully!")
  }).catch(err => {
    alert("Error While  Logging Out")
  })
}
const showTab = (tab) => {
  if (tab == "Home") return true
  return getAuthStore.isLoggedIn();
}

</script>

<template>

  <div class="mt-16 border-2">
    <div>
      <div class="flex items-center justify-between bg-green-500 py-5 px-2  w-full">
        <h2 class="underline font-bold  text-white">Population Information Search</h2>
        <template v-if="getAuthStore.isLoggedIn()">
          <button @click="logout"
            class="block rounded-lg shadow-lg text-lg text-white bg-green-600 hover:bg-green-800 font-medium px-5 py-2.5 text-center">
            <Spinner v-if="getAuthStore.loading" />
            <h6 v-else>Logout</h6>
          </button>
        </template>
        <template v-else>
          <Login />
        </template>



      </div>
      <template v-for="(_, tab) in tabs" :key="tab">
        <button v-if="showTab(tab)"
          :class="['border-[1px] border-green-700 space-x-2 ml-3  mt-3 px-3 py-2', currentTab == tab ? 'bg-green-600 text-white' : 'border-[1px] border-green-700 text-black']"
          @click="currentTab = tab">
          {{ tab }}
        </button>
      </template>

      <div class="p-3 ">
        <component :is="tabs[currentTab]" class="tab"></component>

      </div>
    </div>

  </div>
</template>

<style scoped></style>
