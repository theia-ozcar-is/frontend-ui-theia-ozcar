<template>
  <div class="ui toogle checkbox custom facet">
    <input
      :name="name"
      type="checkbox"
      :checked="isChecked(name, mutationName)"
      @click="toggleCheckbox($event)"
      ref="checkbox"
    />
    <label>
      <span class="facet-element-container">
        <b>{{ name }}</b>
        <i>{{ type }}</i>
        <i v-if="count != null || count !== undefined">({{ count }})</i>
      </span>
    </label>
    <a
      class="producer-facet info"
      :id="name"
      v-if="info"
      @click="showProducerInfo($event.target.id)"
    >
      <i :id="name" class="blue circle info icon"></i>
    </a>
    <div v-if="info"
      class="ui producer segment info modal"
      :id="'info-producer-' + name.replace(/\s/g, '')"
    >
      <i class="close icon"></i>
      <div class="header">{{ name }}</div>
      <div v-if="infoModal.title">
        <br />
        <b>Title:</b>
        {{ getI18n(infoModal.title, "en") }}
      </div>
      <div v-if="infoModal.description">
        <br />
        <b>General description:</b>
        {{ getI18n(infoModal.description, "en") }}
      </div>
      <div v-if="infoModal.objectives">
        <br />
        <b>Objectives:</b>
        {{ getI18n(infoModal.objectives, "en") }}
      </div>
      <div v-if="infoModal.measuredVariables">
        <br />
        <b>Measured variables:</b>
        {{ getI18n(infoModal.measuredVariables, "en") }}
      </div>
      <br />
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
/*
TODO: generify the component by removing producer/funding checkbox specific method
- info button can be of type "modal" or "hyperlink"
- fundingName correspond to complex name with country + abreviation -> could be useful for other checkbox than fundings
*/
export default {
  name: "facet-checkbox-element-component",
  data() {
    return {
      infoModal: {},
    };
  },
  //properties passed by parent component
  props: {
    name: {
      //Name of the checkbox element
      type: String,
      required: true,
    },
    type: {
      //Type of the checkbox element -  for fundings facet
      type: String,
      required: false,
    },
    count: {
      //Count of the checkbox element
      type: Number,
      required: false,
    },
    mutationName: {
      //Name of the mutation of the store to update filter
      type: String,
      required: true,
    },
    /*
    TODO: generify the component by removing producer/funding checkbox specific method
    - info button can be of type "modal" or "hyperlink"
    */
    info: {
      //For producer infobulle
      type: Boolean,
      required: false,
    },
    fundingName: {
      //Name of the fundings used to query the database
      type: String,
      required: false,
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
      "getProducerInfo",
    ]),
  },
  methods: {
    /**
     * Vuex store actions
     */
    ...mapActions([
      "initFacets",
      "resetObservations",
      "setBucketFilter",
    ]),
    /**
     * @vuese
     * Method triggered when a checkbox is checked.
     * 1 - Update state of the vuex filter store - (async)
     * 2 - when -1- promise is resolved search for new observations using the updated filters
     */
    toggleCheckbox() {
      //Vuex filter store action to update query filters
      if (this.mutationName === "TOGGLE_FILTERS_FUNDING_NAMES") {
        this.setBucketFilter({
          mutationName: this.mutationName,
          name: this.fundingName,
        });
      } else {
        this.setBucketFilter({
          mutationName: this.mutationName,
          name: this.name,
        });
      }
    },
    /**
     * @vuese
     * Method check the filters that the user previously checked
     */
    isChecked(name, mutationName) {
      switch (mutationName) {
        case "TOGGLE_FILTERS_GEOLOGIES":
          return this.getFilters.geologies.some((item) => item === name);
        case "TOGGLE_FILTERS_CLIMATES":
          return this.getFilters.climates.some((item) => item === name);
        case "TOGGLE_FILTERS_PRODUCER_NAMES":
          return this.getFilters.producerNames.some((item) => item === name);
        case "TOGGLE_FILTERS_FUNDING_NAMES":
          return this.getFilters.fundingNames.some((item) =>
            name.includes(item)
          );
      }
    },

    showProducerInfo() {
      this.infoModal = this.getProducerInfo.filter(
        (item) => this.getI18n(item.name, "en") === this.name
      )[0];
      $("#info-producer-" + this.name.replace(/\s/g, ""))
        .modal({
          centered: false,
        })
        .modal("show");
    },
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find((element) => element.lang === lang);
      return tmp.text;
    },
    // checkFromParent() {
    //   if (!this.$refs.checkbox.checked) {
    //     this.$refs.checkbox.click();
    //   }
    // },
    // uncheckFromParent(){
    //   if (this.$refs.checkbox.checked) {
    //     this.$refs.checkbox.click();
    //   }
    // }
  },
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

.ui.toogle.checkbox.custom.facet {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.ui.producer.segment.info.modal {
  text-align: justify;
}
</style>
