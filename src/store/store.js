import Vue from "vue/dist/vue.esm.js";
import Vuex from "vuex";
//import Axios from "axios";
import { axiosInstance } from "../config/axiosConfig.js";

import { filters } from "./filterModule.js";
import { map } from "./mapModule.js";
import { facets } from "./facetModule.js";
import { pages } from "./pageModule.js";
import { detailedItems } from "./detailedItemModule.js";
import { itemList } from "./itemListModule.js";
import { user } from "./userModule.js";

Vue.use(Vuex);

/**
 * Method to check if the filter object from Vuex filter store is empty or not
 * @param {Object} filters filter object from Vuex filter store
 */
let categoryNodeCount0 = node => {
  if (node.narrowers) {
    node.count = 0;
    node.narrowers.forEach(narrower => {
      categoryNodeCount0(narrower);
    });
  } else {
    node.count = 0;
  }
};

/**
 * -----------------------------------------------------------------------------------
 * State
 * -----------------------------------------------------------------------------------
 */
const state = {
  //Array of observation from observationLite collection
  // observations: []
};

/**
 * -----------------------------------------------------------------------------------
 * Getters
 * -----------------------------------------------------------------------------------
 */
const getters = {
  // getObservations: state => {
  //   return state.observations;
  // },
  // /**
  //  * Count the number observation resulting of the database query. this result is printed on ui.
  //  * It is obtained using facet operation. Then when the facet operation is querying the whole database this result is set to 0
  //  */
  // getObservationsCount: (state, getters, rootState, rootGetters) => {
  //   if (
  //     // (rootState.facets.facetClassification !== null &&
  //     // !isFiltersEmpty(rootGetters.getFilters)) ||
  //     rootState.facets.facetClassification !== null &&
  //     getters.getObservations.length !== 0
  //   ) {
  //     return rootState.facets.facetClassification.totalCount[0].count;
  //   } else {
  //     return 0;
  //   }
  // }
  // /**
  //  * get the observation to be zommed in by the map componenet
  //  */
  // getObservationIdToZoomIn: state => id => {
  //   return state.observations.find(obs => obs.observations[0].observationId === id);
  // },
  /**
   * Get the different datasets resulting from the observation query
   */
  // getDatasets: state => {
  //   let datasets = [];
  //   state.observations.forEach(obs => {
  //     if (
  //       !datasets.some(
  //         elem => JSON.stringify(elem) === JSON.stringify(obs.dataset)
  //       )
  //     ) {
  //       datasets.push(obs.dataset);
  //     }
  //   });
  //   return datasets;
  // }
};

/**
 * -----------------------------------------------------------------------------------
 * Mutations
 * -----------------------------------------------------------------------------------
 */
const mutations = {
  // UPDATE_OBSERVATIONS: (state, payload) => {
  //   state.observations = payload;
  // }
};

/**
 * -----------------------------------------------------------------------------------
 * Actions
 * -----------------------------------------------------------------------------------
 */
const actions = {
  /**
   * Reset the list of ObservationLite to an empty array
   */
  resetObservations: store => {
    store.commit("UPDATE_OBSERVATION_LIST_ITEMS", []);
    store.commit("UPDATE_MAP_ITEMS", []);
  },

  /**
   * Set of actions that are performed when a query is set either on full text search or
   * in the faceted classification.
   * 1 - HTTP POST sending the json with the query parameter - async
   * 2 - when (1) is resolved, state.observations array is mutated - sync
   * 3 - the number of page is calculated to display the navigation - async
   * 4 - the state.facetedClassification object is mutated to display facetclassification - sync
   * 5 - the state.mapItem array is mutated to display item on the map - sync
   */
  searchObservations: (store, filters) => {
    return new Promise(resolve => {
      store.commit("UPDATE_LOADING", true);
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post("/observation/searchObservations", filters, {
          headers: headers
        })

        .then(async response => {
          /**
           * if the response content is empty the facet is reseted using the whole database
           */
          if (response.data.mapItems.length === 0) {
            await axiosInstance
              .get("/observation/initFacets")
              .then(response => {
                let facet = response.data;
                let bucketName = [
                  "fundingNamesFacet",
                  "climatesFacet",
                  "geologiesFacet",
                  "producerNamesFacet"
                ];
                for (let facetName in facet) {
                  if (bucketName.includes(facetName)) {
                    let bucket = facet[facetName];
                    bucket.forEach(item => {
                      item.count = 0;
                    });
                  } else if (facetName == "theiaCategoryTree") {
                    let categoryNodes = facet[facetName];
                    categoryNodes.forEach(node => {
                      categoryNodeCount0(node);
                    });
                  }
                }
                store.commit("UPDATE_FACETED_CLASSIFICATION", facet);
                store.commit("UPDATE_FULL_FACETED_CLASSIFICATION", {payload:store.rootGetters.getFullFacetClassification,categoryFilters:store.rootGetters.getCategoryNodesSelected});
              });
            store.commit("UPDATE_MAP_ITEMS", []);
            store.commit("UPDATE_OBSERVATION_LIST_ITEMS", []);
          } else {
            store.commit("UPDATE_FACETED_CLASSIFICATION", response.data.facetClassification);
            store.commit("UPDATE_FULL_FACETED_CLASSIFICATION", {payload:store.rootGetters.getFullFacetClassification,categoryFilters:store.rootGetters.getCategoryNodesSelected});
            // store.commit(
            //   "UPDATE_OBSERVATION_LIST_ITEMS",
            //   response.data.observationDocumentLitePage.content
            // );
            // store.commit("UPDATE_PAGE_SIZE", 10);
            store.dispatch("setItemListNature", "observation")
                .then(() => {
              store.dispatch("changePage" , {
                filters: store.rootGetters.getFilters,
                pageSize: 10,
                pageSelected: 1
              }).then(() => {
                store.dispatch("setNumberOfPage");
                // .then(() => resolve());
              });
            });
            store.commit("UPDATE_MAP_ITEMS", response.data.mapItems);
          }
          store.commit("UPDATE_LOADING", false);
          resolve();
        });
    });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    map,
    filters,
    facets,
    itemList,
    detailedItems,
    user
  }
});
