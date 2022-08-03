<template>
  <div>
    <div
      v-if="
        observation.procedure != null &&
        observation.procedure.dataProduction != null &&
        observation.procedure.dataProduction.sensors != null
      "
    >
      <div class="ui accordion sensors">
        <div class="title">
          <i class="dropdown icon"></i>
          <i class="cog icon"></i>
          Sensors:
        </div>

        <div class="content">
          <div
            v-for="(sensor, index) in observation.procedure.dataProduction
              .sensors"
            :key="index"
          >
            <div>
              <div v-if="sensor.model != null">
                <b>Model : </b>{{ sensor.model }}
              </div>
              <div v-if="sensor.name"><b>Name : </b>{{ sensor.name }}</div>
              <div v-if="sensor.manufacturer != null">
                <b>Manufacturer : </b>{{ sensor.manufacturer }}
              </div>
              <div v-if="sensor.serialNumber != null">
                <b>Serial number : </b>{{ sensor.serialNumber }}
              </div>
              <div v-if="sensor.sensorType != null">
                <b>Sensor type : </b>{{ getI18n(sensor.sensorType, "en") }}
              </div>
              <div v-if="sensor.documents != null">
                <div
                  v-for="(document, index2) in sensor.documents"
                  :key="index2"
                >
                  <div>
                    {{ document.type }} -
                    <a :href="getI18n(document, 'en')" target="_blank"></a>
                  </div>
                </div>
              </div>
              <div v-if="sensor.calibration != null">
                <b>Calibration : </b>{{ getI18n(sensor.calibration, "en") }}
              </div>
              <div v-if="sensor.activityPeriods != null">
                <div
                  v-for="(activityPeriod, index5) in sensor.activityPeriods"
                  :key="index5"
                >
                  <div>
                    <b>From</b> {{ activityPeriod.dateBeg }} <b>to</b>
                    {{ activityPeriod.dateEnd }}
                  </div>
                </div>
              </div>
              <div v-if="sensor.parametrisationDescription != null">
                <b>Parametrisation description :</b>
                {{ getI18n(sensor.parametrisationDescription, "en") }}
              </div>
              <div
                v-if="
                  index <
                  observation.procedure.dataProduction.sensors.length - 1
                "
                class="ui divider"
              ></div>
            </div>
          </div>
          <div v-if="observation.procedure.dataProduction.method">
            <div class="ui divider"></div>
            <b>Method : </b
            >{{ getI18n(observation.procedure.dataProduction.method, "en") }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="ui accordion lineage"
      v-if="
        observation.procedure != null &&
        observation.procedure.lineageInformations != null
      "
    >
      <div class="title">
        <i class="dropdown icon"></i>
        <i class="folder open outline icon"></i>
        Lineage Informations:
      </div>
      <div class="content">
        {{ getI18n(observation.procedure.lineageInformations, "en") }}
      </div>
    </div>
  </div>
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
      required: true,
    },
  },
  mounted() {
    $(".ui.accordion.sensors").accordion();
    $(".ui.accordion.lineage").accordion();
  },
  updated() {
    $(".ui.accordion.sensors").accordion();
    $(".ui.accordion.lineage").accordion();
  },
  beforeUpdate() {
    // close accordion when the modal page is updated
    $(".ui.accordion.sensors").accordion('close',0);
    $(".ui.accordion.lineage").accordion('close',0); 
  },
  
  methods: {
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     * @group Info panel components
     */
    getI18n(el, lang) {
      let tmp = el.find((element) => element.lang === lang);
      return tmp.text;
    },
  },
};
</script>

