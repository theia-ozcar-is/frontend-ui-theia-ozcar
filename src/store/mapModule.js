import { popup } from "./popupModule.js";

const state = {
  //Array of mapItems from mapItems collection
  mapItems: []
};

const getters = {
  getMapItems: state => {
    return state.mapItems;
  }
};

const mutations = {
  UPDATE_MAP_ITEMS: (state, payload) => {
    state.mapItems = payload;
  }
};

const actions = {};

export let map = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    popup
  }
};
