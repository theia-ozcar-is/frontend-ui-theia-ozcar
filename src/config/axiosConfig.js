import Axios from "axios";
import {keycloak} from "./keycloak";

/**
 * Workaround to be able to develop in localhost and
 * use envsubst in production environment 
 */
var baseURL = "${API_URL}";
if (baseURL === "${API" + "_URL}") {
  baseURL = "http://localhost"
}

export let axiosInstance = Axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(
    function(config) {
      if (keycloak.token) {
        config.headers.Authorization = "Bearer " + keycloak.token;
        config.headers.Accept = "application/json";
      }
        /*
         * Modern browser automatically include CSRF token in request headers
         */
      // const CSRF_TOKEN = getCookie("XSRF-TOKEN");
      // if(CSRF_TOKEN){
      //   config.headers.common['X-CSRF-TOKEN']=  CSRF_TOKEN;
      // }
      return config;
    },
    error => Promise.reject(error)
);