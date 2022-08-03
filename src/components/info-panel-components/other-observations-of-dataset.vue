<template>
  <div v-if="getObservationsOfADataset.length > 0">
    <div class="ui segment" id="other-observations-of-dataset-table-container">
      <div class="ui top attached label">
        <i class="info icon"></i> Other measurements of this dataset:
      </div>
      <div :class="['ui', loader ? 'active':'', 'inverted', 'dimmer']">
        <div class="ui loader"></div>
      </div>
      <div id="other-observations-of-dataset-table-placeholder">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Theia/OZCAR variable name</th>
              <th>Producer variable name</th>
              <th>Unit</th>
              <th>
                <i class="calendar check outline icon"></i> Temporal extent
              </th>
              <th>Station name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(obs, index) in observationsList"
              :key="index"
              @click="selectOneMeasurement(obs.observationId)"
            >
              <td data-label="Theia variable name">
                <div
                  v-if="obs.observedProperty.theiaVariable"
                >{{getI18n(obs.observedProperty.theiaVariable.prefLabel,"en")}}</div>
              </td>
              <td data-label="Producer variable name">{{getI18n(obs.observedProperty.name,"en")}}</td>
              <td data-label="Unit">
                <div v-if="obs.observedProperty.unit">{{getI18n(obs.observedProperty.unit,"en")}}</div>
              </td>
              <td data-label="Temporal extent">
                {{obs.temporalExtent.dateBeg.replace(/T.*/,'')}}
                <br />
                {{obs.temporalExtent.dateEnd.replace(/T.*/,'')}}
              </td>
              <td>
                <div
                  data-label="Station name"
                  v-if="obs.featureOfInterest.samplingFeature.name != null"
                >{{getI18n(obs.featureOfInterest.samplingFeature.name,"en")}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
#other-observations-of-dataset-table-container {
  padding-top: 2.5rem;
}
#other-observations-of-dataset-table-placeholder {
  max-height: 20rem;
  overflow: auto;
}

#other-observations-of-dataset-table-placeholder table tbody tr {
  cursor: pointer;
}

#other-observations-of-dataset-table-placeholder table tbody tr:hover {
  background-color: lightgrey;
}
</style>

<script>
import Vuex from "vuex";
/**
 * @vuese
 * Component displaying other observations of the dataset
 * @group Info panel components
 */
export default {
  name: "other-observations-of-dataset",
  props: {
    loader: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...Vuex.mapGetters([
      "getObservationsOfADataset",
      "getObservationsDetailed"
    ]),
    /**
     * @vuese
     * List of Observation of a dataset
     * @type: Array
     */
    observationsList() {
      let arrayObs = [];
      this.getObservationsOfADataset.forEach(element => {
        let observationsIds = [];
        element.observations.forEach(obs => {
          observationsIds.push(obs.observationId);
        });
        element.observations.forEach(obs => {
          obs.observationId = observationsIds;
          arrayObs.push(obs);
        });
      });
      arrayObs.sort((a, b) => {
              if (a.observedProperty.theiaVariable === null || a.observedProperty.theiaVariable === undefined) {
                a = null;
              } else {
                a = this.getI18n(a.observedProperty.theiaVariable.prefLabel,"en");
              }
              if (b.observedProperty.theiaVariable === null || b.observedProperty.theiaVariable === undefined) {
                b = null;
              } else {
                b = this.getI18n(b.observedProperty.theiaVariable.prefLabel,"en");
              }
              return (a === null) - (b === null) || + (a > b) || - (a < b);
            })
      return arrayObs;
    }
  },
  methods: {
    ...Vuex.mapActions(["setObservationsDetailed"]),
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
     * Select one observation that will be printed in observationDetails components
     */
    selectOneMeasurement(observationId) {
      //Fired to change loader state
      this.$emit("change-loader-state", true);
      this.setObservationsDetailed(observationId).then(() => {
        //Fired to change loader state
        this.$emit("change-loader-state", false);
      });
    }
  }
};
</script>


