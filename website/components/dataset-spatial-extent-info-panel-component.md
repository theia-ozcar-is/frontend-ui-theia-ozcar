# dataset-spatial-extent-info-panel-component

Display the dataset statial extent using arrows

## Props

<!-- @vuese:dataset-spatial-extent-info-panel-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|spatialExtent|-|Sparial extent geojson object|`true`|-|

<!-- @vuese:dataset-spatial-extent-info-panel-component:props:end -->


## Methods

<!-- @vuese:dataset-spatial-extent-info-panel-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getLocationCoordinates|Method to populate component data according to the geometry of the observation|-|

<!-- @vuese:dataset-spatial-extent-info-panel-component:methods:end -->


## Data

<!-- @vuese:dataset-spatial-extent-info-panel-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|isPoint|`Boolean`|Boolean - wether the spatialExtent geometry is a point|false|
|minLong|`Null`|minimum longitude|-|
|maxLong|`Null`|maximum longitude|-|
|minLat|`Null`|minimum latitude|-|
|maxLat|`Null`|maximum latitude|-|
|minAlt|`Null`|minimum altitude|-|
|maxAlt|`Null`|maximum laltitude|-|

<!-- @vuese:dataset-spatial-extent-info-panel-component:data:end -->


## Watch

<!-- @vuese:dataset-spatial-extent-info-panel-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|spatialExtent|SpatialExtent watcher - trigger getLocationCoordinates|-|

<!-- @vuese:dataset-spatial-extent-info-panel-component:watch:end -->


