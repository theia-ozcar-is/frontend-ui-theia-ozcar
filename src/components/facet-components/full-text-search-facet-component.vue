<template>
  <div id="full-text-placeholder" class="ui segment">
    <div class="ui top attached label">
      <i id="full-text-filters-info" class="circle info icon" @click="showFullTextInfoPopup"></i>
      <div class="ui popup show-feature-of-interest-info-popup">
        <p>The full text filter will search using each word in a phrase independently. You can force a full text query on a entire phrase using by writing the sentence in quotation marks.</p>
        <p>Example: <i>"I want to query using this entire sentence"</i>.</p>
      </div>
      <i class="edit icon"></i> Full text search
    </div>
    <div>
      <div class="ui icon input" id="map-search-bar">
        <input v-model="query" placeholder="Search..." @keydown.enter="addWord" type="text" />
        <i class="search link icon" @click="addWord"></i>
      </div>
<!--      <div id="word-searched-placeholder">-->
<!--        <span class="item" v-for="(word, index) in getFilters.fullText" :key="index">-->
<!--          <div class="ui tag teal label">-->
<!--            {{word}}-->
<!--            <i class="delete icon" @click="deleteWord($event)"></i>-->
<!--          </div>-->
<!--        </span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

/**
 * @vuese
 * Component used to make full text search
 * @group Facet components
 */
export default {
  data() {
    return {
      /**
       * @vuese
       * The query string in the search bar
       */
      query: "",
    };
  },
  computed: {
    /**
     * Getters from Vuex filter store
     */
    ...mapGetters(["isFiltersEmpty","getFilters","getFacetClassification"])
  },
  methods: {
    /**
     * Actions from Vuex filter and observation store
     */
    ...mapActions([
      "setFullTextFilter",
      "resetObservations",
      "initFacets"
    ]),
    /**
     * @vuese
     * Method triggered a word searched. The word is printed to the ui, the filters are updated
     * with the new word and new observations are queried using the updated filters
     */
    addWord() {
      let queryTrim = this.query.trim();
      if (queryTrim !== "" && this.getFilters.fullText.indexOf(queryTrim) === -1) {
        let tmp = this.getFilters.fullText
        tmp.push(queryTrim);
        //Update filters (async)
        this.setFullTextFilter(tmp);
        //the search bar is emptied
        this.query = "";
      }
    },

    resetSelection() {
      this.query = "";
    },

    /**
     * @vuese
     * Method triggered when the word searched is deleted by the user. The word is deleted from the UI,
     * the filters are updated and observations are queried using the new filters
     * @arg event
     */
    // deleteWord(event) {
    //   // the word to delete
    //   let word = event.currentTarget.parentElement.innerText.trim();
    //   //the word is deleted from full text filter array
    //   let tmp = this.getFilters.fullText
    //   tmp.splice(tmp.indexOf(word.valueOf()), 1);
    //   let queryParam = "";
    //   //If the queryParam is empty, the filters are updated
    //   // if the queryParam string is not emtpy the filter are updated
    //   if (tmp.length == 0) {
    //     this.setFullTextFilter([]);
    //   } else {
    //     this.setFullTextFilter(tmp);
    //   }
    // },
    showFullTextInfoPopup() {
        $('#full-text-filters-info').popup({
          on: 'manual',
          position: 'bottom right'
        }).popup('show')
    }
  }
};
</script>

<style>
#map-search-bar {
  position: relative;
  width: 100%;
  text-align: center;
}

#word-searched-placeholder {
  max-height: 150px;
  overflow: auto;
  padding-top: 10px;
}

#word-searched-placeholder > .item > .ui.tag.teal.label {
  margin: 0px 2px 2px 15px;
}

#full-text-filters-info {
  cursor: pointer;
  float: right;
}
</style>
