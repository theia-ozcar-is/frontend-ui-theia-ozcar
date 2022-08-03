import Vue from "vue/dist/vue.esm.js";
import App from "./App.vue";
import store from "./store/store.js";
import {keycloak} from "./config/keycloak.js"
import {initOptions} from "./config/keycloak.js";

keycloak.init(initOptions).then((auth) => {
    let vm = new Vue({
        el: "#app",
        store,
        components: {
            App
        },
        template: "<App/>",
    });

}).catch(() => {
    console.log("Authenticated Failed");
});

keycloak.onAuthSuccess = function () {
    store.dispatch("loadUserProfile");
}
keycloak.onAuthLogout = function () {
    store.dispatch("eraseUserProfile");
}
keycloak.onTokenExpired = function () {
    console.log('expired ' + new Date());
    keycloak.updateToken(50).then((refreshed) => {
        if (refreshed) {
            console.log('refreshed ' + new Date());
        } else {
            console.log('not refreshed ' + new Date());
            store.dispatch("eraseUserProfile");
        }
    }).catch(() => {
        console.error('Failed to refresh token ' + new Date());
        store.dispatch("eraseUserProfile");
    });
}
