# funding-tree-component

 Tree of fundings facet component

## Props

<!-- @vuese:funding-tree-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|facetElements|-|The fundings facet element ex {"name":"Avignon Université","type":"Organisation","count":267}|`true`|-|
|mutationName|Store mutation name to update the filters. ex "UPDATE_FILTERS_FUNDING_NAMES"|`String`|`true`|-|

<!-- @vuese:funding-tree-component:props:end -->


## Methods

<!-- @vuese:funding-tree-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|populateFundingTypes|method used to instanciate funding-node-component for funding type and populate these component with the funding facet elements|-|

<!-- @vuese:funding-tree-component:methods:end -->


## Watch

<!-- @vuese:funding-tree-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|facetElements|Watch facetElements props - on change populateFundingsTypes|-|

<!-- @vuese:funding-tree-component:watch:end -->


