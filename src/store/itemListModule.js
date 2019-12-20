import { pages } from "./pageModule.js";
import { producerItems } from "./producerListItemsModule.js";
import { observationListItems } from "./observationListItemsModule.js";
import { datasetListItems } from "./datasetListItemsModule.js";

const state = {
  /**
   * The nature of the item diplayed on the item list.
   * - observation
   * - producer
   * - dataset
   */
  itemListNature: "observation",

  totalItemCount: null,

  itemList: []
};

const getters = {
  getItemListNature: state => {
    return state.itemListNature;
  },
  getTotalItemCount: state => {
    return state.totalItemCount;
  },
  getItemList: state => {
    return state.itemList;
  }
};

const mutations = {
  UPDATE_ITEM_LIST_STATE: (state, { stateObjectName, payload }) => {
    state[stateObjectName] = payload;
  }
};

const actions = {
  setItemListNature: (store, payload) => {
    return new Promise(resolve => {
      /**
       * Update itemListNature
       */
      store.commit("UPDATE_ITEM_LIST_STATE", {
        stateObjectName: "itemListNature",
        payload: payload
      });
      resolve();
      // store
      //   .dispatch("changePage", {
      //     filters: store.rootGetters.getFilters,
      //     pageSize: 10,
      //     pageSelected: 1
      //   })
      //   .then(() => {
      //     store
      //       .dispatch("setNumberOfPage", null, { root: true })
      //       .then(() => resolve());
      //   });
    });
  },
  setItemListStateAccordingToItemNature: (store, ItemNature) => {
    return new Promise(resolve => {
      if (ItemNature == "observation") {
        store.commit("UPDATE_ITEM_LIST_STATE", {
          stateObjectName: "totalItemCount",
          payload: store.rootGetters.getTotalObservationsCount
        });
        store.commit("UPDATE_ITEM_LIST_STATE", {
          stateObjectName: "itemList",
          payload: store.rootGetters.getObservationListItems
        });
        resolve();
      } else if (ItemNature == "producer") {
        if (store.rootGetters.getTotalProducersCount) {
          store.commit("UPDATE_ITEM_LIST_STATE", {
            stateObjectName: "totalItemCount",
            payload: store.rootGetters.getTotalProducersCount
          });
          store.commit("UPDATE_ITEM_LIST_STATE", {
            stateObjectName: "itemList",
            payload: store.rootGetters.getProducerListItems
          });
          resolve();
        }
      } else if (ItemNature == "dataset") {
        if (store.rootGetters.getTotalDatasetsCount) {
          store.commit("UPDATE_ITEM_LIST_STATE", {
            stateObjectName: "totalItemCount",
            payload: store.rootGetters.getTotalDatasetsCount
          });
          store.commit("UPDATE_ITEM_LIST_STATE", {
            stateObjectName: "itemList",
            payload: store.rootGetters.getDatasetListItems
          });
          resolve();
        }
      }
    });
  }
};

export let itemList = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    pages,
    producerItems,
	observationListItems,
	datasetListItems
  }
};
