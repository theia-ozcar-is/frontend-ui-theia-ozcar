<template>
  <div v-show="!imgError || (geoJSON == JSON.stringify(this.getBBOXOfADataset))" class="ui segment" id="dataset-map-placeholder">
    <div class="ui top attached label">
      <i class="map icon"></i> Dataset measurement location :
    </div>
    <div class="dataset map container">
      <img
        id="dataset-map-img"
        :src="imageUrl"
        alt="dataset-BBOX"
        @error="onImgError(true)"
        @load="onImgError(false)"
      />
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the dataset BBOX on a static map
 * @group Info panel components
 */
import Vuex from "vuex";
export default {
  name: "dataset-map-component",
  data() {
    return {
      imgError: true,
      geoJSON: null,
    };
  },
  computed: {
    ...Vuex.mapGetters(["getBBOXOfADataset"]),
    imageUrl() {
      return (
        "http://osm-static-maps.herokuapp.com/?geojson=" +
        JSON.stringify(this.getBBOXOfADataset)
      );
    }
  },
  // watch: {
  //   getBBOXOfADataset() {
  //     this.imgError = true;
  //   }
  // },
  methods: {
    onImgError(bool) {
      this.imgError = bool;
      if (!bool) {
        this.geoJSON = JSON.stringify(this.getBBOXOfADataset);
      }
    }
  }
};
</script>

<style>
#dataset-map-placeholder {
  position: relative;
  width: 100%;
  max-height: 25rem;
}

#dataset-map-placeholder .dataset.map.container {
  height:23rem
}

#dataset-map-img {
  height: 90%;
  width: 100%;
}
</style>
