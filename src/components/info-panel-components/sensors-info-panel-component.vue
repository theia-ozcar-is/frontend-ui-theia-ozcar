<template>
  <div
    class="ui segment"
    v-if="observation.procedure != null && observation.procedure.dataProduction != null && observation.procedure.dataProduction.sensors != null"
  >
    <div class="ui top attached label">
      <i class="cog icon"></i>Sensors:
    </div>

    <div v-for="(sensor, index) in observation.procedure.dataProduction.sensors" :key="index">
      <div>
        <div v-if="sensor.model != null">Model : {{sensor.model}}</div>
        <div v-if="sensor.name">Name : {{sensor.name}}</div>
        <div v-if="sensor.manufacturer != null">Manufacturer : {{sensor.manufacturer}}</div>
        <div v-if="sensor.serialNumber != null">Serial number : {{sensor.serialNumber}}</div>
        <div v-if="sensor.sensorType != null">Sensor type : {{getI18n(sensor.sensorType, "en")}}</div>
        <div v-if="sensor.documents !=null">
          <div v-for="(document, index2) in sensor.documents" :key="index2">
            <div>
              {{document.type}} -
              <a :href="getI18n(document, 'en')" target="_blank"></a>
            </div>
          </div>
        </div>
        <div v-if="sensor.calibration != null">Calibration : {{getI18n(sensor.calibration,"en")}}</div>
        <div v-if="sensor.activityPeriods != null">
          <div v-for="(activityPeriod, index5) in sensor.activityPeriods" :key="index5">
            <div>From {{activityPeriod.dateBeg}} to {{activityPeriod.dateEnd}}</div>
          </div>
        </div>
        <div
          v-if="sensor.parametrisationDescription != null"
        >Parametrisation description : {{getI18n(sensor.parametrisationDescription, "en")}}</div>
      </div>
      <div v-if="index> 0" class="ui divider"></div>
    </div>
  </div>
  <!-- <div class="ui top attached tabular menu">
      <div v-for="(obs, index) in observationsDetail" :key="index" @click="changeTab(index)">
        <div
          v-if="obs.observation.procedure != null && obs.observation.procedure.dataProduction != null && obs.observation.procedure.dataProduction.sensors != null"
          class="item"
          :class="tabActive == index ? 'active':''"
          :data-tab="index"
        >{{"Sensors - variable " + (index + 1)}}</div>
      </div>
  </div>-->
  <!-- <div class="ui top attached tabular menu">
      <a
        v-for="(obsSensor, index1) in observationsSensors"
        :key="index1"
        @click="changeTab(index1)"
        :data-tab="index1"
        :class="tabActive == index1 ? 'active item':'item'"
      >{{"Sensors - variable " + (obsSensor.index + 1)}}</a>
    </div>
    <div
      v-for="(obsSensor, index2) in observationsSensors"
      :key="index2"
      :data-tab="index2"
      class="ui bottom attached tab segment"
      :class="tabActive == index2 ? 'active':''"
    >
      <div v-for="(sensor, index3) in obsSensor.sensors" :key="index3">
        <div class="ui segment">
          <div v-if="sensor.model != null">Model : {{sensor.model}}</div>
          <div v-if="sensor.name">Name : {{sensor.name}}</div>
          <div v-if="sensor.manufacturer != null">Manufacturer : {{sensor.manufacturer}}</div>
          <div v-if="sensor.serialNumber != null">Serial number : {{sensor.serialNumber}}</div>
          <div v-if="sensor.sensorType != null">Sensor type : {{getI18n(sensor.sensorType, "en")}}</div>
          <div v-if="sensor.documents !=null">
            <div v-for="(document, index4) in sensor.documents" :key="index4">
              <div>
                {{document.type}} -
                <a :href="getI18n(document, 'en')" target="_blank"></a>
              </div>
            </div>
          </div>
          <div v-if="sensor.calibration != null">Calibration : {{getI18n(sensor.calibration,"en")}}</div>
          <div v-if="sensor.activityPeriods != null">
            <div v-for="(activityPeriod, index5) in sensor.activityPeriods" :key="index5">
              <div>From {{activityPeriod.dateBeg}} to {{activityPeriod.dateEnd}}</div>
            </div>
          </div>
          <div
            v-if="sensor.parametrisationDescription != null"
          >Parametrisation description : {{getI18n(sensor.parametrisationDescription, "en")}}</div>
        </div>
      </div>
    </div>
  </div>-->

  <!-- <div v-for="(obs, index) in observationsDetail" :key="index">
      <div
        class="ui bottom attached tabular segment"
        v-if="obs.observation.procedure != null && obs.observation.procedure.dataProduction != null && obs.observation.procedure.dataProduction.sensors != null"
        :class="tabActive == index ? 'active':''"
        :data-tab="index"
      >
        <div v-if="obs.observation.procedure.dataProduction != null">
          <div class="sensor-panel" v-if="obs.observation.procedure.dataProduction.sensors != null">
            <div
              v-for="(sensor, index) in obs.observation.procedure.dataProduction.sensors"
              :key="index"
            >
              <div class="ui segment">
                <div v-if="sensor.model != null">Model : {{sensor.model}}</div>
                <div v-if="sensor.name">Name : {{sensor.name}}</div>
                <div v-if="sensor.manufacturer != null">Manufacturer : {{sensor.manufacturer}}</div>
                <div v-if="sensor.serialNumber != null">Serial number : {{sensor.serialNumber}}</div>
                <div
                  v-if="sensor.sensorType != null"
                >Sensor type : {{getI18n(sensor.sensorType, "en")}}</div>
                <div v-if="sensor.documents !=null">
                  <div v-for="(document, index) in sensor.documents" :key="index">
                    <div>
                      {{document.type}} -
                      <a :href="getI18n(document, 'en')" target="_blank"></a>
                    </div>
                  </div>
                </div>
                <div
                  v-if="sensor.calibration != null"
                >Calibration : {{getI18n(sensor.calibration,"en")}}</div>
                <div v-if="sensor.activityPeriods != null">
                  <div v-for="(activityPeriod, index) in sensor.activityPeriods" :key="index">
                    <div>From {{activityPeriod.dateBeg}} to {{activityPeriod.dateEnd}}</div>
                  </div>
                </div>
                <div
                  v-if="sensor.parametrisationDescription != null"
                >Parametrisation description : {{getI18n(sensor.parametrisationDescription, "en")}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<style>
.sensor-panel {
  position: relative;
  max-height: 200px;
  overflow: auto;
}

.lineage-panel {
  position: relative;
  max-height: 200px;
  overflow: auto;
}
</style>

<script>
/**
 * @vuese
 * Display the senors
 * @group Info panel components
 */
export default {
  name: "sensors-info-panel-component",
  props: {
    observation: {
      //Observation detailed document from "observations" collection
      type: Object,
      required: true
    }
  },
  // data() {
  //   return {
  //     /**
  //      * @vuese
  //      * the number of the active tab
  //      */
  //     tabActive: 0
  //   };
  // },
  // watch: {
  //   /**
  //    * @vuese
  //    * Watch observationsDetail
  //    */
  //   observationsDetail() {
  //     this.tabActive = 0;
  //   }
  // },
  // computed: {
  //   /**
  //    * @vuese
  //    * The list of sensors for each observation presented in the info panel
  //    * @type Array
  //    */
  //   observationsSensors() {
  //     let observations = [];
  //     for (let i = 0; i < this.observationsDetail.length; i++) {
  //       if (
  //         this.observationsDetail[i].observation.procedure &&
  //         this.observationsDetail[i].observation.procedure.dataProduction &&
  //         this.observationsDetail[i].observation.procedure.dataProduction
  //           .sensors
  //       ) {
  //         observations.push({
  //           index: i,
  //           sensors: this.observationsDetail[i].observation.procedure
  //             .dataProduction.sensors
  //         });
  //       }
  //     }
  //     return observations;
  //   }
  // },
  methods: {
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     * @group Info panel components
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    }
  }
  //   /**
  //    * @vuese
  //    * Change the tab active
  //    */
  //   changeTab(index) {
  //     this.tabActive = index;
  //   }
  // },
  // updated() {},
  // mounted() {
  //   $(".menu .item").tab();
  // }
};
</script>

