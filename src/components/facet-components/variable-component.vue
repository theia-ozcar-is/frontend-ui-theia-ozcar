<template>
  <div>
    <div id="variable-placeholder" class="ui segment">
      <div class="ui top attached label">
        <i class="chart area icon"></i> Variables
      </div>
      <div class="ui icon input autocomplete" id="variables-search-bar">
        <i class="search icon"></i>
        <input
          v-model="search"
          @input="onChange"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
          placeholder="Select a variable..."
          type="text"
        />
        <!-- <div class="ui teal button" @click="selectATheiaVariable">Select</div> -->
        <div v-show="isVisible">
          <ul v-if="results.length>0" class="autocomplete-results" ref="autocomplete-results">
            <li
              v-for="(result,index) in results"
              :key="index"
              @click="setResult(result)"
              class="autocomplete-result"
              :class="{ 'is-active': index === arrowCounter }"
            >{{result }}</li>
          </ul>
          <ul class="autocomplete-results-no-content" ref="autocomplete-results" v-else>
            <li class="autocomplete-result-no-content">
              <div class="header">No Results</div>
              <div class="description">Your search returned no results</div>
            </li>
          </ul>
        </div>
      </div>
      <div id="variable-tags-placeholder" v-if="variablesSelected.length > 0">
        <span class="item" v-for="(variable, index) in variablesSelected" :key="index">
          <div class="ui tag teal label">
            {{variable}}
            <i class="delete icon" @click="deleteVariable($event)"></i>
          </div>
        </span>
      </div>
    </div>
    <!-- <div class="ui divider"></div> -->
    <div id="category-placeholder" class="ui segment">
      <div class="ui top attached label">
        <i class="chart area icon"></i> Categories of variable
      </div>
      <div v-if="getFacetClassification != null">
        <div
          class="category-tree-placeholder"
          v-for="(node, index) in getFacetClassification.theiaCategoryTree"
          :key="index"
        >
          <category-tree-component
            :node="node"
            v-on:select-a-theia-variable="setResult"
            :key="componentKey"
          ></category-tree-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import CategoryTreeComponent from "./category-tree-component.vue";

let findUriUsingPrefLabels = (theiaVariables, prefLabels, lang) => {
  let uris = [];
  prefLabels.forEach(label => {
    let tmpVariable = theiaVariables.find(variable => {
      let tmp = variable.prefLabel.find(element => element.lang === lang);
      return label === tmp.text;
    });
    uris.push(tmpVariable.uri);
  });
  return uris;
};

//
/**
 * @vuese
 * Component to build query using Theia variables of Theia categories
 * @group Facet components
 */
export default {
  name: "variable-component",
  components: {
    CategoryTreeComponent
  },
  data() {
    return {
      /**
       * @vuese
       * String -search input
       */
      search: "",
      /**
       * @vuese
       * boolean - whether the autocompletion block is visible
       */
      isVisible: false,
      /**
       * @vuese
       * List of Theia variable to be printed in the autocompletion block
       */
      results: [],
      /**
       * @vuese
       * List of theia variable selected
       */
      variablesSelected: [],
      /**
       * Position of the arrow selector
       */
      arrowCounter: -1,
      /**
       * @vuese
       * Number key used to force rerender of Category node component
       */
      componentKey: 0
    };
  },
  computed: {
    ...Vuex.mapGetters([
      "getFacetClassification",
      "getFilters",
      "isFiltersEmpty",
      "getCategoryNodesSelected"
    ]),
    /**
     * @vuese
     * List of Theia variable that could be printed in the autocompletion block
     * @type Array
     */
    prefLabelList() {
      let tmp = [
        ...new Set(
          this.getFacetClassification.theiaVariables
            .map(obj => {
              return this.getI18n(obj.prefLabel, "en");
            })
            .sort()
        )
      ];
      return tmp.filter(item => {
        return !this.variablesSelected.includes(item);
      });
    }
  },
  methods: {
    ...Vuex.mapActions([
      "setCategoryNodesSelected",
      "setTheiaVariablesFilter"
    ]),
    /**
     * @vuese
     * Show autocompletion proposition
     */
    onChange() {
      this.isVisible = true;
      this.filterResults();
    },
    /**
     * @vuese
     * Filter prefLabelList using search input into a list of theiaVariable to be printed in the autocompletion block
     */
    filterResults() {
      this.results = this.prefLabelList.filter(
        item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    /**
     * @vuese
     * Add a Theia variable to the query filter.
     * @arg TheiaVariable selected
     */
    setResult(result) {
      this.search = "";
      this.isVisible = false;
      if (!this.variablesSelected.some(elem => elem === result)) {
        this.variablesSelected.push(result);
      }
      this.arrowCounter = -1;
      this.setTheiaVariablesFilter(
        findUriUsingPrefLabels(
          this.getFacetClassification.theiaVariables,
          this.variablesSelected,
          "en"
        )
      );
    },
    /**
     * @vuese
     * Remove a Theia variable to the query filter
     */
    deleteVariable(event) {
      // the word to delete
      let variable = event.currentTarget.parentElement.innerText.trim();
      //the word is deleted from words array
      this.variablesSelected.splice(
        this.variablesSelected.indexOf(variable.valueOf()),
        1
      );
      //the store filter is updated
      this.setTheiaVariablesFilter(
        findUriUsingPrefLabels(
          this.getFacetClassification.theiaVariables,
          this.variablesSelected,
          "en"
        )
      );
    },
    /**
     * @vuese
     * Change arrow selector position
     */
    onArrowDown() {
      if(this.search == ""){
        this.onChange();
      } 
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    /**
     * @vuese
     * Change arrow selector position
     */
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    /**
     * @vuese
     * Select a Theia variable
     */
    onEnter() {
      if (this.results.length > 0 && this.arrowCounter !== -1) {
        this.setResult(this.results[this.arrowCounter]);
      }
    },
    /**
     * @vuese
     * Hide autocompletion block on click oustide block
     */
    handleClickOutside(evt) {
      if (this.isVisible) {
        if (!this.$refs["autocomplete-results"].contains(evt.target)) {
          this.isVisible = false;
          this.arrowCounter = -1;
        }
      }
    },
    /**
     * @vuses
     * Reset the selection of theia variable and theia categories
     * 1 - Reset category node selected (async)
     */
    resetSelection() {
      this.componentKey += 1;
      this.variablesSelected = [];
      this.search = "";
      this.isVisible = false;
      this.results = [];
      this.arrowCounter = -1;
      this.setCategoryNodesSelected(null);
    },
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style>
#variable-tags-placeholder {
  max-height: 150px;
  overflow: auto;
  padding-top: 10px;
}

#variable-tags-placeholder > .item > .ui.tag.teal.label {
  margin: 0px 2px 2px 15px;
}

.autocomplete#variables-search-bar {
  position: relative;
  width: 100%;
  text-align: center;
}

.ui.input.autocomplete > input {
  /* max-width: 100%; */
  /* width: 80%; */
  /* text-align: left;
  line-height: 1.21428571em;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 0.67857143em 1em;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  transition: box-shadow 0.1s ease, border-color 0.1s ease,
    -webkit-box-shadow 0.1s ease; */
}

/* .autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
} */
.autocomplete-result-no-content,
.autocomplete-results {
  /* display: none; */
  padding-left: 15px;
  position: absolute;
  top: 100%;
  left: 0;
  -webkit-transform-origin: center top;
  transform-origin: center top;
  white-space: normal;
  text-align: left;
  text-transform: none;
  background: #fff;
  margin-top: 0.5em;
  width: 18em;
  border-radius: 0.28571429rem;
  -webkit-box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid #d4d4d5;
  z-index: 998;
  text-shadow: 0 0 black;
}

.autocomplete-result-no-content {
  background: #fce8e8;
}

.autocomplete-result-no-content,
.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
  cursor: pointer;
}

.autocomplete-result-no-content > .header {
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
}

.autocomplete-result-no-content > .description {
  margin-top: 0.25rem;
  font-size: 1em;
  color: rgba(0, 0, 0, 0.87);
}
</style>
