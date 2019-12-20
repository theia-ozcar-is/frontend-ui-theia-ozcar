# temporal-extent-component

Component used to build query filter using temporal extents

## Methods

<!-- @vuese:temporal-extent-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|addInterval|Add a temporal extent form|-|
|removeInterval|Remove a tmeporal extent interval form|-|
|addAselection|Add a temporal extent to the query to be built|one temporalextent definition and its position|
|resetSelection|Delete all defined temporalExtent and recalculate the facet without temporal extent 1 - Update the query filter with the temporalExtent (async) 2 - after 1, if the filter are emtpy reinit facets otherwise query the database|-|
|submitSelection|Submit the temporalExtent defined 1 - Update the query filter with the temporalExtent (async) 2 - after 1, query the database witht he newly defined filters|-|

<!-- @vuese:temporal-extent-component:methods:end -->


## Data

<!-- @vuese:temporal-extent-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|intervals|`Array`|List of temporal extent|-|
|numberOfIntervals|`Number`|Number of temporal extent form|1|

<!-- @vuese:temporal-extent-component:data:end -->


