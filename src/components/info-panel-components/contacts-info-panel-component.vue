<template>
  <div id="contact-placeholder" class="ui segment">
    <div class="ui top attached label">
      <i class="users icon"></i> Contacts :
    </div>
    <div class="contact list">
      <div v-for="(role, name) in contactRoles" :key="name">
        <div class="ui segment">
          <div class="ui top left attached label">{{name}}</div>
          <div class="ui list">
            <div v-for="(contact, index) in role" :key="index" class="item">
              <!-- FOR ORGANISATION CONTACT -->
              <div v-if="contact.name">
                <span class="funding idScanR link" v-if="contact.idScanR">
                  <a
                    :href="'https://scanr.enseignementsup-recherche.gouv.fr/structure/' +contact.idScanR"
                    target="_blank"
                  >
                    <i class="blue info circle icon"></i>
                  </a>
                </span>
                <span v-if="contact.name">{{getI18n(contact.name,"en")}}</span>
                <span v-if="contact.acronym">
                  <i>({{contact.acronym}})</i>
                </span>
                <span v-if="contact.country">
                  <i>- {{getI18n(contact.country,"en")}}</i>
                </span>
              </div>
              <!-- FOR PERSON CONTACT -->
              <div>
                <div v-if="contact.orcId != null">
                  <a :href="'https://orcid.org/'+contact.orcId " target="_blank">
                    <img id="orcid-logo" src="assets/images/ORCIDiD_iconvector.svg" />
                  </a>
                </div>
                <div>
                  <span v-if="contact.firstName != null">
                    <b>{{contact.firstName}}</b>
                  </span>
                  <span v-if="contact.lastName != null">
                    <b>{{contact.lastName}}</b>
                  </span>
                </div>
                <div v-if="contact.email != null">{{contact.email}}</div>
              </div>
              <div v-if="contact.organisation">
                <span class="funding idScanR link" v-if="contact.organisation.idScanR">
                  <a
                    :href="'https://scanr.enseignementsup-recherche.gouv.fr/structure/' +contact.organisation.idScanR"
                    target="_blank"
                  >
                    <i class="blue info circle icon"></i>
                  </a>
                </span>
                <span v-if="contact.organisation.name">{{getI18n(contact.organisation.name,"en")}}</span>
                <span v-if="contact.organisation.acronym">
                  <i>({{contact.organisation.acronym}})</i>
                </span>
                <span v-if="contact.organisation.country">
                  <i>- {{getI18n(contact.organisation.country,"en")}}</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.contact.list {
  max-height: 50rem;
  overflow: auto;
}

.clearfix {
  overflow: auto;
}

img#orcid-logo {
  height: 2rem;
  float: right;
}
</style>

<script>
/**
 * @vuese
 * Display the list of contacts
 * @group Info panel components
 */
export default {
  name: "contacts-info-panel-component",
  props: {
    contacts: {
      //List of contacts
      type: Array,
      required: true
    }
  },
  computed: {
    contactRoles() {
      let roles = {};
      this.contacts.forEach(element => {
        if (roles[element.role]) {
          roles[element.role].push(element);
        } else {
          roles[element.role] = [element];
        }
      });
      let keys = Object.keys(roles);
      keys.forEach((key) => {
        roles[key].sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0)); 
      });
      return roles;
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
