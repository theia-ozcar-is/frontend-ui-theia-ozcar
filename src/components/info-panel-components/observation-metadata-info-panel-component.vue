<template>
  <div id="info-panel">
    <div class="ui measurement segment">
      <a class="ui ribbon label">
        <h1>Measurement :</h1>
      </a>
      <div class="ui two column grid">
        <div class="sixteen wide column">
          <observed-property-info-panel-component :observationsDetail="observationsDetail"></observed-property-info-panel-component>
        </div>
        <div class="column">
          <!-- <observation-temporal-extent-info-panel-component :temporalExtent="observationsDetail[0].observation.temporalExtent"></observation-temporal-extent-info-panel-component> -->
          <observation-location-info-panel-component
            :featureOfInterest="observationsDetail[0].observation.featureOfInterest"
          ></observation-location-info-panel-component>
          <!-- <sensors-info-panel-component
            v-if="!isProcedureNull()"
            :observationsDetail="observationsDetail"
          ></sensors-info-panel-component>-->
        </div>
        <div class="column">
          <other-theia-variable-at-location-component
            :loader="loader"
            @change-loader-state="changeLoaderState"
          ></other-theia-variable-at-location-component>
          <!-- <data-access-info-panel-component :result="observationsDetail[0].observation.result" ></data-access-info-panel-component> -->
        </div>
      </div>
    </div>
    <div class="ui dataset segment">
      <a class="ui ribbon label">
        <h1>Included in dataset :</h1>
      </a>
      <div class="ui two column grid">
        <div class="sixteen wide column">
          <dataset-identification-info-panel-component :dataset="observationsDetail[0].dataset"></dataset-identification-info-panel-component>
        </div>
        <div class="column">
          <variable-of-a-dataset-component></variable-of-a-dataset-component>
          <dataset-keywords-component :dataset="observationsDetail[0].dataset"></dataset-keywords-component>
          <contacts-info-panel-component
            :contacts="observationsDetail[0].dataset.metadata.contacts"
          ></contacts-info-panel-component>
        </div>
        <div class="column">
          <data-constraint-info-panel-component
            :dataConstraint="observationsDetail[0].dataset.metadata.dataConstraint"
          ></data-constraint-info-panel-component>
          <dateset-temporal-extent-info-panel-component
            :temporalExtent="observationsDetail[0].dataset.metadata.temporalExtent"
          ></dateset-temporal-extent-info-panel-component>
          <geology-climate-info-panel-component
            :geologies="observationsDetail[0].dataset.metadata.portalSearchCriteria.geologies"
            :climates="observationsDetail[0].dataset.metadata.portalSearchCriteria.climates"
          ></geology-climate-info-panel-component>
          <!-- <dataset-spatial-extent-info-panel-component
            :spatialExtent="observationsDetail[0].dataset.metadata.spatialExtent"
          ></dataset-spatial-extent-info-panel-component>-->
          <!-- <map-items-of-a-dataset-component
            :loader="loader"
            @change-loader-state="changeLoaderState"
          ></map-items-of-a-dataset-component>-->
          <div v-if="observationsDetail[0].dataset.metadata.onlineResource != null">
            <online-resource-info-panel-component
              :onlineResource="observationsDetail[0].dataset.metadata.onlineResource"
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
            :spatialExtent="observationsDetail[0].dataset.metadata.spatialExtent"
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
          <producer-identification-info-panel-component :producer="observationsDetail[0].producer"></producer-identification-info-panel-component>
        </div>
        <div class="column">
          <!-- <producer-contacts-info-panel-component :producer="observationsDetail[0].producer"></producer-contacts-info-panel-component> -->
          <contacts-info-panel-component :contacts="observationsDetail[0].producer.contacts"></contacts-info-panel-component>
        </div>
        <div class="column">
          <producer-online-resource-info-panel-component :producer="observationsDetail[0].producer"></producer-online-resource-info-panel-component>
          <producer-fundings-info-panel-component
            :fundings="observationsDetail[0].producer.fundings"
          ></producer-fundings-info-panel-component>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* #info-panel .ui.producer.segment {
  background-color: rgba(146,227,255, 0.3)
}

#info-panel .ui.dataset.segment {
  background-color: rgba(8,251,33, 0.26)
}

#info-panel .ui.measurement.segment {
  background-color: rgba(256,188,146, 0.5)
} */

#info-panel > .ui.producer.segment,
#info-panel > .ui.dataset.segment,
#info-panel > .ui.measurement.segment {
  background-color: whitesmoke;
}

.ui.segment > a.ui.ribbon.label > h1 {
  color: white;
}

.ui.segment > a.ui.ribbon.label {
  background-color: #00b5ad;
  margin-bottom: 1rem;
}

#info-panel .ui.segment > .ui.top.attached.label {
  background-color: #ffebcd;
}

#info-panel .ui.segment > .ui.segment > .ui.top.attached.label,
#info-panel .ui.segment > .list .ui.segment > .ui.top.attached.label,
#info-panel .ui.segment td .ui.segment > .ui.top.attached.label {
  background-color: #e0e1e2;
}
#info-panel {
  text-align: justify;
}
</style>

<script>
import datasetKeywordsComponent from "./dataset-keywords-component.vue";
import observedPropertyInfoPanelComponent from "./observed-property-info-panel-component.vue";
// import sensorsInfoPanelComponent from "./sensors-info-panel-component.vue";
import datasetIdentificationInfoPanelComponent from "./dataset-identification-info-panel-component.vue";
import dataConstraintInfoPanelComponent from "./data-constraint-info-panel-component.vue";
import contactsInfoPanelComponent from "./contacts-info-panel-component.vue";
import onlineResourceInfoPanelComponent from "./online-resource-info-panel-component.vue";
import producerIdentificationInfoPanelComponent from "./producer-identification-info-panel-component.vue";
import producerFundingsInfoPanelComponent from "./producer-fundings-info-panel-component.vue";
import observationLocationInfoPanelComponent from "./observation-location-info-panel-component.vue";
import dataProcessingInfoPanelComponent from "./data-processing-info-panel-component.vue";
import producerContactsInfoPanelComponent from "./contacts-info-panel-component.vue";
import producerOnlineResourceInfoPanelComponent from "./producer-online-resource-info-panel-component.vue";
import geologyClimateInfoPanelComponent from "./geology-climate-info-panel-component.vue";
import datesetTemporalExtentInfoPanelComponent from "./dataset-temporal-extent-info-panel-component.vue";
import datasetSpatialExtentInfoPanelComponent from "./dataset-spatial-extent-info-panel-component.vue";
import otherTheiaVariableAtLocationComponent from "./other-theia-variable-at-location-component.vue";
import otherObservationsOfADatasetComponent from "./other-observations-of-dataset.vue";
import mapItemsOfADatasetComponent from "./dataset-map-component.vue";
import variableOfADatasetComponent from "./variable-of-a-dataset-component.vue";

/**
 * @vuese
 * Component composed of sub-component displaying the different information about one theia/OZCAR variable at one location
 * Several producer variables can be linked to the same OZCAR/Theia variable. Hence, informations about all thos producer variables are diplayed
 * @group Info panel components
 */
export default {
  name: "observation-metadata-info-panel-component",
  props: {
    observationsDetail: {
      //Observation detailed document from "observations" collection
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loader: false
    };
  },
  components: {
    observedPropertyInfoPanelComponent,
    // sensorsInfoPanelComponent,
    datasetIdentificationInfoPanelComponent,
    dataConstraintInfoPanelComponent,
    contactsInfoPanelComponent,
    onlineResourceInfoPanelComponent,
    producerIdentificationInfoPanelComponent,
    producerFundingsInfoPanelComponent,
    observationLocationInfoPanelComponent,
    dataProcessingInfoPanelComponent,
    //producerContactsInfoPanelComponent,
    producerOnlineResourceInfoPanelComponent,
    geologyClimateInfoPanelComponent,
    datesetTemporalExtentInfoPanelComponent,
    datasetSpatialExtentInfoPanelComponent,
    datasetKeywordsComponent,
    otherTheiaVariableAtLocationComponent,
    otherObservationsOfADatasetComponent,
    mapItemsOfADatasetComponent,
    variableOfADatasetComponent
  },
  methods: {
    // /**
    //  * @vuese
    //  * Method to check if Procedure object of the difference producer observation are null.
    //  * If at least one procedure object of one observation is not null, the procedure
    //  */
    // isProcedureNull() {
    //   let isNull = true;
    //   this.observationsDetail.forEach(item => {
    //     isNull = isNull && item.observation.procedure == null;
    //   });
    //   return isNull;
    // },
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
