# observation-location-info-panel-component

Display the observation samplign location

## Props

<!-- @vuese:observation-location-info-panel-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|featureOfInterest|-|featureOfInterest Object|`true`|-|

<!-- @vuese:observation-location-info-panel-component:props:end -->


## Methods

<!-- @vuese:observation-location-info-panel-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getI18n|Getter to get the value according the the internationalisation|-|
|getLocationCoordinates|Method to populate component data according to the geometry of the observation|-|

<!-- @vuese:observation-location-info-panel-component:methods:end -->


## Data

<!-- @vuese:observation-location-info-panel-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|isPoint|`Boolean`|Boolean - wether the spatialExtent geometry is a point|false|
|minLong|`Null`|minimum longitude|-|
|maxLong|`Null`|maximum longitude|-|
|minLat|`Null`|minimum latitude|-|
|maxLat|`Null`|maximum latitude|-|
|minAlt|`Null`|minimum altitude|-|
|maxAlt|`Null`|maximum laltitude|-|

<!-- @vuese:observation-location-info-panel-component:data:end -->


## Watch

<!-- @vuese:observation-location-info-panel-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|featureOfInterest|Watch featureOfInterest to get the sampling feature coordinates|-|

<!-- @vuese:observation-location-info-panel-component:watch:end -->


