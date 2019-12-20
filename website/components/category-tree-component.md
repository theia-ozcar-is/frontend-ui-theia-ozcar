# category-tree-component

Component representing node of the facet category tree

## Props

<!-- @vuese:category-tree-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|node|-|The node to be represented by the component instance. Can eathier represent a Theia Variable or a Theia Category|`true`|-|

<!-- @vuese:category-tree-component:props:end -->


## Events

<!-- @vuese:category-tree-component:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|select-a-theia-variable|-|-|

<!-- @vuese:category-tree-component:events:end -->


## Methods

<!-- @vuese:category-tree-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getI18n|Getter to get the value according the the internationalisation|-|
|toggleFolding|Toggle folding of the node|-|
|selectNode|Select a category node|-|
|selectTheiaVariable|Select a Theia variable - in case the node represent a Theia variable|-|

<!-- @vuese:category-tree-component:methods:end -->


## Computed

<!-- @vuese:category-tree-component:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|isSelected|`Boolean`|true if the node has been selected by user|No|
|setCircleIcon|`String`|"plus" "minus" "outline". shape of the circle icon depending on the node state|No|

<!-- @vuese:category-tree-component:computed:end -->


## Data

<!-- @vuese:category-tree-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|isFolded|`Boolean`|boolean - whether the node is folded|true|

<!-- @vuese:category-tree-component:data:end -->


## Watch

<!-- @vuese:category-tree-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|getFacetClassification|watch isFolded|-|

<!-- @vuese:category-tree-component:watch:end -->


