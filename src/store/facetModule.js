import {axiosInstance} from "../config/axiosConfig.js";
import {getI18n} from "../commons/commons.js";

const state = {
    fullFacetClassification: null,
    facetClassification: null,
    producerInfo: [],
    loading: true,
    fullTheiaCategoryTree: null,
    queryableTheiaVariables: []
};

const getters = {
    getFullFacetClassification: state => {
        return state.fullFacetClassification;
    },
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
    },
    getQueryableTheiaVariables: state => {
        return state.queryableTheiaVariables;
    }
};

const mutations = {
    UPDATE_FULL_FACETED_CLASSIFICATION: (state, {payload, categoryFilters}) => {
        /**
         * add isCategoryNode folded to facetClassificationTheiaCategoryTree array item
         * in order to fold or not the not when the category not is re-rendered
         */
        payload.theiaCategoryTree.forEach(item =>
            setIsCategoryNodeFolded(item, categoryFilters)
        );
        state.fullFacetClassification = payload;
    },
    UPDATE_FACETED_CLASSIFICATION: (state, payload) => {
        payload.theiaCategoryFlat = flattenCategoryTree(payload.theiaCategoryTree);
        state.facetClassification = payload;
    },
    UPDATE_LOADING: (state, payload) => {
        state.loading = payload;
    },
    UPDATE_PRODUCER_INFO: (state, payload) => {
        state.producerInfo = payload;
    },
    UPDATE_FULL_THEIA_CATEGORY_TREE: (state, payload) => {
        state.fullTheiaCategoryTree = payload;
    },
    UPDATE_QUERYABLE_THEIA_VARIABLE: (state, payload) => {
        state.queryableTheiaVariables = payload;
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
                store.commit("UPDATE_FACETED_CLASSIFICATION", response.data)
                store.commit("UPDATE_FULL_FACETED_CLASSIFICATION", {
                    payload: response.data,
                    categoryFilters: []
                });
                store.commit("UPDATE_MAP_ITEMS", []);
                store.commit("UPDATE_OBSERVATION_LIST_ITEMS", []);
                store.commit("UPDATE_FULL_THEIA_CATEGORY_TREE", response.data.theiaCategoryTree)
                store.dispatch("setQueryableTheiaVariables")
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
    },

    /**
     * List of theia variable queryable. Those are all theia variables available in the database minus the theia variables
     * already selected in the filter
     * @param store
     */
    setQueryableTheiaVariables: store => {
        let tmp = [
            ...new Set(
                store.rootGetters.getFullFacetClassification.theiaVariables
            )
        ];
        store.commit("UPDATE_QUERYABLE_THEIA_VARIABLE",
            tmp.filter(item => {
                return !store.rootGetters.getFilters.theiaVariables.map(variable => variable.uri).includes(item.uri);
            }).sort((a, b) => (getI18n(a.simplifiedLabel, "en") > getI18n(b.simplifiedLabel, "en")) ? 1 : ((getI18n(b.simplifiedLabel, "en") > getI18n(a.simplifiedLabel, "en")) ? -1 : 0))
        )
    }
};

export let facets = {
    state,
    getters,
    mutations,
    actions
};

let setIsCategoryNodeFolded = function (categoryNode, categoryFilter) {
    if (!categoryNode.narrowers || categoryNode.narrowers.length === 0) {
        categoryNode.isCategoryNodeFolded = true;
        return true;
    } else {
        let isNarrowersAllFoldedAndNotSelected = true;
        //for each narrower we check if the narrower uri is present in the filter and the function is applied recursivly
        // for the narrowers of the narrowers
        categoryNode.narrowers.forEach(narrower => {
            isNarrowersAllFoldedAndNotSelected = setIsCategoryNodeFolded(narrower, categoryFilter)
                && !categoryFilter.some(elem => elem.uri == narrower.uri) && isNarrowersAllFoldedAndNotSelected
        });
        categoryNode.isCategoryNodeFolded = isNarrowersAllFoldedAndNotSelected;
        return isNarrowersAllFoldedAndNotSelected;
    }
};

let flattenCategoryTree = function (nodes) {
    let resultCategoryNodeList = [];
    for (let resultCategoryNode of nodes) {
        resultCategoryNodeList.push(resultCategoryNode)
        if (resultCategoryNode.narrowers) {
            resultCategoryNodeList.push(...flattenCategoryTree(resultCategoryNode.narrowers));
        }
    }
    return resultCategoryNodeList;
}
