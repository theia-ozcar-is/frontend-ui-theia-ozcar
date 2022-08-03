<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="exclamation circle icon"></i> Data access and use constraints:
    </div>
    <div>
      <b>Use constraints:</b>
      {{getI18n(dataConstraint.accessUseConstraint,"en")}}
    </div>
    <br />
    <div class="data policy placeholder" v-if="dataConstraint.urlDataPolicy != null">
      <b>Data policy:</b>
      <a
        :href="getI18n(dataConstraint.urlDataPolicy,'en')"
        target="_blank"
      >{{getI18n(dataConstraint.urlDataPolicy,"en")}}</a>
    </div>
    <br />
    <div v-if="dataConstraint.embargo != null">
      <b>Access constraints:</b>
      Public with an embargo of {{dataConstraint.embargo.duration}} days.
    </div>
    <div v-else>
      <b>Access constraints:</b> Public
    </div>
    <br />
    <div v-if="dataConstraint.licence != null">
      <b>Licence:</b>
      <a :href="dataConstraint.licence.url" target="_blank">{{dataConstraint.licence.title}}</a>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display data constraint
 * @group Info panel components
 */
export default {
  name:"data-constraint-info-panel-component",
  props: {
    dataConstraint: {
      //Data constraint object
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
.data.policy.placeholder {
  text-align: left;
}
</style>
