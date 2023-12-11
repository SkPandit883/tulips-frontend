import { RepositoryFactory } from "../../services/RepositoryFactory"

const AuthRepository = RepositoryFactory.get('auth')

const actions = {
    isLoggedIn() {
        console.log("user logged in",this.user)
        return this.user ? true : false
    },
    login(payload) {
        return new Promise((resolve, reject) => {

            this.loading = true
            AuthRepository.login(payload)
                .then((res) => {
                    this.loading = false
                    this.user = res.data.payload
                    localStorage.setItem("user", JSON.stringify(res.data.payload))
                    resolve(res);
                })
                .catch((err) => {
                    this.loading = false

                    console.log(err);
                    reject(err);
                });
        });

    },
    logout() {
        return new Promise((resolve, reject) => {

            this.loading = true
            AuthRepository.logout()
                .then((res) => {
                    this.user = null
                    localStorage.removeItem('user');
                    this.loading = false
                    resolve(res);
                })
                .catch((err) => {
                    this.loading = false

                    console.log(err);
                    reject(err);
                });
        });

    },


}

export default actions;