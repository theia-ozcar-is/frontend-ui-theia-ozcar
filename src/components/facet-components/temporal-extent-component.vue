<template>
  <div id="temporal-extent-placeholder" class="ui segment">
    <div class="ui top attached label">
      <i class="calendar alternate outline icon"></i> Temporal extent
    </div>
    <div v-for="(index) in numberOfIntervals" :key="index">
      <datepicker-component :ref="'datepickerPosition'+index" :position="index"
                            :fromDate="getFilters.temporalExtents.length > index-1 && getFilters.temporalExtents[index-1].fromDate ? getFilters.temporalExtents[index-1].fromDate : null"
                            :toDate="getFilters.temporalExtents.length > index-1 &&  getFilters.temporalExtents[index-1].toDate ? getFilters.temporalExtents[index-1].toDate : null"
                            :id="'datepicker-position-'+index"
                            @interval-selected="applyATemporalExtent">
      </datepicker-component>
      <b v-show="index < numberOfIntervals">OR</b>
    </div>
    <div class="temporal-extent-controls">
      <div>
        <button class="ui icon button" :disabled="numberOfIntervals <= 1" @click="removeInterval">
          <i class="minus icon"></i>
        </button>
        <button
            class="ui icon button"
            :disabled="getFilters.temporalExtents.length  < numberOfIntervals"
            @click="addInterval"
        >
          <i class="plus icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import datepickerComponent from "./datepicker-component.vue";
import {mapActions, mapGetters} from "vuex";

/**
 * @vuese
 * Component used to build query filter using temporal extents
 * @group Facet components
 */
export default {
  name: "temporal-extent-component",
  components: {
    datepickerComponent
  },
  data() {
    return {
      numberOfIntervals: 1
    };
  },
  computed: {
    ...mapGetters(["getFilters", "getFacetClassification"])
  },
  methods: {
    ...mapActions([
      "setTemporalExtentFilter",
      "resetObservations",
      "initFacets"
    ]),
    /**
     * @vuese
     * Add a temporal extent form
     */
    addInterval() {
      if (this.getFilters.temporalExtents.length == this.numberOfIntervals) {
        this.numberOfIntervals++;
      }
    },
    /**
     * @vuese
     * Remove a tmeporal extent interval form
     */
    removeInterval() {
      let tmp = this.getFilters.temporalExtents;
      if (this.numberOfIntervals > 1) {
        if (this.numberOfIntervals === tmp.length) {
          tmp = tmp.slice(0, tmp.length - 1);
        }
        this.numberOfIntervals--;
      }
      this.setTemporalExtentFilter({temporalExtents: tmp});
    },
    /**
     * @vuese
     * Add a temporal extent to the filter of the store query the backend with the new filter. TemporalExtent with
     * arguments fromDate and toDate equal to null are not added to the filters
     * @arg one temporalextent definition and its position
     */
    applyATemporalExtent(value) {
      function indexOfInterval(arr, position) {
        return arr.findIndex(function (element) {
          return element.position === position;
        });
      }

      let index = indexOfInterval(this.getFilters.temporalExtents, value.position);
      let tmp = this.getFilters.temporalExtents;
      if (index !== -1) {
        tmp[index] = value;
      } else {
        tmp.push(value);
      }
      this.setTemporalExtentFilter(
          {
            temporalExtents: tmp.filter(function (el) {
              return el.toDate != null || el.fromDate != null;
            })
          }
      );
    },
    /**
     * @vuese
     * Reset temporal extent component
     */
    resetSelection() {
      this.numberOfIntervals = 1;
      this.$refs.datepickerPosition1.toDate = null;
      this.$refs.datepickerPosition1.fromDate = null;
    },

    /**
     * This methods update the position of the temporal extent fitlers in the store
     * (If the first temporal extent is removed, the first element of the array of temporal extent filter in the store
     * will have a position equal to 2. This method is used to correct this position.
    **/
    alignTemporalExtentsPositionInFilter() {
      let temporalExtents = [];
      for (let i = 0 ; i < this.getFilters.temporalExtents.length ; i++) {
        let tmp = this.getFilters.temporalExtents[i];
        tmp.position = i +1;
        temporalExtents.push(tmp);
      }
      this.setTemporalExtentFilter({searchObservations: false, temporalExtents})
    }
  },
  watch: {
    /**
     * @vuese
     * watch isFolded
     */
    getFacetClassification: {
      handler() {
        if (this.getFilters.temporalExtents.length === 0) {
          this.numberOfIntervals = 1
        } else {
          this.numberOfIntervals = this.getFilters.temporalExtents.length
          this.alignTemporalExtentsPositionInFilter()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$root.$on("delete-datepicker", id => {
      // let position = null;
      // this.$refs[id][0].fromDate = null;
      // this.$refs[id][0].toDate = null;
      let position = this.$refs[id][0].position;
      this.applyATemporalExtent({fromDate: null, toDate: null, position: position})
      //this.alignDatepickerComponentsWithFilters()
    })
  }
}
;
</script>

<style>
#temporal-extent-placeholder .temporal-extent-controls {
  display: flex;
  justify-content: space-around;
}

#temporal-extent-placeholder div b {
  text-align: center;
  display: block;
}
</style>
