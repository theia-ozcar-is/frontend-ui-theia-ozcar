# funding-node-component

Node of the fundings tree

## Props

<!-- @vuese:funding-node-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|-|Type of hte fundings|`true`|-|
|fundings|-|Array of funders + count. ex: {"name":"Avignon Université","count":267}|`true`|-|
|mutationName|Store mutation name to update the filters. ex "UPDATE_FILTERS_FUNDING_NAMES"|`String`|`true`|-|

<!-- @vuese:funding-node-component:props:end -->


## Methods

<!-- @vuese:funding-node-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|toggleFolding|toggle folding state of the node|-|

<!-- @vuese:funding-node-component:methods:end -->


## Computed

<!-- @vuese:funding-node-component:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|setCircleIcon|`String`|String - "plus" "minus" "outline". shape of the circle icon depending on the node state|No|

<!-- @vuese:funding-node-component:computed:end -->


## Watch

<!-- @vuese:funding-node-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|getFacetClassification|getFacetClassification store getter watcher. Used to fold or unfold node depending on funders selected|-|

<!-- @vuese:funding-node-component:watch:end -->


