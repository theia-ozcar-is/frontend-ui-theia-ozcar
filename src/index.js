import Vue from "vue/dist/vue.esm.js";
import App from "./App.vue";
import store from "./store/store.js"

let vm = new Vue({
  el: "#app",
  store,
  components: {
    App
  },
  template: "<App/>",
});