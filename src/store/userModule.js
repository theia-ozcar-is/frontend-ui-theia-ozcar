import {axiosInstance} from "../config/axiosConfig.js";
import {keycloak} from "../config/keycloak.js";

const state = {
    //datasetDetailed object (from "observations" collection ) to be displayed
    userInfo: null
};

const getters = {
    /**
     * get the producerDetailed object
     */
    getUserInfo: state => {
        return state.userInfo;
    }
};

const mutations = {
    UPDATE_USER_INFO: (state, {stateObjectName, payload}) => {
        state[stateObjectName] = payload;
    }
};

const actions = {
    signIn: (store) => {
        keycloak.login();
    },
    signOut: (store) => {
        keycloak.logout();
    },
    loadUserProfile: (store) => {
        keycloak.loadUserProfile()
            .then(profile => {
                store.commit("UPDATE_USER_INFO", {stateObjectName: "userInfo", payload: profile});
            }).catch(function () {
            alert('Failed to load user profile');
        });
    },
    eraseUserProfile:(store) => {
        store.commit("UPDATE_USER_INFO", {stateObjectName: "userInfo", payload: null});
    }
};

export let user = {
    state,
    getters,
    mutations,
    actions
};
