<template>
<div class="tile-layers-selector-container">
    <select name="tile-layer" id="tile-layer" class="ui dropdown" :value="layer" @input="updateTileLayer($event.target.value)">
        <option disabled value>Select a base layer</option>
        <option value="OpenTopoMap">OpenTopoMap</option>
        <option value="OpenStreetMap.Mapnik">OpenStreetMap.Mapnik</option>
        <option value="Esri.WorldImagery">Esri.WorldImagery</option>
        <option value="Esri.WorldTopoMap">Esri.WorldTopoMap</option>
        <option value="GeoportailFrance.orthos">GeoportailFrance.orthos</option>
        <option value="GeoportailFrance.ignMaps">GeoportailFrance.ignMaps</option>
        <option value="Mapbox.Satellite">Mapbox.Satellite</option>
    </select>
</div>
</template>

<script>
/**
 * @vuese
 * Tile layer selector component
 * @group map components
 */
export default {
  name: "tile-layers-selection-component",
    data() {
        return {
            /**
             * @vuese
             * String value of the layer
             */
            layer: null
        };
    },
    methods: {
        /**
         * @vuese
         * Change the Tile layer
         */
        updateTileLayer(value) {
            this.layer = value;
            //Fired for the parent map component to change the tile layer
            this.$emit("changeTile", this.layer);
        }
    }
};
</script>

<style>
.tile-layers-selector-container {
    position: absolute;
    right: 20px;
    top: 1.5rem;
    z-index: 1000;
}
</style>
