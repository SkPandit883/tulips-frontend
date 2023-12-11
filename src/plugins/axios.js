import axios from 'axios'

export const baseURL = import.meta.env.VITE_HOST_URL

const instance = axios.create({
    baseURL: baseURL + "api",
    timeout: 100000,
    headers: {
        "common": {
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
        },
        "Accept": "application/json",

    }
});

instance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 ) {
            alert("Please Login First")
        }
        return Promise.reject(error);
    }
);

export default instance