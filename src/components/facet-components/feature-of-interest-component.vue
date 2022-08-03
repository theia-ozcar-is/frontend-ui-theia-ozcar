<template>
    <div id="feature-of-interest-placeholder" class="ui segment">
      <div class="ui top attached label">
        <i id="feature-of-interest-filters-info" class="circle info icon" @click="showFeatureOfInterestInfoPopup"></i>
        <div class="ui popup show-feature-of-interest-info-popup">
          Currently, feature of interests are the country specific administrative boundaries that match the measurement location.
          You get more information on country specific administrative levels
          <a href="https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#10_admin_level_values_for_specific_countries" target="_blank" a>here</a>.
        </div>
        <i class="chart area icon"></i> Feature of interest
      </div>
      <div class="ui category search input autocomplete" id="feature-of-interest-search-bar">
        <div class="ui icon input">
        <input v-model="query" class="prompt"
            placeholder="Search for a feature..."
            type="text"
        />
        <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
<!--      <div id="feature-of-interest-tags-placeholder" v-if="getFilters.featureOfInterests.length > 0">-->
<!--        <span class="item" v-for="(foi, index) in getFilters.featureOfInterests" :key="index">-->
<!--          <div class="ui tag teal label">-->
<!--            {{foi.name}}-->
<!--            <i class="delete icon" @click="deleteFeatureOfInterest($event)"></i>-->
<!--          </div>-->
<!--        </span>-->
<!--      </div>-->
    </div>
</template>

<script>
import Vuex from "vuex";
/**
 * @vuese
 * Component to build query using Theia variables of Theia categories
 * @group Facet components
 */
export default {
  name: "feature-of-interest-component",
  data() {
    return {
      query:""
    };
  },
  computed: {
    ...Vuex.mapGetters([
      "getFullFacetClassification",
      "getFilters",
      "isFiltersEmpty"
    ]),
    /**
     * @vuese
     * List of feature of interest that could be printed in the autocompletion block
     * @type Array
     */
    prefLabelList() {
      if (this.getFullFacetClassification){
        let tmp = [
          ...new Set(
              this.getFullFacetClassification.administrativeFeatureProperties
                  .map(obj => {
                    return {title: obj.name,
                      category: obj.admin_level2_parent_name_en,
                      description: "Administrative level " + obj.admin_level}
                  })
                  .sort()
          )
        ];
        return tmp.filter(item => {
          return !this.getFilters.featureOfInterests.some(item2=> item2.name === item.title);
        });
      } else {
        return null;
      }
    }
  },
  methods: {
    ...Vuex.mapActions([
      "setFeatureOfInterestsFilter"
    ]),
    /**
     * @vuese
     * Add a Theia variable to the query filter.
     * @arg TheiaVariable selected
     */
    setResult(result) {
      let tmp = this.getFilters.featureOfInterests;
      if (!tmp.some(elem => elem === result)) {
        tmp.push(result);
      }
      this.setFeatureOfInterestsFilter(tmp)
      this.query = "";
    },
    // /**
    //  * @vuese
    //  * Remove a Theia variable to the query filter
    //  */
    // deleteFeatureOfInterest(event) {
    //   // the word to delete
    //   let foi = event.currentTarget.parentElement.innerText.trim();
    //   //the word is deleted from words array
    //   let tmp = this.getFilters.featureOfInterests;
    //   tmp.splice(
    //       tmp.map(el => el.name).indexOf(foi.valueOf()),
    //       1
    //   );
    //   //the store filter is updated
    //   this.setFeatureOfInterestsFilter(tmp);
    // },
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    },
    resetSelection() {
      this.query = "";
    },
    showFeatureOfInterestInfoPopup() {
      $('#feature-of-interest-filters-info').popup({
        on: 'manual',
        position: 'bottom right'
      }).popup('show')
    }
  },
  watch: {
    prefLabelList:{
      handler(newVal) {
        if(newVal) {
          $('.ui.category.search')
              .search({
                type: 'category',
                source: this.prefLabelList,
                searchFields   : [
                  'title'
                ],
                fullTextSearch: "exact",
                cache: false,
                onSelect:  (result) => {
                  this.setResult({
                    name:result.title,
                    admin_level2_parent_name_en:result.category,
                    admin_level:result.description.replace("Administrative level ", "")})
                }
              });
        }
      }
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
#feature-of-interest-tags-placeholder {
  max-height: 150px;
  overflow: auto;
  padding-top: 10px;
}

#feature-of-interest-tags-placeholder > .item > .ui.tag.teal.label {
  margin: 0px 2px 2px 15px;
}
#feature-of-interest-search-bar.ui.category.search.input.autocomplete {
  width: 100%;
}
#feature-of-interest-search-bar.ui.category.search.input.autocomplete > .input {
  width: 100%;
}
#feature-of-interest-search-bar > .input > input
{
  border-radius: 5px;
}
#feature-of-interest-filters-info {
  cursor: pointer;
  float: right;
}
</style>