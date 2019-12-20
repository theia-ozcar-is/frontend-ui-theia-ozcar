<template>
	<div id="menu-bar-placeholder">
		<a href="https://www.theia-land.fr/" target="_blank"><img src="assets/images/logo_theia.png" alt="logo_theia"></a>
		<a href="http://www.ozcar-ri.org/" target="_blank"><img src="assets/images/logo_ozcar.png" alt="logo_ozcar"></a>
		<b>BETA VERSION</b>
	</div>
</template>

<script>
export default {

}
</script>

<style>
#menu-bar-placeholder {
	height: 4rem;
	width: 100%;
	background-color:#ffebcd;
	border-bottom: solid;
	border-bottom-color: rgba(34,36,38,.15);
	line-height: 4rem;
}

#menu-bar-placeholder a img {
	height: 4rem;
	cursor: pointer;
	vertical-align: middle
}

#menu-bar-placeholder span {
	/* line-height: 4rem;
	text-align:center; */
}

</style>
