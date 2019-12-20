# variable-component

 Component to build query using Theia variables of Theia categories

## Methods

<!-- @vuese:variable-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onChange|Show autocompletion proposition|-|
|filterResults|Filter prefLabelList using search input into a list of theiaVariable to be printed in the autocompletion block|-|
|setResult|Add a Theia variable to the query filter.|TheiaVariable selected|
|deleteVariable|Remove a Theia variable to the query filter|-|
|onArrowDown|Change arrow selector position|-|
|onArrowUp|Change arrow selector position|-|
|onEnter|Select a Theia variable|-|
|handleClickOutside|Hide autocompletion block on click oustide block|-|
|getI18n|Getter to get the value according the the internationalisation|-|

<!-- @vuese:variable-component:methods:end -->


## Computed

<!-- @vuese:variable-component:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|prefLabelList|`Array`|List of Theia variable that could be printed in the autocompletion block|No|

<!-- @vuese:variable-component:computed:end -->


## Data

<!-- @vuese:variable-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|search|`String`|String -search input|-|
|isVisible|`Boolean`|boolean - whether the autocompletion block is visible|false|
|results|`Array`|List of Theia variable to be printed in the autocompletion block|-|
|variablesSelected|`Array`|List of theia variable selected|-|
|componentKey|`Number`|Number key used to force rerender of Category node component|0|

<!-- @vuese:variable-component:data:end -->


