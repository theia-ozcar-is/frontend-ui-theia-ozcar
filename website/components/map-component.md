# map-component

Map component using leaflet library

## Props

<!-- @vuese:map-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|getMapItems|-|map items to be printed on the map|`true`|-|
|drawItems|-|Setup draw item or not|`true`|-|
|tileSelector|-|Setup tileSelector or not|`true`|-|
|popupMaxHeight|-|Max height of a popup|`true`|-|
|fitBounds|-|Setup fit bound option or not.|`true`|-|

<!-- @vuese:map-component:props:end -->


## Slots

<!-- @vuese:map-component:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:map-component:slots:end -->


## Methods

<!-- @vuese:map-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|initMap|Method to initialise leaflet map container|-|
|initTileLayer|method to initialise tile layer. This layer is added to the previously defined map container|-|
|changeTileLayer|Method used to change base tile layer|String - name of the layer to be set|
|initMarkers|Method to initialise markers. At initialisation there is no marker. Observation and dataset attribute are defined to allow specific visualisation for each attibute ------------------------- For the moment only observations visualisation is allowed. Later toogleLayer method would allow to switch between dataset and observation visualisation|-|
|initDrawnItems|Method to initialise draw query items.|-|
|addLocationGeoJson|Method to add locations to the markers property using geojson object If a layer already exist, the geojson object is add to the layer, else the layer is istanciated with the geojson object. Click event are binded to each location.|{string} layerTitle the title of the layer in which the location is imported {object} a geojson object representing the location|
|markerClickHandler|Click event handler that trigger popup content loading. This action is defined in Vuex popupModule store.|-|
|refreshMapWithMarkers|/** * Method to toggle a layer on the map. For example, to toggle observation layer to show only printed observation location on the map * ------------------------------ * Not used for the moment since only observations are displayed */ toggleLayer(layerTitle) { if (this.map.hasLayer(this.markers[layerTitle])) { this.map.removeLayer(this.markers[layerTitle]); } else { this.map.addLayer(this.markers[layerTitle]); } }, Method to update the map with markers of mapItems array. This array is defined in Vuex observations store and corresponds to the map items that are resulting the query performed.|-|
|printMarkers|Method to print markers on the map -------------------------------- only the "observation" layer is printed to the map but the method can handle different layers (ex: dataset layer, site layer...)|-|
|zoomInObs|Method to zoom on a marker selected by its id.|-|

<!-- @vuese:map-component:methods:end -->


## Data

<!-- @vuese:map-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|map|`Null`|The leaflet map|-|
|markers|`Null`|The markers to be displayed on the map|-|
|tileLayer|`Null`|The tile layers to be added in the map (eg: mapbox, openstreet map, ...)|-|
|layers|`Array`|Array containing the geojson object to be displayed as marker on the map|-|
|drawnItems|`Null`|object to store editable layer used to define spatial extent queries|-|

<!-- @vuese:map-component:data:end -->


## Watch

<!-- @vuese:map-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|getMapItems|Watch getMapItems - Each time the map items are updated the map is refreshed|-|

<!-- @vuese:map-component:watch:end -->


