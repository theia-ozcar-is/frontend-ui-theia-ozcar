const state = {
    //Category nodes selected in the category tree
    categoryNodes: [],
    //Spatial extent filter layer used to print the spatial extent filters on the map
    spatialExtentLayer: null,
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
        theiaVariables: [],
        featureOfInterests: []
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
    getSpatialExtentLayer: state => {
        return state.spatialExtentLayer;
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
    },
    getEmptyFilters: () => {
        return {
            temporalExtents: [],
            spatialExtent: null,
            climates: [],
            geologies: [],
            producerNames: [],
            fundingNames: [],
            fullText: [],
            theiaCategories: [],
            theiaVariables: [],
            featureOfInterests: []
        }
    }
};

const mutations = {

    TOGGLE_FILTERS_GEOLOGIES: (state, payload) => {
        if (state.filters.geologies.some(elem => elem === payload)) {
            state.filters.geologies = [
                ...state.filters.geologies.filter(elem => !elem.includes(payload))
            ];
        } else {
            state.filters.geologies.push(payload);
        }
    },
    TOGGLE_FILTERS_CLIMATES: (state, payload) => {
        if (state.filters.climates.some(elem => elem === payload)) {
            state.filters.climates = [
                ...state.filters.climates.filter(elem => !elem.includes(payload))
            ];
        } else {
            state.filters.climates.push(payload);
        }
    },
    TOGGLE_FILTERS_PRODUCER_NAMES: (state, payload) => {
        if (state.filters.producerNames.some(elem => elem === payload)) {
            state.filters.producerNames = [
                ...state.filters.producerNames.filter(elem => !elem.includes(payload))
            ];
        } else {
            state.filters.producerNames.push(payload);
        }
    },
    TOGGLE_FILTERS_FUNDING_NAMES: (state, payload) => {
        if (state.filters.fundingNames.some(elem => elem === payload)) {
            state.filters.fundingNames = [
                ...state.filters.fundingNames.filter(elem => !elem.includes(payload))
            ];
        } else {
            state.filters.fundingNames.push(payload);
        }
    },
    TOGGLE_CATEGORY_NODES: (state, payload) => {
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
    UPDATE_CATEGORY_NODES: (state, payload) => {
        state.categoryNodes = payload;
    },
    UPDATE_SPATIAL_EXTENT_LAYER: (state, payload) => {
        state.spatialExtentLayer = payload;
    },
    UPDATE_FILTERS: (state, {filterName, payload}) => {
        state.filters[filterName] = payload;
    },
    RESET_FILTERS: state => {
        state.filters = {
            temporalExtents: [],
            climates: [],
            geologies: [],
            producerNames: [],
            fundingNames: [],
            fullText: [],
            spatialExtent: null,
            theiaCategories: [],
            theiaVariables: [],
            featureOfInterests: []
        };
        state.categoryNodes = [];
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
            store.dispatch("setQueryableTheiaVariables")
            store.getters.getSpatialExtentLayer.clearLayers();
            store.dispatch("initFacets").then(resolve());

            //store.commit("TOGGLE_REMOVE_MAP_DRAW_ITEMS");

        });
    },
    /**
     * Mutate the category nodes selected.
     */
    setCategoryNodesSelected: (store, node) => {
        return new Promise(resolve => {
            store.commit("TOGGLE_CATEGORY_NODES", node);
            store.dispatch("setTheiaCategoriesFilter")
                .then(() => store.dispatch("queryFilters"))
                .then(resolve());
        });
    },
    /**
     * Mutate the spatial extent filter layer
     */
    setSpatialExtentFilterLayer: (store, layer) => {
        return new Promise(resolve => {
            store.commit("UPDATE_SPATIAL_EXTENT_LAYER", layer);
            resolve()
        })
    },
    /**
     * Mutate the full text filter
     */
    setFullTextFilter: (store, texts) => {
        return new Promise(resolve => {
            store.commit("UPDATE_FILTERS", {filterName: "fullText", payload: texts});
            store.dispatch("queryFilters").then(resolve())
        });
    },
    /**
     * Mutate one of the bucket filter depending one the mutation name parameter.
     */
    setBucketFilter: (store, {searchObservations = true, mutationName, name}) => {
        return new Promise(resolve => {
            store.commit(mutationName, name);
            if (searchObservations) {
                store.dispatch("queryFilters").then(resolve())
            } else {
                resolve();
            }
        });
    },
    /**
     * Mutate the temporal extent filter
     */
    setTemporalExtentFilter: (store, {searchObservations = true, temporalExtents}) => {
        return new Promise(resolve => {
            store.commit("UPDATE_FILTERS", {filterName: "temporalExtents", payload: temporalExtents});
            if (searchObservations) {
                store.dispatch("queryFilters").then(resolve())
            } else {
                resolve();
            }
        });
    },

    /**
     * Mutate the spatial extent filter. take a geojson object corresponding to the spatial
     * extent to query as parameter
     */
    setSpatialExtentFilter: (store, geojson) => {
        return new Promise(resolve => {
            store.commit("UPDATE_FILTERS", {filterName: "spatialExtent", payload: geojson});
            store.dispatch("queryFilters").then(resolve())
        });
    },
    /**
     * Mutate the theia categories filter. Take the list of the selected category nodes.
     * The nodes selected are saved in "categoryNodes" state object and the uris to be queried are
     * derived and saved in filter state object
     */
    setTheiaCategoriesFilter: store => {
        return new Promise(resolve => {
            //store.commit("TOGGLE_CATEGORY_NODES", nodes)
            let categories = [];
            store.getters.getCategoryNodesSelected.forEach(node => {
                let fullNode = findInCategoryTree(
                    node.uri,
                    store.rootGetters.getFullTheiaCategoryTree
                );
                categories = categories.concat(setCategoryLeafs(fullNode));
            });
            store.commit("UPDATE_FILTERS", {filterName: "theiaCategories", payload: [...new Set(categories)]});
            resolve();
        });
    },
    setTheiaVariablesFilter: (store, theiaVariables) => {
        return new Promise(resolve => {
            store.commit("UPDATE_FILTERS", {filterName: "theiaVariables", payload: theiaVariables});
            store.dispatch("setQueryableTheiaVariables")
                .then(() => store.dispatch("queryFilters"))
                .then(resolve())
        });
    },
    setFeatureOfInterestsFilter: (store, fois) => {
        return new Promise(resolve => {
            store.commit("UPDATE_FILTERS", {filterName: "featureOfInterests", payload: fois});
            store.dispatch("queryFilters").then(resolve())
        });
    },
    setAllFilters: (store, filtersString) => {
        return new Promise(resolve => {
            let filters = JSON.parse(filtersString);
            console.log(store.getters.getFilters)
            for (let filter in filters) {
                switch (filter) {
                    case "theiaVariables":
                        store.commit("UPDATE_FILTERS", {filterName: "theiaVariables", payload: filters[filter]});
                        break;
                    case "theiaCategories":
                        store.commit("UPDATE_CATEGORY_NODES", filters[filter]);
                        store.dispatch("setTheiaCategoriesFilter", store.getters.getCategoryNodesSelected)
                        //store.commit("UPDATE_FILTERS", {filterName: "theiaCategories", payload: filters[filter]});
                        break;
                    case "featureOfInterests":
                        store.commit("UPDATE_FILTERS", {filterName: "featureOfInterests", payload: filters[filter]});
                        break;
                    case "temporalExtents":
                        let temporalExtents = []
                        for (let tmp of filters[filter]) {
                            let temporalExtent = {fromDate: null, toDate: null, position: null};
                            if (tmp.fromDate) {
                                temporalExtent.fromDate = new Date(tmp.fromDate);
                            }
                            if (tmp.toDate) {
                                temporalExtent.toDate = new Date(tmp.toDate);
                            }
                            temporalExtent.position = tmp.position;
                            temporalExtents.push(temporalExtent)
                        }
                        store.commit("UPDATE_FILTERS", {filterName: "temporalExtents", payload: temporalExtents});
                        break;
                    case "spatialExtent":
                        store.commit("UPDATE_FILTERS", {filterName: "spatialExtent", payload: filters[filter]});
                        store.getters.getSpatialExtentLayer.clearLayers();
                        if (filters[filter]) {
                            store.getters.getSpatialExtentLayer.addData(store.getters.getFilters.spatialExtent);
                        }
                        break;
                    case "producerNames":
                        store.commit("UPDATE_FILTERS", {filterName: "producerNames", payload: filters[filter]});
                        break;
                    case "fullText":
                        store.commit("UPDATE_FILTERS", {filterName: "fullText", payload: filters[filter]});
                        break;
                    case "geologies":
                        store.commit("UPDATE_FILTERS", {filterName: "geologies", payload: filters[filter]});
                        break;
                    case "climates":
                        store.commit("UPDATE_FILTERS", {filterName: "climates", payload: filters[filter]});
                        break;
                    case "fundingNames":
                        store.commit("UPDATE_FILTERS", {filterName: "fundingNames", payload: filters[filter]});
                        break;
                }
            }
            store.dispatch("searchObservations", store.getters.getFilters)
                .then(resolve());
        });
    },
    queryFilters: store => {
        return new Promise(resolve => {
            if (store.getters.isFiltersEmpty) {
                store.dispatch("initFacets").then(resolve())
            } else {
                store.dispatch("searchObservations", store.getters.getFilters).then(resolve())
            }
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
    let categories = [];
    if (node.narrowers && node.narrowers.length > 0) {
        node.narrowers.forEach(narrower => {
            categories = categories.concat(setCategoryLeafs(narrower));
        });
    } else {
        categories.push({uri: node.uri, prefLabel: node.prefLabel});
    }
    return categories;
}

/**
 * Find a node in a category tree using uri string
 */
function findInCategoryTree(uri, tree) {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].uri === uri) {
            return tree[i];
        } else {
            if (tree[i].narrowers) {
                let j = findInCategoryTree(uri, tree[i].narrowers);
                if (j !== undefined) {
                    return j;
                }
            }
        }
    }
    return undefined;
}
