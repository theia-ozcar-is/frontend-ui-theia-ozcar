<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="info circle icon"></i> Identification:
    </div>
    <div>
      <b>Name</b>
      : {{getI18n(producer.name,"en")}}
    </div>
    <br />
    <div>
      <b>Title</b>
      : {{getI18n(producer.title,"en")}}
    </div>
    <br />
    <div>
      <b>Description</b>
      : {{getI18n(producer.description,"en")}}
    </div>
    <br />
    <div v-if="producer.objectives">
      <b>Objectives</b>
      : {{getI18n(producer.objectives,"en")}}
    </div>
    <br />
        <div v-if="producer.measuredVariables">
      <b>Measured variables</b>
      : {{getI18n(producer.measuredVariables,"en")}}
    </div>
    <br />
    <div v-if="producer.email != null">
      <b>Email :</b>
      {{producer.email}}
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the producer identification metadata
 * @group Info panel components
 */
export default {
  name: "producer-identification-info-panel-component",
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
