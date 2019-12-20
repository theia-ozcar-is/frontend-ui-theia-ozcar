<template>
  <div>
    <div v-for="(facetElement, index) in facetElements" :key="index">
      <facet-checkbox-element-component
        :name="facetElement.name"
        :count="facetElement.count"
        :type="facetElement.type"
        :mutationName="mutationName"
        :info="info"
      ></facet-checkbox-element-component>
    </div>
  </div>
</template>

<script>
import facetCheckboxElementComponent from "./facet-checkbox-element-component.vue";
import Vuex from "vuex";

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
      // the mutation name ex: "UPDATE_FILTERS_GEOLOGIES"
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
  }
};
</script>

<style>
.custom label {
  float: left;
}
</style>
