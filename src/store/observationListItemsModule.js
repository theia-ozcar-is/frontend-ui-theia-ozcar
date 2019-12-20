import { axiosInstance } from "../config/axiosConfig.js";
const state = {
  //Array of observation from observationLite collection to be displayed in the list component
  observationListItems: []
};

const getters = {
  getObservationListItems: state => {
    return state.observationListItems;
  },
  /**
   * Count the number observation resulting of the database query. this result is printed on ui.
   * It is obtained using facet operation. Then when the facet operation is querying the whole database this result is set to 0
   */
  getTotalObservationsCount: (state, getters, rootState, rootGetters) => {
    if (
      // (rootState.facets.facetClassification !== null &&
      // !isFiltersEmpty(rootGetters.getFilters)) ||
      rootState.facets.facetClassification !== null &&
      getters.getObservationListItems.length !== 0
    ) {
      return rootState.facets.facetClassification.totalCount[0].count;
    } else {
      return 0;
    }
  }
};

const mutations = {
  UPDATE_OBSERVATION_LIST_ITEMS: (state, payload) => {
    state.observationListItems = payload;
  }
};

const actions = {
  /**
   * Get the grouped set of producer resulting to a user query
   */
  setObservationListItems: (store, filters) => {
    return new Promise(resolve => {
      let headers = {
        "Content-Type": "application/json"
      };
      axiosInstance
        .post("/observation/changeObservationsPage", filters, { headers })
        .then(response => {
          store.commit("UPDATE_OBSERVATION_LIST_ITEMS", response.data.content);
          resolve();
        });
    });
  }
};

export let observationListItems = {
  state,
  getters,
  mutations,
  actions
};
