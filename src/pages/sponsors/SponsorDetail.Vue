<template>
  <q-page class="container q-pa-md">
     <div class="row q-p-md justify-center  items-center" style="padding: 20px;">
       <q-card style="width: 700px; max-width: 80vw;" v-if="sponsorDetail.clear == false">
       <div class="q-pa-md">
          <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{`${sponsorDetail.name} ${sponsorDetail.lastName}`}}</q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{sponsorDetail.country_name}}</q-item-label>
           <q-item-label caption>País</q-item-label>
        </q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{sponsorDetail.state_name}}</q-item-label>
           <q-item-label caption>Estado</q-item-label>
        </q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{sponsorDetail.city_name}}</q-item-label>
           <q-item-label caption>Cidade</q-item-label>
        </q-item-section>
      </q-item>
       </div>
       </q-card>
     </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'sponsorDetail',
  data () {
    return {
      idSponsor: this.$route.params.idSponsor
    }
  },
  computed: {
    ...mapState('eventos', ['sponsorDetail'])
  },
  methods: {
    ...mapActions('eventos', ['getSponsor'])
  },
  mounted () {
    this.getSponsor(this.idSponsor)
  }
}
</script>

<style lang="stylus" scoped>
/*   .buttons{
     width 240px
     margin 5px
  }
  @media (max-width: 600px) {
    .buttons{
    width 100%
    margin 5px
    }
  } */
</style>
