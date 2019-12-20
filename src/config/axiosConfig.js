import Axios from "axios";

var baseURL = "${API_URL}";

/**
 * Workaround to be able to develop in localhost and
 * use envsubst in production environment 
 */
if (baseURL === "${API" + "_URL}") {
  baseURL = "http://localhost"
}

export let axiosInstance = Axios.create({
  baseURL
});

