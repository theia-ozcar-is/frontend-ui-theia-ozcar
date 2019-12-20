//import Axios from "axios";
import { axiosInstance } from "../config/axiosConfig.js";

const state = {
  //number of page resulting of the pagination of observations resulting a query
  numberOfPage: null,
  //number of observation per page
  pageSize: 10,
  //display or not page loading dimmer
  pagesLoading: false
};

const getters = {
  getNumberOfPage: state => {
    return state.numberOfPage;
  },
  getPageSize: state => {
    return state.pageSize;
  },
  getPagesLoading: state => {
    return state.pagesLoading;
  }
};

const mutations = {
  UPDATE_NUMBER_OF_PAGE: (state, payload) => {
    state.numberOfPage = payload;
  },
  UPDATE_PAGE_SIZE: (state, payload) => {
    state.pageSize = payload;
  },
  UPDATE_PAGE_LOADING: state => {
    state.pagesLoading = !state.pagesLoading;
  }
};

const actions = {
  /**
   * Calculate the number of page resulting of the pagination of observations resulting a query
   */
  setNumberOfPage: store => {
    if (store.rootGetters.getTotalItemCount % store.getters.getPageSize !== 0) {
      store.commit(
        "UPDATE_NUMBER_OF_PAGE",
        Math.floor(
          store.rootGetters.getTotalItemCount / store.getters.getPageSize
        ) + 1
      );
    } else {
      store.commit(
        "UPDATE_NUMBER_OF_PAGE",
        Math.floor(
          store.rootGetters.getTotalItemCount / store.getters.getPageSize
        )
      );
    }
  },
  /**
   * Change the number of observations diplayed on one page
   */
  changePageSize: (store, { filters, pageSize }) => {
    store.commit("UPDATE_PAGE_SIZE", pageSize);
    store.dispatch("changePage", { filters, pageSize, pageSelected: 1 });
    store.dispatch("setNumberOfPage");
  },
  /**
   * Query the given page of the pagination.
   */
  changePage: (store, { filters, pageSize, pageSelected }) => {
    return new Promise(resolve => {
      //Launch the spinner
      store.commit("UPDATE_PAGE_LOADING");
      let headers = {
        "Content-Type": "application/json"
      };
      /**
       * If the requested items are of nature "observation",
       * "/observation/changeObservationsPage" is requested
       */
      if (store.rootGetters.getItemListNature == "observation") {
        store
          .dispatch("setObservationListItems", {
            filters,
            pageSize,
            pageSelected
          })
          .then(() => {
            /**
             * The list item state is updated using the new list content
             */
            store
              .dispatch(
                "setItemListStateAccordingToItemNature",
                store.rootGetters.getItemListNature
              )
              .then(() => {
                store.commit("UPDATE_PAGE_LOADING");
                resolve();
              });
          });
        /**
         * If the requested items are of nature "producer",
         * "/observation/changeProducerPage" is requested
         */
      } else if (store.rootGetters.getItemListNature == "producer") {
        store
          .dispatch("setProducerListItems", { filters, pageSize, pageSelected })
          .then(() => {
            /**
             * The list item state is updated using the new list content
             */
            store
              .dispatch(
                "setItemListStateAccordingToItemNature",
                store.rootGetters.getItemListNature
              )
              .then(() => {
                store.commit("UPDATE_PAGE_LOADING");
                resolve();
              });
          });
      } else if (store.rootGetters.getItemListNature == "dataset") {
        store
          .dispatch("setDatasetListItems", { filters, pageSize, pageSelected })
          .then(() => {
            /**
             * The list item state is updated using the new list content
             */
            store
              .dispatch(
                "setItemListStateAccordingToItemNature",
                store.rootGetters.getItemListNature
              )
              .then(() => {
                store.commit("UPDATE_PAGE_LOADING");
                resolve();
              });
          });
      }
    });
  }
};

export let pages = {
  state,
  getters,
  mutations,
  actions
};
