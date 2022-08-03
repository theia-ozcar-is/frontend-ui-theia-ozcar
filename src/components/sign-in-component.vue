<template>
  <div>
    <div class="ui label signed out" v-if="getUserInfo == null"><i class="sign in icon" @click="signIn"></i><i class="user icon" @click="signIn"></i></div>
    <div v-else class="ui label signed in" ><i class="user icon"></i>{{getUserInfo.firstName}} {{getUserInfo.lastName}} <i class="sign out icon" @click="signOut"></i></div>
  </div>
</template>

<style>
#sign-in-placeholder {
  display: block;
  height: 50%;
}

#sign-in-placeholder > div.signed.out,
#sign-in-placeholder > div.signed.in > i.sign.out.icon{
  cursor: pointer;
}
</style>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "sign-in-component",
  data() {
    return {
      firstName: "",
      lastName: ""
    }
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions([
      "signIn",
      "loadUserProfile",
      "signOut"
    ])
  }
}

</script>