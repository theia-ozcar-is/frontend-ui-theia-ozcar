<template>
  <div>
    <div
      v-show="totalObservationsCount != 0 && isItemListFolded"
      id="view-list-button"
      class="leaflet-top"
      @click="toggleItemList()"
    >
      <b>List </b><i class="big angle double right icon"></i>
    </div>
    <div
      v-show="totalObservationsCount != 0 && !isItemListFolded"
      id="view-map-button"
      @click="toggleItemList()"
    ><i class="big angle double left icon"></i><b> Map</b></div>
    
  </div>
</template>

<style>
#view-list-button {
  top: 50%;
  left: 25%;
  color: white;
  font-size: smaller;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 0 0.5em 0.5em 0;
  padding: 1em 1em 1em 1em;
  cursor: pointer;
  pointer-events: visible;
  border-bottom: 0.1rem solid;
  border-right: 0.1rem solid;
  border-top: 0.1rem solid;
}

#view-map-button {
  position:absolute;
  z-index: 1500;
  top: 50%;
  right: 0;
  color: white;
  font-size: smaller;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 0.5em 0 0 0.5em;
  padding: 1em 1em 1em 1em;
  cursor: pointer;
  pointer-events: visible;
  border-bottom: 0.1rem solid;
  border-left: 0.1rem solid;
  border-top: 0.1rem solid;
}
#view-map-button:hover,
#view-list-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "toggle-list-component",
  props: {
    totalObservationsCount: Number,
  },
  computed: {
    ...mapGetters(["isItemListFolded"]),
  },
  methods: {
    /**
     * Vuex Store actions used by the component
     */
    ...mapActions(["toggleItemList"]),
  },
};
</script>