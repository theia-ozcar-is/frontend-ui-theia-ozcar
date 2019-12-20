<template>
	<div class="ui segment">
		<div class="ui top attached label">Online resources:</div>
		<div v-if="onlineResource.urlDownload != null">URL download : <a :href="getI18n(onlineResource.urlDownload,'en')" target="_blank">{{getI18n(onlineResource.urlDownload,"en")}}</a></div>
		<div v-if="onlineResource.urlInfo != null">URL info : <a :href="getI18n(onlineResource.urlInfo,'en')" target="_blank">{{getI18n(onlineResource.urlInfo,"en")}}</a></div>
		<div v-if="onlineResource.doi">DOI : <a :href="'http://dx.doi.org/' + onlineResource.doi" target="_blank">{{onlineResource.doi}}</a></div>
		<div v-if="onlineResource.webservices != null" class="ui segment">
			<div class="ui top left attached label">Webservices:</div>
			<div v-for="(webservice, index) in onlineResource.webservices" :key="index">
				<div class="ui segment">
					<div>Description : {{getI18n(webservice.description,"en")}}</div>
					<div>Url : <a :href="getI18n (webservice.url,'en')" target="_blank">{{getI18n (webservice.url,"en")}}</a></div>
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
