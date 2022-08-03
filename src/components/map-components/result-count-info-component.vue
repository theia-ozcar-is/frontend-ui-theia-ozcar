<template>
  <div v-if="getTotalObservationsCount != 0">
    <div v-if="getTotalObservationsCount > 1 && getMapItems.length > 1 ">
      {{ getTotalObservationsCount }} measurements on {{ getMapItems.length }} locations
    </div>
	<div v-else-if="getTotalObservationsCount > 1 && getMapItems.length == 1 ">
      {{ getTotalObservationsCount }} measurements on {{ getMapItems.length }} location
    </div>
	<div v-else-if="getTotalObservationsCount == 1 && getMapItems.length == 1 ">
      {{ getTotalObservationsCount }} measurement on {{ getMapItems.length }} location
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "result-count-info-component",
  computed: {
    ...mapGetters(["getTotalObservationsCount", "getMapItems"]),
  }
};
</script>