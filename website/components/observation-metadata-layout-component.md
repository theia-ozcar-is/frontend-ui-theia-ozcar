# observation-metadata-layout-component

Item of the result list to be displayed in the result list component

## Props

<!-- @vuese:observation-metadata-layout-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|observation|-|Observation to be displayed in the component|`true`|-|

<!-- @vuese:observation-metadata-layout-component:props:end -->


## Events

<!-- @vuese:observation-metadata-layout-component:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|showObservationMetadata|-|-|
|meta-obs-clicked|Fired to zoom on the observation on the map.|-|

<!-- @vuese:observation-metadata-layout-component:events:end -->


## Methods

<!-- @vuese:observation-metadata-layout-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|modifyElementId|Modify id of the DOM element to be a string that can be parsed into JSON|-|
|getI18n|Getters|-|
|showDetails|Method to show the detail information about the observation|-|
|zoomInObs|Method to zoom in the observation on the map|-|

<!-- @vuese:observation-metadata-layout-component:methods:end -->


## Computed

<!-- @vuese:observation-metadata-layout-component:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|getLogoName|-|Build the relative path of the producer logo to be printed|No|
|getUniqueProducerName|-|Get unique producer names for the grouped observation (a producer can measure the same variable for a given location)|No|

<!-- @vuese:observation-metadata-layout-component:computed:end -->


## Watch

<!-- @vuese:observation-metadata-layout-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|getObservationsDetailed|When Vuex observation store getter getObservationsDetailed is modified "showObservationMetadata" event is emitted to the root component. This event is listened by info-panel-component.vue to print detailed observation information. ------------------------ Event bus - better use Vuex Store|-|

<!-- @vuese:observation-metadata-layout-component:watch:end -->


