<template>
  <div class="observation-light-container clearfix">
    <div class="producer-logo-container">
      <img :src="getLogoName" :alt="getLogoName" />
    </div>
    <div class="metadata-light-container">
      <!-- <div class="show-detail ui icon button" @click.stop="showDetails">
        <i class="info icon"></i>
      </div>-->
      <div class="attached icon button">
        <button class="ui icon button" @click.stop="zoomInObs">
          <i class="globe icon"></i>
        </button>
        <button class="ui icon button" @click.stop="showDetails">
          <i class="info icon"></i>
        </button>
      </div>
      <div v-if="observation.observations[0].observedProperty.theiaVariable != null">
        <b class="variable-container">Theia Variable name</b>
        :
        <div
          class="ui large teal label"
        >{{getI18n(observation.observations[0].observedProperty.theiaVariable.prefLabel,"en")}}</div>
        <span v-if="observation.observations[0].dataType && observation.observations[0].timeSerie">
          <b>Type:</b>
          {{observation.observations[0].dataType}} {{observation.observations[0].timeSerie ? 'time serie' : ''}}
        </span>
      </div>
      <div v-else>
        Producer variable name:
        <span
          v-for="(producerName, index) in getUniqueProducerName"
          :key="index"
        >
          <i class="ui label">{{producerName}}</i>
        </span>
        <span v-if="observation.observations[0].dataType && observation.observations[0].timeSerie">
          <b>Type:</b>
          {{observation.observations[0].dataType}} {{observation.observations[0].timeSerie ? 'time serie' : ''}}
        </span>
      </div>
      <span v-if="observation.observations[0].featureOfInterest.samplingFeature.name != null">
        <b>Station name</b>
        : {{getI18n(observation.observations[0].featureOfInterest.samplingFeature.name,"en")}}
      </span>
      <span style="margin-left: 1rem">
        <b>Producer</b>
        : {{getI18n(observation.producer.name,"en")}}
      </span>
      <div>
        <b>Dataset title</b>
        :
        <i>{{getI18n(observation.dataset.metadata.title,"en")}}</i>
      </div>
    </div>
  </div>
</template>

<style>
b.variable-container {
  display: inline;
}
b.unit-container {
  display: inline;
  margin-left: 20px;
}
/* .metadata-light-container {
  display: inline-block;
} */
.metadata-light-container .attached.icon.button {
  float: right;
}
.producer-logo-container img {
  height: 80px;
}
.producer-logo-container {
  float: left;
  /* display: inline-block; */
  margin-right: 20px;
}
/*In order to support IE8*/
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* .observation-light-container.ui.content.message {
  height: 8rem;
  overflow: hidden
} */
</style>



<script>
import { mapActions, mapGetters } from "vuex";

/**
 * @vuese
 * Item of the result list to be displayed in the result list component
 * @group Result list component
 */
export default {
  name: "observation-metadata-layout-component",
  props: {
    observation: {
      //Observation to be displayed in the component
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Vuex observation store getter
     */
    ...mapGetters(["getObservationsDetailed"]),
    /**
     * @vuese
     * Build the relative path of the producer logo to be printed
     */
    getLogoName() {
      return (
        "./assets/images/" +
        this.observation.observations[0].observationId.substring(0, 4) +
        ".png"
      );
    },
    /**
     * @vuese
     * Get unique producer names for the grouped observation (a producer can measure the same variable for a given location)
     */
    getUniqueProducerName() {
      let producerName = [];
      this.observation.observations.forEach(element =>
        producerName.push(this.getI18n(element.observedProperty.name, "en"))
      );
      return Array.from(new Set(producerName));
    }
  },
  mounted() {
    this.modifyElementId();
  },
  updated() {
    this.modifyElementId();
  },
  methods: {
    /**
     * @vuese
     * Modify id of the DOM element to be a string that can be parsed into JSON
     */
    modifyElementId() {
      let idString = "[";
      this.observation.observations.forEach(item => {
        idString = idString + '"' + item.observationId + '",';
      });
      idString = idString.substring(0, idString.length - 1) + "]";
      this.$el.id = idString;
    },

    /**
     * Actions
     */
    ...mapActions({
      setObservationsDetailed: "setObservationsDetailed"
    }),

    /**
     * @vuese
     * Getters
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    },

    /**
     * @vuese
     * Method to show the detail information about the observation
     */
    showDetails() {
      this.setObservationsDetailed(this.$el.id).then(() =>
        $(".ui.long.modal.metadata.detail")
          .modal({
            closable: false,
            observeChanges: true
          })
          .modal("show")
      );
    },
    /**
     * @vuese
     * Method to zoom in the observation on the map
     */
    zoomInObs() {
      //Fired to zoom on the observation on the map.
      this.$root.$emit(
        "meta-obs-clicked",
        this.observation.observations[0].featureOfInterest.samplingFeature
          .geometry.coordinates
      );
    }
  }
};
</script>