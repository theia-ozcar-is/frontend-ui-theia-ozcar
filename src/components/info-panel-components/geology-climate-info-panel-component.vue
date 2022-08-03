<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="globe icon"></i> Climate and geology :
    </div>
    <div v-if="climates" class="ui segment">
      <div class="ui top left attached label">Climate</div>
      <div>{{climates}}</div>
    </div>
    <div v-if="geologies" class="ui segment">
      <div class="ui top left attached label">Geology</div>
      <div>{{geologies}}</div>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the climates or geologies of a dataset statial
 * @group Info panel components
 */
export default {
  name: "geology-climate-info-panel-component",
  props: {
    climates: {
      //array of climates of the dataset
      type: String,
      required: false
    },
    geologies: {
      //array of gelogies of the dataset
      type: String,
      required: false
    }
  }
};
</script>

<style>
</style>
