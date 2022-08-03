<template>
	<div class="ui segment">
		<div class="ui top attached label">
			<i class="calendar check outline icon"></i> Temporal extent :</div>
		<div><b>From </b>{{temporalExtent.dateBeg.replace(/T.*/,'')}}<b> to </b>{{temporalExtent.dateEnd.replace(/T.*/,'')}} </div>
	</div>
</template>

<script>
/**
 * @vuese
 * Display the dataset temopral extent
 * @group Info panel components
 */
export default {
	name:"dataset-temporal-extent-info-panel-component",
	props:{
		temporalExtent:{
			type:Object,
			required:true
		}
	}
}
</script>

<style>

</style>
