<template>
  <div id="info-panel">
    <div class="ui dataset segment">
      <a class="ui ribbon label">
        <h1>{{getI18n(datasetDetail.dataset.metadata.title,"en")}}</h1>
      </a>
      <div class="ui two column grid">
        <div class="sixteen wide column">
          <dataset-identification-info-panel-component :dataset="datasetDetail.dataset"></dataset-identification-info-panel-component>
        </div>
        <div class="column">

          <variable-of-a-dataset-component></variable-of-a-dataset-component>
          <dataset-keywords-component :dataset="datasetDetail.dataset"></dataset-keywords-component>
          <contacts-info-panel-component
            :contacts="datasetDetail.dataset.metadata.contacts"
          ></contacts-info-panel-component>
        </div>
        <div class="column">
          <data-constraint-info-panel-component
            :dataConstraint="datasetDetail.dataset.metadata.dataConstraint"
          ></data-constraint-info-panel-component>
          <dateset-temporal-extent-info-panel-component
            :temporalExtent="datasetDetail.dataset.metadata.temporalExtent"
          ></dateset-temporal-extent-info-panel-component>
          <geology-climate-info-panel-component
            :geologies="datasetDetail.dataset.metadata.portalSearchCriteria.geologies"
            :climates="datasetDetail.dataset.metadata.portalSearchCriteria.climates"
          ></geology-climate-info-panel-component>
          <!-- <dataset-spatial-extent-info-panel-component
            :spatialExtent="observationsDetail[0].dataset.metadata.spatialExtent"
          ></dataset-spatial-extent-info-panel-component>-->
          <!-- <map-items-of-a-dataset-component
            :loader="loader"
            @change-loader-state="changeLoaderState"
          ></map-items-of-a-dataset-component>-->
          <div v-if="datasetDetail.dataset.metadata.onlineResource != null">
            <online-resource-info-panel-component
              :onlineResource="datasetDetail.dataset.metadata.onlineResource"
            ></online-resource-info-panel-component>
          </div>
        </div>
        <div class="sixteen wide column">
          <!-- <map-items-of-a-dataset-component></map-items-of-a-dataset-component> -->
          <other-observations-of-a-dataset-component
            :loader="loader"
            @change-loader-state="changeLoaderState"
          ></other-observations-of-a-dataset-component>
        </div>

        <div class="column">
          <dataset-spatial-extent-info-panel-component
            :spatialExtent="datasetDetail.dataset.metadata.spatialExtent"
          ></dataset-spatial-extent-info-panel-component>
        </div>
        <div class="column">
          <map-items-of-a-dataset-component></map-items-of-a-dataset-component>
        </div>
      </div>
    </div>
    <div class="ui producer segment">
      <a class="ui ribbon label">
        <h1>Produced by :</h1>
      </a>
      <div class="ui two column grid">
        <div class="sixteen wide column">
          <producer-identification-info-panel-component :producer="datasetDetail.producer"></producer-identification-info-panel-component>
        </div>
        <div class="column">
          <!-- <producer-contacts-info-panel-component :producer="observationsDetail[0].producer"></producer-contacts-info-panel-component> -->
          <contacts-info-panel-component :contacts="datasetDetail.producer.contacts"></contacts-info-panel-component>
        </div>
        <div class="column">
          <producer-online-resource-info-panel-component :producer="datasetDetail.producer"></producer-online-resource-info-panel-component>
          <producer-fundings-info-panel-component
            :fundings="datasetDetail.producer.fundings"
          ></producer-fundings-info-panel-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import producerOnlineResourceInfoPanelComponent from "./producer-online-resource-info-panel-component.vue";
import contactsInfoPanelComponent from "./contacts-info-panel-component.vue";
import producerIdentificationInfoPanelComponent from "./producer-identification-info-panel-component.vue";
import producerFundingsInfoPanelComponent from "./producer-fundings-info-panel-component.vue";
import datasetKeywordsComponent from "./dataset-keywords-component.vue";
import datasetIdentificationInfoPanelComponent from "./dataset-identification-info-panel-component.vue";
import dataConstraintInfoPanelComponent from "./data-constraint-info-panel-component.vue";
import onlineResourceInfoPanelComponent from "./online-resource-info-panel-component.vue";
import otherObservationsOfADatasetComponent from "./other-observations-of-dataset.vue";
import mapItemsOfADatasetComponent from "./dataset-map-component.vue";
import geologyClimateInfoPanelComponent from "./geology-climate-info-panel-component.vue";
import datesetTemporalExtentInfoPanelComponent from "./dataset-temporal-extent-info-panel-component.vue";
import datasetSpatialExtentInfoPanelComponent from "./dataset-spatial-extent-info-panel-component.vue";
import variableOfADatasetComponent from "./variable-of-a-dataset-component.vue";

export default {
  name: "dataset-metadata-info-panel-component",
  props: {
    datasetDetail: {
      //Observation detailed document from "observations" collection
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loader: false
    };
  },
  components: {
    contactsInfoPanelComponent,
    producerIdentificationInfoPanelComponent,
    producerFundingsInfoPanelComponent,
    datasetKeywordsComponent,
    datasetIdentificationInfoPanelComponent,
    dataConstraintInfoPanelComponent,
    onlineResourceInfoPanelComponent,
    otherObservationsOfADatasetComponent,
    mapItemsOfADatasetComponent,
    geologyClimateInfoPanelComponent,
    producerOnlineResourceInfoPanelComponent,
    datasetSpatialExtentInfoPanelComponent,
    datesetTemporalExtentInfoPanelComponent,
    variableOfADatasetComponent
  },
  methods: {
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
     * Method to diplay or hide spinner loader. If the spinner loader is hidden the windows is scrolled to the top
     */
    changeLoaderState(bool) {
      this.loader = bool;
      if (!bool) {
        $(".ui.long.modal.metadata.detail").modal("hide");
        $(".ui.long.modal.metadata.detail").modal("show");
      }
    }
  }
};
</script>