import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  //Array observationsDetailed from observation collection
  observationsDetailed: [],
  variablesAtOneLocation: [],
  observationsOfADataset: [],
  BBOXOfADataset: null,
  categoryHierachies: [],
  theiaVariablesOfADataset:[]
};

const getters = {
  /**
   * get the observations[] array
   */
  getObservationsDetailed: state => {
    return state.observationsDetailed;
  },
  getVariablesAtOneLocation: state => {
    return state.variablesAtOneLocation;
  },
  getObservationsOfADataset: state => {
    return state.observationsOfADataset;
  },
  getBBOXOfADataset: state => {
    return state.BBOXOfADataset;
  },
  getCategoryHierarchies: state => {
    return state.categoryHierachies;
  },
  getTheiaVariablesOfADataset: state=> {
    return state.theiaVariablesOfADataset
  }
};

const mutations = {
  UPDATE_OBSERVATIONS_DETAILED_STATE: (state, { stateObjectName, payload }) => {
    state[stateObjectName] = payload;
  }
};

const actions = {
  /**
   * HTTP POST to get all the detail about a set of grouped observations (in
   * observationsLite) before to diplay those information on the interface
   */
  setObservationsDetailed: (store, data) => {
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post("/observation/showObservationsDetailed", data, {
          headers: headers
        })
        .then(response => {
          store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {
            stateObjectName: "observationsDetailed",
            payload: response.data.sort((a,b) => (a.observation.observedProperty.name > b.observation.observedProperty.name) ? 1 : ((b.observation.observedProperty.name > a.observation.observedProperty.name) ? -1 : 0))
          });
          Promise.all([
            store.dispatch(
              "setVariablesAtOneLocation",
              response.data[0].observation.featureOfInterest.samplingFeature
                .geometry.coordinates
            ),
            store.dispatch(
              "setObservationsOfADataset",
              response.data[0].dataset.datasetId
            ),
            store.dispatch(
              "setBBOXOfADataset",
              response.data[0].dataset.datasetId
            )
          ]).then(() => resolve());
        });
    });
  },

  setVariablesAtOneLocation: (store, location) => {
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post("/observation/getVariablesAtOneLocation", location, {
          headers: headers
        })
        .then(response => {
          store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {
            stateObjectName: "variablesAtOneLocation",
            payload: response.data
          });
          resolve();
        });
    });
  },

  setCategoryHierarchies(store, categories) {
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post(
          "/observation/getCategoryHierarchies/",
          JSON.stringify(categories),
          { headers }
        )
        .then(response => {
          store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {
            stateObjectName: "categoryHierachies",
            payload: response.data
          });
          resolve();
        });
    });
  }
};

export let observationDetailed = {
  state,
  getters,
  mutations,
  actions
};
