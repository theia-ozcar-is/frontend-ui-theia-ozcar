<template>
    <transition name="fade">
      <div id="measurement-list-placeholder" :class="!isItemListFolded ? 'active' : ''">
        <!-- <span
          id="measurement-list-placeholder-state-selector"
          @click="changePanelState()"
        >
          <b v-if="!isItemListFolded">Hide list</b>
          <b v-else>Show list</b>
          <i
            :class="['big', 'angle', 'double', active ? 'down' : 'up', 'icon']"
          ></i>
        </span> -->
        <div id="measurement-list-container">
          <div
            :class="['ui', 'inverted', { active: getPagesLoading }, 'dimmer']"
          >
            <div class="ui loader"></div>
          </div>
          <div
            class="ui floating dropdown labeled icon button list-controls"
            id="list-item-filter-dropdown"
          >
            <i class="filter icon"></i>
            <span class="text"></span>
            <!-- <div class="menu">
            <div class="item" data-value="observation">Measurement</div>
            <div class="item" data-value="dataset">Dataset</div>
            <div class="item" data-value="producer">Producer</div>
          </div>-->
          </div>
          <page-navigation-component
            class="list-controls"
          ></page-navigation-component>

          <div v-if="getItemListNature == 'observation'" id="observation-list">
            <div
              v-for="(obs, index) in getObservationListItems"
              v-bind:key="index"
            >
              <observation-metadata-layout-component
                :observation="obs"
                class="ui message content"
              ></observation-metadata-layout-component>
            </div>
          </div>
          <div v-if="getItemListNature == 'producer'" id="producer-list">
            <div
              v-for="(producer, index) in getProducerListItems"
              v-bind:key="index"
            >
              <producer-metadata-layout-component
                :producer="producer"
                class="ui message content"
              ></producer-metadata-layout-component>
            </div>
          </div>
          <div v-if="getItemListNature == 'dataset'" id="dataset-list">
            <div
              v-for="(dataset, index) in getDatasetListItems"
              v-bind:key="index"
            >
              <dataset-metadata-layout-component
                :dataset="dataset"
                class="ui message content"
              ></dataset-metadata-layout-component>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ObservationMetadataLayoutComponent from "./observation-metadata-layout-component.vue";
import ProducerMetadataLayoutComponent from "./producer-metadata-layout-component.vue";
import DatasetMetadataLayoutComponent from "./dataset-metadata-layout-component.vue";
import PageNavigationComponent from "./page-navigation-component.vue";

/**
 * @vuese
 * This component create sub-component to print lite information about observation queried. Those observations
 * are paginated by the backend. Page controlling is managed by the pageNavigationComponent
 * @group Result list component
 */
export default {
  name: "metadata-component",
  components: {
    ObservationMetadataLayoutComponent,
    ProducerMetadataLayoutComponent,
    DatasetMetadataLayoutComponent,
    PageNavigationComponent,
  },
  // data() {
  //   return {
  //     /**
  //      * @vuese
  //      * Hide or show the result list
  //      */
  //     active: false,
  //   };
  // },
  computed: {
    ...mapGetters([
      "getObservationListItems",
      "getProducerListItems",
      "getDatasetListItems",
      "getTotalObservationsCount",
      "getPagesLoading",
      "getFilters",
      "getItemListNature",
      "isItemListFolded"
    ]),
  },
  methods: {
    ...mapActions(["setItemListNature"]),
    // /**
    //  * @vuese
    //  * Toggle result list visibility
    //  */
    // changePanelState() {
    //   this.active = !this.active;
    // },
    initDropdown() {
      $("#list-item-filter-dropdown").dropdown({
        onChange: (value) => {
          if (value != this.getItemListNature && value != "") {
            this.setItemListNature(value);
          }
        },
        values: [
          {
            name: "Measurement",
            value: "observation",
            selected: true,
          },
          {
            name: "Dataset",
            value: "dataset",
          },
          {
            name: "Producer",
            value: "producer",
          },
        ],
      });
    },
  },
  created() {
    /**
     * "meta-obs-clicked" event listener. The measurement list panel state is closed when this event is fired.
     */
    this.$root.$on("meta-obs-clicked", () => {
      this.active = false;
    });
    /**
     * "observation-searched" event listener. The value of dropdown set to "observation"
     */
    this.$root.$on("observation-queried", () => {
      this.initDropdown();
    });
  },
  mounted() {
    this.initDropdown();
  },
};
</script>

<style>
.list-controls {
  display: inline-block;
}

#measurement-list-placeholder.fade-enter-active,
#measurement-list-placeholder.fade-leave-active {
  transition: all 0.7s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#measurement-list-placeholder {
  bottom: 0;
  left: 25%;
  right: 0;
  width: 75%;
  height: 100%;
  padding: 0px 5px 0px 5px;
  background-color: #ffebcd;
  transition: transform 0.4s ease-in-out;
  transform: translateX(-100%);
  z-index: 998;
  padding-top: 0.5rem;
  position: relative;
  border-top: 2px solid rgba(34, 36, 38, 0.25);
  border-right: 2px solid rgba(34, 36, 38, 0.25);
  border-left: 2px solid rgba(34, 36, 38, 0.25);
}

#measurement-list-placeholder-state-selector {
  cursor: pointer;
  display: block;
  text-align: center;
}

#measurement-list-placeholder.active {
  transform: translateX(0);
}

#measurement-list-container {
  height: 100%;
}

#observation-list,
#producer-list,
#dataset-list {
  /* position: relative; */
  height: calc(100% - 10rem);
  overflow: auto;
  margin-top: 1rem;
}
</style>
