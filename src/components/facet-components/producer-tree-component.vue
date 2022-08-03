<template>
  <div id="producer-tree-placeholder">
    <div v-for="(node,key) in producerTypeNodes" :key="Object.keys(node)[0]">
      <producer-node-component
          :type="key"
          :producers="producerTypeNodes[key]"
          :mutationName="mutationName"
      ></producer-node-component>
    </div>
  </div>
</template>

<script>
import producerNodeComponent from "./producer-node-component.vue";
import Vuex from "vuex";

/**
 * @vuese
 * This component contains as many sub-component as there is filters to diplay in facet classification result.
 * For each filter a sub component is created and the filter name, the filter count, the filter type, and the
 * vuex filter store mutation name are passed
 * @group Facet components
 */
export default {
  data() {
    return {
      producerTypeNodes: [],
    };
  },
  props: {
    facetElements: {
      //The facet element object ex: {"name":"OZCAR-RI AMMA-CATCH","count":4189}
      type: Array,
      required: true,
    },
    mutationName: {
      // the mutation name ex: "UPDATE_FILTERS_PRODUCERS"
      type: String,
      required: true,
    },
    info: {
      //For producer infobulle
      type: Boolean,
      required: true,
    },
  },
  components: {
    producerNodeComponent,
  },
  beforeMount() {
    this.populateProducerNodes();
  },
  watch: {
    /**
     * @vuese
     * Watch facetElements props - on change populateProducerNodes
     */
    facetElements() {
      this.populateProducerNodes();
    },
  },
  methods: {
    populateProducerNodes() {
      this.producerTypeNodes = {};
      for (let producerElement of this.facetElements) {
        if (producerElement.name.match(/OZCAR-RI.*/) != null) {
          if (this.producerTypeNodes["OZCAR-RI"] != undefined) {
            this.producerTypeNodes["OZCAR-RI"] = [
              ...this.producerTypeNodes["OZCAR-RI"],
              producerElement,
            ];
          } else {
            this.producerTypeNodes["OZCAR-RI"] = [producerElement];
          }
        }
            //----
            // Add other condition for other type of producer (ex:RZA)
            //----

        //For producer that does not have defined type
        else {
          if (this.producerTypeNodes["Other"] != undefined) {
            this.producerTypeNodes["Other"] = [
              ...this.producerTypeNodes["Other"],
              producerElement,
            ];
          } else {
            this.producerTypeNodes["Other"] = [producerElement];
          }
        }
      }
    },
  },
};
</script>