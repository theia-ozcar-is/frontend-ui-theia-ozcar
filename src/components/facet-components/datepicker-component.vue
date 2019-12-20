<template>
  <div>
    <div class="datepicker-placeholder">
      <!-- <div id="datepicker-from">From :</div> -->
      <div class="datepicker-input">
        <datepicker
          placeholder="From"
          :not-after="toDate"
          lang="en"
          v-model="fromDate"
          @change="selectDate"
        ></datepicker>
      </div>
    </div>
    <div class="datepicker-placeholder">
      <!-- <div id="datepicker-to">To :</div> -->
      <div class="datepicker-input">
        <datepicker
          placeholder="To"
          :not-before="fromDate"
          lang="en"
          v-model="toDate"
          @change="selectDate"
        ></datepicker>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue2-datepicker";

/**
 * @vuese
 * Temporal extent query builder component
 * @group Facet components
 */
export default {
  name:"datepicker-component",
  components: {
    Datepicker
  },
  data() {
    return {
     /**
     * @vuese
     * String - the date to begin research
     */
      fromDate: null,
           /**
     * @vuese
     * String - the date to end research
     */
      toDate: null
    };
  },
  props: {
    position: {
      //Position of the datepicker form
      required:true,
      type:Number
    }
  },
  methods: {
    /**
     * @vuese
     * Select a time interval to query observation.
     */
    selectDate() {
      // if (this.fromDate != null && this.toDate != null) {
        //Fired when a time interval selected to query observations
        this.$emit("interval-selected", {
          position: this.position,
          fromDate: this.fromDate,
          toDate: this.toDate
        });
      // }
    }
  }
};
</script>

<style>

#datepicker-from,
#datepicker-to {
  display: inline;
  vertical-align: middle;
}

.vdp-datepicker__calendar {
  z-index: 999;
}

.datepicker-placeholder {
  height: 40px;
  line-height: 40px;
  /* text-align: center; */
}
.datepicker-input input,
.datepicker-input select {
  padding: 0.75em 0.5em;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 100%;
}
.mx-datepicker {
  width: 100%
}
</style>
