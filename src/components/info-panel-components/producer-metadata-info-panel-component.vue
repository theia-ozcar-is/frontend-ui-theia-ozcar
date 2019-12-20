<template>
  <div id="info-panel">
    <div class="ui producer segment">
      <a class="ui ribbon label">
        <h1>{{getI18n(producerDetail.name,"en")}}</h1>
      </a>
      <div class="ui two column grid">
        <div class="sixteen wide column">
          <producer-identification-info-panel-component :producer="producerDetail"></producer-identification-info-panel-component>
        </div>
        <div class="column">
          <!-- <producer-contacts-info-panel-component :producer="observationsDetail[0].producer"></producer-contacts-info-panel-component> -->
          <contacts-info-panel-component :contacts="producerDetail.contacts"></contacts-info-panel-component>
        </div>
        <div class="column">
          <producer-online-resource-info-panel-component :producer="producerDetail"></producer-online-resource-info-panel-component>
          <producer-fundings-info-panel-component :fundings="producerDetail.fundings"></producer-fundings-info-panel-component>
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
export default {
  name: "producer-metadata-info-panel-component",
  props: {
    producerDetail: {
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
    producerOnlineResourceInfoPanelComponent
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