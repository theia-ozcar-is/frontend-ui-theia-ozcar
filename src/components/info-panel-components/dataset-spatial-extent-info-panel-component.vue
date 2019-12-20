<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="map icon"></i> Spatial extent :
    </div>
    <div class="ui grid">
      <div class="sixteen wide column spatialExtentBbox">
        <div>{{maxLat}}</div>
        <div>
          <i class="arrow up big icon"></i>
        </div>
      </div>
      <div class="sixteen wide column">
        <div class="ui grid">
          <div class="eight wide column spatialExtentBbox">
            {{minLong}}
            <i class="arrow left big icon"></i>
          </div>
          <div class="eight wide column spatialExtentBbox">
            <i class="arrow right big icon"></i>
            {{maxLong}}
          </div>
        </div>
      </div>
      <div class="sixteen wide column spatialExtentBbox">
        <div>
          <i class="arrow down big icon"></i>
        </div>
        <div>{{minLat}}</div>
      </div>
    </div>
  </div>
</template>

<style>
.spatialExtentBbox {
  text-align: center;
}
</style>

<script>
/**
 * @vuese
 * Display the dataset statial extent using arrows
 * @group Info panel components
 */
export default {
  name: "dataset-spatial-extent-info-panel-component",
  data() {
    return {
      /**
       * @vuese
       * Boolean - wether the spatialExtent geometry is a point
       */
      isPoint: false,
      /**
       * @vuese
       * minimum longitude
       */
      minLong: null,
      /**
       * @vuese
       * maximum longitude
       */
      maxLong: null,
      /**
       * @vuese
       * minimum latitude
       */
      minLat: null,
      /**
       * @vuese
       * maximum latitude
       */
      maxLat: null,
      /**
       * @vuese
       * minimum altitude
       */
      minAlt: null,
      /**
       * @vuese
       * maximum laltitude
       */
      maxAlt: null
    };
  },
  props: {
    spatialExtent: {
      //Sparial extent geojson object
      type: Object,
      required: true
    }
  },
  watch: {
    /**
     * @vuese
     * SpatialExtent watcher - trigger getLocationCoordinates
     */
    spatialExtent() {
      this.getLocationCoordinates();
    }
  },
  methods: {
    /**
     * @vuese
     * Method to populate component data according to the geometry of the observation
     */
    getLocationCoordinates() {
      let latLngs = [];

      getPointRecursively(this.spatialExtent.geometry.coordinates, latLngs);

      let longitudes = [];
      let latitudes = [];
      let altitudes = [];
      latLngs.forEach(element => {
        longitudes.push(element[0]);
        latitudes.push(element[1]);
        if (element[2] == Number) {
          altitudes.push(element[2]);
        }
      });

      this.minLong = Math.min(...longitudes);
      this.maxLong = Math.max(...longitudes);
      this.minLat = Math.min(...latitudes);
      this.maxLat = Math.max(...latitudes);
      if (altitudes.size !== 0) {
        this.minAlt = Math.min(...altitudes);
        this.maxAlt = Math.max(...altitudes);
      }
    }
  },
  created() {
    this.getLocationCoordinates();
  }
};

/**
 * Recursive method that push all coordinates in array
 */
let getPointRecursively = function(coordsArray, latLngs) {
  coordsArray.forEach(element => {
    if (Array.isArray(element)) {
      getPointRecursively(element, latLngs);
    } else {
      latLngs.push(coordsArray);
    }
  });
};
</script>


