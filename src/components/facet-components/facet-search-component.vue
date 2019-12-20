<template>
  <div id="facet-search-container">
    <div class="ui buttons" id="selection-buttons">
      <button class="ui button" @click="resetFacet">Reset</button>
      <div class="or"></div>
      <button class="ui teal button" @click="submitFacet">Submit selection</button>
    </div>
    <div id="facet-placeholder">
      <!-- <div>
      <button class="ui button" @click="resetFacet">Reset</button>
      <button :class="['ui', 'primary', 'button'] " @click="submitFacet">Submit</button>
      </div>-->
      <variable-component ref="variableComponent"></variable-component>
      <temporal-extent-component ref="temporalExtentComponent"></temporal-extent-component>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="info circle icon"></i> Producers
        </div>
        <div v-if="getFacetClassification != null">
          <facet-component
            :facetElements="getFacetClassification.producerNamesFacet"
            :mutationName="'UPDATE_FILTERS_PRODUCER_NAMES'"
            :info="true"
          ></facet-component>
        </div>
      </div>
      <full-text-search-component ref="fullTextSearchComponent"></full-text-search-component>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="globe icon"></i> Geologies
        </div>
        <div v-if="getFacetClassification != null">
          <facet-component
            :facetElements="getFacetClassification.geologiesFacet"
            :mutationName="'UPDATE_FILTERS_GEOLOGIES'"
            :info="false"
          ></facet-component>
        </div>
      </div>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="globe icon"></i> Climates
        </div>
        <div v-if="getFacetClassification != null">
          <facet-component
            :facetElements="getFacetClassification.climatesFacet"
            :mutationName="'UPDATE_FILTERS_CLIMATES'"
            :info="false"
          ></facet-component>
        </div>
      </div>
      <div class="ui segment">
        <div class="ui top attached label">
          <i class="balance scale icon"></i> Fundings
        </div>
        <div v-if="getFacetClassification != null">
          <funding-tree-component
            :facetElements="getFacetClassification.fundingNamesFacet"
            :mutationName="'UPDATE_FILTERS_FUNDING_NAMES'"
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
    fullTextSearchComponent
  },
  computed: {
    ...Vuex.mapGetters([
      "getFacetClassification",
      "getFilters",
      "isFiltersEmpty"
    ])
  },
  methods: {
    ...Vuex.mapActions([
      "initFacets",
      "searchObservations",
      "resetFilters",
      "setProducerInfo"
    ]),
    resetFacet() {
      this.resetFilters().then(() => {
        this.$refs.variableComponent.resetSelection();
        this.$refs.temporalExtentComponent.resetSelection();
        this.$refs.fullTextSearchComponent.resetSelection();
        this.initFacets();
        this.$root.$emit("filter-reseted")
      });
    },
    submitFacet() {
      if (this.isFiltersEmpty) {
        this.initFacets();
      } else {
        this.searchObservations(this.getFilters);
        this.$root.$emit("observation-queried")
      }
    }
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
  height: calc(100% - 8rem);
  top: 4rem;
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
}

#selection-buttons {
  width: calc(25% - 10px);
  padding: 0px 5px 5px 5px;
  display: flex;
  position: fixed;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

#facet-placeholder .ui.segment .ui.top.attached.label {
  background-color: #ffebcd
}
</style>
