<template>
  <div class="ui toogle checkbox custom">
    <input :name="name" type="checkbox" :checked="isChecked(name,mutationName)" @click="toggleCheckbox($event)" />
    <label>
      <div class="facet-element-container">
        <b>{{name}}</b>
        <i>{{type}}</i>
        <i>({{count}})</i>
      </div>
    </label>
    <a class="producer-facet info" :id="name" v-if="info" @click="showProducerInfo($event.target.id)">
      <i :id="name" class="blue circle info icon"></i>
    </a>
    <div class="ui producer segment info modal" :id="'info-producer-' + name.replace(/\s/g,'')">
      <i class="close icon"></i>
      <div class="header">{{name}}</div>
      <div v-if="infoModal.description">
        <br>
        <b>General description:</b>
        {{getI18n(infoModal.description,'en')}}
      </div>
      <div v-if="infoModal.objectives">
        <br>
        <b>Objectives:</b>
        {{getI18n(infoModal.objectives,'en')}}
      </div>
      <div v-if="infoModal.measuredVariables">
        <br>
        <b>Measured variables:</b>
        {{getI18n(infoModal.measuredVariables,'en')}}
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

/**
 * @vuese
 * This component diplay a checkbox whith the filter name, and the count associated
 * @group Facet components
 */
export default {
  name: "facet-checkbox-element-component",
  data() {
    return {
      infoModal: {}
    };
  },
  //properties passed by parent component
  props: {
    name: {
      //Name of the checkbox element
      type: String,
      required: true
    },
    type: {
      //Type of the checkbox element -  for fundings facet
      type: String,
      required: false
    },
    count: {
      //Count of the checkbox element
      type: Number,
      required: true
    },
    mutationName: {
      //Name of the mutation of the store to update filter
      type: String,
      required: true
    },
    info: {
      //For producer infobulle
      type: Boolean,
      required: false
    },
    fundingName: {
      //Name of the fundings used to query the database
      type: String,
      required: false
    }
  },
  computed: {
    /**
     * Vuex store getters
     */
    ...mapGetters([
      "getFilters",
      "getFacetClassification",
      "isFiltersEmpty",
      "getProducerInfo"
    ])
  },
  methods: {
    /**
     * Vuex store actions
     */
    ...mapActions([
      "initFacets",
      "searchObservations",
      "resetObservations",
      "setBucketFilter"
    ]),
    /**
     * @vuese
     * Method triggered when a checkbox is checked.
     * 1 - Update state of the vuex filter store - (async)
     * 2 - when -1- promise is resolved search for new observations using the updated filters
     */
    toggleCheckbox() {
      //Vuex filter store action to update query filters
      if (this.mutationName == "UPDATE_FILTERS_FUNDING_NAMES") {
      this.setBucketFilter({
        mutationName: this.mutationName,
        name: this.fundingName
      });
      } else {
      this.setBucketFilter({
        mutationName: this.mutationName,
        name: this.name
      });
      }
      // .then(() => {
      //   //If the filters are empty no result are diplayed and the facet are reseted with the whole database
      //   if (this.isFiltersEmpty) {
      //     this.resetObservations();
      //     this.initFacets();
      //   }
      //   // else, new observation are queried using the updated filters
      //   else {
      //     this.searchObservations(this.getFilters);
      //   }
      // });
    },
    /**
     * @vuese
     * Method check the filters that the user previously checked
     */
    isChecked(name,mutationName) {
      switch(mutationName) {
        case "UPDATE_FILTERS_GEOLOGIES":
          return this.getFilters.geologies.some(item => item === name);
        case "UPDATE_FILTERS_CLIMATES":
          return this.getFilters.climates.some(item => item === name);
        case "UPDATE_FILTERS_PRODUCER_NAMES":
          return this.getFilters.producerNames.some(item => item === name);
        case "UPDATE_FILTERS_FUNDING_NAMES":
          return this.getFilters.fundingNames.some(item => name.includes(item))
      }
    },

    showProducerInfo(id) {
      this.infoModal = this.getProducerInfo.filter(
        item => this.getI18n(item.name, "en") == this.name
      )[0];
      $("#info-producer-"+this.name.replace(/\s/g,''))
        .modal({
          centered: false
        })
        .modal("show");
    },
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    }
  }
};
</script>

<style>
.custom label {
  float: left;
}
a.producer-facet.info {
  color: blue;
  display: inline-block;
  text-align: end;
  align-self: center;
}

a.producer-facet.info:hover {
  cursor: pointer;
}

.ui.toogle.checkbox.custom {
  display: flex;
  justify-content: space-between;
}
.ui.producer.segment.info.modal {
  text-align: justify
}
</style>
