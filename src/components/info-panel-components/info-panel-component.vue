<template>
  <!-- <div  class="info-panel">
  <i class="big angle double left icon" @click="changePanelState()"></i>-->
  <div class="ui long modal metadata detail">
    <i class="close icon"></i>
    <div class="metadata-container">
      <observation-metadata-info-panel-component
        v-if="detail != null && detailNature == 'observation'"
        class="observation-details"
        :observationsDetail="detail"
      ></observation-metadata-info-panel-component>
      <dataset-metadata-info-panel-component
        v-if="detail != null && detailNature == 'dataset'"
        class="observation-details"
        :datasetDetail="detail"
      ></dataset-metadata-info-panel-component>
      <producer-metadata-info-panel-component
        v-if="detail != null && detailNature == 'producer'"
        class="observation-details"
        :producerDetail="detail"
      ></producer-metadata-info-panel-component>
    </div>
  </div>
</template>

<style>
</style>

<script>
import ObservationMetadataInfoPanelComponent from "./observation-metadata-info-panel-component.vue";
import ProducerMetadataInfoPanelComponent from "./producer-metadata-info-panel-component.vue";
import DatasetMetadataInfoPanelComponent from "./dataset-metadata-info-panel-component.vue"
import { mapGetters } from "vuex";

/**
 * @vuese
 * Info panel root component
 * @group Info panel components
 */
export default {
  name: "info-panel-component",
  components: {
    ObservationMetadataInfoPanelComponent,
    ProducerMetadataInfoPanelComponent,
    DatasetMetadataInfoPanelComponent
  },
  data() {
    return {
      /**
       * @vuese
       * Detail about the observation to print in the info panel
       */
      detail: null,
      /**
       * @vuese
       * Nature of the detail object .
       * - observation
       * - producer
       * - dataset
       */
      detailNature: ""
    };
  },
  computed: {
    //Computed properties to enable component reactivity
    ...mapGetters(["getObservationsDetailed", "getProducerDetailed","getDatasetDetailed"])
  },
  watch: {
    /**
     * @vuese
     * When Vuex observation store getter getObservationsDetailed is modified
     * "showObservationMetadata" event is emitted to the root component. This event is listened by
     * info-panel-component.vue to print detailed observation information.
     * ------------------------
     * Event bus - better use Vuex Store
     */
    getObservationsDetailed() {
      this.$root.$emit("showObservationMetadata");
    }
  },
  created() {
    /**
     * Event listener: on "showObservationMetadata" the panel is opened and details about one pbservation are presented.
     * Event bus pattern
     */
    this.$root.$on("showObservationMetadata", id => {
      //this.showObservationMetadata();
      this.detail = this.getObservationsDetailed;
      this.detailNature = "observation";
      $(".ui.long.modal.metadata.detail")
        .modal({
          closable: false,
          observeChanges: true,
          autofocus: false
        })
        .modal("show");
    });
    /**
     * Event listener: on "showProducerMetadata" the panel is opened and details about one pbservation are presented.
     * Event bus pattern
     */
    this.$root.$on("showProducerMetadata", id => {
      //this.showObservationMetadata();
      this.detail = this.getProducerDetailed;
      this.detailNature = "producer";
      $(".ui.long.modal.metadata.detail")
        .modal({
          closable: false,
          observeChanges: true,
          autofocus: false
        })
        .modal("show");
    });
        /**
     * Event listener: on "showDatasetMetadata" the panel is opened and details about one pbservation are presented.
     * Event bus pattern
     */
    this.$root.$on("showDatasetMetadata", id => {
      //this.showObservationMetadata();
      this.detail = this.getDatasetDetailed;
      this.detailNature = "dataset";
      $(".ui.long.modal.metadata.detail")
        .modal({
          closable: false,
          observeChanges: true,
          autofocus: false
        })
        .modal("show");
    });
  },
  beforeDestroy() {
    $(".ui.long.modal.metadata.detail").remove();
  }
};
</script>