<template>
  <div class="observation-light-container clearfix" :id="dataset.datasetId">
    <div class="producer-logo-container">
      <img :src="getLogoName" :alt="getLogoName" />
    </div>
    <div class="metadata-light-container">
      <div class="attached icon button">
        <button class="ui icon button" @click.stop="showDetails">
          <i class="info icon"></i>
        </button>
      </div>
      <div>
        <b class="variable-container">Dataset name</b>
        :
        <div class="ui large teal label">{{getI18n(dataset.title,"en")}}</div>
      </div>
      <span>
        <b>Produced by</b>
        :
        {{getI18n(dataset.producerName,"en")}}
      </span>
      <div>
        <span v-if="dataset.description">
          <b>Description</b>
          : {{getI18n(dataset.description,"en")}}
        </span>
      </div>
      <div v-if="dataset.objective != null">
        <b>Objectives</b>
        :
        {{getI18n(dataset.objective,"en")}}
      </div>
      <div v-if="dataset.temporalExtent != null">
        <b>Temporal extent</b>
        : {{dataset.temporalExtent.dateBeg}} - {{dataset.temporalExtent.dateEnd}}
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
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import { datasetDetailed } from "../../store/datasetDetailedModule.js"

/**
 * @vuese
 * Item of the result list to be displayed in the result list component
 * @group Result list component
 */
export default {
  name: "dataset-metadata-layout-component",
  props: {
    dataset: {
      //Producer to be displayed in the component
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Vuex observation store getter
     */
    ...mapGetters(["getDatasetDetailed"]),
    /**
     * @vuese
     * Build the relative path of the producer logo to be printed
     */
    getLogoName() {
      return "./assets/images/" + this.dataset.producerId + ".png";
    }
  },
  watch: {
    /**
     * @vuese
     * When Vuex store getter getDatasetDetailed is modified
     * "showDatasetMetadata" event is emitted to the root component. This event is listened by
     * info-panel-component.vue to print detailed dataset information.
     * ------------------------
     * Event bus - better use Vuex Store
     */
    getDatasetDetailed() {
      this.$root.$emit("showDatasetMetadata");
    }
  },
  methods: {
    /**
     * Actions
     */
    ...mapActions(["setDatasetDetailed"]),

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
      this.setDatasetDetailed(this.$el.id).then(() =>
        $(".ui.long.modal.metadata.detail")
          .modal({
            closable: false,
            observeChanges: true
          })
          .modal("show")
      );
    }
  }
};
</script>
