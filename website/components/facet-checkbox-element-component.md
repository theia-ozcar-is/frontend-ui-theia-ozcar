# facet-checkbox-element-component

This component diplay a checkbox whith the filter name, and the count associated

## Props

<!-- @vuese:facet-checkbox-element-component:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|name|-|Name of the checkbox element|`true`|-|
|type|-|Type of the checkbox element -  for fundings facet|`false`|-|
|count|-|Count of the checkbox element|`true`|-|
|mutationName|-|Name of the mutation of the store to update filter|`true`|-|

<!-- @vuese:facet-checkbox-element-component:props:end -->


## Methods

<!-- @vuese:facet-checkbox-element-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|toggleCheckbox|Method triggered when a checkbox is checked. 1 - Update state of the vuex filter store - (async) 2 - when -1- promise is resolved search for new observations using the updated filters|-|
|isChecked|Method check the filters that the user previously checked|-|

<!-- @vuese:facet-checkbox-element-component:methods:end -->


