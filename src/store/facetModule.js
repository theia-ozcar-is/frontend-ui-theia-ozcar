import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  facetClassification: null,
  producerInfo: [],
  loading: true,
  fullTheiaCategoryTree: null
};

const getters = {
  getFacetClassification: state => {
    return state.facetClassification;
  },
  getLoading: state => {
    return state.loading;
  },
  getProducerInfo: state => {
    return state.producerInfo;
  },
  getFullTheiaCategoryTree: state => {
    return state.fullTheiaCategoryTree;
  }
};

const mutations = {
  UPDATE_FACETED_CLASSIFICATION: (state, { payload, categoryFilters }) => {
    /**
     * add isCategoryNode folded to facetClassificationTheiaCategoryTree array item
     * in order to fold or not the not when the category not is re-rendered
     */
    payload.theiaCategoryTree.forEach(item =>
      setIsCategoryNodeFolded(item, categoryFilters)
    );
    state.facetClassification = payload;
  },
  UPDATE_LOADING: (state, payload) => {
    state.loading = payload;
  },
  UPDATE_PRODUCER_INFO: (state, payload) => {
    state.producerInfo = payload;
  },
  UPDATE_FULL_THEIA_CATEGORY_TREE_INFO: (state, payload) => {
    state.fullTheiaCategoryTree = payload;
  }
};

const actions = {
  /**
   * This action load the facet content for the entire database.
   * It also reset Vuex observation store observation and mapitems arrays to []
   */
  initFacets: store => {
    store.commit("UPDATE_LOADING", true);
    return new Promise(resolve => {
      axiosInstance.get("/observation/initFacets").then(response => {
        store.commit("UPDATE_FACETED_CLASSIFICATION", {
          payload: response.data,
          categoryFilters: []
        }),
          store.commit("UPDATE_MAP_ITEMS", []);
        store.commit("UPDATE_OBSERVATION_LIST_ITEMS", []);
        store.commit("UPDATE_FULL_THEIA_CATEGORY_TREE_INFO",response.data.theiaCategoryTree)
        store.commit("UPDATE_LOADING", false);
        resolve();
      });
    });
  },

  setProducerInfo: store => {
    return new Promise(resolve => {
      axiosInstance.get("/observation/getProducersInfo").then(response => {
        store.commit("UPDATE_PRODUCER_INFO", response.data);
        resolve();
      });
    });
  }
};

export let facets = {
  state,
  getters,
  mutations,
  actions
};

let setIsCategoryNodeFolded = function(categoryNode, categoryFilter) {
  if (!categoryNode.narrowers) {
    categoryNode.isCategoryNodeFolded = true;
    let bool = !categoryFilter.some(item => {
      return item.uri == categoryNode.uri;
    });
    return bool;
  } else {
    let bool = true;
    categoryNode.narrowers.forEach(narrower => {
      bool = bool && setIsCategoryNodeFolded(narrower, categoryFilter);
    });
    categoryNode.narrowers.forEach(narrower => {
      bool =
        bool &&
        !categoryFilter.some(item => {
          return item.uri == narrower.uri;
        });
    });
    categoryNode.isCategoryNodeFolded = bool;
    return bool;
  }
};
