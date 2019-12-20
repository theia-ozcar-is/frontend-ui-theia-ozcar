# page-navigation-component

Component used to navigate between metadata layout pages

## Methods

<!-- @vuese:page-navigation-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|initPages|Initalise pages|-|
|updatePageSize|Method to update the numbner of item per page|-|
|selectPages|Method to navigate between pages|-|

<!-- @vuese:page-navigation-component:methods:end -->


## Computed

<!-- @vuese:page-navigation-component:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|filters|-|copy of getFilters|No|

<!-- @vuese:page-navigation-component:computed:end -->


## Data

<!-- @vuese:page-navigation-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|activePage|`Number`|The page active|1|
|activeButton|`Number`|The pagination button active|1|
|disabledButton|`Number`|the button disabled 1 = the second button 2 = the second and the sixth buttons 3 = the sixth button|3|
|pages|`Array`|the value in the pages buttons|-|

<!-- @vuese:page-navigation-component:data:end -->


## Watch

<!-- @vuese:page-navigation-component:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|getFilters|Watch getFilters -  reinit the pages and button when it changes|-|

<!-- @vuese:page-navigation-component:watch:end -->


