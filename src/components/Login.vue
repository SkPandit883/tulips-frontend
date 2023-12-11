<script setup>

import { ref } from "vue"
import authStore from "../stores/auth/index"
import Spinner from "../components/reusable/Spinner.vue"
import { FwbButton, FwbModal } from 'flowbite-vue'

const isShowModal = ref(false)

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}

const getAuthStore = authStore()

// const closeModal = ref(null)
const username = ref("")
const password = ref("")
const errors = ref({})
const error = ref("")

const hasError = (key) => {
    if (errors.value[key]) {
        return errors.value[key][0];
    }
    return null;
};

const login = () => {
    errors.value = {}
    error.value = ""
    getAuthStore.login({ username: username.value, password: password.value }).then(() => {
        closeModal();
        alert("Logged in  successful!")
    }).catch(err => {
        if (err?.response?.status === 422) errors.value = err?.response?.data?.errors
        if (err?.response?.status === 400) error.value = err?.response?.data?.errors

    })
}


</script>
pen Modal
vue
<template>
    <button @click="showModal" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
        class="block rounded-0 shadow-lg text-lg text-white bg-green-600 hover:bg-green-800  font-medium rounded-lg  px-5 py-2.5 text-center "
        type="button">
        Login
    </button>

    <fwb-modal size="sm" v-if="isShowModal" @close="closeModal">
        <template #header>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Authentication
            </h3>

        </template>
        <template #body>
            <div class="p-4 md:p-5">
                <div class="space-y-4">
                    <div>
                        <label for="username"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input v-model="username" type="text" id="username"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 "
                            placeholder="skpandit" required>
                        <h3 class="text-red-600">{{ hasError('username') }}</h3>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            password</label>
                        <input v-model="password" type="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 "
                            required>
                        <h3 class="text-red-600">{{ hasError('password') }}</h3>

                    </div>
                    <div v-if="error" class="bg-red-100 px-4 py-2 border-[1px]  border-red-500 rounded-md text-red-700">{{
                        error
                    }}</div>

                    <button @click="login"
                        class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        <Spinner v-if="getAuthStore.loading" />
                        <h6 v-else>Login to your account</h6>
                    </button>

                </div>
            </div>
        </template>

    </fwb-modal>
</template>

<style scoped></style>