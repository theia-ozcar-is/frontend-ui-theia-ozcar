import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  //ProducerDetailed object (from "observations" collection ) to be displayed
  producerDetailed: null,

};

const getters = {
  /**
   * get the producerDetailed object
   */
  getProducerDetailed: state => {
    return state.producerDetailed;
  }
};

const mutations = {
  UPDATE_PRODUCER_DETAILED_STATE: (state, { stateObjectName, payload }) => {
    state[stateObjectName] = payload;
  }
};

const actions = {
  /**
   * HTTP GET to get all the detail about a  producer (in
   * observations collection) before to display those information on the interface
   */
  setProducerDetailed: (store, producerId) => {
    return new Promise(resolve => {
      axiosInstance
        .get("/observation/showProducerDetailed/" + producerId)
        .then(response => {
          store.commit("UPDATE_PRODUCER_DETAILED_STATE", {
            stateObjectName: "producerDetailed",
            payload: response.data
          });
          resolve();
        });
    });
  },
};

export let producerDetailed = {
	state,
	getters,
	mutations,
	actions
  };
