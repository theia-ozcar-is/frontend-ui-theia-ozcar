<template>
  <div id="funding-tree-placeholder">
    <div v-for="fundingType in fundingTypes" :key="fundingType">
      <funding-node-component
        v-if="['French universities and schools','French research institutes','French research units','French federative structure','Other universities and schools','Other research institutes','Other'].includes(fundingType.trim())"
        :type="fundingType"
        :fundings="fundingNodes[fundingType]"
        :mutationName="mutationName"
      ></funding-node-component>
    </div>
  </div>
</template>

<script>
import fundingNodeComponent from "./funding-node-component.vue";

//
/**
 * @vuese
 * Tree of fundings facet component
 * @group Facet components
 */
export default {
  name: "funding-tree-component",
  props: {
    facetElements: {
      // The fundings facet element ex {"name":"Avignon Université","type":"Organisation","count":267}
      type: Array,
      required: true
    },
    //Store mutation name to update the filters. ex "TOGGLE_FILTERS_FUNDING_NAMES"
    mutationName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fundingNodes: {}
    };
  },
  computed: {
    fundingTypes() {
      let ftypes = Object.keys(this.fundingNodes).sort();
      for (let i=0; i< ftypes.length; i++) {
        if(ftypes[i] === "Other") {
          ftypes.push(ftypes[i]);
          ftypes.splice (i,1);
        }
      }
      return ftypes;
    }
  },
  watch: {
    /**
     * @vuese
     * Watch facetElements props - on change populateFundingsTypes
     */
    facetElements() {
      this.populateFundingTypes();
    }
  },
  components: {
    //facetCheckboxElementComponent
    fundingNodeComponent
  },
  beforeMount() {
    this.populateFundingTypes();
  },
  methods: {
    /**
     * @vuese
     * method used to instanciate funding-node-component for
     * funding type and populate these component with the funding facet elements
     */
    populateFundingTypes() {
      this.fundingNodes = [];
      this.facetElements.forEach(e => {
        if (this.fundingNodes[e.type] !== undefined) {
          this.fundingNodes[e.type] = [
            ...this.fundingNodes[e.type],
            {
              name: e.name,
              acronym: e.acronym,
              country: e.country,
              idScanR: e.idScanR,
              count: e.count
            }
          ];
        } else {
          this.fundingNodes[e.type] = [
            {
              name: e.name,
              acronym: e.acronym,
              country: e.country,
              idScanR: e.idScanR,
              count: e.count
            }
          ];
        }
      });
    }
  }
};
</script>

<style>
</style>
