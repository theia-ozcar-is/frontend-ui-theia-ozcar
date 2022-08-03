<template>
  <div>
    <div v-for="(facetElement, index) in facetElements" :key="index">
      <facet-checkbox-element-component
          v-if="getCountOfBucketNodeInResultFacet(facetElement) >= 0 && facetElement.name"
        :name="facetElement.name"
        :count="getCountOfBucketNodeInResultFacet(facetElement)"
        :type="facetElement.type"
        :mutationName="mutationName"
        :info="info"
      ></facet-checkbox-element-component>
      <facet-checkbox-element-component
          v-else-if="facetElement.name"
          class="not-in-results"
          :name="facetElement.name"
          :type="facetElement.type"
          :mutationName="mutationName"
          :info="info"
      ></facet-checkbox-element-component>
    </div>
  </div>
</template>

<script>
import facetCheckboxElementComponent from "./facet-checkbox-element-component.vue";
import {mapGetters} from "vuex";

/**
 * @vuese
 * This component contains as many sub-component as there is filters to diplay in facet classification result.
 * For each filter a sub component is created and the filter name, the filter count, the filter type, and the
 * vuex filter store mutation name are passed
 * @group Facet components
 */
export default {
  props: {
    facetElements: {
      //The facet element object ex: {"name":"Carbonate rocks","count":267}
      type: Array,
      required: true
    },
    mutationName: {
      // the mutation name ex: "TOGGLE_FILTERS_GEOLOGIES"
      type: String,
      required: true
    },
    info: {
      //For producer infobulle
      type: Boolean,
      required: true
    }
  },
  components: {
    facetCheckboxElementComponent
  },
  computed: {
    ...mapGetters(["getFacetClassification","getFilters"])
  },
  methods: {
    /**
     * @vuese
     * Check if the producer node exists a as a resulting faceted producer node after a user query.
     * If it exists the method return the faceted producer node count otherwise it returns undefined
     * @param node initial producer node
     * @returns Number - result count for the given facet element
     */
    getCountOfBucketNodeInResultFacet(node) {
      if (this.mutationName === "TOGGLE_FILTERS_GEOLOGIES"){
        const index = this.getFacetClassification.geologiesFacet.findIndex(element => element.name == node.name);
        if (index >= 0) {
          if(this.getFacetClassification.geologiesFacet[index].count > 0){
            return this.getFacetClassification.geologiesFacet[index].count;
          } else {
            return -1
          }
        } else if (this.getFilters.geologies.some(element => element == node.name)){
          return 0;
        } else {
          return -1
        }
      } else if (this.mutationName === "TOGGLE_FILTERS_CLIMATES") {
        const index = this.getFacetClassification.climatesFacet.findIndex(element => element.name == node.name);
        if (index >= 0) {
          if(this.getFacetClassification.climatesFacet[index].count > 0){
            return this.getFacetClassification.climatesFacet[index].count;
          } else {
            return -1
          }
        } else if (this.getFilters.climates.some(element => element == node.name)){
          return 0;
        } else {
          return -1;
        }
      }
    }
  }
};
</script>

<style>
.custom label {
  float: left;
}
</style>
