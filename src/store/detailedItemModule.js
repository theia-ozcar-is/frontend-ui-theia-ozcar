import { axiosInstance } from "../config/axiosConfig.js";
import { observationDetailed } from "./observationDetailedModule.js";
import { producerDetailed } from "./producerDetailedModule.js";
import { datasetDetailed } from "./datasetDetailedModule.js";

/**
 * Get the translation of a I18n field using a local
 * @param {Stirng} name I18n field
 * @param {String} lang local
 */
function getI18nField(name, lang) {
  let tmp = name.find(element => element.lang === lang);
  return tmp.text;
}

const state = {};

const getters = {};

const mutations = {};

const actions = {
  setObservationsOfADataset: (store, datasetId) => {
    axiosInstance
      .get("/observation/getObservationsOfADataset/" + datasetId)
      .then(response => {
        store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {
          stateObjectName: "observationsOfADataset",
          payload: response.data
        });
        let theiaVariables = [];
        response.data.forEach(obs => {
          theiaVariables.push(
            obs.observations[0].observedProperty.theiaVariable
          );
        });
        let theiaVariablesFiltered = theiaVariables.filter(Boolean);
        const uris = new Set();
        let uniqueVariableList = theiaVariablesFiltered.filter(variable => {
          const duplicate = uris.has(variable.uri);
          uris.add(variable.uri);
          return !duplicate;
        });
        uniqueVariableList.sort((a, b) =>
          getI18nField(a.prefLabel, "en") > getI18nField(b.prefLabel, "en")
            ? 1
            : getI18nField(b.prefLabel, "en") > getI18nField(a.prefLabel, "en")
            ? -1
            : 0
        );
        store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {
          stateObjectName: "theiaVariablesOfADataset",
          payload: uniqueVariableList
        });
      });
  },

  setObservationIdsOfOtherTheiaVariableAtLocation(store, { uri, coordinates }) {
    //store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {stateObjectName:"variablesAtOneLocation",payload:[]});
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post(
          "/observation/getObservationIdsOfOtherTheiaVariableAtLocation",
          JSON.stringify({ uri, coordinates }),
          {
            headers: headers
          }
        )
        .then(response => {
          store
            .dispatch("setObservationsDetailed", JSON.stringify(response.data))
            .then(() => resolve());
        });
    });
  },
  setBBOXOfADataset(store, datasetId) {
    return new Promise(resolve => {
      axiosInstance
        .get("/observation/getBBOXOfADataset/" + datasetId)
        .then(response => {
          store.commit("UPDATE_OBSERVATIONS_DETAILED_STATE", {
            stateObjectName: "BBOXOfADataset",
            payload: response.data
          });
          resolve();
        });
    });
  }
};

export let detailedItems = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    observationDetailed,
    producerDetailed,
    datasetDetailed
  }
};
