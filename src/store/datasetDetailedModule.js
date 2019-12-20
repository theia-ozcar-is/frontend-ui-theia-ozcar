import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  //datasetDetailed object (from "observations" collection ) to be displayed
  datasetDetailed: null
};

const getters = {
  /**
   * get the producerDetailed object
   */
  getDatasetDetailed: state => {
    return state.datasetDetailed;
  }
};

const mutations = {
  UPDATE_DATASET_DETAILED_STATE: (state, { stateObjectName, payload }) => {
    state[stateObjectName] = payload;
  }
};

const actions = {
  /**
   * HTTP GET to get all the detail about a  dataset (in
   * observations collection) before to display those information on the interface
   */
  setDatasetDetailed: (store, datasetId) => {
    return new Promise(resolve => {
      axiosInstance
        .get("/observation/showDatasetDetailed/" + datasetId)
        .then(response => {
          store.commit("UPDATE_DATASET_DETAILED_STATE", {
            stateObjectName: "datasetDetailed",
            payload: response.data
          });
          Promise.all([
            store.dispatch(
              "setObservationsOfADataset",
              response.data.dataset.datasetId
            ),
            store.dispatch(
              "setBBOXOfADataset",
              response.data.dataset.datasetId
            )
          ]).then(() => resolve());
        });
    });
  },
};

export let datasetDetailed = {
  state,
  getters,
  mutations,
  actions
};
