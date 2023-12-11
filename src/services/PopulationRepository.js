import Repository from "./Repository";

export default {
    report(payload) {

        return Repository.get(`/report`,{params:payload});
    },
    createCountry(payload) { 
        return Repository.post(`/create/country`, payload);
    },
    createCity(payload) {
        return Repository.post(`/create/city`, payload);
    },
    createPopulation(payload) {
        return Repository.post(`/create/population`, payload);
    },
    countries() {
        return Repository.get('/countries');
    },
    cities(payload) {
        return Repository.get('/cities',{params: payload});
    },
}
