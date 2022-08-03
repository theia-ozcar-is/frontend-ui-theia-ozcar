<template>
  <div class="category-node-placeholder">
    <span @click="toggleFolding">
      <i :class="[setCircleIcon, 'circle', 'icon']"></i>
      <span>
        <b>{{ type }}</b>
      </span>
    </span>

    <div v-show="!isFolded" class="child-nodes-content">
      <div>
        <ul>
          <li class="producer-node">
            <div class="ui toogle checkbox custom">
              <input type="checkbox" @click="toggleAllProducerNodes($event)"/>
              <label>
                <span class="facet-element-container">
                  <b>All</b>
                </span>
              </label>
            </div>
          </li>
          <li
              v-for="(producer, index) in producers"
              :ref="producer.name"
              :key="index"
              class="producer-node"
          >
            <facet-checkbox-element-component v-if="getCountOfProducerNodeInResultFacet(producer) > -1"
                                              ref="producerCheckboxes"
                                              :mutationName="mutationName"
                                              :name="producer.name"
                                              :count=getCountOfProducerNodeInResultFacet(producer)
                                              :info="true"
            ></facet-checkbox-element-component>
            <facet-checkbox-element-component v-else
                                              class="not-in-results"
                                              ref="producerCheckboxes"
                                              :mutationName="mutationName"
                                              :name="producer.name"
                                              :info="true"
            ></facet-checkbox-element-component>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import facetCheckboxElementComponent from "./facet-checkbox-element-component.vue";
import {mapActions, mapGetters} from "vuex";

/**
 * @vuese
 * Node of the producer tree
 * @group Facet components
 */
export default {
  props: {
    type: {
      //Type of hte producers
      type: String,
      required: true,
    },
    producers: {
      //Array of producers + count. ex: {"name":"OZCAR-RI AMMA-CATCH","count":267}
      type: Array,
      required: true,
    },
    //Store mutation name to update the filters. ex "TOGGLE_FILTERS_PRODUCER_NAMES"
    mutationName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFolded: true,
    };
  },
  components: {
    facetCheckboxElementComponent,
  },
  computed: {
    ...mapGetters(["getFacetClassification", "getFilters"]),
    /**
     * @vuese
     * String - "plus" "minus" "outline". shape of the circle icon depending on the node state
     * @type String
     */
    setCircleIcon() {
      if (this.isFolded) {
        return "plus";
      } else {
        return "minus";
      }
    }
  },
  methods: {
    ...mapActions(["setBucketFilter","searchObservations"]),
    /**
     * @vuese
     * toggle folding state of the node
     */
    toggleFolding() {
      this.isFolded = !this.isFolded;
    },
    /**
     * @vuese
     * Getter to get the country of the funder
     */
    getCountryI18n(el, lang) {
      if (el.country) {
        let tmp = el.country.find((element) => element.lang === lang);
        return tmp.text;
      } else {
        return "";
      }
    },
    toggleAllProducerNodes(event) {
      if (event.currentTarget.checked) {
        this.$refs.producerCheckboxes.forEach((e) => {
          if (!e.isChecked(e.name,"TOGGLE_FILTERS_PRODUCER_NAMES")){
            this.setBucketFilter({searchObservations:false, mutationName:"TOGGLE_FILTERS_PRODUCER_NAMES", name:e.name})
          }
        });
      } else {
        this.$refs.producerCheckboxes.forEach((e) => {
          if (e.isChecked(e.name,"TOGGLE_FILTERS_PRODUCER_NAMES")){
            this.setBucketFilter({searchObservations:false, mutationName:"TOGGLE_FILTERS_PRODUCER_NAMES", name:e.name})
          }
        });
      }
      this.searchObservations(this.getFilters);
    },
    /**
     * @vuese
     * Check if the producer node exists a as a resulting faceted producer node after a user query.
     * If it exists the method return the faceted producer node count otherwise it returns undefined
     * @param producerNode initial producer node
     * @returns Number - result count for the given facet element
     */
    getCountOfProducerNodeInResultFacet(producerNode) {
      const index = this.getFacetClassification.producerNamesFacet.findIndex(element => element.name === producerNode.name);
      if (index >= 0) {
        return this.getFacetClassification.producerNamesFacet[index].count;
      } else if (this.getFilters.producerNames.some(element => element === producerNode.name)) {
        return 0;
      } else {
        return -1;
      }
    }
  },
  watch: {
    /**
     * @vuese
     * getFacetClassification store getter watcher. Used to fold or unfold node depending on
     * funders selected
     */
    getFacetClassification: {
      handler() {
        console.log(this.getFilters.producerNames.some(producer => producer.match(/OZCAR-RI.*/, "") != null));
        console.log(this.getFacetClassification.producerNamesFacet.some(producer => (producer.name.match(/OZCAR-RI.*/, ""))));
        this.isFolded = ! (this.getFilters.producerNames.some(producer => producer.match(/OZCAR-RI.*/, "") != null)
            // || this.getFacetClassification.producerNamesFacet.some(
            // producer => (producer.name.match(/OZCAR-RI.*/, "")))
        )
      },
      deep: true,
    },
  },
};
</script>

<style>
.producer-facet.scanr.link.container {
  display: inline-block;
  text-align: right;
  align-self: center;
}

.ui.checkbox.not-in-results {
  font-weight: lighter;
  font-size: small;
}

.ui.checkbox.not-in-results label, .ui.checkbox.not-in-results + label {
  color: darkgray;
}

.ui.checkbox.not-in-results input:checked ~ .box:after, .ui.checkbox.not-in-results input:checked ~ label:after {
  color: darkgray;
}

.ui.checkbox input:checked ~ .box:after, .ui.checkbox input:checked ~ label:after {
  color: black !important;
}

.ui.checkbox.not-in-results input:focus ~ label {
  color: darkgray !important;
}


li.producer-node {
  display: flex;
  justify-content: space-between;
}
</style>
