<template>
  <div class="ui segment">
    <div class="ui top attached label">
      <i class="balance scale icon"></i> Fundings :
    </div>
    <div class="funding list">
      <div v-for="(funding, name) in fundingTypes" :key="name">
        <div class="ui segment">
          <div class="ui top left attached label">{{name}}</div>
          <div class="ui list">
            <div class="item" v-for="(fund, index) in funding" :key="index">
              <span class="funding idScanR link" v-if="fund.idScanR">
                <a
                  :href="'https://scanr.enseignementsup-recherche.gouv.fr/structure/' +fund.idScanR"
                  target="_blank"
                >
                  <i class="blue info circle icon"></i>
                </a>
              </span>
              <span v-if="fund.country && name.replace(/\s.*/,'')!='French'">
                <i>{{getI18n(fund.country,"en")}} - </i>
              </span>
              <span v-if="fund.name">{{getI18n(fund.name,"en")}}</span>
              <span v-if="fund.acronym">
                <i>({{fund.acronym}})</i>
              </span>
            </div>
          </div>
          <div v-if="funding.name != null">{{getI18n(funding.name,"en")}}</div>
          <div v-if="funding.acronym != null">{{funding.acronym}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @vuese
 * Display the list of fundings
 * @group Info panel components
 */
export default {
  name: "producer-fundings-info-panel-component",
  props: {
    fundings: {
      //fundings list
      type: Array,
      required: true
    }
  },
  computed: {
    fundingTypes() {
      let type = {};
      this.fundings.forEach(element => {
        if (type[element.type]) {
          type[element.type].push(element);
        } else {
          type[element.type] = [element];
        }
      });
      return type;
    }
  },
  methods: {
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    },
    checkFrench(name) {
      return name.replace(/\s.*/,'')!='French'
    }

  }
};
</script>

<style>
.funding.list {
  max-height: 50rem;
  overflow: auto;
  text-align: left;
}

.funding.idScanR.link {
  float: right;
}
</style>
