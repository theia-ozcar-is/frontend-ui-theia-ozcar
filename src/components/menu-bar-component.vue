<template>
	<div id="menu-bar-placeholder">
    <sign-in-component v-if="signActivated" id="sign-in-placeholder"></sign-in-component>
    <div>
		<a href="https://www.theia-land.fr/" target="_blank"><img src="../asset/images/logo_theia.png" alt="logo_theia"></a>
		<a href="http://www.ozcar-ri.org/" target="_blank"><img src="../asset/images/logo_ozcar.png" alt="logo_ozcar"></a>
		<a href="https://www.data-terra.org/en/" target="_blank"><img src="../asset/images/logo_dataterra.png" alt="logo_dataterra"></a>
      <b>BETA RELEASE</b>  - <i>Data are not yet downloadable from this interface. Links toward data producer information systems are provided.</i>
    </div>
	</div>
</template>

<script>
import {initOptions} from "../config/keycloak.js";
import signInComponent from "./sign-in-component.vue";
export default {
    computed: {
      signActivated() {
        return initOptions.clientId !== "theia-in-situ-front-prod" ? true : false;
      }
    },
    components: {
      signInComponent
    }
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

#sign-in-placeholder {
  float: right;
  margin-right: 1rem;
}

</style>
