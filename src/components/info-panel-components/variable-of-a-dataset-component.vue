<template>
  <div  class="ui segment" v-if="getTheiaVariablesOfADataset.length > 0">
    
      <div class="ui top left attached label">
        Theia/OZCAR variables of the dataset:
      </div>
      <div id="other-theia-variable-placeholder">
        <span
          class="other-theia-variable"
          v-for="variable in getTheiaVariablesOfADataset"
          :key="variable.uri"
        >
          <a
            class="ui blue label"
            :href="variable.uri"
            target="_blank"
          >{{getI18n(variable.prefLabel,"en")}}</a>
        </span>
      </div>
    </div>
</template>
<style>
#other-theia-variable-placeholder span > a.ui.blue.label {
	margin: 0px 2px 2px 0px;
}
</style>

<script>
import Vuex from "vuex";
export default {
  name: "theia-variables-of-a-dataset",
  props: ["loader"],
  computed: {
    ...Vuex.mapGetters(["getTheiaVariablesOfADataset"]),
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