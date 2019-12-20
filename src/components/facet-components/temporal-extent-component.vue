<template>
  <div id="temporal-extent-placeholder" class="ui segment">
    <div class="ui top attached label">
      <i class="calendar alternate outline icon"></i> Temporal extent
    </div>
    <datepicker-component ref="firstDatepicker" :position="1" @interval-selected="addAselection"></datepicker-component>
    <div v-for="(index) in numberOfIntervals-1" :key="index">
      <b>OR</b>
      <datepicker-component :position="index+1" @interval-selected="addAselection"></datepicker-component>
    </div>
    <div class="temporal-extent-controls">
      <div>
        <button class="ui icon button" :disabled="numberOfIntervals <= 1" @click="removeInterval">
          <i class="minus icon"></i>
        </button>
        <button
          class="ui icon button"
          :disabled="numberOfIntervals !== intervals.length"
          @click="addInterval"
        >
          <i class="plus icon"></i>
        </button>
      </div>
      <!-- <div>
        <button class="ui button" @click="resetSelection">Reset</button>
        <button
          class="ui primary button"
          :disabled="intervals.length < 1"
          @click="submitSelection"
        >Submit</button>
      </div>-->
    </div>
  </div>
</template>

<script>
import datepickerComponent from "./datepicker-component.vue";
import { mapActions, mapGetters } from "vuex";

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
      /**
       * @vuese
       * List of temporal extent
       */
      intervals: [],
      /**
       * @vuese
       * Number of temporal extent form
       */
      numberOfIntervals: 1
    };
  },
  computed: {
    ...mapGetters(["getFilters", "isFiltersEmpty"])
  },
  methods: {
    ...mapActions([
      "setTemporalExtentFilter",
      "searchObservations",
      "resetObservations",
      "initFacets"
    ]),
    /**
     * @vuese
     * Add a temporal extent form
     */
    addInterval() {
      this.numberOfIntervals++;
    },
    /**
     * @vuese
     * Remove a tmeporal extent interval form
     */
    removeInterval() {
      if (this.numberOfIntervals > 1) {
        if (this.numberOfIntervals === this.intervals.length) {
          this.intervals = this.intervals.slice(0, this.intervals.length - 1);
        }
        this.numberOfIntervals--;
      }
      this.setTemporalExtentFilter(this.intervals);
    },
    /**
     * @vuese
     * Add a temporal extent to the query to be built
     * @arg one temporalextent definition and its position
     */
    addAselection(value) {
      function indexOfInterval(arr, position) {
        return arr.findIndex(function(element) {
          return element.position === position;
        });
      }

      let index = indexOfInterval(this.intervals, value.position);
      if (index !== -1) {
        // if (value.fromDate !== null && value.toDate !== null) {
          this.intervals[index] = value;
        // } else {
        //   this.intervals[index] = null;
        // }
      } else {
        // if (value.fromDate !== null && value.toDate !== null) {
          this.intervals.push(value);
        // } else {
        //   this.intervals[index] = null;
        // }
      }
      this.setTemporalExtentFilter(
        this.intervals.filter(function(el) {
          return el.toDate != null || el.fromDate != null;
        })
      );
    },
    /**
     * @vuese
     * Reset temporal extent component
     */
    resetSelection() {
      this.intervals = [];
      this.numberOfIntervals = 1;
      this.$refs.firstDatepicker.toDate = null;
      this.$refs.firstDatepicker.fromDate = null;
    }
  }
};
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
