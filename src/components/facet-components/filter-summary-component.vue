<template>
  <div>
    <div id="filter-summary-placeholder" class="ui segments filter summary">
      <div class="ui segment">
        <span>
        <div class="ui mini icon button reset filters" :class="isFiltersEmpty ? 'disabled' : ''"
             title="Reset all filters"
             @click="resetFilters">
          <i class="trash icon"></i>
        </div>
        <div class="ui mini icon button copy copy-to-clipboard-json-filter-button"
             title="Copy all filters to clipboard"
             :class="isFiltersEmpty ? 'disabled' : ''"
             @click="copyFiltersJsonToClipboard()">
          <i class="copy icon"></i>
        </div>
        <div class="ui mini icon button upload filters" @click="showUploadModal"
             title="Upload filters">
          <i class="upload icon"></i>
        </div>
        <div class="ui mini circular icon button info show-filters-information" @click="showInformationPopup">
          <i class="info icon"></i>
        </div>
        <div class="ui popup">
          <h4>Information</h4>
          <p>Filters can be combined to find specific measurements. Logical <b>OR</b> is applied between filters of the same kind and logical <b>AND</b> is applied between filters of different kinds.</p>
          <p><i>If you select a different and a temporal extent, the filters will be applied such as:</i>
          <p><b>(</b> producer 1 <b>OR</b> producer 2<b>) AND</b> temporal extent </p>
          <p><i>You can now see all the measurements made by two different producers up to a given date.</i></p>
          <p>Applied filters are summarised on top of this section. You can remove all the currently applied filters using the trash <i
              class="trash icon"></i> button.
            You can copy filters to the clipboard using the copy <i class="copy icon"></i> button and paste them in a file of your choice for later reuse.
            You can uppload previously saved filters using the upload <i class="upload icon"></i> button.</p>
        </div>

        </span>
        <div></div>
      </div>
      <!--      <div v-if="!isFiltersEmpty" class="ui segments">-->
      <div class="ui segment" v-if="this.getFilters.theiaVariables.length > 0">
        <a class="ui mini orange left ribbon label">Variables</a>
        <span class="item" v-for="(variable, index) in this.getFilters.theiaVariables" :key="index">
          <span class="ui mini basic teal label" :id=variable.uri>
            {{ getI18n(variable.simplifiedLabel, "en") }}
            <i class="delete icon" @click="deleteVariableFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getCategoryNodesSelected.length > 0">
        <a class="ui mini orange left ribbon label">Categories</a>
        <span class="item" v-for="(category, index) in this.getCategoryNodesSelected" :key="index">
          <span class="ui mini basic teal label" :id=category.uri>
             {{ getI18n(category.simplifiedLabel, "en") }}
            <i class="delete icon" @click="deleteCategoryNodeFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.featureOfInterests.length > 0">
        <a class="ui mini orange left ribbon label">Feature of interests</a>
        <span class="item" v-for="(feature, index) in this.getFilters.featureOfInterests" :key="index">
          <span class="ui mini basic teal label">
            {{ feature.name }}
            <i class="delete icon" @click="deleteFeatureOfInterestFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.temporalExtents.length > 0">
        <a class="ui mini orange left ribbon label">Temporal extent</a>
        <span class="item" v-for="(temporalExtent, index) in this.getFilters.temporalExtents" :key="index">
          <span class="ui mini basic teal label" v-if="!temporalExtent.toDate"
                :id="'summary-datepicker-position-'+temporalExtent.position">
           From: {{ temporalExtent.fromDate.toISOString().split("T")[0] }}
            <i class="delete icon" @click="deleteTemporalExtentFilter($event)"></i>
          </span>
          <span class="ui mini basic teal label" v-else-if="!temporalExtent.fromDate"
                :id="'summary-datepicker-position-'+temporalExtent.position">
           To: {{ temporalExtent.toDate.toISOString().split("T")[0] }}
            <i class="delete icon" @click="deleteTemporalExtentFilter($event)"></i>
          </span>
          <span class="ui mini basic teal label" v-else :id="'summary-datepicker-position-'+temporalExtent.position">
           Between {{
              temporalExtent.fromDate.toISOString().split("T")[0]
            }} and {{ temporalExtent.toDate.toISOString().split("T")[0] }}
            <i class="delete icon" @click="deleteTemporalExtentFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.producerNames.length > 0">
        <a class="ui mini orange left ribbon label">Producers</a>
        <span class="item" v-for="(producer, index) in this.getFilters.producerNames" :key="index">
          <span class="ui mini basic teal label">
            {{ producer }}
            <i class="delete icon" @click="deleteProducerFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.fullText.length > 0">
        <a class="ui mini orange left ribbon label">Full text</a>
        <span class="item" v-for="(fullText, index) in this.getFilters.fullText" :key="index">
          <span class="ui mini basic teal label">
            {{ fullText }}
            <i class="delete icon" @click="deleteFullTextFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.geologies.length > 0">
        <a class="ui mini orange left ribbon label">Geologies</a>
        <span class="item" v-for="(geology, index) in this.getFilters.geologies" :key="index">
          <span class="ui mini basic teal label">
            {{ geology }}
            <i class="delete icon" @click="deleteGeologyFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.climates.length > 0">
        <a class="ui mini orange left ribbon label">Climates</a>
        <span class="item" v-for="(climates, index) in this.getFilters.climates" :key="index">
          <span class="ui mini basic teal label">
            {{ climates }}
            <i class="delete icon" @click="deleteClimateFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment" v-if="this.getFilters.fundingNames.length > 0">
        <a class="ui mini orange left ribbon label">Fundings</a>
        <span class="item" v-for="(fundingName, index) in this.getFilters.fundingNames" :key="index">
          <span class="ui mini basic teal label">
            {{ fundingName }}
            <i class="delete icon" @click="deleteFundingFilter($event)"></i>
          </span>
        </span>
      </div>
      <div class="ui segment"
           v-if="this.getFilters.spatialExtent && this.getFilters.spatialExtent.features.length > 0">
        <a class="ui mini orange left ribbon label">Spatial extents</a>
        <span class="item" v-for="(spatialFeature, index) in this.getFilters.spatialExtent.features" :key="index">
          <span class="ui mini basic teal label" :id=spatialFeature.properties.localId
                v-on:mouseover="highlightLayer"
                v-on:mouseleave="lowlightLayer">
            <i class="map icon"></i>
            <i class="delete icon" @click="deleteSpatialextentFilter($event)"></i>
          </span>
        </span>
      </div>
    </div>
    <div
        class="ui segment upload filter modal"
        id="upload-filter-modal"
    >
      <i class="close icon"></i>
      <div class="ui message">Upload the filters to reproduce a previously saved
        query. You can ave filters using the copy <i class="copy icon"></i>button on top of the filters section.
      </div>
      <div id="upload-filters-input-container">
        <div class="ui form">
          <textarea v-model="uploadTextAreaFilters"
                    :placeholder="JSON.stringify(this.getEmptyFilters, null, 2)"></textarea>
        </div>
        <a class="ui icon label"
           id="upload--json-filters-button"
           @click="uploadFiltersJson($event)">
          <i class="upload icon"></i> Upload filters!
        </a>
      </div>
      <div v-show="uploadFilterError" class="ui negative message" >
        <i class="close icon" @click="closeErrorMessage"></i>
        <div class="header">
          There were some errors with your filters
        </div>
        <p>These filters cannot be applied. Something may be wrong with the format of the filters.
        </p></div>
    </div>
  </div>
</template>

<style>
#filter-summary-placeholder {
  margin-bottom: 1rem;
}

#filter-summary-placeholder > .ui.segment:first-child {
  background-color: #d4d4d5;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

#filter-summary-placeholder > .ui.segment:first-child > span {
  float: right;
}

#filter-summary-placeholder > .ui.segment:first-child > div {
  height: 2rem;
}

#filter-summary-placeholder .ui.segment .ui.mini.orange.left.ribbon.label {
  margin-bottom: 0;
}

.filters.json > pre > code {
  font-size: smaller;
  font-family: "Courier New";
}

.ui.existing.segment.filters.json {
  height: 50rem;
  overflow: auto;
}


#upload-filters-input-container {
  position: relative;
  height: 24em;
  overflow: auto;
  width: 100%;
}

#upload-filters-input-container > div {
  height: 100%;
}

#upload-filters-input-container > div > textarea {
  height: 100%;
}

#upload--json-filters-button {
  position: absolute;
  top: 0.5rem;
  right: 2rem;
}

</style>

<script>
import {mapGetters, mapActions} from "vuex";
import {getI18n} from "../../commons/commons";


export default {
  name: "filter-summary-component",
  data() {
    return {
      uploadTextAreaFilters: "",
      uploadFilterError: false
    }
  },
  computed: {
    ...mapGetters(["getFilters", "getCategoryNodesSelected", "isFiltersEmpty", "getEmptyFilters"])
  },
  methods: {
    ...mapActions(["setTheiaVariablesFilter", "setCategoryNodesSelected", "setFeatureOfInterestsFilter", "setBucketFilter", "setFullTextFilter", "setAllFilters"]),
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    },
    /**
     * Remove a Theia variable to the query filter
     */
    deleteVariableFilter(event) {
      // the word to delete
      let variableName = event.currentTarget.parentElement.innerText.trim();
      const tmp = this.getFilters.theiaVariables.filter(element => !(getI18n(element.simplifiedLabel, "en") === variableName))
      //the store filter is updated
      this.setTheiaVariablesFilter(tmp);
    },
    deleteCategoryNodeFilter(event) {
      this.setCategoryNodesSelected({uri: event.currentTarget.parentElement.id})
    },
    deleteFeatureOfInterestFilter(event) {
      const tmp = this.getFilters.featureOfInterests.filter(element => !(element.name === event.currentTarget.parentElement.innerText.trim()));
      //the store filter is updated
      this.setFeatureOfInterestsFilter(tmp);
    },
    deleteTemporalExtentFilter(event) {
      const position = event.currentTarget.parentElement.id.substring("summary-datepicker-position-".length);
      this.$root.$emit("delete-datepicker", "datepickerPosition" + position);
    },
    deleteFullTextFilter(event) {
      const tmp = this.getFilters.fullText.filter(element => {
        return !(element === event.currentTarget.parentElement.innerText.trim())
      });
      //the store filter is updated
      this.setFullTextFilter(tmp);
    },
    deleteProducerFilter(event) {
      this.setBucketFilter({
        mutationName: "TOGGLE_FILTERS_PRODUCER_NAMES",
        name: event.currentTarget.parentElement.innerText.trim()
      })
    },
    deleteClimateFilter(event) {
      this.setBucketFilter({
        mutationName: "TOGGLE_FILTERS_CLIMATES",
        name: event.currentTarget.parentElement.innerText.trim()
      })
    },
    deleteGeologyFilter(event) {
      this.setBucketFilter({
        mutationName: "TOGGLE_FILTERS_GEOLOGIES",
        name: event.currentTarget.parentElement.innerText.trim()
      })
    },
    deleteFundingFilter(event) {
      this.setBucketFilter({
        mutationName: "TOGGLE_FILTERS_FUNDING_NAMES",
        name: event.currentTarget.parentElement.innerText.trim()
      })
    },
    deleteSpatialextentFilter(event) {
      //event bus toward the map component to remove the layer from the map. The filter state is updated by the map component
      this.$root.$emit("delete-draw-item-from-filter-summary", event.currentTarget.parentElement.id);
    },
    highlightLayer(event) {
      this.$root.$emit("highlight-draw-item-from-filter-summary", event.currentTarget.id);
    },
    lowlightLayer(event) {
      this.$root.$emit("lowlight-draw-item-from-filter-summary", event.currentTarget.id);
    },
    resetFilters() {
      this.$emit("reset-filters")
    },
    copyFiltersJsonToClipboard() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(JSON.stringify(this.getFilters, null, 2))
            .then(() => {
              if (!$('.copy-to-clipboard-json-filter-button').popup("exists")) {
                $('.copy-to-clipboard-json-filter-button')
                    .popup({
                          on: 'manual',
                          content: 'Copied to clipboard!'
                        }
                    ).popup('show')
                setTimeout(function () {
                  $('.copy-to-clipboard-json-filter-button').popup("hide")
                }, 1000);
              }
            })
            .catch(() => {
              $('.copy-to-clipboard-json-filter-button')
                  .popup({
                        on: 'manual',
                        content: 'Something wrong happened. You cannot copy the filters...',
                      }
                  )
              setTimeout(function () {
                $('.copy-to-clipboard-json-filter-button').popup("hide")
              }, 1000);
            })
      }
    },
    showInformationPopup() {
      $('.show-filters-information').popup({
        inline: true,
        on: 'manual',
        position: 'bottom right'
      }).popup('show')
    },
    uploadFiltersJson() {
      if(this.uploadTextAreaFilters !== ""){
      let previousFilters = JSON.stringify(this.getFilters);
      console.log(this.uploadTextAreaFilters)
      this.setAllFilters(this.uploadTextAreaFilters)
          .catch(()=>{
            console.log(previousFilters)
            this.uploadFilterError = true
            this.setAllFilters(previousFilters)
          });
      }
    },
    closeErrorMessage() {
      this.uploadFilterError = false;
    },
    showUploadModal() {
      $("#upload-filter-modal")
          .modal({
            centered: false,
            closable: false,
            onHide: () => {
              this.uploadTextAreaFilters ="";
            }
          })
          .modal("show");
    }
  }
}

</script>