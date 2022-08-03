<template>
  <div
    v-if="
      dataset.metadata.keywords && dataset.metadata.keywords.length>0 &&
      getTheiaVariablesOfADataset.length > 0
    "
    id="keyword-placeholder"
    class="ui segment"
  >
    <div class="ui top attached label">
      <i class="font icon"></i> Keywords :
    </div>
    <div
      id="dataset-keyword-placeholder"
      class="ui segment"
      v-if="dataset.metadata.keywords"
    >
      <div class="ui top left attached label">Producer keywords :</div>
      <div v-if="printKeywords(dataset.metadata.keywords, 'en')">
        <span
          v-for="(keyword, index) in dataset.metadata.keywords"
          :key="index"
        >
          <span
            id="keyword-container"
            v-if="!isKeywordPrefLabelNull(keyword.keyword, 'en')"
          >
            <span v-if="keyword.uri != null">
              <a :href="keyword.uri" class="ui blue label" target="_blank">{{
                getI18n(keyword.keyword, "en")
              }}</a>
            </span>
            <span v-else>
              <div class="ui label">{{ getI18n(keyword.keyword, "en") }}</div>
            </span>
          </span>
        </span>
      </div>
    </div>
    <variableOfADatasetComponent></variableOfADatasetComponent>
  </div>
</template>

<script>
import variableOfADatasetComponent from "./variable-of-a-dataset-component.vue";
import Vuex from "vuex";
/**
 * @vuese
 * Display keywords
 * @group Info panel components
 */
export default {
  name: "dataset-keywords-component",
  components: {
    variableOfADatasetComponent,
  },
  computed: {
    ...Vuex.mapGetters(["getTheiaVariablesOfADataset"]),
  },
  props: {
    dataset: {
      //The dataset object
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find((element) => element.lang === lang);
      return tmp.text;
    },
    /**
     * @vuese
     * Boolean - return true if the keyword.prefLabel is null
     */
    isKeywordPrefLabelNull(el, lang) {
      return (
        this.getI18n(el, lang) == null || this.getI18n(el, lang) == undefined
      );
    },
    /**
     * @vuese
     * boolean - return true at least one keyword prefLabel is not null
     */
    printKeywords(keywords, lang) {
      let print = true;
      keywords.forEach((element) => {
        print = print && !this.isKeywordPrefLabelNull(element.keyword, lang);
      });
      return print;
    },
  },
};
</script>

<style>
#keyword-container > span > .ui.label {
  margin: 0px 2px 2px 0px;
}
</style>
