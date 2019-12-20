<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="map icon"></i> Location:
    </div>
    <div class="station-name-placeholder">
      <b>Station name:</b>
      {{getI18n(featureOfInterest.samplingFeature.name,"en")}}
    </div>
    <div v-if="isPoint">
      <div>Longitude : {{featureOfInterest.samplingFeature.geometry.coordinates[0]}}</div>
      <div>Latitude : {{featureOfInterest.samplingFeature.geometry.coordinates[1]}}</div>
      <div
        v-if="featureOfInterest.samplingFeature.geometry.coordinates[2] != undefined"
      >Altitude : {{featureOfInterest.samplingFeature.geometry.coordinates[2]}}</div>
    </div>
    <div v-else class="ui grid">
      <div class="sixteen wide column spatialExtentBbox">
        <div>{{maxLong}}</div>
        <div>
          <i class="arrow up icon"></i>
        </div>
      </div>
      <div class="sixteen wide column">
        <div class="ui grid">
          <div class="eight wide column spatialExtentBbox">
            {{minLat}}
            <i class="arrow left icon"></i>
          </div>
          <div class="eight wide column spatialExtentBbox">
            <i class="arrow right icon"></i>
            {{maxLat}}
          </div>
        </div>
      </div>
      <div class="sixteen wide column spatialExtentBbox">
        <div>
          <i class="arrow down icon"></i>
        </div>
        <div>{{minLong}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the observation samplign location
 * @group Info panel components
 */
export default {
  name:"observation-location-info-panel-component",
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
    featureOfInterest:{
      //featureOfInterest Object
      type:Object,
      required: true
    }
  },
  watch: {
    /**
     * @vuese
     * Watch featureOfInterest to get the sampling feature coordinates
     */
    featureOfInterest() {
      this.getLocationCoordinates();
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
    },
    /**
     * @vuese
     * Method to populate component data according to the geometry of the observation
     */
    getLocationCoordinates() {
      if (this.featureOfInterest.samplingFeature.geometry.type !== "Point") {
        this.isPoint = false;
        let latLngs = [];

        //Recursive method that push all coordinates in LatLngs[]
        getPointRecursively(
          this.featureOfInterest.samplingFeature.geometry.coordinates,
          latLngs
        );

        let longitudes = [];
        let latitudes = [];
        let altitudes = [];
        latLngs.forEach(element => {
          longitudes.push(element[0]);
          latitudes.push(element[1]);
          if (element[2] != null) {
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
      } else {
        this.isPoint = true;
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

<style>
.spatialExtentBbox {
  text-align: center;
}
.station-name-placeholder {
  margin-bottom: 10px;
}
</style>
