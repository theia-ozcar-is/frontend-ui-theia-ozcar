<template>
  <div>
    <div class="ui segment">
      <div class="ui top attached label">
        <i class="info circle icon"></i> Identification :
      </div>
      <div>
        <b>Title:</b>
        {{getI18n(dataset.metadata.title,"en")}}
      </div>
      <br />
      <div>
        <b>Description:</b>
        {{getI18n(dataset.metadata.description,"en")}}
      </div>
      <br />
      <div v-if="dataset.metadata.objective != null">
        <b>Objective:</b>
        {{getI18n(dataset.metadata.objective,"en")}}
      </div>
      <br />
      <div>
        <b>Lineage:</b>
        {{getI18n(dataset.metadata.datasetLineage,"en")}}
      </div>
      <br />
      <!-- <div v-if="dataset.metadata.keywords != null">
        <div class="ui segment" v-if="printKeywords(dataset.metadata.keywords,'en')">
          <div class="ui top attached label">Keywords:</div>
          <div v-for="(keyword, index) in dataset.metadata.keywords" :key="index">
            <div v-if="isKeywordNull(keyword.keyword,'en')">
              <div>{{getI18n(keyword.keyword,"en")}}</div>
              <div v-if="keyword.uri != null">{{keyword.uri}}</div>
            </div>
          </div>
        </div>
      </div>-->
      <div v-if="dataset.metadata.documents != null" class="ui segment">
        <div class="ui top attached label">Documents:</div>
        <div v-for="(document, index) in dataset.metadata.documents" :key="index">
          <div>
            {{document.type}} -
            <a
              :href="getI18n(document.url,'en')"
              target="_blank"
            >{{getI18n(document.url,'en')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the dataset indentification metadata
 * @group Info panel components
 */
export default {
  name: "dataset-identification-info-panel-component",
  props: {
    dataset: {
      //The dataset object
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
    },
    // /**
    //  * @vuese
    //  * return a boolean. True if a keyword is null
    //  */
    // isKeywordNull(el, lang) {
    //   return this.getI18n(el, lang) == null;
    // },
    // /**
    //  * @vuese
    //  * 
    //  */
    // printKeywords(keywords, lang) {
    //   let print = false;
    //   keywords.forEach(element => {
    //     print == print && !this.isKeywordNull(element.keyword, lang);
    //   });
    // }
  }
};
</script>

<style>
</style>
