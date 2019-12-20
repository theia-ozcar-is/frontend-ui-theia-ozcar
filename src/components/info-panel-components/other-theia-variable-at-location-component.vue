<template>
  <div v-if="theiaVariablesList.length > 0">
    <div class="ui segment">
      <div class="ui top attached label">
        <i class="info icon"></i> Other variables at this location:
      </div>
      <div :class="['ui', loader ? 'active':'', 'inverted', 'dimmer']">
        <div class="ui loader"></div>
      </div>
      <div id="other-theia-variable-placeholder">
        <span
          class="other-theia-variable"
          v-for="variable in theiaVariablesList"
          :key="variable.uri"
          @click="getObservationIdsOfOtherTheiaVariable(variable.uri)"
        >
          <div class="ui tag teal label">{{getI18n(variable.prefLabel,"en")}}</div>
        </span>
      </div>
    </div>
  </div>
</template>

<style>
#other-theia-variable-placeholder {
  margin-top: 2rem;
  max-height: 20rem;
  overflow: auto;
}
.other-theia-variable .ui.tag.teal.label {
  margin: 0px 2px 2px 15px;
  cursor: pointer;
}
</style>

<script>
import Vuex from "vuex";
/**
 * @vuese
 * Component displaying other Theia variable sampled at a given location
 * @group Info panel components
 */
export default {
  name:"other-theia-variable-at-location-component",
  props: ["loader"],
  computed: {
    ...Vuex.mapGetters([
      "getVariablesAtOneLocation",
      "getObservationsDetailed"
    ]),
    /**
     * @vuese
     * Other theia variable sample at a given location
     * @type Array
     */
    theiaVariablesList() {
      const uris = new Set();

      const uniqueVariableList = this.getVariablesAtOneLocation.filter(
        variable => {
          const duplicate = uris.has(variable.uri);
          uris.add(variable.uri);
          return !duplicate;
        }
      );
      uniqueVariableList.sort((a,b) => (this.getI18n(a.prefLabel,"en") > this.getI18n(b.prefLabel,"en")) ? 1 : ((this.getI18n(b.prefLabel,"en") > this.getI18n(a.prefLabel,"en")) ? -1 : 0))

      if (
        this.getObservationsDetailed[0].observation.observedProperty
          .theiaVariable
      ) {
        return uniqueVariableList.filter(variable => {
          return (
            variable.uri !=
            this.getObservationsDetailed[0].observation.observedProperty
              .theiaVariable.uri
          );
        });
      } else {
        return uniqueVariableList;
      }
    }
  },
  methods: {
    ...Vuex.mapActions(["setObservationIdsOfOtherTheiaVariableAtLocation"]),
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    },
    /**
     * @vuese
     * Get the observation IDs of the Theia variable at a given location.
     */
    getObservationIdsOfOtherTheiaVariable(uri) {
      this.$emit("change-loader-state", true);
      //this.loader = true;
      this.setObservationIdsOfOtherTheiaVariableAtLocation({
        uri: uri,
        coordinates: this.getObservationsDetailed[0].observation
          .featureOfInterest.samplingFeature.geometry.coordinates
      }).then(() => this.$emit("change-loader-state", false));
    }
  }
};
</script>


