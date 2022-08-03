<template>
  <div>
    <div
        ref="mapContainer"
        @meta-obs-clicked="zoomInObs"
        class="map-container"
    ></div>
    <result-count-info-component
        id="result-count-info"
        class="leaflet-top"
    ></result-count-info-component>
  </div>
</template>

<style>
.map-container {
  z-index: 1;
  position: relative;
  width: 100%;
  height: 100%;
}

#result-count-info {
  margin: 1em 0 0 5em;
  color: white;
  font-size: smaller;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.25em;
  padding: 0.25em 1em 0.25em 1em;
  z-index: 997;
  border: 0.1rem solid;
}

.ui.selectable.celled.table tbody {
  cursor: pointer;
}


a.leaflet-control-zoomhome-home > i.small.home.icon {
  margin: 0;
}

/* Style for the popup */
.ui.selectable.celled.table.map-popup {
  margin-top: 1rem;
}

.ui.selectable.celled.table.map-popup tbody tr.pointer:hover {
  color: teal !important;
  font-weight: bold;

}

.ui.large.icon.button.copy-geojson-result {
  background-color: white;
}
</style>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-draw/dist/leaflet.draw-src.css";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet-draw/dist/leaflet.draw-src";
import "leaflet.zoomhome";
import {mapActions, mapGetters} from "vuex";
import resultCountInfoComponent from "./result-count-info-component.vue";
/**
 * Problem with Webpack + Leaflet: webpack move icon images and hash there name.
 * Then leaflet path detection is not able to find images anymore. Leaflet members don't seem
 * them want to fix the problem (closing all issues). More Info https://github.com/Leaflet/Leaflet/issues/4968
 * Workaround: delete default icon url and import new local path for each icon.
 */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
//let spritesheet = require('../../asset/images/spritesheet.svg');

/**
 * Add methods and attribute for Polyline to be included in marker cluster
 */
L.Polyline.addInitHook(function () {
  if (this._latlngs.length > 0) {
    this._latlng = this._bounds.getCenter();
  }
});
L.Polyline.include({
  getLatLng: function () {
    return this._latlng;
  },
  setLatLng: function () {
  }, // Dummy method.
});

/**
 * @vuese
 * Map component using leaflet library
 * @group map components
 */
export default {
  name: "map-component",
  components: {
    resultCountInfoComponent,
  },
  data() {
    return {
      /**
       * @vuese
       * The leaflet map
       */
      map: null,
      /**
       * @vuese
       * The markers to be displayed on the map
       */
      markers: null,
      /**
       * @vuese
       * The default base tile layers to be added in the map (eg: mapbox, openstreet map, ...)
       */
      baseTileLayer: L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
              maxNativeZoom: 19,
              maxZoom: 25,
              minZoom:2
          }
      ),
      /**
       * @vuese
       * Array containing the geojson object to be displayed as marker on the map
       */
      layers: [],
      /**
       * @vuese
       * object to store editable layer used to define spatial extent queries
       */
      //     drawnItems: null,
      /**
       * @vuese
       * object to store zoom and position of a query in order to be able to return to the initial zoom and position
       */
      zoomHome: null,
    };
  },
  props: {
    getMapItems: {
      //map items to be printed on the map
      type: Array,
      required: true,
    },
    drawItems: {
      //Setup draw item or not
      type: Boolean,
      required: true,
    },
    tileSelector: {
      //Setup tileSelector or not
      type: Boolean,
      required: true,
    },
    popupMaxHeight: {
      //Max height of a popup
      type: Number,
      required: true,
    },
    fitBounds: {
      //Setup fit bound option or not.
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      "getPopupTemplate",
      "getFilters",
      "isFiltersEmpty",
      "getTotalObservationsCount",
      "getRemoveMapDrawItems",
      "getSpatialExtentLayer"
    ]),
  },
  watch: {
    /**
     * @vuese
     * Watch getMapItems - Each time the map items are updated the map is refreshed
     */
    getMapItems() {
      //if (this.getMapItems.length > 0) {
      this.refreshMapWithMarkers();
      //}
    },
    // getRemoveMapDrawItems() {
    //   this.drawnItems.clearLayers();
    // },
  },
  methods: {
    /**
     * Vuex Store actions used by the component
     */
    ...mapActions([
      // "setObservationsDetailed",
      "loadPopupContent",
      "setSpatialExtentFilter",
      "initFacets",
      "resetObservations",
      "setSpatialExtentFilterLayer"
    ]),

    /**
     * @vuese
     * Method to initialise leaflet map container
     */
    initMap() {
      this.map = L.map(this.$refs["mapContainer"], {
        center: [10, 20],
        zoom: 2,
        maxBounds: [
          //south west
          [Infinity, Infinity],
          //north east
          [-Infinity, -Infinity],
        ],
        zoomControl: false
      });
      this.zoomHome = L.Control.zoomHome();
      this.zoomHome.addTo(this.map);
      L.control.scale({imperial: false, position: "topleft"}).addTo(this.map);
      document.querySelector(
          "#map-placeholder > div > div.leaflet-control-container > div.leaflet-top.leaflet-left > div.leaflet-control-zoomhome.leaflet-bar.leaflet-control > a.leaflet-control-zoomhome-home > i"
      ).className = "small home icon";
    },

    /**
     * @vuese
     * method to initialise tile layer. This layer is added to the previously defined map container
     */
    initTileLayer() {
      let baseLayers = {
        "Esri World Imagery": this.baseTileLayer,
        "Esri World Topo": L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                  "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
            }
        ),
        "OpenStreetMap Mapnik": L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              maxNativeZoom: 19,
              maxZoom: 25,
              minZoom:2,
              attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ),
        OpenTopoMap: L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            {
              maxNativeZoom: 17,
              maxZoom: 25,
              minZoom:2,
              attribution:
                  'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            }
        ),
        "Geoportail France IGN Maps": L.tileLayer(
            "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
            {
              attribution:
                  '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
              bounds: [
                [-75, -180],
                [81, 180],
              ],
              minZoom: 2,
              maxNativeZoom: 18,
              maxZoom: 25,
              apikey: "choisirgeoportail",
              format: "image/jpeg",
              style: "normal",
            }
        ),
        "Geoportail France orthophotos": L.tileLayer(
            "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
            {
              attribution:
                  '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
              bounds: [
                [-75, -180],
                [81, 180],
              ],
              minZoom: 2,
              maxNativeZoom: 19,
              maxZoom: 25,
              apikey: "choisirgeoportail",
              format: "image/jpeg",
              style: "normal",
            }
        ),
      };
      L.control.layers(baseLayers).addTo(this.map);
      this.baseTileLayer.addTo(this.map);
    },

    /**
     * @vuese
     * Method to initialise markers. At initialisation there is no marker.
     * Observation and dataset attribute are defined to allow specific visualisation for each attibute
     * -------------------------
     * For the moment only observations visualisation is allowed. Later toogleLayer method would allow to switch
     * between dataset and observation visualisation
     */
    initMarkers() {
      this.markers = {
        observations: L.markerClusterGroup(),
        datasets: L.markerClusterGroup(),
      };
    },

    initCopyResultButton() {
      L.Control.CopyButton = L.Control.extend({
        onAdd: (map) => {
          let div = L.DomUtil.create('div',"ui large icon button copy-geojson-result");
          div.innerHTML = '<i class="copy icon"></i>'
          div.title = "Copy the geojson string of the result displayed on the map to the clipboard"
          L.DomEvent.addListener(div, 'click', () => this.copyMapItemsToClipboard())
          return div;
        },

        onRemove: function(map) {
          // Nothing to do here
        }
      });
      L.control.copyButton = function(opts) {
        return new L.Control.CopyButton(opts);
      }
      L.control.copyButton({ position: 'topright' }).addTo(this.map);
    },

    copyMapItemsToClipboard() {
      let geojson = {
        type: "FeatureCollection",
        features: []
      }
      this.getMapItems.forEach(item => geojson.features.push(item.samplingFeature));
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(JSON.stringify(geojson, null, 2)).then(() => {
          if (!$('.copy-geojson-result').popup("exists")) {
            $('.copy-geojson-result')
                .popup({
                      on: 'manual',
                      content: 'Copied to clipboard!'
                    }
                ).popup('show')
            setTimeout(function () {
              $('.copy-geojson-result').popup("hide")
            }, 1000);
          }
        })
            .catch(() => {
              $('.copy-geojson-result')
                  .popup({
                        on: 'manual',
                        content: 'Something wrong happened. You cannot copy the filters...',
                      }
                  )
              setTimeout(function () {
                $('.copy-geojson-result').popup("hide")
              }, 1000);
            })
      }
    },

    /**
     * @vuese
     * Method to initialise draw query items.
     */
    initDrawnItems() {
      this.setSpatialExtentFilterLayer(new L.GeoJSON()).then(() => {
        this.map.addLayer(this.getSpatialExtentLayer);
        let drawControl = new L.Control.Draw({
          draw: {
            polyline: false,
            marker: false,
            circlemarker: false,
            circle: false,
          },
          edit: {
            featureGroup: this.getSpatialExtentLayer,
          },
        });
        this.map.addControl(drawControl);
      })


      /**
       * "draw:created": Triggered when a new vector or marker has been created.
       */
      this.map.on("draw:created", (e) => {
        // Each time a feature is created, it's added to the over arching feature group
        var feature = e.layer.feature = e.layer.feature || {};
        feature.type = "Feature";
        feature.properties = feature.properties || {};
        feature.properties["localId"] = (Math.random() + 1).toString(36).substring(7);
        this.setSpatialExtentFilterLayer(this.getSpatialExtentLayer.addLayer(e.layer)).then(() => {
          this.setSpatialExtentFilter(this.getSpatialExtentLayer.toGeoJSON());
        })
      });

      /**
       * "draw:edited": Triggered when layers in the FeatureGroup; initialised with the plugin; have been edited and saved.
       */
      this.map.on("draw:edited", (e) => {
        this.setSpatialExtentFilterLayer(
            this.getSpatialExtentLayer.removeLayer(e.layers))
            .then(() => this.setSpatialExtentFilter(this.getSpatialExtentLayer.toGeoJSON()));
      });

      /**
       * "draw:deleted":Triggered when layers have been removed (and saved) from the FeatureGroup.
       */
      this.map.on("draw:deleted", (e) => {
        this.setSpatialExtentFilterLayer(this.getSpatialExtentLayer.removeLayer(e.layers)).then(() => {
          if (this.getSpatialExtentLayer.toGeoJSON().features.length == 0) {
            this.setSpatialExtentFilter(null);
          } else {
            this.setSpatialExtentFilter(this.getSpatialExtentLayer.toGeoJSON());
          }
        })
      });
    },

    /**
     * @vuese
     * Method to add locations to the markers property using geojson object
     * If a layer already exist, the geojson object is add to the layer,
     * else the layer is istanciated with the geojson object. Click event are binded to each location.
     * @arg {string} layerTitle the title of the layer in which the location is imported
     * @arg {object} a geojson object representing the location
     */
    addLocationGeoJson(layerTitle, geojson) {
      if (this.layers[layerTitle] !== undefined) {
        this.layers[layerTitle].addData(geojson);
      } else {
        this.layers[layerTitle] = L.geoJSON(geojson, {
          /**
           * bind click event to open popup on each geojson feature of the layer
           */
          onEachFeature: (feature, layer) => {
            layer.on("click", this.markerClickHandler);
          },
          //prevent bubbling event: click event will ne click on the map for LineString
          //allow popup to open
          bubblingMouseEvents: false,
        });
      }
    },

    /**
     * @vuese
     * Click event handler that trigger popup content loading.
     * This action is defined in Vuex popupModule store.
     */
    markerClickHandler(event) {
      this.loadPopupContent({
        marker: event.target,
        config: {maxHeight: this.popupMaxHeight},
      });
    },

    // /**
    //  * Method to toggle a layer on the map. For example, to toggle observation layer to show only printed observation location on the map
    //  * ------------------------------
    //  * Not used for the moment since only observations are displayed
    //  */
    // toggleLayer(layerTitle) {
    //   if (this.map.hasLayer(this.markers[layerTitle])) {
    //     this.map.removeLayer(this.markers[layerTitle]);
    //   } else {
    //     this.map.addLayer(this.markers[layerTitle]);
    //   }
    // },

    /**
     * @vuese
     * Method to update the map with markers of mapItems array. This array is defined in Vuex observations store
     * and corresponds to the map items that are resulting the query performed.
     */
    refreshMapWithMarkers() {
      //The markers are removed from the map
      if (this.markers.observations != null) {
        this.map.removeLayer(this.markers["observations"]);
      }
      this.markers.observations = null;
      //this.map.removeLayer(this.markers["datasets"]);

      //The layers array is reseted and filled with mapItems items form Vuex observation store array
      this.layers = [];

      //The makers to display are reseted
      if (this.getMapItems.length > 1) {
        this.markers.observations = L.markerClusterGroup();
        //this.markers.datasets = L.markerClusterGroup();
      }
      if (this.getMapItems.length > 0) {
        if (this.getMapItems.length > 1) {
          this.getMapItems.forEach((element) => {
            //document ids are save in geojson properties object to be displayed by the popup
            if (element.samplingFeature.properties === undefined) {
              element.samplingFeature.properties = {};
            }
            element.samplingFeature.properties.ids = element.observationIds;
            //layers array is filled with the geojson of mapItems array
            this.addLocationGeoJson("observations", element.samplingFeature);
          });
          this.markers["observations"].addLayer(this.layers["observations"]);
          //Markers are printed onto the map
          this.printMarkers(this.markers);
        } else {
          //document ids are save in geojson properties object to be displayed by the popup
          if (this.getMapItems[0].samplingFeature.properties === undefined) {
            this.getMapItems[0].samplingFeature.properties = {};
          }
          this.getMapItems[0].samplingFeature.properties.ids = this.getMapItems[0].observationIds;
          this.addLocationGeoJson(
              "observations",
              this.getMapItems[0].samplingFeature
          );
          this.markers["observations"] = this.layers["observations"];
          this.printMarkers(this.markers);
        }
        /**
         * Fit the bounds of the queried observation (issue #6)
         */
        const bounds = this.markers.observations.getBounds();
        const arrayBounds = [
          Object.values(bounds._northEast),
          Object.values(bounds._southWest),
        ];
        this.map.fitBounds(arrayBounds);
        this.zoomHome.setHomeBounds(arrayBounds);
        if (this.fitBounds) {
          this.map.setMaxBounds(arrayBounds);
        }
      } else {
        this.map.setView([10, 20], 2);
        this.zoomHome.setHomeCoordinates([10, 20]);
        this.zoomHome.setHomeZoom(2);
      }
    },

    /**
     * @vuese
     * Method to print markers on the map
     * --------------------------------
     * only the "observation" layer is printed to the map but the method
     * can handle different layers (ex: dataset layer, site layer...)
     */
    printMarkers(markers) {
      for (let layerTitle in markers) {
        this.map.addLayer(this.markers[layerTitle]);
      }
    },

    /**
     * @vuese
     * Method to zoom on a marker selected by its id.
     */
    zoomInObs(coordinates) {
      //let jsonId = JSON.parse(id);
      let latLngs = [];
      // //Vuex observation store getter: get the coordinate of the observation to zoom in using id
      // let coordinateGeoJson = this.getObservationIdToZoomIn(jsonId[0])
      //   .observations[0].featureOfInterest.samplingFeature.geometry.coordinates;

      //Recursive method that push all coordinante in array
      let getPointRecursively = function (coordsArray, latLngs) {
        coordsArray.forEach((element) => {
          if (Array.isArray(element)) {
            getPointRecursively(element, latLngs);
          } else {
            latLngs.push(L.GeoJSON.coordsToLatLng(coordsArray));
          }
        });
      };
      getPointRecursively(coordinates, latLngs);
      //The map is fitted around the array of coordinates of the observations
      this.map.fitBounds(latLngs, {maxZoom: 15});
    }
  },
  mounted() {
    /**
     * Initialisation of the map when the component is mounted
     */
    this.initMap();
    this.initTileLayer();
    this.initMarkers();
    if (this.drawItems) {
      this.initDrawnItems();
    }
    this.initCopyResultButton();
  },
  created() {
    /**
     * Initialisation of the event listener when the component is created.
     * On "meta-obs-clicked" event the map is zoomed in a given observation
     */
    this.$root.$on("meta-obs-clicked", (coordinates) => {
      this.zoomInObs(coordinates);
    });

    this.$root.$on("delete-draw-item-from-filter-summary", (id) => {
      this.setSpatialExtentFilterLayer(this.getSpatialExtentLayer.removeLayer(this.getSpatialExtentLayer.getLayers().find(element => element.feature.properties.localId == id)))
          .then(() => {
            if (this.getSpatialExtentLayer.toGeoJSON().features.length == 0) {
              this.setSpatialExtentFilter(null);
            } else {
              this.setSpatialExtentFilter(this.getSpatialExtentLayer.toGeoJSON());
            }
          })
    });

    this.$root.$on("highlight-draw-item-from-filter-summary", (id) => {
      this.getSpatialExtentLayer.getLayers().find(element => element.feature.properties.localId == id).setStyle({color: 'red'})
    });

    this.$root.$on("lowlight-draw-item-from-filter-summary", (id) => {
      this.getSpatialExtentLayer.getLayers().find(element => element.feature.properties.localId === id).setStyle({color: "#3388ff"})
    });
  }
};
</script>
