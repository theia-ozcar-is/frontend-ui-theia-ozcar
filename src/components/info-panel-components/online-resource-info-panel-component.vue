<template>
	<div class="ui segment">
	<div class="ui top attached label">
      <i class="cloud icon"></i> Online resources:
    </div>
	 <ul>
		<li v-if="onlineResource.urlDownload != null"><a :href="getI18n(onlineResource.urlDownload,'en')" target="_blank">Download this dataset from producer dataportal</a></li>
		<li v-if="onlineResource.urlInfo != null"><a :href="getI18n(onlineResource.urlInfo,'en')" target="_blank">Producer dataportal (all datasets)</a></li>
		<li v-if="onlineResource.doi">DOI : <a :href="'http://dx.doi.org/' + onlineResource.doi" target="_blank">{{onlineResource.doi}}</a></li>
	</ul>
		<div v-if="onlineResource.webservices != null" class="ui segment">
			<div class="ui top left attached label">Webservices:</div>
			<div v-for="(webservice, index) in onlineResource.webservices" :key="index">
				<div class="ui segment">
					<div>Description : {{getI18n(webservice.description,"en")}}</div>
					<div><a :href="getI18n (webservice.url,'en')" target="_blank">Use this webservice</a></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/**
 * @vuese
 * Display the observation online resources
 * @group Info panel components
 */
export default {
	name:"online-resource-info-panel-component",
  props:{
	  onlineResource:{
		  //Online resource object
		  type:Object,
		  required:true
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
    }
  }
};
</script>

<style>
</style>
