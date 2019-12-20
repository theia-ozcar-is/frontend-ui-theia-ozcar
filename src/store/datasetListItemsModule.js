import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  /**
   * Producer items to be diplayed in the item list
   */
  datasetListItems: [],

  totalDatasetsCount: null
};

const getters = {
  /**
   * Get array of producer
   */
  getDatasetListItems: state => {
    return state.datasetListItems;
  },
  getTotalDatasetsCount: state => {
    return state.totalDatasetsCount
  }
};

const mutations = {
  UPDATE_DATASET_LIST_ITEMS_STATE: (state, { stateObjectName, payload }) => {
    state[stateObjectName] = payload;
  }
};

const actions = {
  /**
   * Get the grouped set of dataset resulting to a user query
   */
  setDatasetListItems: (store, filters) => {
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post("/observation/changeDatasetPage", filters, { headers })
        .then(response => {
          store.commit("UPDATE_DATASET_LIST_ITEMS_STATE", {
            stateObjectName: "datasetListItems",
            payload: response.data.content
          });
          store.commit("UPDATE_DATASET_LIST_ITEMS_STATE", {
            stateObjectName: "totalDatasetsCount",
            payload: response.data.totalElements
          });
          resolve();
        });
    });
  }
};

export let datasetListItems = {
  state,
  getters,
  mutations,
  actions
};
