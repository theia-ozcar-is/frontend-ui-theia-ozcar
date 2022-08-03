<template>
  <div class="observation-light-container clearfix" :id="producer.producerId">
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
        <b class="variable-container">Producer name</b>
        :
        <div class="ui large teal label">{{getI18n(producer.name,"en")}}</div>
      </div>
      <span v-if="producer.title != null">
        <!-- <b>Producer title</b> -->
        {{getI18n(producer.title,"en")}}
      </span>
      <span>
        <b>Description</b>
        : {{getI18n(producer.description,"en")}}
      </span>
      <div v-if="producer.objectives != null">
        <b>Objectives</b>
        :
        {{getI18n(producer.objectives,"en")}}
      </div>
      <div v-if="producer.measuredVariables != null">
        <b>Measured Variables</b>
        :
        {{getI18n(producer.measuredVariables,"en")}}
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

/**
 * @vuese
 * Item of the result list to be displayed in the result list component
 * @group Result list component
 */
export default {
  name: "producer-metadata-layout-component",
  props: {
    producer: {
      //Producer to be displayed in the component
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Vuex observation store getter
     */
    ...mapGetters(["getProducerDetailed"]),
    /**
     * @vuese
     * Build the relative path of the producer logo to be printed
     */
    getLogoName() {
      return require("../../asset/images/" + this.producer.producerId + ".png");
    }
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
    getProducerDetailed() {
      this.$root.$emit("showProducerMetadata");
    }
  },
  methods: {
    /**
     * Actions
     */
    ...mapActions(["setProducerDetailed"]),

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
      this.setProducerDetailed(this.$el.id).then(() =>
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
