<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="cogs icon"></i> Data processing :
    </div>
    <div v-if="procedure.dataProduction != null">
      <div v-if="procedure.dataProduction.method">{{getI18n(procedure.dataProduction.method,"en")}}</div>
    </div>
    <div class="lineage-panel" v-if="procedure.lineageInformations != null">
      <div class v-for="(lineageInformation, index) in procedure.lineageInformations" :key="index">
        <div class="ui segment">{{getI18n(lineageInformation,"en")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the procedure
 * @group Info panel components
 */
export default {
  name: "data-processing-info-panel-component",
  props: {procedure:{
	  type:Object,
	  required:true
  }},
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
