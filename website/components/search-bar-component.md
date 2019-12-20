# search-bar-component

Component used to make full text search

## Methods

<!-- @vuese:search-bar-component:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|addWorld|Method triggered a word searched. The word is printed to the ui, the filters are updated with the new word and new observations are queried using the updated filters|-|
|deleteWord|Method triggered when the word searched is deleted by the user. The word is deleted from the UI, the filters are updated and observations are queried using the new filters|event|

<!-- @vuese:search-bar-component:methods:end -->


## Data

<!-- @vuese:search-bar-component:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|query|`String`|The query string in the search bar|-|
|words|`Array`|The array of word that need ot be queried|-|

<!-- @vuese:search-bar-component:data:end -->


