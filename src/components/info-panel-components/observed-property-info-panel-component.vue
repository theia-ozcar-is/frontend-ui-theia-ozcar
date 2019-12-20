<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="info circle icon"></i>Variables:
    </div>
    <div>
      <div class="observation-data-type-processing-level-placeholder">
        <span
          v-if="observationsDetail[0].observation.dataType && observationsDetail[0].observation.timeSerie"
        >
          <b>Type:</b>
          {{observationsDetail[0].observation.dataType}} {{observationsDetail[0].observation.timeSerie ? 'time serie' : ''}}
        </span>
        <!-- <span v-if="observationsDetail[0].observation.processingLevel">
          <b>Processing level:</b>
          {{observationsDetail[0].observation.processingLevel}}
        </span> -->
      </div>

      <div v-if="observationsDetail[0].observation.observedProperty.theiaVariable">
        <b>Theia/OZCAR variable name:</b>
        <div class="ui list">
          <div class="item">
            <span
              class="ui big teal label"
            >{{getI18n(observationsDetail[0].observation.observedProperty.theiaVariable.prefLabel,"en")}}</span>
          </div>
        </div>
        <br />
      </div>
      <div>
        <b>Theia/OZCAR variable categories:</b>
        <div class="ui list">
          <div class="item" v-for="(hierarchy, index) in hierarchies" :key="index">
            <span class="ui blue label">{{hierarchy}}</span>
          </div>
        </div>
      </div>
      <table class="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Measurements</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(obs, index) in observationsDetail" :key="index">
            <td :data-label="index">{{index + 1}}</td>
            <td>
              <div class="producer-measurement-name-unit-level">
                <div>
                  <b>Producer variable name:</b>
                  {{getI18n(obs.observation.observedProperty.name,"en")}}
                </div>
                <div>
                  <b>Unit:</b>
                  {{getI18n(obs.observation.observedProperty.unit,"en")}}
                </div>
                <div v-if="obs.observation.processingLevel">
                  <b>Processing level:</b>
                  {{obs.observation.processingLevel}}
                </div>
                <div v-else>
                  <b>Processing level:</b>
                </div>                
              </div>

              <div v-if="obs.observation.observedProperty.description != null">
                <br />
                <b>Description:</b>
                {{getI18n(obs.observation.observedProperty.description,"en")}}
              </div>

              <div v-if="obs.observation.observedProperty.gcmdKeywords != null">
                <br />
                <b>NASA GCMD Keywords:</b>
                <span
                  v-for="(gcmd, index) in obs.observation.observedProperty.gcmdKeywords"
                  :key="index"
                >
                  <span v-if="gcmd.category">{{gcmd.category}}</span>
                  <span v-if="gcmd.topic">> {{gcmd.topic}}</span>
                  <span v-if="gcmd.term">> {{gcmd.term}}</span>
                  <span v-if="gcmd.variableLevel1">> {{gcmd.variableLevel1}}</span>
                  <span v-if="gcmd.variableLevel2">> {{gcmd.variableLevel2}}</span>
                  <span v-if="gcmd.variableLevel3">> {{gcmd.variableLevel3}}</span>
                </span>
              </div>
              <sensors-info-panel-component :observation="obs.observation"></sensors-info-panel-component>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.observation-data-type-processing-level-placeholder {
  float: right;
}
.observation-data-type-processing-level-placeholder span {
  display: block;
}

.producer-measurement-name-unit-level {
  display: flex;
  /* justify-content: center; */
}

.producer-measurement-name-unit-level > div {
  flex: 1;
  padding-right: 1.5rem;
  /* text-align: center; */
}
</style>

<script>
import Vuex from "vuex";

import sensorsInfoPanelComponent from "./sensors-info-panel-component.vue";
/**
 * @vuese
 * Display the observation observed property
 * @group Info panel components
 */
export default {
  name: "observed-property-info-panel-component",
  components: {
    sensorsInfoPanelComponent
  },
  props: {
    observationsDetail: {
      //Observation detailed document from "observations" collection
      type: Array,
      required: true
    }
  },
  watch: {
    observationsDetail: {
      handler: function(newValue) {
        this.setCategoryHierarchies(
          newValue[0].observation.observedProperty.theiaCategories
        );
      },
      deep: true
    }
  },
  computed: {
    ...Vuex.mapGetters(["getCategoryHierarchies"]),
    hierarchies() {
      let hierarchyStrings = [];
      for (let hierarchy of this.getCategoryHierarchies) {
        let hierarchyString = "";
        hierarchy.forEach(element => {
          hierarchyString =
            hierarchyString + this.getI18n(element, "en") + " > ";
        });
        hierarchyStrings.push(
          hierarchyString.substring(0, hierarchyString.length - 3)
        );
      }
      this.categoryStrings = hierarchyStrings;
      return hierarchyStrings;
    }
  },
  methods: {
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    ...Vuex.mapActions(["setCategoryHierarchies"]),
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    }
  },
  mounted() {
    this.setCategoryHierarchies(
      this.observationsDetail[0].observation.observedProperty.theiaCategories
    );
  }
};
</script>
