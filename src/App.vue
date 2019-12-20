<template>
  <div id="app" style>
    <menu-bar-component></menu-bar-component>
    <div :class="['ui','inverted',  {'active':getLoading},'dimmer']">
      <div class="ui large text loader">Querying measurements</div>
    </div>
    <map-component
      id="map-placeholder"
      :getMapItems="getMapItems"
      :drawItems="true"
      :tileSelector="true"
      :popupMaxHeight="500"
      :fitBounds="false"
    >
    </map-component>
    <info-panel-component></info-panel-component>

    <metadata-component v-if="getTotalObservationsCount != 0"></metadata-component>
    <facet-search-component></facet-search-component>
  </div>
</template>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}

.ui.segment {
  word-wrap: break-word;
}

#map-placeholder {
  position: absolute;
  width: 75%;
  height: calc(100% - 4rem);
  right: 0;
  top: 4rem;
}

.ui.inverted.dimmer {
  /* position: relative; */
  z-index: 1500;
}
</style>


<script>
import Vuex from "vuex";

import menuBarComponent from "./components/menu-bar-component.vue";
import mapComponent from "./components/map-components/map-component.vue";
import metadataComponent from "./components/result-list-components/metadata-component.vue";
import infoPanelComponent from "./components/info-panel-components/info-panel-component.vue";
import facetSearchComponent from "./components/facet-components/facet-search-component.vue";


export default {
  name: "App",
  components: {
    menuBarComponent,
    mapComponent,
    metadataComponent,
    infoPanelComponent,
    facetSearchComponent
  },
  computed: {
    ...Vuex.mapGetters(["getLoading", "getMapItems", "getTotalObservationsCount"])
  }
  // created() {
  //   $(".test.case").dimmer({className:'active'});
  // }
};
</script>


