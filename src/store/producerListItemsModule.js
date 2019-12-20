import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  /**
   * Producer items to be diplayed in the item list
   */
  producerListItems: [],

  totalProducersCount: null
};

const getters = {
  /**
   * Get array of producer
   */
  getProducerListItems: state => {
    return state.producerListItems;
  },
  getTotalProducersCount: state => {
    return state.totalProducersCount
  }
};

const mutations = {
  UPDATE_PRODUCER_LIST_ITEMS_STATE: (state, { stateObjectName, payload }) => {
    state[stateObjectName] = payload;
  }
};

const actions = {
  /**
   * Get the grouped set of producer resulting to a user query
   */
  setProducerListItems: (store, filters) => {
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post("/observation/changeProducerPage", filters, { headers })
        .then(response => {
          store.commit("UPDATE_PRODUCER_LIST_ITEMS_STATE", {
            stateObjectName: "producerListItems",
            payload: response.data.content
          });
          store.commit("UPDATE_PRODUCER_LIST_ITEMS_STATE", {
            stateObjectName: "totalProducersCount",
            payload: response.data.totalElements
          });
          resolve();
        });
    });
  }
};

export let producerItems = {
  state,
  getters,
  mutations,
  actions
};
