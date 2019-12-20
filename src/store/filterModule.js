const state = {
  categoryNodes: [],
  //Filters object for which match operation will be performed on each of its attributes
  filters: {
    temporalExtents: [],
    spatialExtent: null,
    climates: [],
    geologies: [],
    producerNames: [],
    fundingNames: [],
    fullText: [],
    theiaCategories: [],
    theiaVariables: []
  },
  removeMapDrawItems: false
};

const getters = {
  getFilters: state => {
    return state.filters;
  },
  getCategoryNodesSelected: state => {
    return state.categoryNodes;
  },
  getRemoveMapDrawItems: state => {
    return state.removeMapDrawItems;
  },
  /**
   * Check if all the attributes of the filter of object are empty
   */
  isFiltersEmpty: state => {
    let isEmpty = true;
    for (let filter in state.filters) {
      isEmpty =
        isEmpty &&
        (state.filters[filter] === null ||
          (typeof state.filters[filter] !== "undefined" &&
            state.filters[filter].length === 0));
    }
    return isEmpty;
  }
};

const mutations = {
  /**
   * Asynchronous filters
   */
  UPDATE_FILTERS_GEOLOGIES: (state, payload) => {
    if (state.filters.geologies.some(elem => elem === payload)) {
      state.filters.geologies = [
        ...state.filters.geologies.filter(elem => !elem.includes(payload))
      ];
    } else {
      state.filters.geologies.push(payload);
    }
  },
  UPDATE_FILTERS_CLIMATES: (state, payload) => {
    if (state.filters.climates.some(elem => elem === payload)) {
      state.filters.climates = [
        ...state.filters.climates.filter(elem => !elem.includes(payload))
      ];
    } else {
      state.filters.climates.push(payload);
    }
  },
  UPDATE_FILTERS_PRODUCER_NAMES: (state, payload) => {
    if (state.filters.producerNames.some(elem => elem === payload)) {
      state.filters.producerNames = [
        ...state.filters.producerNames.filter(elem => !elem.includes(payload))
      ];
    } else {
      state.filters.producerNames.push(payload);
    }
  },
  UPDATE_FILTERS_FUNDING_NAMES: (state, payload) => {
    if (state.filters.fundingNames.some(elem => elem === payload)) {
      state.filters.fundingNames = [
        ...state.filters.fundingNames.filter(elem => !elem.includes(payload))
      ];
    } else {
      state.filters.fundingNames.push(payload);
    }
  },
  // UPDATE_FILTERS_FUNDING_ACRONYMS: (state, payload) => {
  //   if (state.filters.fundingAcronyms.some(elem => elem === payload)) {
  //     state.filters.fundingAcronyms = [
  //       ...state.filters.fundingAcronyms.filter(elem => !elem.includes(payload))
  //     ];
  //   } else {
  //     state.filters.fundingAcronyms.push(payload);
  //   }
  // },
  UPDATE_CATEGORY_NODES_SELECTED: (state, payload) => {
    if (payload == null) {
      state.categoryNodes = [];
    } else {
      if (state.categoryNodes.some(elem => elem.uri === payload.uri)) {
        state.categoryNodes = [
          ...state.categoryNodes.filter(elem => elem.uri !== payload.uri)
        ];
      } else {
        state.categoryNodes.push(payload);
      }
    }
  },

  /**
   * Synchronous filters
   */
  UPDATE_FILTERS_FULL_TEXT: (state, payload) => {
    state.filters.fullText = payload;
  },
  UPDATE_FILTERS_TEMPORAL_EXTENTS: (state, payload) => {
    state.filters.temporalExtents = payload;
  },
  UPDATE_FILTERS_SPATIAL_EXTENT: (state, payload) => {
    state.filters.spatialExtent = payload;
  },
  UPDATE_FILTERS_THEIA_VARIABLES: (state, payload) => {
    state.filters.theiaVariables = payload;
  },
  UPDATE_FILTERS_THEIA_CATEGORIES: (state, payload) => {
    state.filters.theiaCategories = payload;
  },
  RESET_FILTERS: state => {
    state.filters = {
      temporalExtents: [],
      climates: [],
      geologies: [],
      producerNames: [],
      fundingNames: [],
      fundingAcronyms: [],
      fullText: [],
      spatialExtent: null,
      theiaCategories: [],
      theiaVariables: []
    };
  },
  TOGGLE_REMOVE_MAP_DRAW_ITEMS: state => {
    state.removeMapDrawItems = !state.removeMapDrawItems;
  }
};

const actions = {
  /**
   * Reset all the filters
   */
  resetFilters: store => {
    return new Promise(resolve => {
      store.commit("TOGGLE_REMOVE_MAP_DRAW_ITEMS");
      store.commit("RESET_FILTERS");
      //store.commit("TOGGLE_REMOVE_MAP_DRAW_ITEMS");
      resolve();
    });
  },
  /**
   * Mutate the full text filter
   */
  setFullTextFilter: (store, text) => {
    return new Promise(resolve => {
      store.commit("UPDATE_FILTERS_FULL_TEXT", text);
      resolve();
    });
  },
  /**
   * Mutate one of the bucket filter depending one the mutation name parameter.
   */
  setBucketFilter: (store, { mutationName, name }) => {
    return new Promise(resolve => {
      store.commit(mutationName, name);
      resolve();
    });
  },
  /**
   * Mutate the temporal extent filter
   */
  setTemporalExtentFilter: (store, temporalExtents) => {
    return new Promise(resolve => {
      store.commit("UPDATE_FILTERS_TEMPORAL_EXTENTS", temporalExtents);
      resolve();
    });
  },

  /**
   * Mutate the spatial extent filter. take a geojson object corresponding to the spatial
   * extent to query as parameter
   */
  setSpatialExtentFilter: (store, geojson) => {
    return new Promise(resolve => {
      store.commit("UPDATE_FILTERS_SPATIAL_EXTENT", geojson);
      resolve();
    });
  },
  /**
   * Mutate the category nodes selected.
   */
  setCategoryNodesSelected: (store, node) => {
    return new Promise(resolve => {
      store.commit("UPDATE_CATEGORY_NODES_SELECTED", node);
      store.dispatch("setTheiaCategoriesFilter");
      resolve();
    });
  },
  /**
   * Mutate the theia categories filter. Take the list of the selected category nodes.
   * The nodes selected are saved in "categoryNodes" state object and the uris to be queried are
   * derived and saved in filter state object
   */
  setTheiaCategoriesFilter: store => {
    return new Promise(resolve => {
      //store.commit("UPDATE_CATEGORY_NODES_SELECTED", nodes)
      let URIs = [];
      store.getters.getCategoryNodesSelected.forEach(node => {
        let fullNode = findInCategoryTree(
          node.uri,
          store.rootGetters.getFullTheiaCategoryTree
        );
        URIs = URIs.concat(setCategoryLeafs(fullNode));
      });
      store.commit("UPDATE_FILTERS_THEIA_CATEGORIES", [...new Set(URIs)]);
      resolve();
    });
  },
  setTheiaVariablesFilter: (store, uris) => {
    return new Promise(resolve => {
      store.commit("UPDATE_FILTERS_THEIA_VARIABLES", uris);
      resolve();
    });
  }
};
export let filters = {
  state,
  getters,
  mutations,
  actions
};

/**
 * Find the category leaf uri of a node
 */
function setCategoryLeafs(node) {
  let URIs = [];
  if (node.narrowers && node.narrowers.length > 0) {
    node.narrowers.forEach(narrower => {
      URIs = URIs.concat(setCategoryLeafs(narrower));
    });
  } else {
    URIs.push(node.uri);
  }
  return URIs;
}

/**
 * Find a node in a category tree using uri string
 */
function findInCategoryTree(uri, tree) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].uri == uri) {
      return tree[i];
    } else {
      if (tree[i].narrowers) {
        let j = findInCategoryTree(uri, tree[i].narrowers);
        if (j != undefined) {
          return j;
        }
      }
    }
  }
  return undefined;
}
