<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="globe icon"></i> Climate and geology :
    </div>
    <div class="ui segment">
      <div class="ui top left attached label">Climate</div>
      <div v-for="(climate, index) in climates" :key="index">{{climate}}</div>
    </div>
    <div class="ui segment">
      <div class="ui top left attached label">Geology</div>
      <div v-for="(geology, index) in geologies" :key="index">{{geology}}</div>
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
      type: Array,
      required: false
    },
    geologies: {
      //array of gelogies of the dataset
      type: Array,
      required: false
    }
  }
};
</script>

<style>
</style>
