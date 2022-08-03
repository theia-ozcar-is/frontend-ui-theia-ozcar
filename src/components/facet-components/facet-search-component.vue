<template>
  <div id="facet-search-container">
    <div id="facet-placeholder">
      <filter-summary-component @reset-filters="resetFacet"></filter-summary-component>
      <variable-component ref="variableComponent"></variable-component>
      <feature-of-interest-component ref="featureOfInterestComponent"></feature-of-interest-component>
      <temporal-extent-component ref="temporalExtentComponent"></temporal-extent-component>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="info circle icon"></i> Producers
        </div>
        <div v-if="getFullFacetClassification != null">
          <producer-tree-component
            :facetElements="getFullFacetClassification.producerNamesFacet"
            :mutationName="'TOGGLE_FILTERS_PRODUCER_NAMES'"
            :info="true"></producer-tree-component>
        </div>
      </div>
      <full-text-search-component ref="fullTextSearchComponent"></full-text-search-component>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="globe icon"></i> Geologies
        </div>
        <div v-if="getFullFacetClassification != null">
          <facet-component
            :facetElements="getFullFacetClassification.geologiesFacet"
            :mutationName="'TOGGLE_FILTERS_GEOLOGIES'"
            :info="false"
          ></facet-component>
        </div>
      </div>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="globe icon"></i> Climates
        </div>
        <div v-if="getFullFacetClassification != null">
          <facet-component
            :facetElements="getFullFacetClassification.climatesFacet"
            :mutationName="'TOGGLE_FILTERS_CLIMATES'"
            :info="false"
          ></facet-component>
        </div>
      </div>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="balance scale icon"></i> Fundings
        </div>
        <div v-if="getFullFacetClassification != null">
          <funding-tree-component
            :facetElements="getFullFacetClassification.fundingNamesFacet"
            :mutationName="'TOGGLE_FILTERS_FUNDING_NAMES'"
          ></funding-tree-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fundingTreeComponent from "./funding-tree-component.vue";
import facetComponent from "./facet-component.vue";
import temporalExtentComponent from "./temporal-extent-component.vue";
import variableComponent from "./variable-component.vue";
import fullTextSearchComponent from "./full-text-search-facet-component.vue";
import producerTreeComponent from "./producer-tree-component.vue"
import featureOfInterestComponent from "./feature-of-interest-component.vue"
import filterSummaryComponent from "./filter-summary-component.vue"
import Vuex from "vuex";

/**
 * @vuese
 * This component contains 4 facetComponent sub-component (geologie, climates, producer, fundings)
 * Facet classification result is passed to each of them in order to diplay the name of the filter
 * and the count of observation associated
 * The name of the Vuex Filter store mutation corresponding is also passed to each of the sub-component
 * in order for them to be able to call the mutation when one filter is checked
 * @group Facet components
 */
export default {
  name: "facet-search-component",
  components: {
    facetComponent,
    temporalExtentComponent,
    variableComponent,
    fundingTreeComponent,
    fullTextSearchComponent,
    producerTreeComponent,
    featureOfInterestComponent,
    filterSummaryComponent
  },
  data() {
    return {
      numberOfFitlers:0
    }
  },
  computed: {
    ...Vuex.mapGetters([
      "getFacetClassification",
      "getFullFacetClassification",
      "getFilters",
      "isFiltersEmpty"
    ])
  },
  methods: {
    ...Vuex.mapActions([
      "initFacets",
      "resetFilters",
      "setProducerInfo"
    ]),
    resetFacet() {
      this.resetFilters().then(() => {
        this.$refs.variableComponent.resetSelection();
        this.$refs.temporalExtentComponent.resetSelection();
        this.$refs.fullTextSearchComponent.resetSelection();
        this.$refs.featureOfInterestComponent.resetSelection();
        //this.$root.$emit("filter-reseted")
      });
    },
  },
  created() {
    /**
     * When the component is created the facet element are initialised using the whole database
     */
    this.initFacets();
    this.setProducerInfo();
  }
};
</script>

<style>
#facet-placeholder {
  position: absolute;
  height: calc(100% - 4rem);
  width: 100%;
  overflow: auto;
  padding: 5px 5px 5px 5px;
}

#facet-search-container {
  position: absolute;
  height: 100%;
  width: 25%;
  left: 0;
  top: 4rem;
  background-color:whitesmoke;
      border-right-style: solid;
  border-right-width: 2px;
  z-index:999;
}

/*#selection-buttons {*/
/*  width: calc(25% - 10px);*/
/*  padding: 0px 5px 5px 5px;*/
/*  display: flex;*/
/*  position: fixed;*/
/*  margin-bottom: 1rem;*/
/*  margin-top: 1rem;*/
/*}*/

#facet-placeholder .ui.segment .ui.top.attached.label {
  background-color: #ffebcd
}
</style>
