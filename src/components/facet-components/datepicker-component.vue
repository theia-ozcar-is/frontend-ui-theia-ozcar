<template>
  <div>
    <div class="datepicker-placeholder">
      <div class="datepicker-input">
        <datepicker
          placeholder="From"
          :disabled-date="notAfterDate"
          lang="en"
          v-model="fromDateUTC"
        ></datepicker>
      </div>
    </div>
    <div class="datepicker-placeholder">
      <div class="datepicker-input">
        <datepicker
          placeholder="To"
          :disabled-date="notBeforeDate"
          lang="en"
          v-model="toDateUTC"
        ></datepicker>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';

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
     // /**
     // * @vuese
     // * String - the date to begin research
     // */
     //  fromDate: null,
     //       /**
     // * @vuese
     // * String - the date to end research
     // */
     //  toDate: null
    };
  },
  props: {
    position: {
      //Position of the datepicker form
      required:true,
      type:Number
    },
    fromDate: null,
    toDate: null
  },
  computed: {
    /**
     * @vuese
     * String - the date to begin research
     */
    fromDateUTC: {
      get() {
        if (this.fromDate){
          const value = new Date(this.fromDate);
          const offset = value.getTimezoneOffset();
          return new Date(value.getTime() + offset * 60 * 1000);
        } else {
          return null
        }
      },
      set(val) {
        let fromDateTmp = null;
        if (val) {
          const offset = new Date().getTimezoneOffset();
          fromDateTmp = new Date(val.getTime() - offset * 60 * 1000)
        } else {
          fromDateTmp = null;
        }
        this.$emit("interval-selected", {
          position: this.position,
          fromDate: fromDateTmp,
          toDate: this.toDate
        });
      }
    },
    toDateUTC: {
      get() {
        if (this.toDate) {
          const value = new Date(this.toDate);
          const offset = value.getTimezoneOffset();
          return new Date(value.getTime() + offset * 60 * 1000);
        } else {
          return null
        }

      },
      set(val) {
        let toDateTmp = null;
        if (val) {
          const offset = new Date().getTimezoneOffset();
          toDateTmp = new Date(val.getTime() - offset * 60 * 1000)
        } else {
          toDateTmp = null;
        }
        this.$emit("interval-selected", {
          position: this.position,
          fromDate: this.fromDate,
          toDate: toDateTmp
        });
      }
    }
  },
  methods: {
    notBeforeDate(date) {
      if (this.fromDateUTC) {
        return date <= this.fromDateUTC
      } else {
        return false
      }
    },
    notAfterDate( date) {
      if (this.toDateUTC) {
        return date >= this.toDateUTC
      } else {
        return false
      }
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
