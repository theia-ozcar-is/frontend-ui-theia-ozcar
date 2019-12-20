

<template>
		<button :class="customClass" @click="toggleLayer($event)">
			<slot></slot>
		</button>
</template>

<script>
// import { mapGetters } from "vuex";

// export default {
//   data() {
//     return {
//       isActive: true,
//       customClass: "ui button active"
//     };
//   },
//   computed: {
//     ...mapGetters(["getObservationsCount"])
//   },
//   methods: {
//     toggleLayer(event) {
//       if (this.getObservationsCount !== 0) {
//         const layer = event.currentTarget.id;
//         this.$emit("toggleLayer", layer);
//         this.isActive = !this.isActive;
//         if (this.isActive) {
//           this.customClass = "ui button active";
//         } else {
//           this.customClass = "ui button";
//         }
//       }
//     }
//   }
// };
</script>


