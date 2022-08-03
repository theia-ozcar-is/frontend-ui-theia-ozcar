<template>
  <div v-if="producer.onlineResource != null" class="ui segment">
    <div class="ui top attached label">
      <i class="cloud icon"></i> Online resources:
    </div>
    <div v-if="producer.onlineResource.urlInfo != null">
      <b>Website</b> :
      <a
        :href="getI18n(producer.onlineResource.urlInfo, 'en')"
        target="_blank"
      >{{getI18n(producer.onlineResource.urlInfo, 'en')}}</a>
    </div>
    <div v-if="producer.onlineResource.urlDownload != null">
      <b>Data portal</b> :
      <a
        :href="getI18n(producer.onlineResource.urlDownload, 'en')"
        target="_blank"
      >{{getI18n(producer.onlineResource.urlDownload, "en")}}</a>
    </div>
    <div v-if="producer.onlineResource.doi">
      DOI :
      <a
        :href="'http://dx.doi.org/' + producer.onlineResource.doi"
        target="_blank"
      >{{producer.onlineResource.doi}}</a>
    </div>
    <div v-if="producer.onlineResource.webservices != null" class="ui segment">
      <div class="ui top left attached label">Webservices:</div>
      <div v-for="(webservice, index) in producer.onlineResource.webservices" :key="index">
        <div class="ui segment">
          <div>Description : {{getI18n(webservice.description,"en")}}</div>
          <div>
            <a
              :href="getI18n (webservice.url,'en')"
              target="_blank"
            >Use this webservice</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the producer online resources
 * @group Info panel components
 */
export default {
  name: "producer-onlmine-resource-info-panel-component",
  props: {
    producer: {
      //producer Object
      type: Object,
      required: true
    }
  },
  methods: {
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
</style>
