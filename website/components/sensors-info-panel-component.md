# sensors-info-panel-component

Display the senors

## Props

<!-- @vuese:sensors-info-panel-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|observationsDetail|-|Observation detailed document from "observations" collection|`true`|-|

<!-- @vuese:sensors-info-panel-component:props:end -->


## Methods

<!-- @vuese:sensors-info-panel-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getI18n|Getter to get the value according the the internationalisation|-|
|changeTab|Change the tab active|-|

<!-- @vuese:sensors-info-panel-component:methods:end -->


## Computed

<!-- @vuese:sensors-info-panel-component:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|observationsSensors|`Array`|The list of sensors for each observation presented in the info panel|No|

<!-- @vuese:sensors-info-panel-component:computed:end -->


## Data

<!-- @vuese:sensors-info-panel-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|tabActive|`Number`|the number of the active tab|0|

<!-- @vuese:sensors-info-panel-component:data:end -->


## Watch

<!-- @vuese:sensors-info-panel-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|observationsDetail|Watch observationsDetail|-|

<!-- @vuese:sensors-info-panel-component:watch:end -->


