import { RepositoryFactory } from "../../services/RepositoryFactory"

const PopulationRepository = RepositoryFactory.get('population')

const actions = {
    report(payload) {
        return new Promise((resolve, reject) => {

            this.loading = true
            PopulationRepository.report(payload)
                .then((res) => {
                    this.loading = false
                    this.reportSummary = res.data.payload
                    resolve(res);
                })
                .catch((err) => {
                    this.loading = false

                    console.log(err);
                    reject(err);
                });
        });

    },
    createCountry(payload) {
        return new Promise((resolve, reject) => {

            this.loading = true
            PopulationRepository.createCountry(payload).
                then((res) => {
                    this.loading = false
                    resolve(res);
                }).
                catch((err) => {
                    this.loading = false

                    reject(err);
                })
        })
    },
    createCity(payload) {
        return new Promise((resolve, reject) => {

            this.loading = true
            PopulationRepository.createCity(payload).
                then((res) => {
                    this.loading = false
                    resolve(res);
                }).
                catch((err) => {
                    this.loading = false

                    reject(err);
                })
        })
    },
    createPopulation(payload) {
        return new Promise((resolve, reject) => {

            this.loading = true
            PopulationRepository.createPopulation(payload).
                then((res) => {
                    this.loading = false
                    resolve(res);
                }).
                catch((err) => {
                    this.loading = false

                    reject(err);
                })
        })
    },
    getCountries() {
        return new Promise((resolve, reject) => {

            PopulationRepository.countries().
                then((res) => {
                    this.countries = res.data.payload
                    resolve(res);
                }).
                catch((err) => {

                    reject(err);
                })
        })
    },
    getCities(payload) {
        return new Promise((resolve, reject) => {

            PopulationRepository.cities(payload).
                then((res) => {
                    this.cities = res.data.payload
                    resolve(res);
                }).
                catch((err) => {

                    reject(err);
                })
        })
    }
}

export default actions;