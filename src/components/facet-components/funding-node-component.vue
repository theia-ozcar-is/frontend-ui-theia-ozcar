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
          <li
              v-for="(item,index) in fundingItems"
              :ref="item.name"
              :key="index"
              class="funding-node"
          >
            <facet-checkbox-element-component v-if="getCountOfFundingNodeInResultFacet(item.fundingName) > -1"
                                              :mutationName="mutationName"
                                              :name="item.name"
                                              :count=getCountOfFundingNodeInResultFacet(item.fundingName)
                                              :info="false"
                                              :fundingName="item.fundingName"
            ></facet-checkbox-element-component>
            <facet-checkbox-element-component v-else
                                              class="not-in-results"
                                              :mutationName="mutationName"
                                              :name="item.name"
                                              :info="false"
                                              :fundingName="item.fundingName"
            ></facet-checkbox-element-component>
            <a
                class="funding-facet scanr link container"
                v-if="item.idScanR"
                :href="'https://scanr.enseignementsup-recherche.gouv.fr/structure/'+item.idScanR"
                target="_blank"
            >
              <i class="blue circle info icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import facetCheckboxElementComponent from "./facet-checkbox-element-component.vue";
import {mapGetters} from "vuex";

/**
 * @vuese
 * Node of the fundings tree
 * @group Facet components
 */
export default {
  props: {
    type: {
      //Type of hte fundings
      type: String,
      required: true
    },
    fundings: {
      //Array of funders + count. ex: {"name":"Avignon Université","count":267}
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
      isFolded: true
    };
  },
  components: {
    facetCheckboxElementComponent
  },
  computed: {
    ...mapGetters(["getFacetClassification" ,"getFullFacetClassification","getFilters"]),
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
    },
    fundingItems() {
      let items = [];
      this.fundings.forEach(element => {
        if (
            !element.acronym &&
            (this.type === "Other universities and schools" ||
                this.type === "Other research institutes" || this.type === "Other")
        ) {
          items.push({
            name: this.getCountryI18n(element, "en") + " - " + element.name,
            fundingName: element.name,
            count: element.count,
            idScanR: element.idScanR
          });
        } else if (
            element.acronym &&
            (this.type === "Other universities and schools" ||
                this.type === "Other research institutes" || this.type === "Other")
        ) {
          items.push({
            name:
                this.getCountryI18n(element, "en") +
                " - (" +
                element.acronym +
                ") - " +
                element.name,
            fundingName: element.name,
            count: element.count,
            idScanR: element.idScanR
          });
        } else if (
            !element.acronym &&
            !(
                this.type === "Other universities and schools" ||
                this.type === "Other research institutes" || this.type === "Other"
            )
        ) {
          items.push({
            name: element.name,
            fundingName: element.name,
            count: element.count,
            idScanR: element.idScanR
          });
        } else {
          items.push({
            name: "(" + element.acronym + ") - " + element.name,
            fundingName: element.name,
            count: element.count,
            idScanR: element.idScanR
          });
        }
      });
      items.sort((a, b) => a.name.localeCompare(b.name));
      for (var item of items) {
        item.name === "Other" ? items.push(items.splice(item, 1)[0]) : 0;
      }
      return items;
    }
  },
  methods: {
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
        let tmp = el.country.find(element => element.lang === lang);
        return tmp.text;
      } else {
        return "";
      }
    },
    /**
     * @vuese
     * Check if the funding node exists a as a resulting faceted producer node after a user query.
     * If it exists the method return the faceted producer node count otherwise it returns undefined
     * @param fundingNodeName initial producer node
     * @returns Number - result count for the given facet element
     */
    getCountOfFundingNodeInResultFacet(fundingNodeName) {
      const index = this.getFacetClassification.fundingNamesFacet.findIndex(element => element.name === fundingNodeName);
      if (index >= 0){
        return this.getFacetClassification.fundingNamesFacet[index].count;
      } else if (this.getFilters.fundingNames.some(element => element === fundingNodeName)) {
        return 0;
      } else {
        return undefined;
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
        this.isFolded = !this.getFullFacetClassification.fundingNamesFacet.some(
            funder => {
              return (
                  funder.type === this.type &&
                  this.getFilters.fundingNames.some(filter => {
                    return filter === funder.name;
                  })
              );
            }
        );
      },
      deep: true
    }
  }
};
</script>

<style>
.funding-facet.scanr.link.container {
  display: inline-block;
  text-align: right;
  align-self: center;
}

li.funding-node {
  display: flex;
  justify-content: space-between;
}
</style>
